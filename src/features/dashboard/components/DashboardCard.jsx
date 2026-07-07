function DashboardCard({ card }) {
    return (
        <article className={`dashboard-card dashboard-card--${card.tone || "neutral"}`}>
            <div className="dashboard-card__top">
                {card.label && (
                    <span className="dashboard-card__label">
                        {card.label}
                    </span>
                )}
            </div>

            <div className="dashboard-card__content">
                <h2 className="dashboard-card__title">{card.title}</h2>

                <p className="dashboard-card__description">
                    {card.description}
                </p>

                {card.meta?.length > 0 && (
                    <ul className="dashboard-card__meta">
                        {card.meta.map((item, index) => (
                            <li key={index} className="dashboard-card__meta-item">
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="dashboard-card__actions">
                <button
                    type="button"
                    className="dashboard-card__button"
                    onClick={card.action}
                >
                    {card.actionLabel}
                    <span aria-hidden="true">-&gt;</span>
                </button>
            </div>
        </article>
    );
}

export default DashboardCard;
