import { useEffect, useState } from "react";
import { Ban, CheckCircle2, Clock3, LoaderCircle, ShieldX } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import quoteService from "../services/quoteService.js";
import "../styles/Offerte.css";

export default function QuoteAcceptancePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")?.trim() || "";
  const quoteId = searchParams.get("quoteId")?.trim() || "";
  const [quote, setQuote] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [authorityConfirmed, setAuthorityConfirmed] = useState(false);
  const [acceptedByName, setAcceptedByName] = useState("");
  const [acceptedByRole, setAcceptedByRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (!token && !quoteId) {
      setError("De akkoordlink is ongeldig of onvolledig.");
      setLoading(false);
      return () => { active = false; };
    }

    const request = token
      ? quoteService.getAcceptanceContext(token)
      : quoteService.getAcceptanceStatus(quoteId);

    request
      .then((result) => {
        if (active) {
          if (!token && result.status !== "ACCEPTED") {
            throw new Error("Deze akkoordlink is niet actief.");
          }
          setQuote(result);
          setAcceptedByName(result.contactPerson || "");
        }
      })
      .catch((reason) => {
        if (active) setError(reason.message || "De offerte kon niet worden geladen.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [quoteId, token]);

  const confirmAcceptance = async () => {
    if (
      !termsAccepted ||
      !authorityConfirmed ||
      !acceptedByName.trim() ||
      submitting
    ) return;
    setSubmitting(true);
    setError("");
    try {
      const result = await quoteService.acceptQuote(token, {
        name: acceptedByName.trim(),
        role: acceptedByRole.trim(),
        termsAccepted,
        authorityConfirmed,
      });
      setQuote(result);
      setAccepted(true);
    } catch (reason) {
      setError(reason.message || "Het akkoord kon niet worden verwerkt.");
    } finally {
      setSubmitting(false);
    }
  };

  const canAccept = quote?.canAccept && !accepted;

  return (
    <main className="quote-public-page">
      <section className="quote-public-card">
        <p className="quote-eyebrow">Digitaal akkoord</p>
        {loading ? (
          <div className="quote-public-success">
            <LoaderCircle className="quote-spin" aria-hidden="true" />
            <h1>Offerte laden</h1>
            <p>De beveiligde offertelink wordt gecontroleerd.</p>
          </div>
        ) : accepted || quote?.status === "ACCEPTED" ? (
          <div className="quote-public-success quote-public-status quote-public-status--accepted">
            <CheckCircle2 aria-hidden="true" />
            <h1>Offerte is al geaccepteerd</h1>
            <p>
              Deze offerte is digitaal geaccepteerd. De akkoordlink kan daarom
              niet opnieuw worden gebruikt.
            </p>
            <Link className="quote-primary-button" to="/contact">
              Contact opnemen
            </Link>
          </div>
        ) : quote?.status === "EXPIRED" ? (
          <StatusMessage
            icon={Clock3}
            variant="expired"
            title="Offerte is verlopen"
            message="De geldigheidsduur van deze offerte is verstreken. Neem contact met ons op als u een nieuwe offerte wilt ontvangen."
          />
        ) : ["CANCELLED", "REJECTED"].includes(quote?.status) ? (
          <StatusMessage
            icon={Ban}
            variant="withdrawn"
            title="Offerte is niet meer actief"
            message="Deze offerte is ingetrokken en kan niet meer digitaal worden geaccepteerd."
          />
        ) : error && !quote ? (
          <StatusMessage
            icon={ShieldX}
            variant="invalid"
            title="Offerte niet beschikbaar"
            message="Deze akkoordlink is ongeldig of niet meer actief."
          />
        ) : (
          <>
            <h1>Offerte {quote.quoteNumber}</h1>
            <p>
              Controleer de onderstaande gegevens voordat u namens de
              opdrachtgever de opdracht definitief bevestigt.
            </p>
            <div className="quote-acceptance-summary">
              <p><span>Offertenummer</span><strong>{quote.quoteNumber}</strong></p>
              <p><span>Organisatie</span><strong>{quote.companyName}</strong></p>
              <p><span>Offertedatum</span><strong>{formatDate(quote.issueDate)}</strong></p>
              <p><span>Geldig tot en met</span><strong>{formatDate(quote.validUntil)}</strong></p>
              <p><span>Totaal exclusief btw</span><strong>{formatCurrency(quote.totalExcludingVat)}</strong></p>
            </div>

            {canAccept ? (
              <>
                <section className="quote-acceptance-section quote-terms-card">
                  <h2>Algemene voorwaarden</h2>
                  <p>
                    Op deze opdracht zijn de Algemene Voorwaarden van W &amp; S
                    Adviesgroep B.V., handelend onder de naam BHV Voorne aan Zee,
                    van toepassing.
                  </p>
                  <div className="quote-terms-actions">
                    <Link className="quote-secondary-button" to="/algemene-voorwaarden">
                      Algemene voorwaarden bekijken
                    </Link>
                    <Link
                      className="quote-secondary-button"
                      to="/algemene-voorwaarden#download"
                    >
                      PDF downloaden
                    </Link>
                  </div>
                </section>

                <section className="quote-acceptance-section">
                  <h2>Uw gegevens</h2>
                  <p>
                    Vul uw naam in zoals wij deze bij het akkoord mogen
                    registreren. Het e-mailadres is overgenomen uit de offerte.
                  </p>
                  <div className="quote-acceptance-fields">
                    <label>
                      Volledige naam <span aria-hidden="true">*</span>
                      <input
                        type="text"
                        required
                        maxLength={200}
                        autoComplete="name"
                        value={acceptedByName}
                        onChange={(event) => setAcceptedByName(event.target.value)}
                      />
                    </label>
                    <label>
                      Functie binnen de organisatie
                      <input
                        type="text"
                        maxLength={150}
                        autoComplete="organization-title"
                        value={acceptedByRole}
                        onChange={(event) => setAcceptedByRole(event.target.value)}
                      />
                    </label>
                    <label className="quote-acceptance-fields__wide">
                      E-mailadres uit de offerte
                      <input type="email" value={quote.customerEmail || ""} readOnly />
                    </label>
                  </div>
                </section>

                <label className="quote-check">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                  />
                  <span>
                    Ik heb de offerte en de algemene voorwaarden kunnen inzien
                    en ga akkoord met de toepasselijkheid daarvan op deze opdracht.
                  </span>
                </label>
                <label className="quote-check">
                  <input
                    type="checkbox"
                    checked={authorityConfirmed}
                    onChange={(event) => setAuthorityConfirmed(event.target.checked)}
                  />
                  <span>
                    Ik bevestig dat ik bevoegd ben om namens {quote.companyName}
                    {" "}deze opdracht te verstrekken.
                  </span>
                </label>
                <p className="quote-acceptance-declaration">
                  Door de opdracht te bevestigen verstrekt u namens de
                  opdrachtgever de opdracht aan W &amp; S Adviesgroep B.V.,
                  handelend onder de naam BHV Voorne aan Zee, overeenkomstig
                  deze offerte en de daarbij behorende voorwaarden.
                </p>
                {error && <p className="quote-alert quote-alert--error">{error}</p>}
                <button
                  className="quote-primary-button"
                  type="button"
                  disabled={
                    !termsAccepted ||
                    !authorityConfirmed ||
                    !acceptedByName.trim() ||
                    submitting
                  }
                  onClick={confirmAcceptance}
                >
                  {submitting ? "Akkoord verwerken..." : "Opdracht definitief bevestigen"}
                </button>
              </>
            ) : (
              <>
                <p className="quote-alert quote-alert--error">
                  Deze offerte kan niet meer digitaal worden geaccepteerd.
                </p>
                <Link className="quote-primary-button" to="/contact">
                  Contact opnemen
                </Link>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function StatusMessage({ icon: Icon, variant, title, message }) {
  return (
    <div className={`quote-public-success quote-public-status quote-public-status--${variant}`}>
      <Icon aria-hidden="true" />
      <h1>{title}</h1>
      <p>{message}</p>
      <Link className="quote-primary-button" to="/contact">
        Contact opnemen
      </Link>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Onbekend";
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value || 0));
}
