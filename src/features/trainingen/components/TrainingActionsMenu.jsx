import { Link } from "react-router-dom";
import { Archive, Eye, Pencil } from "lucide-react";
import trainingService from "../services/trainingService.js";

function TrainingActionsMenu({ training, onRefresh }) {
    const isArchived = Boolean(training?.deleted);

    const handleArchive = async () => {
        const confirmed = window.confirm(
            `Weet je zeker dat je training "${training.trainingNumber}" wilt archiveren?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await trainingService.remove(training.id);
            onRefresh?.();
        } catch (err) {
            console.error("Fout bij archiveren training:", err);
            alert(err?.message || "Archiveren van training is mislukt.");
        }
    };

    return (
        <div className="training-actions">
            <Link
                to={`/admin/trainingen/${training.id}`}
                className="training-actions__icon-button"
                title="Bekijken"
                aria-label="Bekijken"
            >
                <Eye size={18} />
            </Link>

            {!isArchived && (
                <Link
                    to={`/admin/trainingen/${training.id}/edit`}
                    className="training-actions__icon-button training-actions__icon-button--edit"
                    title="Bewerken"
                    aria-label="Bewerken"
                >
                    <Pencil size={18} />
                </Link>
            )}

            {!isArchived && (
                <button
                    type="button"
                    onClick={handleArchive}
                    className="training-actions__icon-button training-actions__icon-button--archive"
                    title="Archiveren"
                    aria-label="Archiveren"
                >
                    <Archive size={18} />
                </button>
            )}
        </div>
    );
}

export default TrainingActionsMenu;