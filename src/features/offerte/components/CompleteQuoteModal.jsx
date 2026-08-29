import { useEffect } from "react";
import { CheckCheck, FileCheck2, ShieldCheck, X } from "lucide-react";
import { formatQuoteDateTime } from "../helpers/quoteStatus.js";

export default function CompleteQuoteModal({ detail, completing, onCancel, onConfirm }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !completing) onCancel();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("quote-modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("quote-modal-open");
    };
  }, [completing, onCancel]);

  return (
    <div
      className="quote-send-modal__backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !completing) onCancel();
      }}
    >
      <section
        className="quote-send-modal quote-complete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-complete-title"
      >
        <header className="quote-send-modal__header">
          <span className="quote-send-modal__icon"><CheckCheck /></span>
          <div>
            <p>Offerte afhandelen</p>
            <h2 id="quote-complete-title">Is deze opdracht administratief afgerond?</h2>
          </div>
          <button
            type="button"
            className="quote-send-modal__close"
            onClick={onCancel}
            disabled={completing}
            aria-label="Venster sluiten"
          ><X /></button>
        </header>

        <div className="quote-send-modal__body">
          <p>Controleer de offerte voordat u deze naar het overzicht Afgehandeld verplaatst.</p>
          <dl className="quote-send-modal__summary">
            <div><dt>Offerte</dt><dd><FileCheck2 /> {detail.quote.quoteNumber}</dd></div>
            <div><dt>Opdrachtgever</dt><dd>{detail.quote.customer?.organizationName || "Niet ingevuld"}</dd></div>
            <div><dt>Status</dt><dd>Geaccepteerd</dd></div>
            <div><dt>Geaccepteerd op</dt><dd>{formatQuoteDateTime(detail.acceptedAt) || "Onbekend"}</dd></div>
          </dl>
          <div className="quote-send-modal__notice quote-complete-modal__notice">
            <ShieldCheck />
            <p>Het akkoord, de geaccepteerde offerte en het acceptatiebewijs blijven volledig bewaard. Alleen de administratieve status verandert.</p>
          </div>
        </div>

        <footer className="quote-send-modal__actions">
          <button type="button" className="quote-secondary-button" onClick={onCancel} disabled={completing}>
            Nog niet
          </button>
          <button
            type="button"
            className="quote-primary-button quote-complete-modal__confirm"
            onClick={onConfirm}
            disabled={completing}
          >
            <CheckCheck /> {completing ? "Offerte wordt afgehandeld..." : "Ja, offerte afhandelen"}
          </button>
        </footer>
      </section>
    </div>
  );
}
