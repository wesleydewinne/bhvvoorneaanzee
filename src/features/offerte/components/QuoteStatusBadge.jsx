import { formatQuoteStatus } from "../helpers/quoteFormatters.js";

export default function QuoteStatusBadge({ status }) {
    return (
        <span className={`quote-status-badge quote-status-${(status || "").toLowerCase()}`}>
            {formatQuoteStatus(status)}
        </span>
    );
}