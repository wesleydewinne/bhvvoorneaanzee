import TrainingActionsMenu from "./TrainingActionsMenu.jsx";
import TrainingStatusBadge from "./TrainingStatusBadge.jsx";
import {
    formatDate,
    formatTime,
    getTrainingTypeLabel,
} from "../helpers/trainingHelpers.js";

function getCompanyDisplayName(training) {
    return training.companyName || training.company?.name || "-";
}

function getLocationDisplayName(training) {
    return training.locationName || training.location?.locationName || "-";
}

function getTrainingTypeDisplayName(training) {
    return getTrainingTypeLabel(
        training.trainingType ||
        training.variant ||
        training.evacuationPhase ||
        training.workshopType
    );
}

function isTrainingComplete(training) {
    const hasTrainingNumber = Boolean(training.trainingNumber);
    const hasTrainingType = Boolean(
        training.trainingType ||
        training.variant ||
        training.evacuationPhase ||
        training.workshopType
    );
    const hasCompany = Boolean(training.companyName || training.company?.name);
    const hasLocation = Boolean(training.locationName || training.location?.locationName);
    const hasCourseDate = Boolean(training.courseDate);
    const hasStartTime = Boolean(training.startTime);
    const hasEndTime = Boolean(training.endTime);
    const hasStatus = Boolean(training.status);

    return (
        hasTrainingNumber &&
        hasTrainingType &&
        hasCompany &&
        hasLocation &&
        hasCourseDate &&
        hasStartTime &&
        hasEndTime &&
        hasStatus
    );
}

function TrainingenTable({ trainingen, onRefresh }) {
    if (!trainingen || trainingen.length === 0) {
        return (
            <div className="trainingen-empty-state">
                <p>Er zijn nog geen trainingen gevonden.</p>
            </div>
        );
    }

    return (
        <div className="trainingen-table-card">
            <div className="trainingen-table-wrapper">
                <table className="trainingen-table">
                    <thead>
                    <tr>
                        <th>Trainingsnr.</th>
                        <th>Trainingstype</th>
                        <th>Bedrijf</th>
                        <th>Locatie</th>
                        <th>Datum</th>
                        <th>Tijd</th>
                        <th className="trainingen-table__status-column">Status</th>
                        <th className="trainingen-table__check-column">Check</th>
                        <th className="trainingen-table__actions-column">Acties</th>
                    </tr>
                    </thead>

                    <tbody>
                    {trainingen.map((training) => {
                        const complete = isTrainingComplete(training);

                        return (
                            <tr
                                key={training.id}
                                className={
                                    training.deleted
                                        ? "trainingen-table__row--archived"
                                        : ""
                                }
                            >
                                <td className="trainingen-table__number-cell">
                                    {training.trainingNumber || "-"}
                                </td>

                                <td className="trainingen-table__type-cell">
                                    {getTrainingTypeDisplayName(training)}
                                </td>

                                <td>{getCompanyDisplayName(training)}</td>

                                <td>{getLocationDisplayName(training)}</td>

                                <td>{formatDate(training.courseDate)}</td>

                                <td>
                                    {formatTime(training.startTime)} - {formatTime(training.endTime)}
                                </td>

                                <td className="trainingen-table__status-cell">
                                    <TrainingStatusBadge status={training.status} />
                                </td>

                                <td className="trainingen-table__check-cell">
                                    <span
                                        className={
                                            complete
                                                ? "trainingen-table__check trainingen-table__check--done"
                                                : "trainingen-table__check trainingen-table__check--pending"
                                        }
                                    >
                                        {complete ? "V" : "-"}
                                    </span>
                                </td>

                                <td className="trainingen-table__actions-cell">
                                    <TrainingActionsMenu
                                        training={training}
                                        onRefresh={onRefresh}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TrainingenTable;