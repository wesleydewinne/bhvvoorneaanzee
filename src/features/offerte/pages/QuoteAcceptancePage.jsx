import { useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import quoteService from "../services/quoteService.js";
import "../styles/Offerte.css";

export default function QuoteAcceptancePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")?.trim() || "";
  const [quote, setQuote] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (!token) {
      setError("De akkoordlink is ongeldig of onvolledig.");
      setLoading(false);
      return () => { active = false; };
    }

    quoteService
      .getAcceptanceContext(token)
      .then((result) => {
        if (active) setQuote(result);
      })
      .catch((reason) => {
        if (active) setError(reason.message || "De offerte kon niet worden geladen.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [token]);

  const confirmAcceptance = async () => {
    if (!termsAccepted || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const result = await quoteService.acceptQuote(token);
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
          <div className="quote-public-success">
            <CheckCircle2 aria-hidden="true" />
            <h1>Bedankt voor uw akkoord</h1>
            <p>
              Offerte <strong>{quote?.quoteNumber}</strong> is succesvol
              geaccepteerd. Wij nemen contact met u op voor de verdere planning.
            </p>
          </div>
        ) : error && !quote ? (
          <>
            <h1>Offerte niet beschikbaar</h1>
            <p className="quote-alert quote-alert--error">{error}</p>
            <Link className="quote-primary-button" to="/contact">
              Contact opnemen
            </Link>
          </>
        ) : (
          <>
            <h1>Offerte {quote.quoteNumber}</h1>
            <div className="quote-acceptance-summary">
              <p><span>Organisatie</span><strong>{quote.companyName}</strong></p>
              {quote.contactPerson && (
                <p><span>Contactpersoon</span><strong>{quote.contactPerson}</strong></p>
              )}
              <p><span>Geldig tot en met</span><strong>{formatDate(quote.validUntil)}</strong></p>
              <p><span>Totaal inclusief btw</span><strong>{formatCurrency(quote.totalIncludingVat)}</strong></p>
            </div>

            {canAccept ? (
              <>
                <label className="quote-check">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                  />
                  <span>
                    Ik ga akkoord met deze offerte en de daarin opgenomen
                    voorwaarden en opdrachtomschrijving.
                  </span>
                </label>
                {error && <p className="quote-alert quote-alert--error">{error}</p>}
                <button
                  className="quote-primary-button"
                  type="button"
                  disabled={!termsAccepted || submitting}
                  onClick={confirmAcceptance}
                >
                  {submitting ? "Akkoord verwerken..." : "Offerte definitief accepteren"}
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
