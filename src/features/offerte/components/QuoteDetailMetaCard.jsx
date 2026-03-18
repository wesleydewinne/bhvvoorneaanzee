import QuoteStatusBadge from "./QuoteStatusBadge.jsx";
import {
    formatDate,
    formatDateTime,
    formatMode,
} from "../helpers/quoteFormatters.js";
import { quoteStatusOptions } from "../helpers/quoteStatusLabels.js";

export default function QuoteDetailMetaCard({ quote, formState, onFieldChange }) {
    return (
        <section className="quote-detail-card">
            <h2>Offertegegevens</h2>

            <div className="quote-detail-grid">
                <div>
                    <label>ID</label>
                    <p>{quote.id}</p>
                </div>

                <div>
                    <label>Offertenummer</label>
                    <p>{quote.quoteNumber}</p>
                </div>

                <div>
                    <label>Datum aanvraag</label>
                    <p>{formatDateTime(quote.createdAt)}</p>
                </div>

                <div>
                    <label>Geldig tot</label>
                    <p>{formatDate(quote.validUntil)}</p>
                </div>

                <div>
                    <label>Type aanvraag</label>
                    <p>{formatMode(quote.mode)}</p>
                </div>

                <div>
                    <label>Huidige status</label>
                    <div style={{ marginTop: "0.4rem" }}>
                        <QuoteStatusBadge status={quote.status} />
                    </div>
                </div>

                <div className="quote-detail-col-span-2">
                    <label htmlFor="status">Status aanpassen</label>
                    <select
                        id="status"
                        value={formState.status}
                        onChange={(e) => onFieldChange("status", e.target.value)}
                    >
                        {quoteStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
}