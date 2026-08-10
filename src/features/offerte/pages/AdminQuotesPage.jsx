import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FilePlus2, Inbox, RefreshCw } from "lucide-react";
import quoteService from "../services/quoteService.js";
import { formatCurrency } from "../helpers/quoteHelpers.js";
import "../styles/Offerte.css";

export default function AdminQuotesPage() {
    const navigate = useNavigate();
    const [quotes, setQuotes] = useState([]); const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); const [error, setError] = useState("");
    const load = async () => { setLoading(true); setError(""); try { const [q,r] = await Promise.all([quoteService.getAllQuotes(), quoteService.getRequests()]); setQuotes(q); setRequests(r); } catch (reason) { setError(reason.message || "Offertes konden niet worden geladen."); } finally { setLoading(false); } };
    useEffect(() => { load(); }, []);
    return <main className="quote-admin-page">
        <header className="quote-page-header"><div><p className="quote-eyebrow">Sales</p><h1>Offertes en aanvragen</h1><p>Behandel openbare aanvragen en beheer opgeslagen offertes.</p></div><div className="quote-header-actions"><button className="quote-secondary-button" onClick={load}><RefreshCw />Verversen</button><Link className="quote-primary-button" to="/admin/offertes/new"><FilePlus2 />Nieuwe offerte</Link></div></header>
        {error && <p className="quote-alert quote-alert--error">{error}</p>}
        <section className="quote-stats"><article><Inbox/><strong>{requests.filter((r)=>r.status === "NEW").length}</strong><span>Nieuwe aanvragen</span></article><article><FilePlus2/><strong>{quotes.length}</strong><span>Opgeslagen offertes</span></article></section>
        <section className="quote-panel"><header><h2>Offerteaanvragen</h2><span>{requests.length}</span></header>{loading ? <p>Laden...</p> : <div className="quote-table-wrap"><table><thead><tr><th>Ontvangen</th><th>Organisatie/contact</th><th>Trainingen</th><th>Status</th><th></th></tr></thead><tbody>{requests.map((request)=><tr key={request.id}><td>{new Date(request.receivedAt).toLocaleDateString("nl-NL")}</td><td><strong>{request.organizationName || request.contactName}</strong><small>{request.email}</small></td><td>{request.trainingCodes.join(", ")}</td><td><span className="quote-status">{request.status}</span></td><td><button className="quote-link-button" onClick={()=>navigate("/admin/offertes/new", {state:{request}})}>Offerte maken</button></td></tr>)}</tbody></table>{!requests.length && <p className="quote-empty">Er zijn nog geen aanvragen.</p>}</div>}</section>
        <section className="quote-panel"><header><h2>Opgeslagen offertes</h2><span>{quotes.length}</span></header>{loading ? <p>Laden...</p> : <div className="quote-table-wrap"><table><thead><tr><th>Nummer</th><th>Klant</th><th>Datum</th><th>Totaal</th><th>Status</th></tr></thead><tbody>{quotes.map((quote)=><tr key={quote.id} onClick={()=>navigate(`/admin/offertes/${quote.id}`)} tabIndex="0"><td><strong>{quote.quoteNumber}</strong></td><td>{quote.customerOrganization || quote.customerContactName}</td><td>{quote.quoteDate}</td><td>{formatCurrency(quote.totalIncludingVat)}</td><td><span className="quote-status">{quote.status}</span></td></tr>)}</tbody></table>{!quotes.length && <p className="quote-empty">Er zijn nog geen offertes opgeslagen.</p>}</div>}</section>
    </main>;
}
