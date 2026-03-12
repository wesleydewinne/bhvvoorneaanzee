export default function EvaluationMetricCards({ cards = [] }) {
    return (
        <section
            className="evaluation-metric-cards"
            aria-labelledby="evaluation-metric-cards-title"
        >
            <h2 id="evaluation-metric-cards-title">Kerncijfers</h2>

            {cards.length === 0 ? (
                <p>Geen kerncijfers beschikbaar.</p>
            ) : (
                <div className="evaluation-metric-cards__grid">
                    {cards.map((card) => (
                        <article key={card.key} className="evaluation-metric-card">
                            <h3 className="evaluation-metric-card__label">{card.label}</h3>
                            <p className="evaluation-metric-card__value">{card.value ?? "-"}</p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}