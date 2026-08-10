import { Link, useLocation, useNavigate } from "react-router-dom";
import QuotePdfForm from "../components/QuotePdfForm.jsx";
import { createInitialQuote } from "../helpers/quoteHelpers.js";
import quoteService from "../services/quoteService.js";
import "../styles/Offerte.css";

export default function AdminCreateQuotePage() {
    const navigate = useNavigate();
    const request = useLocation().state?.request;
    const initial = createInitialQuote();
    if (request) {
        initial.customer.organizationName = request.organizationName || "";
        initial.customer.contactPersonName = request.contactName || "";
        initial.customer.contactEmail = request.email || "";
        initial.customer.contactPhone = request.phone || "";
        initial.trainingLocation.locationName = request.preferredLocation || "";
        initial.requestSummary = request.message || "Offerteaanvraag ontvangen via de website.";
    }
    const save = async (payload) => {
        const created = await quoteService.create(payload);
        if (request) await quoteService.updateRequestStatus(request.id, "CONVERTED");
        navigate(`/admin/offertes/${created.id}`);
    };
    return <main className="quote-admin-page"><header className="quote-page-header"><div><p className="quote-eyebrow">Offertebeheer</p><h1>Nieuwe offerte</h1><p>Stel de offerte samen en sla alle gegevens centraal op.</p></div><Link to="/admin/offertes" className="quote-secondary-button">Terug</Link></header><QuotePdfForm initialValue={initial} onSave={save} /></main>;
}
