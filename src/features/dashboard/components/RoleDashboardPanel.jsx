function RoleDashboardPanel({
    title,
    overview,
    loading,
    error,
    eyebrow = "Roloverzicht",
    loadingText = "Rolgegevens laden...",
    emptyText = "Dit roloverzicht is voorbereid. Zodra de backend data teruggeeft, verschijnen de onderdelen hier automatisch.",
}) {
    const sections = overview?.sections ?? [];

    return (
        <section className="dashboard-role-panel" aria-labelledby="role-dashboard-title">
            <div className="dashboard__section-heading">
                <p className="dashboard__eyebrow">{eyebrow}</p>
                <h2 id="role-dashboard-title">{title}</h2>
            </div>

            {loading && (
                <p className="dashboard__state">{loadingText}</p>
            )}

            {error && (
                <p className="dashboard__overview-note">{error}</p>
            )}

            {!loading && sections.length > 0 && (
                <div className="dashboard-role-panel__grid">
                    {sections.map((section, index) => (
                        <article
                            key={section.key ?? section.title ?? index}
                            className="dashboard-list-card"
                        >
                            <div className="dashboard-list-card__header">
                                <h3>{section.title ?? "Overzicht"}</h3>
                                <span>{getSectionCount(section)}</span>
                            </div>

                            {Array.isArray(section.items) && section.items.length > 0 ? (
                                <ul className="dashboard-list-card__list">
                                    {section.items.slice(0, 3).map((item, itemIndex) => (
                                        <li key={item.id ?? item.key ?? itemIndex}>
                                            <span>{item.title ?? item.name ?? "Item"}</span>
                                            <small>{item.description ?? item.status ?? "Details volgen"}</small>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="dashboard-list-card__empty">
                                    {section.emptyText ?? "Er zijn nog geen items beschikbaar."}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            )}

            {!loading && !error && sections.length === 0 && (
                <p className="dashboard__state">
                    {emptyText}
                </p>
            )}
        </section>
    );
}

function getSectionCount(section) {
    if (Number.isFinite(section.count)) {
        return section.count;
    }

    if (Array.isArray(section.items)) {
        return section.items.length;
    }

    return 0;
}

export default RoleDashboardPanel;
