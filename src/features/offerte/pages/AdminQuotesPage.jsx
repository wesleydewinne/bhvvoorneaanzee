import useQuotes from "../hooks/useQuotes.js";
import QuoteTable from "../components/QuoteTable.jsx";
import { quoteFilterTabs } from "../helpers/quoteFilters.js";
import "../styles/AdminQuotesPage.css";

export default function AdminQuotesPage() {
    const { quotes, loading, error, filter, setFilter, refresh } = useQuotes("open");

    return (
        <div className="admin-quotes-page">
            <div className="admin-quotes-header">
                <div>
                    <h1>Offertes</h1>
                    <p>Overzicht van openstaande, gearchiveerde en alle offertes.</p>
                </div>

                <button type="button" className="quote-page-refresh-btn" onClick={refresh}>
                    Vernieuwen
                </button>
            </div>

            <div className="quote-filter-tabs">
                {quoteFilterTabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        className={`quote-filter-tab ${filter === tab.key ? "active" : ""}`}
                        onClick={() => setFilter(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {loading && <div className="quote-feedback">Offertes laden...</div>}
            {error && <div className="quote-feedback quote-feedback-error">{error}</div>}

            {!loading && !error && <QuoteTable quotes={quotes} />}
        </div>
    );
}