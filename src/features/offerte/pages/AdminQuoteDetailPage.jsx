import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Download, Save } from "lucide-react";
import QuotePdfForm from "../components/QuotePdfForm.jsx";
import quoteService from "../services/quoteService.js";
import { downloadBlob } from "../helpers/quoteHelpers.js";
import "../styles/Offerte.css";

export default function AdminQuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

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
          <p className="quote-eyebrow">{detail.status}</p>
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
        </div>
      </header>
      {error && <p className="quote-alert quote-alert--error">{error}</p>}
      <QuotePdfForm
        initialValue={detail.quote}
        onSave={save}
        submitLabel="Wijzigingen opslaan"
        icon={<Save />}
      />
    </main>
  );
}
