import { useEffect, useState } from "react";
import { Ban, X } from "lucide-react";

export default function RejectQuoteModal({ quoteNumber, submitting, onCancel, onConfirm }) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    document.body.classList.add("quote-modal-open");
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !submitting) onCancel();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("quote-modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onCancel, submitting]);

  return (
    <div className="quote-send-modal__backdrop" role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && !submitting && onCancel()}>
      <section className="quote-send-modal quote-reject-modal" role="dialog"
        aria-modal="true" aria-labelledby="reject-quote-title">
        <header className="quote-send-modal__header">
          <span className="quote-send-modal__icon"><Ban aria-hidden="true" /></span>
          <div><p>Offerte afwijzen</p><h2 id="reject-quote-title">Wilt u deze offerte afwijzen?</h2></div>
          <button type="button" className="quote-send-modal__close" onClick={onCancel}
            disabled={submitting} aria-label="Venster sluiten"><X /></button>
        </header>
        <div className="quote-send-modal__body">
          <p>
            Offerte <strong>{quoteNumber}</strong> wordt definitief als afgewezen geregistreerd
            en kan daarna niet meer via deze link worden geaccepteerd.
          </p>
          <label className="quote-reject-modal__reason">
            Reden voor afwijzing <span>(optioneel)</span>
            <textarea maxLength={1000} rows={4} value={reason} autoFocus
              onChange={(event) => setReason(event.target.value)}
              placeholder="U kunt eventueel kort aangeven waarom u de offerte afwijst." />
            <small>{reason.length}/1000 tekens</small>
          </label>
        </div>
        <footer className="quote-send-modal__actions">
          <button type="button" className="quote-secondary-button" onClick={onCancel}
            disabled={submitting}>Terug</button>
          <button type="button" className="quote-primary-button quote-reject-modal__confirm"
            onClick={() => onConfirm(reason.trim())} disabled={submitting}>
            {submitting ? "Afwijzing verwerken..." : "Offerte definitief afwijzen"}
          </button>
        </footer>
      </section>
    </div>
  );
}
