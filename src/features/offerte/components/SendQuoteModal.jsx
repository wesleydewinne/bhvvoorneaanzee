import { useEffect } from "react";
import { FileText, Mail, Send, ShieldCheck, X } from "lucide-react";

export default function SendQuoteModal({ quote, sending, onCancel, onConfirm }) {
  const customer = quote.customer || {};
  const organizationName = customer.organizationName || quote.customerName;
  const contactPerson = [customer.greetingName, customer.contactPersonName]
    .filter(Boolean)
    .join(" ") || quote.contactPerson;
  const customerEmail = customer.contactEmail || quote.customerEmail;
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !sending) onCancel();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("quote-modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("quote-modal-open");
    };
  }, [onCancel, sending]);

  return (
    <div
      className="quote-send-modal__backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !sending) onCancel();
      }}
    >
      <section
        className="quote-send-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-send-title"
      >
        <header className="quote-send-modal__header">
          <span className="quote-send-modal__icon"><Mail /></span>
          <div>
            <p>Offerte verzenden</p>
            <h2 id="quote-send-title">Klaar om naar de klant te sturen?</h2>
          </div>
          <button
            type="button"
            className="quote-send-modal__close"
            onClick={onCancel}
            disabled={sending}
            aria-label="Venster sluiten"
          ><X /></button>
        </header>

        <div className="quote-send-modal__body">
          <p>Controleer de ontvanger voordat u de offerte definitief verstuurt.</p>
          <dl className="quote-send-modal__summary">
            <div><dt>Offerte</dt><dd><FileText /> {quote.quoteNumber}</dd></div>
            <div><dt>Organisatie</dt><dd>{organizationName || "Niet ingevuld"}</dd></div>
            <div><dt>Contactpersoon</dt><dd>{contactPerson || "Niet ingevuld"}</dd></div>
            <div><dt>E-mailadres</dt><dd>{customerEmail || "Niet ingevuld"}</dd></div>
          </dl>
          <div className="quote-send-modal__notice">
            <ShieldCheck />
            <p>De klant ontvangt de offerte als PDF en een persoonlijke, beveiligde link om digitaal akkoord te geven.</p>
          </div>
        </div>

        <footer className="quote-send-modal__actions">
          <button type="button" className="quote-secondary-button" onClick={onCancel} disabled={sending}>
            Annuleren
          </button>
          <button
            type="button"
            className="quote-primary-button quote-send-modal__confirm"
            onClick={onConfirm}
            disabled={sending || !customerEmail}
          >
            <Send /> {sending ? "Offerte wordt verzonden..." : "Ja, offerte versturen"}
          </button>
        </footer>
      </section>
    </div>
  );
}
