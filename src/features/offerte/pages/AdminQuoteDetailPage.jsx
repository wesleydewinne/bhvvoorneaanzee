import { useNavigate, useParams } from "react-router-dom";
import QuoteDetailMetaCard from "../components/QuoteDetailMetaCard.jsx";
import QuoteDetailCustomerCard from "../components/QuoteDetailCustomerCard.jsx";
import QuoteDetailPricingCard from "../components/QuoteDetailPricingCard.jsx";
import QuoteDetailTrainingCard from "../components/QuoteDetailTrainingCard.jsx";
import QuoteDetailNotesCard from "../components/QuoteDetailNotesCard.jsx";
import QuoteDetailActions from "../components/QuoteDetailActions.jsx";
import useQuoteDetail from "../hooks/useQuoteDetail.js";
import "../styles/AdminQuoteDetailPage.css";

export default function AdminQuoteDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        quote,
        formState,
        loading,
        saving,
        archiving,
        error,
        successMessage,
        updateField,
        saveQuote,
        archiveQuote,
    } = useQuoteDetail(id);

    const handleArchive = async () => {
        const confirmed = window.confirm(
            "Weet je zeker dat je deze offerte wilt archiveren?"
        );

        if (!confirmed) return;

        await archiveQuote();
        navigate("/dashboard/offertes");
    };

    if (loading) {
        return <div className="quote-detail-page">Offertedetail laden...</div>;
    }

    if (error && !quote) {
        return <div className="quote-detail-page quote-feedback quote-feedback-error">{error}</div>;
    }

    if (!quote || !formState) {
        return <div className="quote-detail-page">Offerte niet gevonden.</div>;
    }

    return (
        <div className="quote-detail-page">
            <div className="quote-detail-header">
                <div>
                    <h1>Offerte {quote.quoteNumber}</h1>
                    <p>Beheer en werk de offerte verder af.</p>
                </div>

                <button
                    type="button"
                    className="quote-back-btn"
                    onClick={() => navigate("/admin/offertes")}
                >
                    Terug naar overzicht
                </button>
            </div>

            {error && <div className="quote-feedback quote-feedback-error">{error}</div>}
            {successMessage && <div className="quote-feedback quote-feedback-success">{successMessage}</div>}

            <div className="quote-detail-layout">
                <QuoteDetailMetaCard
                    quote={quote}
                    formState={formState}
                    onFieldChange={updateField}
                />

                <QuoteDetailCustomerCard quote={quote} />

                <QuoteDetailPricingCard
                    quote={quote}
                    formState={formState}
                    onFieldChange={updateField}
                />

                <QuoteDetailNotesCard
                    formState={formState}
                    onFieldChange={updateField}
                />

                <QuoteDetailTrainingCard trainings={quote.trainings} />
            </div>

            <QuoteDetailActions
                saving={saving}
                archiving={archiving}
                onSave={saveQuote}
                onArchive={handleArchive}
            />
        </div>
    );
}