import { formatCurrency } from "../helpers/quoteFormatters.js";

export default function QuoteDetailTrainingCard({ trainings }) {
    return (
        <section className="quote-detail-card">
            <h2>Trainingen</h2>

            {!trainings?.length ? (
                <p>Geen trainingen gevonden.</p>
            ) : (
                <div className="quote-training-list">
                    {trainings.map((training) => (
                        <article key={training.id} className="quote-training-item">
                            <h3>{training.trainingType}</h3>

                            <div className="quote-detail-grid">
                                <div>
                                    <label>Aantal deelnemers</label>
                                    <p>{training.participantCount ?? "-"}</p>
                                </div>

                                <div>
                                    <label>Op locatie</label>
                                    <p>{training.onSite ? "Ja" : "Nee"}</p>
                                </div>

                                <div>
                                    <label>Aantal groepen</label>
                                    <p>{training.numberOfGroups}</p>
                                </div>

                                <div>
                                    <label>Groepsverdeling</label>
                                    <p>{training.groupDistribution || "-"}</p>
                                </div>

                                <div>
                                    <label>Prijs per persoon</label>
                                    <p>{formatCurrency(training.pricePerPerson)}</p>
                                </div>

                                <div>
                                    <label>Totaalprijs</label>
                                    <p>{formatCurrency(training.totalPrice)}</p>
                                </div>

                                <div>
                                    <label>Korting</label>
                                    <p>{formatCurrency(training.discountAmount)}</p>
                                </div>

                                <div>
                                    <label>Totaal na korting</label>
                                    <p>{formatCurrency(training.totalPriceAfterDiscount)}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}