function CursistDashboardPanel({ overview, loading, error }) {
    const trainings = overview?.trainings ?? [];
    const certificates = overview?.certificates ?? [];
    const elearnings = overview?.elearnings ?? [];

    return (
        <section className="dashboard-cursist" aria-labelledby="cursist-dashboard-title">
            <div className="dashboard__section-heading">
                <p className="dashboard__eyebrow">Mijn dashboard</p>
                <h2 id="cursist-dashboard-title">Trainingen en voortgang</h2>
            </div>

            {loading && (
                <p className="dashboard__state">Cursistgegevens laden...</p>
            )}

            {error && (
                <p className="dashboard__overview-note">{error}</p>
            )}

            {!loading && (
                <div className="dashboard-cursist__grid">
                    <DashboardListCard
                        title="Mijn trainingen"
                        emptyText="Er zijn nog geen trainingen gekoppeld aan je account."
                        items={trainings}
                        renderItem={(training) => (
                            <>
                                <span>{getTrainingTitle(training)}</span>
                                <small>{getTrainingMeta(training)}</small>
                            </>
                        )}
                    />

                    <DashboardListCard
                        title="Certificaten"
                        emptyText="Je certificaten worden hier zichtbaar zodra ze beschikbaar zijn."
                        items={certificates}
                        renderItem={(certificate) => (
                            <>
                                <span>{getCertificateTitle(certificate)}</span>
                                <small>{getCertificateMeta(certificate)}</small>
                            </>
                        )}
                    />

                    <DashboardListCard
                        title="E-learning"
                        emptyText="Er staan nog geen e-learningmodules klaar."
                        items={elearnings}
                        renderItem={(elearning) => (
                            <>
                                <span>{getElearningTitle(elearning)}</span>
                                <small>{getElearningMeta(elearning)}</small>
                            </>
                        )}
                    />
                </div>
            )}
        </section>
    );
}

function DashboardListCard({ title, emptyText, items, renderItem }) {
    const visibleItems = items.slice(0, 3);

    return (
        <article className="dashboard-list-card">
            <div className="dashboard-list-card__header">
                <h3>{title}</h3>
                <span>{items.length}</span>
            </div>

            {visibleItems.length > 0 ? (
                <ul className="dashboard-list-card__list">
                    {visibleItems.map((item, index) => (
                        <li key={item.id ?? item.uuid ?? index}>
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
    const status = training.statusLabel || training.status;

    return [date, status].filter(Boolean).join(" - ") || "Details volgen";
}

function getCertificateTitle(certificate) {
    return (
        certificate.title ||
        certificate.name ||
        certificate.certificateType ||
        "Certificaat"
    );
}

function getCertificateMeta(certificate) {
    const validUntil = formatDate(
        certificate.validUntil ||
        certificate.expiresAt ||
        certificate.expirationDate
    );

    return validUntil ? `Geldig tot ${validUntil}` : "Geldigheid volgt";
}

function getElearningTitle(elearning) {
    return (
        elearning.title ||
        elearning.name ||
        elearning.moduleName ||
        "E-learningmodule"
    );
}

function getElearningMeta(elearning) {
    return elearning.statusLabel || elearning.status || "Voortgang volgt";
}

function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("nl-NL");
}

export default CursistDashboardPanel;
