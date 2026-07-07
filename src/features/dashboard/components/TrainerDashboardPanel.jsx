function TrainerDashboardPanel({ overview, loading, error }) {
    const upcomingTrainings = getOverviewItems(overview, [
        "upcomingTrainings",
        "upcoming-trainings",
        "trainings",
        "planning",
    ]);
    const evaluations = getOverviewItems(overview, [
        "evaluations",
        "trainerEvaluations",
        "feedback",
    ]);
    const actions = getOverviewItems(overview, [
        "actions",
        "openActions",
        "tasks",
    ]);

    return (
        <section className="dashboard-role-panel" aria-labelledby="trainer-dashboard-title">
            <div className="dashboard__section-heading">
                <p className="dashboard__eyebrow">Trainer</p>
                <h2 id="trainer-dashboard-title">Mijn trainerdashboard</h2>
            </div>

            {loading && (
                <p className="dashboard__state">Trainergegevens laden...</p>
            )}

            {error && (
                <p className="dashboard__overview-note">{error}</p>
            )}

            {!loading && (
                <div className="dashboard-role-panel__grid">
                    <TrainerListCard
                        title="Komende trainingen"
                        count={getSectionCount(overview, "upcomingTrainings", upcomingTrainings)}
                        emptyText="Er staan nog geen trainingen voor jou klaar."
                        items={upcomingTrainings}
                        renderItem={(training) => (
                            <>
                                <span>{getTrainingTitle(training)}</span>
                                <small>{getTrainingMeta(training)}</small>
                            </>
                        )}
                    />

                    <TrainerListCard
                        title="Laatste evaluaties"
                        count={getSectionCount(overview, "evaluations", evaluations)}
                        emptyText="Evaluaties van jouw trainingen verschijnen hier zodra ze beschikbaar zijn."
                        items={evaluations}
                        renderItem={(evaluation) => (
                            <>
                                <span>{getEvaluationTitle(evaluation)}</span>
                                <small>{getEvaluationMeta(evaluation)}</small>
                            </>
                        )}
                    />

                    <TrainerListCard
                        title="Open acties"
                        count={getSectionCount(overview, "actions", actions)}
                        emptyText="Je hebt op dit moment geen open acties."
                        items={actions}
                        renderItem={(action) => (
                            <>
                                <span>{getActionTitle(action)}</span>
                                <small>{getActionMeta(action)}</small>
                            </>
                        )}
                    />
                </div>
            )}
        </section>
    );
}

function TrainerListCard({ title, count, emptyText, items, renderItem }) {
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
                        <li key={item.id ?? item.uuid ?? item.key ?? index}>
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

function getOverviewItems(overview, keys) {
    for (const key of keys) {
        const directItems = overview?.[key];

        if (Array.isArray(directItems)) {
            return directItems;
        }

        const section = overview?.sections?.find((item) => item.key === key);

        if (Array.isArray(section?.items)) {
            return section.items;
        }
    }

    return [];
}

function getSectionCount(overview, key, fallbackItems) {
    const directCount = overview?.counts?.[key] ?? overview?.[`${key}Count`];

    if (Number.isFinite(directCount)) {
        return directCount;
    }

    const section = overview?.sections?.find((item) => item.key === key);

    if (Number.isFinite(section?.count)) {
        return section.count;
    }

    return fallbackItems.length;
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
    const participants = getParticipantCount(training);

    return [date, location, participants].filter(Boolean).join(" - ") || "Details volgen";
}

function getEvaluationTitle(evaluation) {
    return (
        evaluation.title ||
        evaluation.trainingTitle ||
        evaluation.courseName ||
        "Evaluatie"
    );
}

function getEvaluationMeta(evaluation) {
    const score = evaluation.averageScore ?? evaluation.score ?? evaluation.rating;
    const responseCount = evaluation.responseCount ?? evaluation.responses;

    return [
        Number.isFinite(score) ? `Gemiddeld ${score}` : null,
        Number.isFinite(responseCount) ? `${responseCount} reacties` : null,
        formatDate(evaluation.createdAt || evaluation.date),
    ].filter(Boolean).join(" - ") || "Resultaten volgen";
}

function getActionTitle(action) {
    return action.title || action.name || action.label || "Actie";
}

function getActionMeta(action) {
    const dueDate = formatDate(action.dueDate || action.deadline);
    return [action.statusLabel || action.status, dueDate].filter(Boolean).join(" - ") || "Opvolging volgt";
}

function getParticipantCount(training) {
    const count =
        training.participantCount ??
        training.participantsCount ??
        (Array.isArray(training.participants) ? training.participants.length : null);

    if (!Number.isFinite(count)) {
        return "";
    }

    return `${count} deelnemer${count === 1 ? "" : "s"}`;
}

function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("nl-NL");
}

export default TrainerDashboardPanel;
