import { useState } from "react";
import { Eye, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import QuoteStatusBadge from "./QuoteStatusBadge.jsx";
import QuoteAddressBlock from "./QuoteAddressBlock.jsx";
import { formatDateTime, formatMode } from "../helpers/quoteFormatters.js";
import quoteService, { getQuotePdfErrorMessage } from "../services/quoteService.js";

export default function QuoteTableRow({ quote }) {
    const [openingPdf, setOpeningPdf] = useState(false);

    const handleOpenPdf = async () => {
        const pdfWindow = window.open("", "_blank");
        if (pdfWindow) pdfWindow.opener = null;
        setOpeningPdf(true);

        try {
            const response = await quoteService.downloadQuotePdf(quote.id);
            const pdfUrl = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );

            if (pdfWindow) {
                pdfWindow.location.href = pdfUrl;
                window.setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 60_000);
                return;
            }

            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = `offerte-${quote.quoteNumber || quote.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(pdfUrl);
        } catch (error) {
            pdfWindow?.close();
            window.alert(await getQuotePdfErrorMessage(
                error,
                "De offerte-PDF kon niet worden geopend."
            ));
        } finally {
            setOpeningPdf(false);
        }
    };

    return (
        <tr>
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
            <td><QuoteStatusBadge status={quote.status} /></td>
            <td>
                <div className="quote-action-buttons">
                    <Link
                        className="quote-action-link"
                        to={`/admin/offertes/${quote.id}`}
                        aria-label={`Bekijk offerte ${quote.quoteNumber || quote.id}`}
                        title="Bekijken"
                    >
                        <Eye aria-hidden="true" size={18} />
                        <span>Bekijken</span>
                    </Link>
                    <button
                        type="button"
                        className="quote-action-link"
                        onClick={handleOpenPdf}
                        disabled={openingPdf}
                        aria-label={`Open en print offerte ${quote.quoteNumber || quote.id}`}
                        title="PDF openen en printen"
                    >
                        <Printer aria-hidden="true" size={18} />
                        <span>{openingPdf ? "Openen..." : "Printen"}</span>
                    </button>
                </div>
            </td>
        </tr>
    );
}
