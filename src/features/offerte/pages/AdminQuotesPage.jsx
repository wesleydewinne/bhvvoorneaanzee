import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, FilePlus2, RefreshCw, Search, Send, X } from "lucide-react";
import quoteService from "../services/quoteService.js";
import { formatCurrency } from "../helpers/quoteHelpers.js";
import { quoteStatusGroup, quoteStatusLabel } from "../helpers/quoteStatus.js";
import "../styles/Offerte.css";

const FILTERS = [
  ["sent", "Verzonden"], ["concept", "Concepten"],
  ["active", "Openstaand"], ["accepted", "Geaccepteerd"],
  ["closed", "Afgehandeld"], ["all", "Alle offertes"],
];

export default function AdminQuotesPage() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState("sent");
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
    result.all += 1;
    if (statusGroup !== "closed") result.active += 1;
    result[statusGroup] += 1;
    return result;
  }, { all: 0, active: 0, concept: 0, sent: 0, accepted: 0, closed: 0 }), [quotes]);
  const quotesInSelectedFilter = filter === "all"
    ? quotes
    : filter === "active"
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
  const isSentOverview = filter === "sent";

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
          <table><thead>{isSentOverview
            ? <tr><th>Offertenummer</th><th>Klant</th><th>Verzonden op</th><th>Geldig tot</th><th>Resterend</th><th>Herinnering</th></tr>
            : <tr><th>Nummer</th><th>Klant</th><th>Datum</th><th>Totaal</th><th>Status</th></tr>}
          </thead>
            <tbody>{visibleQuotes.map((quote) => <tr key={quote.id}
              onClick={() => navigate(`/admin/offertes/${quote.id}`)} tabIndex="0">
              <td><strong>{quote.quoteNumber}</strong></td>
              <td>{quote.customerOrganization || quote.customerContactName}</td>
              {isSentOverview ? <>
                <td>{formatDateTime(quote.sentAt)}</td>
                <td>{formatDate(quote.validUntil)}</td>
                <td><RemainingDays validUntil={quote.validUntil} /></td>
                <td>{quote.expiryReminderSentAt
                  ? <><span className="quote-reminder-status quote-reminder-status--sent">Verstuurd</span>
                    <small>{formatDateTime(quote.expiryReminderSentAt)}</small></>
                  : <span className="quote-reminder-status">Nog niet verstuurd</span>}</td>
              </> : <>
                <td>{formatDate(quote.quoteDate)}</td>
                <td>{formatCurrency(quote.totalIncludingVat)}</td><td><span
                  className={`quote-status quote-status--${quoteStatusGroup(quote.status)}`}>
                  {quoteStatusLabel(quote.status)}</span></td>
              </>}</tr>)}</tbody></table>
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

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("nl-NL").format(date);
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "short", timeStyle: "short",
  }).format(date);
}

function RemainingDays({ validUntil }) {
  if (!validUntil) return "—";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(`${validUntil}T00:00:00`);
  const days = Math.ceil((endDate - today) / 86400000);
  if (Number.isNaN(days)) return "—";
  return <span className={days <= 7 ? "quote-days quote-days--urgent" : "quote-days"}>
    {days === 0 ? "Vandaag" : `${days} ${days === 1 ? "dag" : "dagen"}`}
  </span>;
}
