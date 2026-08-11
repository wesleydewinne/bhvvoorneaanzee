import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FilePlus2, RefreshCw } from "lucide-react";
import quoteService from "../services/quoteService.js";
import { formatCurrency } from "../helpers/quoteHelpers.js";
import "../styles/Offerte.css";

export default function AdminQuotesPage() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setQuotes(await quoteService.getAllQuotes());
    } catch (reason) {
      setError(reason.message || "Offertes konden niet worden geladen.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let active = true;
    quoteService
      .getAllQuotes()
      .then((quoteValues) => {
        if (!active) return;
        setQuotes(quoteValues);
      })
      .catch((reason) => {
        if (active)
          setError(reason.message || "Offertes konden niet worden geladen.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <main className="quote-admin-page">
      <header className="quote-page-header">
        <div>
          <p className="quote-eyebrow">Sales</p>
          <h1>Offertes</h1>
          <p>
            Websiteaanvragen worden direct als berekend concept in deze lijst
            opgeslagen.
          </p>
        </div>
        <div className="quote-header-actions">
          <button className="quote-secondary-button" onClick={load}>
            <RefreshCw />
            Verversen
          </button>
          <Link className="quote-primary-button" to="/admin/offertes/new">
            <FilePlus2 />
            Nieuwe offerte
          </Link>
        </div>
      </header>
      {error && <p className="quote-alert quote-alert--error">{error}</p>}
      <section className="quote-stats">
        <article>
          <FilePlus2 />
          <strong>{quotes.length}</strong>
          <span>Opgeslagen offertes</span>
        </article>
      </section>
      <section className="quote-panel">
        <header>
          <h2>Opgeslagen offertes</h2>
          <span>{quotes.length}</span>
        </header>
        {loading ? (
          <p>Laden...</p>
        ) : (
          <div className="quote-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nummer</th>
                  <th>Klant</th>
                  <th>Datum</th>
                  <th>Totaal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    onClick={() => navigate(`/admin/offertes/${quote.id}`)}
                    tabIndex="0"
                  >
                    <td>
                      <strong>{quote.quoteNumber}</strong>
                    </td>
                    <td>
                      {quote.customerOrganization || quote.customerContactName}
                    </td>
                    <td>{quote.quoteDate}</td>
                    <td>{formatCurrency(quote.totalIncludingVat)}</td>
                    <td>
                      <span className="quote-status">{quote.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!quotes.length && (
              <p className="quote-empty">
                Er zijn nog geen offertes opgeslagen.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
