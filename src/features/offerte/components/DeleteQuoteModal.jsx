import { useEffect } from "react";
import { FileText, Trash2, TriangleAlert, X } from "lucide-react";

export default function DeleteQuoteModal({ quote, deleting, onCancel, onConfirm }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !deleting) onCancel();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("quote-modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("quote-modal-open");
    };
  }, [deleting, onCancel]);

  return (
    <div
      className="quote-send-modal__backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) onCancel();
      }}
    >
      <section
        className="quote-send-modal quote-delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-delete-title"
      >
        <header className="quote-send-modal__header">
          <span className="quote-send-modal__icon"><Trash2 /></span>
          <div>
            <p>Concept verwijderen</p>
            <h2 id="quote-delete-title">Weet je dit zeker?</h2>
          </div>
          <button
            type="button"
            className="quote-send-modal__close"
            onClick={onCancel}
            disabled={deleting}
            aria-label="Venster sluiten"
          ><X /></button>
        </header>

        <div className="quote-send-modal__body">
          <p>Je staat op het punt deze conceptofferte definitief te verwijderen.</p>
          <dl className="quote-send-modal__summary">
            <div><dt>Offerte</dt><dd><FileText /> {quote.quoteNumber}</dd></div>
            <div><dt>Opdrachtgever</dt><dd>{quote.customer?.organizationName || "Niet ingevuld"}</dd></div>
          </dl>
          <div className="quote-send-modal__notice quote-delete-modal__notice">
            <TriangleAlert />
            <p>Deze actie kan niet ongedaan worden gemaakt. Alle gegevens van deze conceptofferte worden verwijderd.</p>
          </div>
        </div>

        <footer className="quote-send-modal__actions">
          <button type="button" className="quote-secondary-button" onClick={onCancel} disabled={deleting}>
            Annuleren
          </button>
          <button
            type="button"
            className="quote-primary-button quote-delete-modal__confirm"
            onClick={onConfirm}
            disabled={deleting}
          >
            <Trash2 /> {deleting ? "Offerte wordt verwijderd..." : "Ja, definitief verwijderen"}
          </button>
        </footer>
      </section>
    </div>
  );
}
