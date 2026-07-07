import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TrainingStatusBadge from "../components/TrainingStatusBadge.jsx";
import TrainingParticipantsSection from "../components/TrainingParticipantsSection.jsx";
import trainingService from "../services/trainingService.js";
import locationService from "@/features/locations/services/locationService.js";
import {
    formatDate,
    formatTime,
    getCategoryLabel,
    getStatusLabel,
    getTrainingTypeLabel,
    STATUS_OPTIONS,
} from "../helpers/trainingHelpers.js";
import "../styles/Trainingen.css";

function getBackendMessage(err, fallbackMessage) {
    return (
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        (typeof err?.response?.data === "string" ? err.response.data : null) ||
        err?.message ||
        fallbackMessage
    );
}

function getCompanyDisplayName(training) {
    return training?.companyName || training?.company?.name || "-";
}

function getTrainingTypeDisplayName(training) {
    return getTrainingTypeLabel(
        training?.trainingType ||
        training?.variant ||
        training?.evacuationPhase ||
        training?.workshopType
    );
}

function getLocationDisplayName(training, locationDetails) {
    return (
        training?.locationName ||
        training?.location?.locationName ||
        locationDetails?.locationName ||
        "-"
    );
}

function getLocationAddress(training, locationDetails) {
    const address =
        training?.locationAddress ||
        training?.address ||
        training?.location?.address ||
        locationDetails?.address ||
        "";

    const postalCode =
        training?.locationPostalCode ||
        training?.postalCode ||
        training?.location?.postalCode ||
        locationDetails?.postalCode ||
        "";

    const city =
        training?.locationCity ||
        training?.city ||
        training?.location?.city ||
        locationDetails?.city ||
        "";

    const fullAddress = [address, [postalCode, city].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", ");

    return fullAddress || "-";
}

function isTrainingComplete(training) {
    const hasTrainingNumber = Boolean(training?.trainingNumber);
    const hasTrainingType = Boolean(
        training?.trainingType ||
        training?.variant ||
        training?.evacuationPhase ||
        training?.workshopType
    );
    const hasCompany = Boolean(training?.companyName || training?.company?.name);
    const hasLocation = Boolean(training?.locationName || training?.location?.locationName);
    const hasCourseDate = Boolean(training?.courseDate);
    const hasStartTime = Boolean(training?.startTime);
    const hasEndTime = Boolean(training?.endTime);
    const hasStatus = Boolean(training?.status);

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

function TrainingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [training, setTraining] = useState(null);
    const [locationDetails, setLocationDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusValue, setStatusValue] = useState("PLANNED");
    const [statusLoading, setStatusLoading] = useState(false);

    const loadTraining = async () => {
        try {
            setLoading(true);
            setError("");
            setLocationDetails(null);

            const data = await trainingService.getById(id);

            setTraining(data);
            setStatusValue(data?.status || "PLANNED");

            if (data?.locationId) {
                try {
                    const locationData = await locationService.getById(data.locationId);
                    setLocationDetails(locationData);
                } catch (locationErr) {
                    console.warn("Locatie-adres kon niet extra worden opgehaald:", locationErr);
                }
            }
        } catch (err) {
            console.error("Fout bij ophalen training:", err);
            setError(getBackendMessage(err, "Kon training niet ophalen."));
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

            await trainingService.updateStatus(id, {
                status: statusValue,
            });

            await loadTraining();
        } catch (err) {
            console.error("Fout bij wijzigen status:", err);
            setError(getBackendMessage(err, "Kon status niet wijzigen."));
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
            setError(getBackendMessage(err, "Kon training niet archiveren."));
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

    const complete = isTrainingComplete(training);

    return (
        <section className="trainingen-page">
            <div className="trainingen-page__header">
                <div>
                    <h1>Training details</h1>
                    <p>Overzicht van de training, locatie en status.</p>
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

            <div className="training-detail-overview">
                <div className="training-detail-overview__top">
                    <div>
                        <span className="training-detail-overview__label">
                            Trainingsnummer
                        </span>
                        <h2>{training?.trainingNumber || "-"}</h2>
                    </div>

                    <div className="training-detail-overview__status">
                        <TrainingStatusBadge status={training?.status} />

                        <span
                            className={
                                complete
                                    ? "training-detail-check training-detail-check--done"
                                    : "training-detail-check training-detail-check--pending"
                            }
                            title={
                                complete
                                    ? "Basisgegevens zijn compleet"
                                    : "Er ontbreken nog basisgegevens"
                            }
                        >
                            {complete ? "V" : "-"}
                        </span>
                    </div>
                </div>

                <div className="training-detail-overview__main">
                    <div className="training-detail-section">
                        <h3>Training</h3>

                        <dl className="training-detail-list">
                            <div>
                                <dt>Trainingstype</dt>
                                <dd>{getTrainingTypeDisplayName(training)}</dd>
                            </div>

                            <div>
                                <dt>Categorie</dt>
                                <dd>{getCategoryLabel(training?.category)}</dd>
                            </div>

                            <div>
                                <dt>Datum</dt>
                                <dd>{formatDate(training?.courseDate)}</dd>
                            </div>

                            <div>
                                <dt>Tijd</dt>
                                <dd>
                                    {formatTime(training?.startTime)} -{" "}
                                    {formatTime(training?.endTime)}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="training-detail-section">
                        <h3>Locatie en bedrijf</h3>

                        <dl className="training-detail-list">
                            <div>
                                <dt>Bedrijf</dt>
                                <dd>{getCompanyDisplayName(training)}</dd>
                            </div>

                            <div>
                                <dt>Locatie</dt>
                                <dd>{getLocationDisplayName(training, locationDetails)}</dd>
                            </div>

                            <div>
                                <dt>Adres</dt>
                                <dd>{getLocationAddress(training, locationDetails)}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="training-detail-section">
                        <h3>Instellingen</h3>

                        <dl className="training-detail-list">
                            <div>
                                <dt>Minimum deelnemers</dt>
                                <dd>{training?.minParticipants ?? "-"}</dd>
                            </div>

                            <div>
                                <dt>Maximum deelnemers</dt>
                                <dd>{training?.maxParticipants ?? "-"}</dd>
                            </div>

                            <div>
                                <dt>Admin override</dt>
                                <dd>{training?.adminOverrideAllowed ? "Ja" : "Nee"}</dd>
                            </div>

                            <div>
                                <dt>Gearchiveerd</dt>
                                <dd>{training?.deleted ? "Ja" : "Nee"}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <form
                    className="training-detail-status-bar"
                    onSubmit={handleStatusUpdate}
                >
                    <div className="training-detail-status-bar__field">
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

                    <div className="training-detail-status-bar__actions">
                        <button
                            type="submit"
                            disabled={statusLoading || training?.deleted}
                            className="trainingen-page__button"
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

            <TrainingParticipantsSection
                courseId={id}
                disabled={Boolean(training?.deleted)}
            />
        </section>
    );
}

export default TrainingDetailPage;