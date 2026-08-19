import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Calculator,
  FileText,
  GraduationCap,
  LoaderCircle,
  MapPinned,
  Plus,
  ReceiptText,
  Save,
  Tags,
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
import InvoiceMomentsEditor from "./InvoiceMomentsEditor.jsx";

const updateNested = (setter, section, field, value) =>
  setter((current) => ({
    ...current,
    [section]: { ...current[section], [field]: value },
  }));

const DISCOUNT_OPTIONS = [
  { code: "LOCATIE", description: "Locatiekorting" },
  { code: "WELKOM", description: "Welkomstkorting" },
  { code: "PARTNER", description: "Partnerkorting" },
  { code: "EENMALIG", description: "Eenmalig afgesproken korting" },
  { code: "OVERIG", description: "" },
];

const getDiscountDescription = (code) =>
  DISCOUNT_OPTIONS.find((option) => option.code === code)?.description || "";

const emptyDiscount = (quoteTrainingId = "") => ({
  quoteTrainingId,
  code: "LOCATIE",
  description: getDiscountDescription("LOCATIE"),
  type: "FIXED_AMOUNT",
  value: 0,
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
  readOnly = false,
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
    <form className={`quote-form${readOnly ? " is-read-only" : ""}`} onSubmit={submit}>
      <fieldset className="quote-form-fields" disabled={readOnly}>
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
          <label className="quote-field">
            Btw-percentage
            <select
              required
              value={form.vatPercentage}
              onChange={(event) =>
                setForm({ ...form, vatPercentage: Number(event.target.value) })
              }
            >
              <option value={0}>0% btw</option>
              <option value={9}>9% btw</option>
              <option value={21}>21% btw</option>
            </select>
          </label>
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
            [
              "organizationName",
              "Naam van bedrijf, organisatie of vereniging",
              true,
            ],
            ["contactPersonName", "Contactpersoon", true],
            ["greetingName", "Aanspreeknaam", false],
            ["contactEmail", "E-mail", true, "email"],
            ["contactPhone", "Telefoon", true, "tel"],
          ].map(([field, label, required, type = "text"]) => (
            <label className="quote-field" key={field}>
              {label}
              <input
                type={type}
                required={required}
                placeholder={
                  field === "organizationName"
                    ? "Bijvoorbeeld een bedrijf, sportvereniging, stichting of school"
                    : undefined
                }
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

      {(form.invoiceMoments || []).length > 0 && (
        <QuoteSection
          title="Kortingen per factuurmoment"
          description="Koppel eventueel een korting aan een factuurmoment. De getoonde volgorde is geen definitieve datumplanning."
          icon={<ReceiptText />}
          className="quote-section--wide"
        >
          <InvoiceMomentsEditor
            moments={form.invoiceMoments}
            onChange={(invoiceMoments) => setForm({ ...form, invoiceMoments })}
          />
        </QuoteSection>
      )}

      <QuoteSection
        title="Korting en reiskosten"
        icon={<Calculator />}
        className="quote-section--wide quote-section--calculation-wrapper"
        description="Voer alleen afspraken in; de backend berekent daarna alle totalen."
      >
        <div className="quote-calculation-groups">
        <section className="quote-calculation-card">
          <div className="quote-calculation-card__header">
            <MapPinned aria-hidden="true" />
            <div>
              <h3>Reiskosten</h3>
              <p>Bereken de vergoeding per training of uitvoeringsmoment.</p>
            </div>
          </div>
        <div className="quote-form-grid quote-form-grid--three">
          {[
            ["distanceKm", "Reisafstand per training (km)"],
            ["freeKm", "Vrije kilometers per training"],
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
          De offertebackend berekent de reiskosten uit (afstand - vrije
          kilometers) × kilometertarief × aantal trainingen of
          uitvoeringsmomenten.
        </p>
        </section>
        <section className="quote-calculation-card">
          <div className="quote-calculation-card__header">
            <Tags aria-hidden="true" />
            <div>
              <h3>Kortingen</h3>
              <p>Voeg uitsluitend de afgesproken kortingen toe.</p>
            </div>
          </div>
        <div className="quote-discount-list">
          {(form.discounts || []).map((discount, index) => (
            <div
              className="quote-form-grid quote-discount-row"
              key={`${index}-${discount.code}`}
            >
              <label className="quote-field">
                Geldt voor training
                <select
                  required
                  value={discount.quoteTrainingId || ""}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      discounts: current.discounts.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, quoteTrainingId: event.target.value }
                          : item,
                      ),
                    }))
                  }
                >
                  <option value="" disabled>Kies een training</option>
                  {form.trainingItems.map((training, trainingIndex) => (
                    <option
                      key={training.legacyTrainingId || trainingIndex}
                      value={training.legacyTrainingId || training.trainingCode || ""}
                    >
                      {training.title || `Training ${trainingIndex + 1}`}
                    </option>
                  ))}
                </select>
              </label>
              <label className="quote-field">
                Kortingscode
                <select
                  value={discount.code}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      discounts: current.discounts.map((item, itemIndex) =>
                        itemIndex === index
                          ? {
                              ...item,
                              code: event.target.value,
                              description: getDiscountDescription(
                                event.target.value,
                              ),
                            }
                          : item,
                      ),
                    }))
                  }
                >
                  {DISCOUNT_OPTIONS.map((option) => (
                    <option value={option.code} key={option.code}>
                      {option.description || "Overige korting"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="quote-field">
                Omschrijving
                <input
                  required
                  readOnly={discount.code !== "OVERIG"}
                  placeholder={
                    discount.code === "OVERIG"
                      ? "Beschrijf de afgesproken korting"
                      : undefined
                  }
                  value={discount.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      discounts: current.discounts.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, description: event.target.value }
                          : item,
                      ),
                    }))
                  }
                />
              </label>
              <label className="quote-field">
                Soort korting
                <select
                  value={discount.type}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      discounts: current.discounts.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, type: event.target.value, value: 0 }
                          : item,
                      ),
                    }))
                  }
                >
                  <option value="FIXED_AMOUNT">Vast bedrag</option>
                  <option value="PERCENTAGE">Percentage</option>
                </select>
              </label>
              {[
                ["value", discount.type === "PERCENTAGE" ? "Korting (%)" : "Korting (€)", "number"],
              ].map(([field, label, type]) => (
                <label className="quote-field" key={field}>
                  {label}
                  <input
                    type={type}
                    required
                    min="0.01"
                    max={discount.type === "PERCENTAGE" ? 100 : undefined}
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
                  discounts: [
                    ...current.discounts,
                    emptyDiscount(
                      current.trainingItems[0]?.legacyTrainingId
                        || current.trainingItems[0]?.trainingCode,
                    ),
                  ],
                }))
              }
            >
              <Plus size={18} /> Korting toevoegen
            </button>
          )}
        </div>
        </section>
        <section className="quote-calculation-card quote-calculation-card--totals">
          <div className="quote-calculation-card__header">
            <ReceiptText aria-hidden="true" />
            <div>
              <h3>Prijsoverzicht</h3>
              <p>Alle berekende bedragen overzichtelijk bij elkaar.</p>
            </div>
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
            Totaal excl. btw{" "}
            <strong>
              {formatCurrency(form.priceSummary?.totalExcludingVat)}
            </strong>
          </span>
          <span>
            Btw ({Number(form.vatPercentage) || 0}%){" "}
            <strong>{formatCurrency(form.priceSummary?.vatAmount)}</strong>
          </span>
          <span className="quote-total--final">
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
        </section>
        </div>
      </QuoteSection>

      </fieldset>
      <div className="quote-submit-bar">
        <p>
          De offerte wordt veilig opgeslagen. Daarna kan de PDF vanuit het
          overzicht worden gedownload.
        </p>
        {!readOnly && <button type="submit" disabled={submitting || loadingTypes}>
          {submitting ? (
            <LoaderCircle className="quote-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {submitting ? "Opslaan..." : submitLabel}
        </button>}
      </div>
    </form>
  );
}
