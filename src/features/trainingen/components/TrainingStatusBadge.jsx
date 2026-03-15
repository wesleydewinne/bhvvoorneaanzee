import { getStatusLabel } from "../helpers/trainingHelpers.js";

function TrainingStatusBadge({ status }) {
    const statusClass = status
        ? status.toLowerCase().replace(/_/g, "-")
        : "unknown";

    return (
        <span className={`training-status-badge training-status-badge--${statusClass}`}>
            {getStatusLabel(status)}
        </span>
    );
}

export default TrainingStatusBadge;