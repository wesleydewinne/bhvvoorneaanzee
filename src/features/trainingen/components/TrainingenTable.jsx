import TrainingActionsMenu from "./TrainingActionsMenu.jsx";
import TrainingStatusBadge from "./TrainingStatusBadge.jsx";
import {
    formatDate,
    formatTime,
    getCategoryLabel,
    getVariantLabel,
} from "../helpers/trainingHelpers.js";

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
                        <th>Categorie</th>
                        <th>Variant</th>
                        <th>Datum</th>
                        <th>Tijd</th>
                        <th>Locatie</th>
                        <th>Status</th>
                        <th className="trainingen-table__actions-column">Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trainingen.map((training) => (
                        <tr
                            key={training.id}
                            className={training.deleted ? "trainingen-table__row--archived" : ""}
                        >
                            <td>{training.trainingNumber || "-"}</td>
                            <td>{getCategoryLabel(training.category)}</td>
                            <td>{getVariantLabel(training.variant)}</td>
                            <td>{formatDate(training.courseDate)}</td>
                            <td>
                                {formatTime(training.startTime)} - {formatTime(training.endTime)}
                            </td>
                            <td>{training.locationName || "-"}</td>
                            <td>
                                <TrainingStatusBadge status={training.status} />
                            </td>
                            <td className="trainingen-table__actions-cell">
                                <TrainingActionsMenu training={training} onRefresh={onRefresh} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TrainingenTable;