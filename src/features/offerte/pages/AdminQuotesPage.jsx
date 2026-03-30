import { useMemo, useState } from "react";
import useQuotes from "../hooks/useQuotes.js";
import QuoteTable from "../components/QuoteTable.jsx";
import { quoteFilterTabs } from "../helpers/quoteFilters.js";
import "../styles/AdminQuotesPage.css";

function normalizeValue(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value).toLowerCase().trim();
}

function quoteMatchesSearch(quote, searchTerm) {
    const normalizedSearch = normalizeValue(searchTerm);

    if (!normalizedSearch) {
        return true;
    }

    const searchableFields = [
        quote.quoteNumber,
        quote.company,
        quote.street,
        quote.houseNumber,
        quote.postalCode,
        quote.city,
    ];

    return searchableFields.some((field) =>
        normalizeValue(field).includes(normalizedSearch)
    );
}

export default function AdminQuotesPage() {
    const { quotes, loading, error, filter, setFilter, refresh } = useQuotes("open");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredQuotes = useMemo(() => {
        return quotes.filter((quote) => quoteMatchesSearch(quote, searchTerm));
    }, [quotes, searchTerm]);

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

            <div className="quote-toolbar">
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

                <div className="quote-search-box">
                    <input
                        type="text"
                        className="quote-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Zoek op offertenummer, bedrijf of adres"
                    />
                </div>
            </div>

            {loading && <div className="quote-feedback">Offertes laden...</div>}
            {error && <div className="quote-feedback quote-feedback-error">{error}</div>}

            {!loading && !error && <QuoteTable quotes={filteredQuotes} />}
        </div>
    );
}