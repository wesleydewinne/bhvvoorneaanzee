import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Calculator,
  FileText,
  GraduationCap,
  LoaderCircle,
  MessageSquareText,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import quoteService from "../services/quoteService.js";
import {
  buildQuotePayload,
  createInitialQuote,
  formatCurrency,
  normalizeQuoteForForm,
} from "../helpers/quoteHelpers.js";
import QuoteSection from "./QuoteSection.jsx";
import TrainingItemsEditor from "./TrainingItemsEditor.jsx";

const updateNested = (setter, section, field, value) =>
  setter((current) => ({
    ...current,
    [section]: { ...current[section], [field]: value },
  }));

const emptyDiscount = () => ({
  code: "",
  description: "",
  percentage: 0,
  amountExcludingVat: 0,
});

const customerAtTrainingAddress = (customer, trainingLocation) => ({
  ...customer,
  streetAndHouseNumber: trainingLocation.streetAndHouseNumber,
  postalCode: trainingLocation.postalCode,
  city: trainingLocation.city,
  country: trainingLocation.country,
});

const hasSameLocation = ({ customer, trainingLocation }) => {
  const values = [
    [customer.streetAndHouseNumber, trainingLocation.streetAndHouseNumber],
    [customer.postalCode, trainingLocation.postalCode],
    [customer.city, trainingLocation.city],
    [customer.country, trainingLocation.country],
  ];
  const normalize = (value) => String(value ?? ``).trim().toLowerCase();
  const locationIsEmpty = values.every(([, location]) => !normalize(location));

  return (
    locationIsEmpty ||
    values.every(
      ([customerValue, locationValue]) =>
        normalize(customerValue) === normalize(locationValue),
    )
  );
};

