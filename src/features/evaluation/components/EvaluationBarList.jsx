export default function EvaluationBarList({ items = [] }) {
    return (
        <section
            className="evaluation-bar-list"
            aria-labelledby="evaluation-bar-list-title"
        >
            <h2 id="evaluation-bar-list-title">Scores per onderdeel</h2>

            {items.length === 0 ? (
                <p>Geen scores beschikbaar.</p>
            ) : (
                <ul className="evaluation-bar-list__items">
                    {items.map((item) => {
                        const value = typeof item.value === "number" ? item.value : null;
                        const widthPercentage = value !== null ? `${(value / 5) * 100}%` : "0%";

                        return (
                            <li key={item.key}>
                                <article className="evaluation-bar-item">
                                    <div className="evaluation-bar-item__top">
                                        <h3 className="evaluation-bar-item__label">{item.label}</h3>
                                        <p className="evaluation-bar-item__value">
                                            {value !== null ? value.toFixed(1) : "-"}
                                        </p>
                                    </div>

                                    <div className="evaluation-bar-item__track" aria-hidden="true">
                                        <div
                                            className="evaluation-bar-item__fill"
                                            style={{ width: widthPercentage }}
                                        />
                                    </div>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}