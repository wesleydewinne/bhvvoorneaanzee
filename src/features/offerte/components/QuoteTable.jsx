import QuoteTableRow from "./QuoteTableRow.jsx";

export default function QuoteTable({ quotes }) {
    if (!quotes.length) {
        return (
            <div className="quote-empty-state">
                <p>Geen offertes gevonden.</p>
            </div>
        );
    }

    return (
        <div className="quote-table-wrapper">
            <table className="quote-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Offertenummer</th>
                    <th>Datum aanvraag</th>
                    <th>Adres</th>
                    <th>Status</th>
                    <th>Actie</th>
                </tr>
                </thead>
                <tbody>
                {quotes.map((quote) => (
                    <QuoteTableRow key={quote.id} quote={quote} />
                ))}
                </tbody>
            </table>
        </div>
    );
}