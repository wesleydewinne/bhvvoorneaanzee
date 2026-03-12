function DashboardCard({ card }) {
    return (
        <article className="dashboard-card">
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
                </button>
            </div>
        </article>
    );
}

export default DashboardCard;