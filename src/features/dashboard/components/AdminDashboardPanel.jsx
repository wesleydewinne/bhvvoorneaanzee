function AdminDashboardPanel({ overview, loading, error }) {
    const upcomingTrainings = overview?.upcomingTrainings ?? [];
    const openQuotes = overview?.openQuotes ?? [];
    const openContactMessages = overview?.openContactMessages ?? [];

    return (
        <section className="dashboard-role-panel" aria-labelledby="admin-dashboard-title">
            <div className="dashboard__section-heading">
                <p className="dashboard__eyebrow">Beheer</p>
                <h2 id="admin-dashboard-title">Vandaag opvolgen</h2>
            </div>

            {loading && (
                <p className="dashboard__state">Beheergegevens laden...</p>
            )}

            {error && (
                <p className="dashboard__overview-note">{error}</p>
            )}

            {!loading && (
                <div className="dashboard-role-panel__grid">
                    <AdminListCard
                        title="Geplande trainingen"
                        count={overview?.upcomingTrainingCount ?? upcomingTrainings.length}
                        emptyText="Er staan geen geplande trainingen open."
                        items={upcomingTrainings}
                        renderItem={(training) => (
                            <>
                                <span>{getTrainingTitle(training)}</span>
                                <small>{getTrainingMeta(training)}</small>
                            </>
                        )}
                    />

                    <AdminListCard
                        title="Open offertes"
                        count={overview?.openQuoteCount ?? openQuotes.length}
                        emptyText="Er zijn geen open offerteaanvragen."
                        items={openQuotes}
                        renderItem={(quote) => (
                            <>
                                <span>{getQuoteTitle(quote)}</span>
                                <small>{getQuoteMeta(quote)}</small>
                            </>
                        )}
                    />

                    <AdminListCard
                        title="Contactberichten"
                        count={overview?.openContactMessageCount ?? openContactMessages.length}
                        emptyText="Er zijn geen open contactberichten."
                        items={openContactMessages}
                        renderItem={(message) => (
                            <>
                                <span>{getMessageTitle(message)}</span>
                                <small>{getMessageMeta(message)}</small>
                            </>
                        )}
                    />
                </div>
            )}
        </section>
    );
}

function AdminListCard({ title, count, emptyText, items, renderItem }) {
    const visibleItems = items.slice(0, 3);

    return (
        <article className="dashboard-list-card">
            <div className="dashboard-list-card__header">
                <h3>{title}</h3>
                <span>{count}</span>
            </div>

            {visibleItems.length > 0 ? (
                <ul className="dashboard-list-card__list">
                    {visibleItems.map((item, index) => (
                        <li key={item.id ?? item.uuid ?? item.quoteNumber ?? index}>
                            {renderItem(item)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="dashboard-list-card__empty">{emptyText}</p>
            )}
        </article>
    );
}

function getTrainingTitle(training) {
    return (
        training.title ||
        training.name ||
        training.trainingTypeLabel ||
        training.trainingType ||
        "Training"
    );
}

function getTrainingMeta(training) {
    const date = formatDate(training.courseDate || training.date || training.startDate);
    const location = training.locationName || training.location?.name;
    const trainer = training.trainerName || training.trainer?.name;

    return [date, location, trainer].filter(Boolean).join(" - ") || "Details volgen";
}

function getQuoteTitle(quote) {
    return quote.company || quote.customerName || quote.quoteNumber || "Offerteaanvraag";
}

function getQuoteMeta(quote) {
    return [
        quote.quoteNumber,
        quote.statusLabel || quote.status,
        formatDate(quote.createdAt),
    ].filter(Boolean).join(" - ") || "Details volgen";
}

function getMessageTitle(message) {
    return message.naam || message.name || message.email || "Contactbericht";
}

function getMessageMeta(message) {
    return [
        message.email,
        message.statusLabel || message.status,
        formatDate(message.createdAt),
    ].filter(Boolean).join(" - ") || "Details volgen";
}

function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("nl-NL");
}

export default AdminDashboardPanel;
