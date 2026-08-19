import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Download, Mail, Save } from "lucide-react";
import QuotePdfForm from "../components/QuotePdfForm.jsx";
import SendQuoteModal from "../components/SendQuoteModal.jsx";
import quoteService from "../services/quoteService.js";
import { downloadBlob } from "../helpers/quoteHelpers.js";
import { formatQuoteDateTime, quoteStatusLabel } from "../helpers/quoteStatus.js";
import "../styles/Offerte.css";

export default function AdminQuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const handleQuoteChange = useCallback((quote) => setCurrentQuote(quote), []);

  useEffect(() => {
    quoteService
      .getQuote(id)
      .then(setDetail)
      .catch((reason) => setError(reason.message));
  }, [id]);
  const save = async (payload) =>
    setDetail(await quoteService.update(id, payload));
  const download = async () => {
    setDownloading(true);
    try {
      const result = await quoteService.downloadPdf(
        id,
        detail.quote.quoteNumber,
      );
      downloadBlob(result.blob, result.fileName);
    } catch (reason) {
      setError(reason.message);
    } finally {
      setDownloading(false);
    }
  };
  const send = async () => {
    setSending(true);
    setError("");
    try {
      if (detail.status === "DRAFT") {
        if (currentQuote) await quoteService.update(id, currentQuote);
        await quoteService.updateStatus(id, "SENDING");
      }
      await quoteService.sendQuote(id);
      setDetail(await quoteService.getQuote(id));
      setShowSendModal(false);
    } catch (reason) {
      setError(reason.message || "De offerte kon niet worden verzonden.");
      setDetail(await quoteService.getQuote(id));
    } finally {
      setSending(false);
    }
  };
  if (error && !detail)
    return (
      <main className="quote-admin-page">
        <p className="quote-alert quote-alert--error">{error}</p>
        <button onClick={() => navigate("/admin/offertes")}>Terug</button>
      </main>
    );
  if (!detail)
    return (
      <main className="quote-admin-page">
        <p>Offerte laden...</p>
      </main>
    );
  return (
    <main className="quote-admin-page">
      <header className="quote-page-header">
        <div>
          <p className="quote-eyebrow">{quoteStatusLabel(detail.status)}</p>
          <h1>{detail.quote.quoteNumber}</h1>
          <p>Laatst gewijzigd door {detail.updatedBy || detail.createdBy}.</p>
        </div>
        <div className="quote-header-actions">
          <Link className="quote-secondary-button" to="/admin/offertes">
            Terug
          </Link>
          <button
            className="quote-primary-button"
            onClick={download}
            disabled={downloading}
          >
            <Download />
            {downloading ? "Maken..." : "PDF downloaden"}
          </button>
          {["DRAFT", "SENDING"].includes(detail.status) && (
            <button className="quote-primary-button" onClick={() => setShowSendModal(true)} disabled={sending}>
              <Mail /> {sending ? "Versturen..." : "Offerte versturen"}
            </button>
          )}
        </div>
      </header>
      {error && <p className="quote-alert quote-alert--error">{error}</p>}
      <section className="quote-lifecycle" aria-label="Status en geschiedenis">
        <div><span>Status</span><strong>{quoteStatusLabel(detail.status)}</strong></div>
        <div><span>Aangemaakt</span><strong>{formatQuoteDateTime(detail.createdAt) || "Onbekend"}</strong></div>
        <div><span>Laatst gewijzigd</span><strong>{formatQuoteDateTime(detail.updatedAt) || "Onbekend"}</strong></div>
        {detail.sentAt && <div><span>Verzonden</span><strong>{formatQuoteDateTime(detail.sentAt)}</strong></div>}
        {detail.acceptedAt && <div><span>Geaccepteerd</span><strong>{formatQuoteDateTime(detail.acceptedAt)}</strong></div>}
        {detail.rejectedAt && <div><span>Afgewezen</span><strong>{formatQuoteDateTime(detail.rejectedAt)}</strong></div>}
        {detail.cancelledAt && <div><span>Geannuleerd</span><strong>{formatQuoteDateTime(detail.cancelledAt)}</strong></div>}
      </section>
      <QuotePdfForm
        initialValue={detail.quote}
        onSave={save}
        onValueChange={handleQuoteChange}
        submitLabel="Wijzigingen opslaan"
        icon={<Save />}
        readOnly={detail.status !== "DRAFT"}
      />
      {showSendModal && (
        <SendQuoteModal
          quote={currentQuote || detail.quote}
          sending={sending}
          onCancel={() => setShowSendModal(false)}
          onConfirm={send}
        />
      )}
    </main>
  );
}
