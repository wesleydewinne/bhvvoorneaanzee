import { Link } from "react-router-dom";
import QuoteStatusBadge from "./QuoteStatusBadge.jsx";
import QuoteAddressBlock from "./QuoteAddressBlock.jsx";
import { formatDateTime, formatMode } from "../helpers/quoteFormatters.js";

export default function QuoteTableRow({ quote }) {
    return (
        <tr>
            <td>{quote.id}</td>
            <td>{quote.quoteNumber || "-"}</td>
            <td>{formatDateTime(quote.createdAt)}</td>
            <td>{quote.company || "-"}</td>
            <td>{formatMode(quote.mode)}</td>
            <td>
                <QuoteAddressBlock
                    street={quote.street}
                    houseNumber={quote.houseNumber}
                    postalCode={quote.postalCode}
                    city={quote.city}
                />
            </td>
            <td>
                <QuoteStatusBadge status={quote.status} />
            </td>
            <td>
                <Link
                    className="quote-action-link"
                    to={`/admin/offertes/${quote.id}`}
                    aria-label={`Bekijk offerte ${quote.quoteNumber}`}
                    title="Bekijk offerte"
                >
                    👁
                </Link>
            </td>
        </tr>
    );
}