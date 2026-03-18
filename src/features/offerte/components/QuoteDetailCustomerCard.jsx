import { formatAddress } from "../helpers/quoteFormatters.js";

export default function QuoteDetailCustomerCard({ quote }) {
    return (
        <section className="quote-detail-card">
            <h2>Klantgegevens</h2>

            <div className="quote-detail-grid">
                <div>
                    <label>Naam</label>
                    <p>{quote.customerName || "-"}</p>
                </div>

                <div>
                    <label>Bedrijf</label>
                    <p>{quote.company || "-"}</p>
                </div>

                <div>
                    <label>E-mailadres</label>
                    <p>{quote.email || "-"}</p>
                </div>

                <div>
                    <label>Telefoon</label>
                    <p>{quote.phone || "-"}</p>
                </div>

                <div className="quote-detail-col-span-2">
                    <label>Adres</label>
                    <p>
                        {formatAddress({
                            street: quote.street,
                            houseNumber: quote.houseNumber,
                            postalCode: quote.postalCode,
                            city: quote.city,
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
}