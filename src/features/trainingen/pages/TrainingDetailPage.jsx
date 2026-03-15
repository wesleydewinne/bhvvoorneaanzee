import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TrainingStatusBadge from "../components/TrainingStatusBadge.jsx";
import trainingService from "../services/trainingService.js";
import {
    formatDate,
    formatTime,
    getCategoryLabel,
    getEvacuationPhaseLabel,
    getStatusLabel,
    getVariantLabel,
    getWorkshopTypeLabel,
    STATUS_OPTIONS,
} from "../helpers/trainingHelpers.js";
import "../styles/Trainingen.css";

function TrainingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusValue, setStatusValue] = useState("PLANNED");
    const [statusLoading, setStatusLoading] = useState(false);

    const loadTraining = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await trainingService.getById(id);
            setTraining(data);
            setStatusValue(data?.status || "PLANNED");
        } catch (err) {
            console.error("Fout bij ophalen training:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            setError(backendMessage || err?.message || "Kon training niet ophalen.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTraining();
    }, [id]);

    const handleStatusUpdate = async (event) => {
        event.preventDefault();

        if (training?.deleted) {
            setError("Een gearchiveerde training kan niet meer worden aangepast.");
            return;
        }

        try {
            setStatusLoading(true);
            setError("");

            const updatedTraining = await trainingService.updateStatus(id, {
                status: statusValue,
            });

            setTraining(updatedTraining);
            setStatusValue(updatedTraining?.status || statusValue);

            const freshTraining = await trainingService.getById(id);
            setTraining(freshTraining);
            setStatusValue(freshTraining?.status || statusValue);
        } catch (err) {
            console.error("Fout bij wijzigen status:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            setError(backendMessage || err?.message || "Kon status niet wijzigen.");
        } finally {
            setStatusLoading(false);
        }
    };

    const handleArchive = async () => {
        if (training?.deleted) {
            setError("Deze training is al gearchiveerd.");
            return;
        }

        const confirmed = window.confirm(
            `Weet je zeker dat je training "${training?.trainingNumber}" wilt archiveren?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await trainingService.remove(id);
            navigate("/admin/trainingen");
        } catch (err) {
            console.error("Fout bij archiveren training:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            setError(backendMessage || err?.message || "Kon training niet archiveren.");
        }
    };

    if (loading) {
        return (
            <section className="trainingen-page">
                <p>Training laden...</p>
            </section>
        );
    }

    if (error && !training) {
        return (
            <section className="trainingen-page">
                <p className="trainingen-page__error">{error}</p>
                <Link to="/admin/trainingen" className="trainingen-page__button">
                    Terug naar overzicht
                </Link>
            </section>
        );
    }

    return (
        <section className="trainingen-page">
            <div className="trainingen-page__header">
                <div>
                    <h1>Training details</h1>
                    <p>Bekijk en beheer de gegevens van deze training.</p>
                </div>

                <div className="trainingen-page__header-actions">
                    <Link
                        to="/admin/trainingen"
                        className="trainingen-page__button trainingen-page__button--secondary"
                    >
                        Terug
                    </Link>

                    {!training?.deleted && (
                        <Link
                            to={`/admin/trainingen/${id}/edit`}
                            className="trainingen-page__button"
                        >
                            Bewerken
                        </Link>
                    )}
                </div>
            </div>

            {error && <p className="trainingen-page__error">{error}</p>}

            {training?.deleted && (
                <div className="trainingen-page__error">
                    Deze training is gearchiveerd en kan niet meer worden aangepast.
                </div>
            )}

            <div className="training-detail-card">
                <div className="training-detail-grid">
                    <div>
                        <strong>ID</strong>
                        <p>{training?.id ?? "-"}</p>
                    </div>

                    <div>
                        <strong>Trainingsnummer</strong>
                        <p>{training?.trainingNumber ?? "-"}</p>
                    </div>

                    <div>
                        <strong>Categorie</strong>
                        <p>{getCategoryLabel(training?.category)}</p>
                    </div>

                    <div>
                        <strong>Variant</strong>
                        <p>{getVariantLabel(training?.variant)}</p>
                    </div>

                    <div>
                        <strong>Ontruimingsfase</strong>
                        <p>{getEvacuationPhaseLabel(training?.evacuationPhase)}</p>
                    </div>

                    <div>
                        <strong>Workshop type</strong>
                        <p>{getWorkshopTypeLabel(training?.workshopType)}</p>
                    </div>

                    <div>
                        <strong>Datum</strong>
                        <p>{formatDate(training?.courseDate)}</p>
                    </div>

                    <div>
                        <strong>Starttijd</strong>
                        <p>{formatTime(training?.startTime)}</p>
                    </div>

                    <div>
                        <strong>Eindtijd</strong>
                        <p>{formatTime(training?.endTime)}</p>
                    </div>

                    <div>
                        <strong>Status</strong>
                        <p>
                            <TrainingStatusBadge status={training?.status} />
                        </p>
                    </div>

                    <div>
                        <strong>Locatie ID</strong>
                        <p>{training?.locationId ?? "-"}</p>
                    </div>

                    <div>
                        <strong>Locatie naam</strong>
                        <p>{training?.locationName ?? "-"}</p>
                    </div>

                    <div>
                        <strong>Trainer ID</strong>
                        <p>{training?.trainerId ?? "-"}</p>
                    </div>

                    <div>
                        <strong>Minimum deelnemers</strong>
                        <p>{training?.minParticipants ?? "-"}</p>
                    </div>

                    <div>
                        <strong>Maximum deelnemers</strong>
                        <p>{training?.maxParticipants ?? "-"}</p>
                    </div>

                    <div>
                        <strong>Admin override</strong>
                        <p>{training?.adminOverrideAllowed ? "Ja" : "Nee"}</p>
                    </div>

                    <div>
                        <strong>Gearchiveerd</strong>
                        <p>{training?.deleted ? "Ja" : "Nee"}</p>
                    </div>
                </div>

                <hr className="training-detail-divider" />

                <form className="training-status-form" onSubmit={handleStatusUpdate}>
                    <div className="training-status-form__field">
                        <label htmlFor="status">Status wijzigen</label>
                        <select
                            id="status"
                            value={statusValue}
                            onChange={(event) => setStatusValue(event.target.value)}
                            disabled={training?.deleted || statusLoading}
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {getStatusLabel(option.value)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="training-status-form__actions">
                        <button
                            type="submit"
                            disabled={statusLoading || training?.deleted}
                        >
                            {statusLoading ? "Opslaan..." : "Status opslaan"}
                        </button>

                        {!training?.deleted && (
                            <button
                                type="button"
                                onClick={handleArchive}
                                className="trainingen-page__button trainingen-page__button--danger"
                            >
                                Archiveren
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

export default TrainingDetailPage;