export default function QuotePdfForm({
  initialValue,
  onSave,
  submitLabel = "Offerte opslaan",
}) {
  const [form, setForm] = useState(() =>
    normalizeQuoteForForm(initialValue || createInitialQuote()),
  );
  const [hasDifferentCompanyAddress, setHasDifferentCompanyAddress] = useState(
    () =>
      !hasSameLocation(
        normalizeQuoteForForm(initialValue || createInitialQuote()),
      ),
  );
  const [trainingTypes, setTrainingTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    quoteService
      .getQuoteEditorTrainingTypes()
      .then(setTrainingTypes)
      .catch((reason) =>
        setError(
          reason.message || "De trainingstypen konden niet worden geladen.",
        ),
      )
      .finally(() => setLoadingTypes(false));
  }, []);

  const payload = useMemo(
    () =>
      buildQuotePayload({
        ...form,
        customer: hasDifferentCompanyAddress
          ? form.customer
          : customerAtTrainingAddress(form.customer, form.trainingLocation),
        trainingLocation: {
          ...form.trainingLocation,
          locationName: form.customer.organizationName,
        },
      }),
    [form, hasDifferentCompanyAddress],
  );

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const saved = await onSave(payload);
      if (saved?.quote) {
        const savedForm = normalizeQuoteForForm(saved.quote);
        setForm(savedForm);
        setHasDifferentCompanyAddress(!hasSameLocation(savedForm));
      }
    } catch (reason) {
      setError(reason.message || "De offerte-PDF kon niet worden gemaakt.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="quote-form" onSubmit={submit}>
      {error && (
        <div className="quote-alert quote-alert--error" role="alert">
          {error}
        </div>
      )}

      <QuoteSection
        title="Offertegegevens"
        description="Referentie, geldigheid en teksten op de omslag."
        icon={<FileText />}
      >
        <div className="quote-form-grid quote-form-grid--three">
          {[
            ["quoteNumber", "Offertenummer", "text"],
            ["quoteDate", "Offertedatum", "date"],
            ["validUntil", "Geldig tot", "date"],
          ].map(([field, label, type]) => (
            <label className="quote-field" key={field}>
              {label}
              <input
                required
                type={type}
                readOnly={field !== "validUntil"}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </label>
          ))}
          <label className="quote-field quote-field--span-3">
            Covertitel
            <input
              maxLength={250}
              value={form.coverTitle}
              onChange={(e) => setForm({ ...form, coverTitle: e.target.value })}
            />
          </label>
        </div>
      </QuoteSection>

      <QuoteSection
        title="Opdrachtgever"
        description="Bedrijfsgegevens en het adres waar de training plaatsvindt."
        icon={<Building2 />}
        className="quote-section--wide"
      >
        <div className="quote-form-grid quote-form-grid--three">
          {[
            ["organizationName", "Organisatie", true],
            ["contactPersonName", "Contactpersoon", true],
            ["greetingName", "Aanspreeknaam", false],
            ["contactEmail", "E-mail", true, "email"],
            ["contactPhone", "Telefoon", false, "tel"],
          ].map(([field, label, required, type = "text"]) => (
            <label className="quote-field" key={field}>
              {label}
              <input
                type={type}
                required={required}
                value={form.customer[field]}
                onChange={(e) =>
                  updateNested(setForm, "customer", field, e.target.value)
                }
              />
            </label>
          ))}
          {[
            ["streetAndHouseNumber", "Trainingsadres", true],
            ["postalCode", "Postcode", true],
            ["city", "Plaats", true],
            ["country", "Land", true],
          ].map(([field, label, required]) => (
            <label className="quote-field" key={field}>
              {label}
              <input
                required={required}
                value={form.trainingLocation[field]}
                onChange={(e) =>
                  updateNested(
                    setForm,
                    "trainingLocation",
                    field,
                    e.target.value,
                  )
                }
              />
              </label>
            ))}
          <label className="quote-field">
            Ruimte of terrein
            <input
              value={form.trainingLocation.roomOrArea}
              onChange={(e) =>
                updateNested(
                  setForm,
                  "trainingLocation",
                  "roomOrArea",
                  e.target.value,
                )
              }
            />
          </label>
        </div>
        <label className="quote-check">
          <input
            type="checkbox"
            checked={hasDifferentCompanyAddress}
            onChange={(event) =>
              setHasDifferentCompanyAddress(event.target.checked)
            }
          />
          <span>Het bedrijf is op een ander adres gevestigd.</span>
        </label>
        {hasDifferentCompanyAddress && (
          <div className="quote-form-grid quote-form-grid--three">
            {[
              ["streetAndHouseNumber", "Vestigingsadres"],
              ["postalCode", "Postcode"],
              ["city", "Plaats"],
              ["country", "Land"],
            ].map(([field, label]) => (
              <label className="quote-field" key={field}>
                {label}
                <input
                  required
                  value={form.customer[field]}
                  onChange={(e) =>
                    updateNested(setForm, "customer", field, e.target.value)
                  }
                />
              </label>
            ))}
          </div>
        )}
      </QuoteSection>

      <QuoteSection
        title="Trainingen"
        description="De technische code bewaakt de koppeling met de juiste programmateksten."
        icon={<GraduationCap />}
        className="quote-section--wide"
      >
        {loadingTypes ? (
          <p>Trainingstypen laden…</p>
        ) : (
          <TrainingItemsEditor
            items={form.trainingItems}
            trainingTypes={trainingTypes}
            onChange={(trainingItems) => setForm({ ...form, trainingItems })}
          />
        )}
      </QuoteSection>

      <QuoteSection
        title="Offerteteksten"
        description="De persoonlijke inleiding en planning worden bij de offerte opgeslagen."
        icon={<MessageSquareText />}
      >
        <div className="quote-form-grid quote-form-grid--two">
          {[
            ["personalForeword", "Persoonlijk voorwoord", false],
            ["planningNotes", "Planningsopmerkingen", false],
          ].map(([field, label, required]) => (
            <label className="quote-field" key={field}>
              {label}
              <textarea
                rows="5"
                required={required}
                maxLength={5000}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </label>
          ))}
        </div>
      </QuoteSection>

      <QuoteSection
        title="Korting en reiskosten"
        icon={<Calculator />}
        className="quote-section--wide"
        description="Voer alleen afspraken in; de backend berekent daarna alle totalen."
      >
        <div className="quote-form-grid quote-form-grid--three">
          {[
            ["distanceKm", "Totale reisafstand (km)"],
            ["freeKm", "Vrije kilometers"],
            ["ratePerKm", "Tarief per kilometer"],
          ].map(([field, label]) => (
            <label className="quote-field" key={field}>
              {label}
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.travelCalculation?.[field] ?? 0}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    travelCalculation: {
                      ...current.travelCalculation,
                      [field]: event.target.value,
                    },
                  }))
                }
              />
            </label>
          ))}
        </div>
        <p>
          De offertebackend berekent de reiskosten uit afstand − vrije
          kilometers × kilometertarief.
        </p>
        <div className="quote-discount-list">
          {(form.discounts || []).map((discount, index) => (
            <div
              className="quote-form-grid quote-form-grid--four"
              key={`${index}-${discount.code}`}
            >
              {[
                ["code", "Kortingscode", "text"],
                ["description", "Omschrijving", "text"],
                ["amountExcludingVat", "Handmatig kortingsbedrag", "number"],
              ].map(([field, label, type]) => (
                <label className="quote-field" key={field}>
                  {label}
                  <input
                    type={type}
                    required={
                      field === "description" || field === "amountExcludingVat"
                    }
                    min={
                      type === "number"
                        ? field === "amountExcludingVat"
                          ? 0.01
                          : 0
                        : undefined
                    }
                    max={field === "percentage" ? 100 : undefined}
                    step={type === "number" ? "0.01" : undefined}
                    value={discount[field]}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        discounts: current.discounts.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, [field]: event.target.value }
                            : item,
                        ),
                      }))
                    }
                  />
                </label>
              ))}
              <button
                type="button"
                className="quote-icon-button quote-icon-button--danger"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    discounts: current.discounts.filter(
                      (_, itemIndex) => itemIndex !== index,
                    ),
                  }))
                }
              >
                <Trash2 size={18} /> Korting verwijderen
              </button>
            </div>
          ))}
          {(form.discounts || []).length < 25 && (
            <button
              type="button"
              className="quote-secondary-button"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  discounts: [...current.discounts, emptyDiscount()],
                }))
              }
            >
              <Plus size={18} /> Korting toevoegen
            </button>
          )}
        </div>
        <div className="quote-totals" aria-label="Offertetotalen">
          <span>
            Trainingen{" "}
            <strong>
              {formatCurrency(form.priceSummary?.trainingSubtotalExcludingVat)}
            </strong>
          </span>
          <span>
            Reiskosten{" "}
            <strong>
              {formatCurrency(form.priceSummary?.travelCostsExcludingVat)}
            </strong>
          </span>
          <span>
            Korting{" "}
            <strong>
              − {formatCurrency(form.priceSummary?.discountTotalExcludingVat)}
            </strong>
          </span>
          <span>
            Totaal incl. btw{" "}
            <strong>
              {formatCurrency(form.priceSummary?.totalIncludingVat)}
            </strong>
          </span>
        </div>
        <p>
          Bij wijzigingen worden deze bedragen na opslaan opnieuw uit de backend
          geladen.
        </p>
      </QuoteSection>

      <div className="quote-submit-bar">
        <p>
          De offerte wordt veilig opgeslagen. Daarna kan de PDF vanuit het
          overzicht worden gedownload.
        </p>
        <button type="submit" disabled={submitting || loadingTypes}>
          {submitting ? (
            <LoaderCircle className="quote-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {submitting ? "Opslaan..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
