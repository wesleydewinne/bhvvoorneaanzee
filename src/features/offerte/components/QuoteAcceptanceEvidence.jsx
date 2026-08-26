import { CheckCircle2, Fingerprint, Printer, ShieldCheck } from "lucide-react";
import { createPortal } from "react-dom";

function confirmationLabel(value) {
  return value === true ? "Bevestigd" : "Niet vastgelegd";
}

export default function QuoteAcceptanceEvidence({ quote }) {
  if (!quote?.acceptedAt) return null;

  const quoteNumber = quote.quote?.quoteNumber || quote.quoteNumber;
  const organizationName = quote.quote?.customer?.organizationName
    || quote.quote?.customer?.name
    || quote.customer?.organizationName
    || quote.customer?.name;
  const acceptedAt = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(quote.acceptedAt));

  const printableEvidence = (
    <article className="quote-acceptance-print-document">
      <header>
        <p>BHV VOORNE AAN ZEE</p>
        <h1>Acceptatiebewijs</h1>
        <p>Bewijsregistratie van het digitale akkoord</p>
      </header>
      <dl>
        <div><dt>Offertenummer</dt><dd>{quoteNumber || "Niet vastgelegd"}</dd></div>
        <div><dt>Opdrachtgever</dt><dd>{organizationName || "Niet vastgelegd"}</dd></div>
        <div><dt>Datum en tijd akkoord</dt><dd>{acceptedAt}</dd></div>
        <div><dt>Akkoord gegeven door</dt><dd>{quote.acceptedByName || "Niet vastgelegd"}</dd></div>
        <div><dt>Functie</dt><dd>{quote.acceptedByRole || "Niet vastgelegd"}</dd></div>
        <div><dt>E-mailadres</dt><dd>{quote.acceptedByEmail || "Niet vastgelegd"}</dd></div>
        <div><dt>Bevoegdheid bevestigd</dt><dd>{confirmationLabel(quote.authorityConfirmed)}</dd></div>
        <div><dt>Offerte en voorwaarden bevestigd</dt><dd>{confirmationLabel(quote.termsAccepted)}</dd></div>
        <div><dt>Versie akkoordverklaring</dt><dd>{quote.acceptanceStatementVersion || "Niet vastgelegd"}</dd></div>
        <div><dt>IP-adres</dt><dd>{quote.acceptedFromIp || "Niet vastgelegd"}</dd></div>
        <div><dt>Browserregistratie</dt><dd>{quote.acceptedUserAgent || "Niet vastgelegd"}</dd></div>
        <div className="quote-acceptance-print-document__hash">
          <dt>SHA-256 verstuurde PDF</dt>
          <dd>{quote.offeredPdfSha256 || "Niet vastgelegd"}</dd>
        </div>
      </dl>
      <section>
        <h2>Vastgelegde verklaring</h2>
        <p>
          De akkoordgever heeft bevestigd bevoegd te zijn namens de opdrachtgever
          akkoord te geven op de offerte en de getoonde akkoordverklaring definitief bevestigd.
        </p>
      </section>
      <footer>
        Dit bewijs behoort samen met de geaccepteerde offerte en bijbehorende correspondentie
        te worden bewaard.
      </footer>
    </article>
  );

  return (
    <>
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

      <details className="quote-acceptance-evidence__technical">
        <summary>
          <span className="quote-acceptance-evidence__technical-icon" aria-hidden="true">
            <Fingerprint />
          </span>
          <span>
            <strong>Technische bewijsgegevens</strong>
            <small>IP-adres, browserregistratie en controlehash bekijken</small>
          </span>
        </summary>
        <div className="quote-acceptance-evidence__technical-content">
          <dl>
            <div><dt>IP-adres</dt><dd>{quote.acceptedFromIp || "Niet vastgelegd"}</dd></div>
            <div><dt>Browserregistratie</dt><dd>{quote.acceptedUserAgent || "Niet vastgelegd"}</dd></div>
            <div><dt>SHA-256 verstuurde PDF</dt><dd><code>{quote.offeredPdfSha256 || "Niet vastgelegd"}</code></dd></div>
          </dl>
          <p>
            Dit overzicht is een technische registratie uit het offertesysteem.
            De geaccepteerde offerte behoort samen met dit bewijs te worden bewaard.
          </p>
        </div>
      </details>
    </section>
      {createPortal(printableEvidence, document.body)}
    </>
  );
}
