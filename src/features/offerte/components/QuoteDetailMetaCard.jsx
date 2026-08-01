import QuoteStatusBadge from "./QuoteStatusBadge.jsx";
import {
    formatDate,
    formatDateTime,
    formatMode,
} from "../helpers/quoteFormatters.js";
import { quoteStatusOptions } from "../helpers/quoteStatusLabels.js";

function availableStatusOptions(currentStatus) {
    if (currentStatus === "DRAFT") {
        return quoteStatusOptions.filter((option) =>
            option.value === "DRAFT" ||
            option.value === "SENDING" ||
            option.value === "CANCELLED"
        );
    }

    if (currentStatus === "SENDING") {
        return quoteStatusOptions.filter((option) =>
            option.value === "SENDING" ||
            option.value === "DRAFT" ||
            option.value === "CANCELLED"
        );
    }

    if (currentStatus === "SENT") {
        return quoteStatusOptions.filter((option) =>
            option.value === "SENT" ||
            option.value === "DRAFT" ||
            option.value === "ACCEPTED" ||
            option.value === "REJECTED" ||
            option.value === "CANCELLED"
        );
    }

    return quoteStatusOptions.filter(
        (option) => option.value === currentStatus
    );
}

export default function QuoteDetailMetaCard({
                                                quote,
                                                formState,
                                                onFieldChange,
                                                onSaveStatus,
                                                onSaveValidity,
                                                patchSaving,
                                                statusChanged
                                            }) {
    return (
        <section className="quote-detail-card">
            <h2>Offertegegevens</h2>

            <div className="quote-detail-grid">
                <div>
                    <label>Offertenummer</label>
                    <p>{quote.quoteNumber}</p>
                </div>

                <div>
                    <label>Datum aanvraag</label>
                    <p>{formatDateTime(quote.createdAt)}</p>
                </div>

                <div>
                    <label htmlFor="validUntil">Geldig tot</label>
                    {quote.status === "DRAFT" ? (
                        <>
                            <input
                                id="validUntil"
                                type="date"
                                value={formState.validUntil}
                                onChange={(e) =>
                                    onFieldChange("validUntil", e.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={onSaveValidity}
                                disabled={
                                    patchSaving ||
                                    formState.validUntil === quote.validUntil
                                }
                            >
                                Datum opslaan
                            </button>
                        </>
                    ) : (
                        <p>{formatDate(quote.validUntil)}</p>
                    )}
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
                        onChange={(e) => {
                            onFieldChange("status", e.target.value)
                        }}
                    >
                        {availableStatusOptions(quote.status)
                            .map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <div style={{ marginTop: "1rem" }}>
                        <button
                            type="button"
                            className="quote-inline-save-btn"
                            onClick={onSaveStatus}
                            disabled={patchSaving || !statusChanged}
                        >
                            {patchSaving ? "Status opslaan..." : "Status opslaan"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
