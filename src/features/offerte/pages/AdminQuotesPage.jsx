import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, FilePlus2, RefreshCw, Search, Send, X } from "lucide-react";
import quoteService from "../services/quoteService.js";
import { formatCurrency } from "../helpers/quoteHelpers.js";
import { quoteStatusGroup, quoteStatusLabel } from "../helpers/quoteStatus.js";
import "../styles/Offerte.css";

const FILTERS = [
  ["all", "Alle offertes"], ["concept", "Concepten"],
  ["sent", "Verzonden"], ["accepted", "Geaccepteerd"],
  ["closed", "Afgehandeld"],
];

export default function AdminQuotesPage() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => {
    setLoading(true); setError("");
    try { setQuotes(await quoteService.getAllQuotes()); }
    catch (reason) { setError(reason.message || "Offertes konden niet worden geladen."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const counts = useMemo(() => quotes.reduce((result, quote) => {
    const statusGroup = quoteStatusGroup(quote.status);
    if (statusGroup !== "closed") result.all += 1;
    result[statusGroup] += 1;
    return result;
  }, { all: 0, concept: 0, sent: 0, accepted: 0, closed: 0 }), [quotes]);
  const quotesInSelectedFilter = filter === "all"
    ? quotes.filter((quote) => quoteStatusGroup(quote.status) !== "closed")
    : quotes.filter((quote) => quoteStatusGroup(quote.status) === filter);
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase("nl-NL");
  const visibleQuotes = normalizedSearchTerm
    ? quotesInSelectedFilter.filter((quote) => [
        quote.quoteNumber,
        quote.customerOrganization,
        quote.customerContactName,
        quote.customerEmail,
        quoteStatusLabel(quote.status),
      ].some((value) => String(value || "").toLocaleLowerCase("nl-NL")
        .includes(normalizedSearchTerm)))
    : quotesInSelectedFilter;

  return (
    <main className="quote-admin-page">
      <header className="quote-page-header">
        <div><p className="quote-eyebrow">Sales</p><h1>Offertes</h1>
          <p>Volg ieder voorstel van concept tot definitieve afhandeling.</p></div>
        <div className="quote-header-actions">
          <button className="quote-secondary-button" onClick={load}><RefreshCw />Verversen</button>
          <Link className="quote-primary-button" to="/admin/offertes/new"><FilePlus2 />Nieuwe offerte</Link>
        </div>
      </header>
      {error && <p className="quote-alert quote-alert--error">{error}</p>}
      <section className="quote-stats quote-stats--three">
        <article><FilePlus2 /><strong>{counts.concept}</strong><span>Concepten</span></article>
        <article><Send /><strong>{counts.sent}</strong><span>Verzonden</span></article>
        <article><CheckCircle2 /><strong>{counts.accepted}</strong><span>Geaccepteerd</span></article>
      </section>
      <nav className="quote-filter-tabs" aria-label="Offertes filteren">
        {FILTERS.map(([value, label]) => <button type="button" key={value}
          className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>
          {label}<span>{counts[value]}</span></button>)}
      </nav>
      <section className="quote-panel">
        <header className="quote-list-header">
          <div><h2>{FILTERS.find(([value]) => value === filter)?.[1]}</h2>
            <span>{visibleQuotes.length}</span></div>
          <label className="quote-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Offertes zoeken</span>
            <input type="search" value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Zoek op nummer, klant, contactpersoon of e-mail"
              aria-label="Offertes zoeken" />
            {searchTerm && <button type="button" onClick={() => setSearchTerm("")}
              aria-label="Zoekopdracht wissen"><X /></button>}
          </label>
        </header>
        {loading ? <p>Laden...</p> : <div className="quote-table-wrap">
          <table><thead><tr><th>Nummer</th><th>Klant</th><th>Datum</th><th>Totaal</th><th>Status</th></tr></thead>
            <tbody>{visibleQuotes.map((quote) => <tr key={quote.id}
              onClick={() => navigate(`/admin/offertes/${quote.id}`)} tabIndex="0">
              <td><strong>{quote.quoteNumber}</strong></td>
              <td>{quote.customerOrganization || quote.customerContactName}</td><td>{quote.quoteDate}</td>
              <td>{formatCurrency(quote.totalIncludingVat)}</td><td><span
                className={`quote-status quote-status--${quoteStatusGroup(quote.status)}`}>
                {quoteStatusLabel(quote.status)}</span></td></tr>)}</tbody></table>
          {!visibleQuotes.length && <p className="quote-empty">
            {normalizedSearchTerm
              ? "Geen offertes gevonden voor deze zoekopdracht binnen dit onderdeel."
              : "In dit onderdeel staan nog geen offertes."}
          </p>}
        </div>}
      </section>
    </main>
  );
}
