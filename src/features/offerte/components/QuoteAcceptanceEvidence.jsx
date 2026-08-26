import { CheckCircle2, Fingerprint, Printer, ShieldCheck } from "lucide-react";

function confirmationLabel(value) {
  return value === true ? "Bevestigd" : "Niet vastgelegd";
}

export default function QuoteAcceptanceEvidence({ quote }) {
  if (!quote?.acceptedAt) return null;

  const quoteNumber = quote.quote?.quoteNumber || quote.quoteNumber;
  const organizationName = quote.quote?.customer?.name || quote.customer?.name;
  const acceptedAt = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(quote.acceptedAt));

  return (
    <section className="quote-acceptance-evidence" aria-labelledby="acceptance-evidence-title">
      <header className="quote-acceptance-evidence__header">
        <span className="quote-acceptance-evidence__icon" aria-hidden="true">
          <ShieldCheck />
        </span>
        <div>
          <h2 id="acceptance-evidence-title">Acceptatiebewijs</h2>
          <p>Vastgelegde gegevens van het digitale akkoord.</p>
        </div>
        <button
          className="quote-secondary-button quote-acceptance-evidence__print"
          type="button"
          onClick={() => window.print()}
        >
          <Printer aria-hidden="true" />
          Acceptatiebewijs afdrukken
        </button>
      </header>

      <div className="quote-acceptance-evidence__grid">
        <div>
          <span>Offertenummer</span>
          <strong>{quoteNumber || "Niet vastgelegd"}</strong>
        </div>
        <div>
          <span>Opdrachtgever</span>
          <strong>{organizationName || "Niet vastgelegd"}</strong>
        </div>
        <div>
          <span>Datum en tijd akkoord</span>
          <strong>{acceptedAt}</strong>
        </div>
        <div>
          <span>Akkoord gegeven door</span>
          <strong>{quote.acceptedByName || "Niet vastgelegd"}</strong>
          {quote.acceptedByRole && <small>{quote.acceptedByRole}</small>}
        </div>
        <div>
          <span>E-mailadres</span>
          <strong>{quote.acceptedByEmail || "Niet vastgelegd"}</strong>
        </div>
        <div>
          <span>Bevoegdheid namens opdrachtgever</span>
          <strong className={quote.authorityConfirmed ? "is-confirmed" : ""}>
            {quote.authorityConfirmed && <CheckCircle2 aria-hidden="true" />}
            {confirmationLabel(quote.authorityConfirmed)}
          </strong>
        </div>
        <div>
          <span>Offerte en voorwaarden</span>
          <strong className={quote.termsAccepted ? "is-confirmed" : ""}>
            {quote.termsAccepted && <CheckCircle2 aria-hidden="true" />}
            {confirmationLabel(quote.termsAccepted)}
          </strong>
        </div>
        <div>
          <span>Versie akkoordverklaring</span>
          <strong>{quote.acceptanceStatementVersion || "Niet vastgelegd"}</strong>
        </div>
        <div>
          <span>Integriteit verstuurde PDF</span>
          <strong className={quote.offeredPdfSha256 ? "is-confirmed" : ""}>
            {quote.offeredPdfSha256 && <Fingerprint aria-hidden="true" />}
            {quote.offeredPdfSha256 ? "SHA-256 vastgelegd" : "Niet vastgelegd"}
          </strong>
          {quote.offeredPdfSha256 && (
            <details>
              <summary>Technische hash bekijken</summary>
              <code>{quote.offeredPdfSha256}</code>
            </details>
          )}
        </div>
      </div>

      <section className="quote-acceptance-evidence__technical">
        <h3>Technische bewijsgegevens</h3>
        <dl>
          <div><dt>IP-adres</dt><dd>{quote.acceptedFromIp || "Niet vastgelegd"}</dd></div>
          <div><dt>Browserregistratie</dt><dd>{quote.acceptedUserAgent || "Niet vastgelegd"}</dd></div>
          <div><dt>SHA-256 verstuurde PDF</dt><dd><code>{quote.offeredPdfSha256 || "Niet vastgelegd"}</code></dd></div>
        </dl>
        <p>
          Dit overzicht is een technische registratie uit het offertesysteem.
          De geaccepteerde offerte behoort samen met dit bewijs te worden bewaard.
        </p>
      </section>
    </section>
  );
}
