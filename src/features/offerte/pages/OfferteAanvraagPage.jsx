import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Plus,
  Send,
  Trash2,
} from "lucide-react";
import quoteService from "../services/quoteService.js";
import "../styles/Offerte.css";

const isExerciseBasedEvacuation = (trainingCode = "") =>
  [
    "EVACUATION_DRILL_PHASE_2",
    "EVACUATION_DRILL_PHASE_3",
    "EVACUATION_DRILL_PHASE_4",
  ].includes(trainingCode);

const CAPTCHA_DISABLED =
  import.meta.env.DEV && import.meta.env.VITE_DISABLE_CAPTCHA === "true";

const emptyForm = {
  organizationName: "",
  contactName: "",
  email: "",
  phone: "",
  trainingSelections: [{ trainingCode: "", participantCount: 1 }],
  trainingStreet: "",
  trainingHouseNumber: "",
  trainingPostalCode: "",
  trainingCity: "",
  companyAtTrainingAddress: true,
  companyStreet: "",
  companyHouseNumber: "",
  companyPostalCode: "",
  companyCity: "",
  message: "",
  privacyAccepted: false,
  captcha: CAPTCHA_DISABLED ? "local-development" : "",
  website: "",
};

export default function OfferteAanvraagPage() {
  const [form, setForm] = useState(emptyForm);
  const [trainingTypes, setTrainingTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const captchaRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    quoteService
      .getPublicTrainingTypes()
      .then(setTrainingTypes)
      .catch((reason) => setError(reason.message));
  }, []);

  useEffect(() => {
    if (CAPTCHA_DISABLED) return;
    const sitekey = import.meta.env.VITE_TURNSTILE_SITEKEY;
    const render = () => {
      if (
        !window.turnstile ||
        !captchaRef.current ||
        widgetIdRef.current !== null
      )
        return;
      widgetIdRef.current = window.turnstile.render(captchaRef.current, {
        sitekey,
        callback: (token) =>
          setForm((current) => ({ ...current, captcha: token })),
        "expired-callback": () =>
          setForm((current) => ({ ...current, captcha: "" })),
        "error-callback": () =>
          setForm((current) => ({ ...current, captcha: "" })),
      });
    };
    if (window.turnstile) {
      render();
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", render);
    document.head.appendChild(script);
    return () => {
      script.removeEventListener("load", render);
    };
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await quoteService.submitRequest({
        ...form,
        trainingTypes,
        trainingSelections: form.trainingSelections.map((item) => ({
          ...item,
          participantCount: Number(item.participantCount),
        })),
      });
      setSubmitted(true);
    } catch (reason) {
      setError(reason.message || "De aanvraag kon niet worden verzonden.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInvalid = (event) => {
    const field = event.target;
    const label =
      field.dataset.label || field.closest("label")?.firstChild?.textContent?.trim();
    let message = `${label || "Dit veld"} is verplicht.`;

    if (field.validity.typeMismatch) {
      message = "Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.nl.";
    } else if (field.validity.patternMismatch) {
      message =
        field.type === "tel"
          ? "Vul een geldig telefoonnummer in van 8 tot 15 cijfers."
          : "Vul een geldige Nederlandse postcode in, bijvoorbeeld 3232 AA.";
    } else if (field.validity.rangeUnderflow) {
      message = "Het aantal cursisten moet minimaal 1 zijn.";
    } else if (field.validity.tooShort) {
      message = `${label || "Dit veld"} is te kort ingevuld.`;
    }

    field.setCustomValidity(message);
    setValidationAttempted(true);
    setError("Controleer de rood gemarkeerde velden en verbeter de invoer.");

    window.requestAnimationFrame(() => {
      const firstInvalid = formRef.current?.querySelector(":invalid");
      firstInvalid?.closest("label, fieldset")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      firstInvalid?.focus({ preventScroll: true });
    });
  };

  const handleInput = (event) => {
    event.target.setCustomValidity?.("");
  };

  const updateTraining = (index, field, value) =>
    setForm((current) => ({
      ...current,
      trainingSelections: current.trainingSelections.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));

  const addTraining = () =>
    setForm((current) => ({
      ...current,
      trainingSelections: [
        ...current.trainingSelections,
        { trainingCode: "", participantCount: 1 },
      ],
    }));

  const removeTraining = (index) =>
    setForm((current) => ({
      ...current,
      trainingSelections: current.trainingSelections.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));

  if (submitted)
    return (
      <main className="quote-public-page">
        <section className="quote-public-success">
          <CheckCircle2 />
          <h1>Aanvraag ontvangen</h1>
          <p>
            Bedankt. We nemen contact met je op om de aanvraag door te nemen.
          </p>
        </section>
      </main>
    );

  return (
    <main className="quote-public-page">
      <section className="quote-public-card">
        <header>
          <span className="quote-public-card__icon">
            <ClipboardList />
          </span>
          <p className="quote-eyebrow">Vrijblijvende aanvraag</p>
          <h1>Offerte voor een training aanvragen</h1>
          <p>
            Vertel ons wat je nodig hebt. Je hoeft hiervoor niet in te loggen.
          </p>
        </header>
        {error && (
          <p className="quote-alert quote-alert--error" role="alert">
            {error}
          </p>
        )}
        <form
          ref={formRef}
          className={`quote-request-form${
            validationAttempted ? " quote-request-form--validated" : ""
          }`}
          onSubmit={submit}
          onInvalid={handleInvalid}
          onInput={handleInput}
        >
          <label>
            Naam van uw bedrijf, organisatie of vereniging *
            <input
              required
              minLength="2"
              placeholder="Bijvoorbeeld een bedrijf, sportvereniging, stichting of school"
              value={form.organizationName}
              onChange={(e) =>
                setForm({ ...form, organizationName: e.target.value })
              }
            />
          </label>
          <label>
            Naam contactpersoon *
            <input
              required
              minLength="2"
              value={form.contactName}
              onChange={(e) =>
                setForm({ ...form, contactName: e.target.value })
              }
            />
          </label>
          <label>
            E-mailadres *
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Telefoonnummer *
            <input
              required
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern="[+]?[0-9 ()-]{8,20}"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
          <fieldset className="quote-request-training-list quote-request-form__wide">
            <legend>Gewenste trainingen</legend>
            <p>
              Voeg iedere training apart toe en geef per training het aantal
              cursisten op.
            </p>
            {form.trainingSelections.map((selection, index) => (
              <div className="quote-request-training" key={index}>
                <label>
                  Training {index + 1} *
                  <select
                    required
                    data-label={`Training ${index + 1}`}
                    value={selection.trainingCode}
                    onChange={(e) => {
                      updateTraining(index, "trainingCode", e.target.value);
                      if (isExerciseBasedEvacuation(e.target.value)) {
                        updateTraining(index, "participantCount", 1);
                      }
                    }}
                  >
                    <option value="">Kies een training</option>
                    {trainingTypes.map((training) => (
                      <option
                        disabled={form.trainingSelections.some(
                          (item, itemIndex) =>
                            itemIndex !== index &&
                            item.trainingCode === training.code,
                        )}
                        key={training.code}
                        value={training.code}
                      >
                        {training.displayName}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {isExerciseBasedEvacuation(selection.trainingCode)
                    ? "Aantal oefeningen *"
                    : "Aantal cursisten *"}
                  <input
                    required
                    min="1"
                    max="500"
                    type="number"
                    value={selection.participantCount}
                    onChange={(e) =>
                      updateTraining(
                        index,
                        "participantCount",
                        Number(e.target.value),
                      )
                    }
                  />
                </label>
                {form.trainingSelections.length > 1 && (
                  <button
                    type="button"
                    className="quote-icon-button quote-icon-button--danger"
                    onClick={() => removeTraining(index)}
                    aria-label={`Training ${index + 1} verwijderen`}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="quote-secondary-button quote-request-add-training"
              onClick={addTraining}
            >
              <Plus size={18} />
              Nog een training toevoegen
            </button>
          </fieldset>
          <div className="quote-request-location-heading quote-request-form__wide">
            <h2>Waar wordt de training verzorgd?</h2>
            <p>
              Vul het uitvoeringsadres volledig in. Dit adres wordt gebruikt om
              eventuele reiskilometers en reiskosten te bepalen.
            </p>
          </div>
          <label>
            Straat *
            <input
              required
              minLength="2"
              autoComplete="street-address"
              value={form.trainingStreet}
              onChange={(e) =>
                setForm({ ...form, trainingStreet: e.target.value })
              }
            />
          </label>
          <label>
            Huisnummer *
            <input
              required
              minLength="1"
              value={form.trainingHouseNumber}
              onChange={(e) =>
                setForm({ ...form, trainingHouseNumber: e.target.value })
              }
            />
          </label>
          <label>
            Postcode *
            <input
              required
              autoComplete="postal-code"
              pattern="[1-9][0-9]{3}\s?[A-Za-z]{2}"
              value={form.trainingPostalCode}
              onChange={(e) =>
                setForm({ ...form, trainingPostalCode: e.target.value })
              }
            />
          </label>
          <label>
            Plaats *
            <input
              required
              minLength="2"
              autoComplete="address-level2"
              value={form.trainingCity}
              onChange={(e) =>
                setForm({ ...form, trainingCity: e.target.value })
              }
            />
          </label>
          <label className="quote-check quote-request-form__wide">
            <input
              type="checkbox"
              checked={form.companyAtTrainingAddress}
              onChange={(e) =>
                setForm({
                  ...form,
                  companyAtTrainingAddress: e.target.checked,
                })
              }
            />
            <span>
              Het bedrijf, de organisatie of vereniging is op hetzelfde adres
              gevestigd.
            </span>
          </label>
          {!form.companyAtTrainingAddress && (
            <>
              <div className="quote-request-location-heading quote-request-form__wide">
                <h2>Vestigingsadres organisatie</h2>
                <p>
                  Vul het adres in waar het bedrijf, de organisatie of
                  vereniging officieel gevestigd is.
                </p>
              </div>
              <label>
                Straat vestigingsadres *
                <input
                  required
                  minLength="2"
                  value={form.companyStreet}
                  onChange={(e) =>
                    setForm({ ...form, companyStreet: e.target.value })
                  }
                />
              </label>
              <label>
                Huisnummer vestigingsadres *
                <input
                  required
                  minLength="1"
                  value={form.companyHouseNumber}
                  onChange={(e) =>
                    setForm({ ...form, companyHouseNumber: e.target.value })
                  }
                />
              </label>
              <label>
                Postcode vestigingsadres *
                <input
                  required
                  pattern="[1-9][0-9]{3}\s?[A-Za-z]{2}"
                  value={form.companyPostalCode}
                  onChange={(e) =>
                    setForm({ ...form, companyPostalCode: e.target.value })
                  }
                />
              </label>
              <label>
                Plaats vestigingsadres *
                <input
                  required
                  minLength="2"
                  value={form.companyCity}
                  onChange={(e) =>
                    setForm({ ...form, companyCity: e.target.value })
                  }
                />
              </label>
            </>
          )}
          <label className="quote-request-form__wide">
            Bericht bij uw aanvraag
            <textarea
              rows="5"
              placeholder="Heeft u nog wensen, vragen of bijzonderheden? Laat hier gerust een bericht achter."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <label className="quote-honeypot" aria-hidden="true">
            Website
            <input
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </label>
          <label className="quote-check quote-request-form__wide">
            <input
              required
              type="checkbox"
              checked={form.privacyAccepted}
              onChange={(e) =>
                setForm({ ...form, privacyAccepted: e.target.checked })
              }
            />{" "}
            Ik geef toestemming om deze gegevens te verwerken voor mijn
            offerteaanvraag.
          </label>
          {!CAPTCHA_DISABLED && (
            <div className="quote-request-form__wide" ref={captchaRef} />
          )}
          <button
            className="quote-primary-button quote-request-form__wide"
            disabled={submitting || !form.captcha}
          >
            <Send />
            {submitting ? "Verzenden..." : "Aanvraag versturen"}
          </button>
        </form>
      </section>
    </main>
  );
}
