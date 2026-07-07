import { useState } from "react";
import invoiceService from "../service/invoiceService.js";
import "../styles/Invoices.css";

function AdminInvoicesPage() {
    const [lookupId, setLookupId] = useState("");
    const [invoice, setInvoice] = useState(null);
    const [status, setStatus] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const trimmedLookupId = lookupId.trim();

    const clearFeedback = () => {
        setMessage("");
        setError("");
    };

    const handleLookup = async (event) => {
        event.preventDefault();

        if (!trimmedLookupId) {
            setError("Vul een factuur-ID in.");
            return;
        }

        try {
            clearFeedback();
            setLoading(true);

            const [invoiceData, statusData] = await Promise.all([
                invoiceService.getById(trimmedLookupId),
                invoiceService.getStatus(trimmedLookupId),
            ]);

            setInvoice(invoiceData);
            setStatus(statusData);
        } catch (err) {
            setInvoice(null);
            setStatus(null);
            setError(getBackendMessage(err, "Factuur ophalen is mislukt."));
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setError("Kies eerst een factuurbestand.");
            return;
        }

        try {
            clearFeedback();
            setUploading(true);

            const formData = new FormData();
            formData.append("file", selectedFile);

            const createdInvoice = await invoiceService.create(formData);
            setInvoice(createdInvoice);
            setStatus(createdInvoice?.status ? { status: createdInvoice.status } : null);
            setMessage("Factuur is geupload.");

            const createdId = createdInvoice?.id ?? createdInvoice?.invoiceId;
            if (createdId) {
                setLookupId(String(createdId));
            }
        } catch (err) {
            setError(getBackendMessage(err, "Factuur uploaden is mislukt."));
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = async () => {
        const invoiceId = getInvoiceId(invoice) ?? trimmedLookupId;

        if (!invoiceId) {
            setError("Er is geen factuur-ID beschikbaar om te downloaden.");
            return;
        }

        try {
            clearFeedback();

            const pdfBlob = await invoiceService.downloadPdf(invoiceId);
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `factuur-${invoiceId}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(getBackendMessage(err, "PDF downloaden is mislukt."));
        }
    };

    return (
        <main className="invoices-page">
            <div className="invoices-page__container">
                <section className="invoices-page__header">
                    <div>
                        <h1>Facturen</h1>
                        <p>Upload een factuur, zoek een factuur op ID en download de PDF.</p>
                    </div>
                </section>

                {message ? (
                    <p className="invoices-message invoices-message--success">{message}</p>
                ) : null}

                {error ? (
                    <p className="invoices-message invoices-message--error">{error}</p>
                ) : null}

                <div className="invoices-page__grid">
                    <section className="invoices-card">
                        <h2>Factuur uploaden</h2>
                        <form className="invoices-form" onSubmit={handleUpload}>
                            <label htmlFor="invoice-file">Factuurbestand</label>
                            <input
                                id="invoice-file"
                                type="file"
                                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                            />

                            <button type="submit" className="button" disabled={uploading}>
                                {uploading ? "Uploaden..." : "Upload factuur"}
                            </button>
                        </form>
                    </section>

                    <section className="invoices-card">
                        <h2>Factuur zoeken</h2>
                        <form className="invoices-form" onSubmit={handleLookup}>
                            <label htmlFor="invoice-id">Factuur-ID</label>
                            <input
                                id="invoice-id"
                                type="text"
                                value={lookupId}
                                onChange={(event) => setLookupId(event.target.value)}
                                placeholder="Bijvoorbeeld 123"
                            />

                            <button type="submit" className="button" disabled={loading}>
                                {loading ? "Zoeken..." : "Zoek factuur"}
                            </button>
                        </form>
                    </section>
                </div>

                <section className="invoices-detail-card">
                    <div className="invoices-detail-card__header">
                        <div>
                            <h2>Factuurdetails</h2>
                            <p>De backend heeft geen lijst-endpoint, daarom zoeken we op factuur-ID.</p>
                        </div>

                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={handleDownload}
                            disabled={!invoice && !trimmedLookupId}
                        >
                            Download PDF
                        </button>
                    </div>

                    {invoice ? (
                        <dl className="invoices-detail-grid">
                            <InvoiceDetail label="ID" value={getInvoiceId(invoice)} />
                            <InvoiceDetail label="Status" value={formatStatus(status, invoice)} />
                            <InvoiceDetail label="Nummer" value={invoice.invoiceNumber ?? invoice.number} />
                            <InvoiceDetail label="Bedrijf" value={invoice.companyName ?? invoice.company} />
                            <InvoiceDetail label="Totaal" value={formatAmount(invoice.total ?? invoice.amount)} />
                            <InvoiceDetail label="Aangemaakt" value={formatDate(invoice.createdAt)} />
                        </dl>
                    ) : (
                        <p className="invoices-empty">Nog geen factuur geladen.</p>
                    )}
                </section>
            </div>
        </main>
    );
}

function InvoiceDetail({ label, value }) {
    return (
        <div>
            <dt>{label}</dt>
            <dd>{value || "-"}</dd>
        </div>
    );
}

function getInvoiceId(invoice) {
    return invoice?.id ?? invoice?.invoiceId ?? invoice?.uuid;
}

function formatStatus(status, invoice) {
    if (typeof status === "string") {
        return status;
    }

    return status?.status ?? status?.paymentStatus ?? invoice?.status;
}

function formatAmount(value) {
    if (value === null || value === undefined || value === "") {
        return "";
    }

    const number = Number(value);
    if (!Number.isFinite(number)) {
        return String(value);
    }

    return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
    }).format(number);
}

function formatDate(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleDateString("nl-NL");
}

function getBackendMessage(err, fallback) {
    return (
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        fallback
    );
}

export default AdminInvoicesPage;
