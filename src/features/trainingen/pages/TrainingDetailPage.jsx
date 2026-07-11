import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Archive,
    ArrowLeft,
    Building2,
    CalendarDays,
    CheckCircle2,
    Clock,
    MapPin,
    Pencil,
    RefreshCw,
    Settings2,
    ShieldCheck,
    Users,
} from "lucide-react";
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
            <section className="trainingen-page dashboard-admin-page">
                <p className="dashboard__state">
                    <RefreshCw aria-hidden="true" />
                    Training laden...
                </p>
            </section>
        );
    }

    if (error && !training) {
        return (
            <section className="trainingen-page dashboard-admin-page">
                <p className="dashboard-admin-message dashboard-admin-message--error">{error}</p>

                <Link to="/admin/trainingen" className="dashboard-admin-button">
                    <ArrowLeft aria-hidden="true" />
                    Terug naar overzicht
                </Link>
            </section>
        );
    }

    const complete = isTrainingComplete(training);

    return (
        <section className="trainingen-page dashboard-admin-page">
            <section className="dashboard-admin-hero" aria-labelledby="training-detail-title">
                <div>
                    <p className="dashboard__eyebrow">Trainingen</p>
                    <h1 id="training-detail-title">Training details</h1>
                    <p>Overzicht van planning, locatie, deelnemers en status van deze training.</p>
                </div>

                <div className="dashboard-admin-hero__actions">
                    <Link
                        to="/admin/trainingen"
                        className="dashboard-admin-button dashboard-admin-button--secondary"
                    >
                        <ArrowLeft aria-hidden="true" />
                        Overzicht
                    </Link>

                    {!training?.deleted && (
                        <Link
                            to={`/admin/trainingen/${id}/edit`}
                            className="dashboard-admin-button"
                        >
                            <Pencil aria-hidden="true" />
                            Bewerken
                        </Link>
                    )}
                </div>
            </section>

            {error && <p className="dashboard-admin-message dashboard-admin-message--error">{error}</p>}

            {training?.deleted && (
                <div className="dashboard-admin-message dashboard-admin-message--error">
                    Deze training is gearchiveerd en kan niet meer worden aangepast.
                </div>
            )}

            <section className="dashboard-admin-stats" aria-label="Training samenvatting">
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon">
                        <CalendarDays aria-hidden="true" />
                    </span>
                    <strong>{formatDate(training?.courseDate)}</strong>
                    <span>Datum</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--green">
                        <Clock aria-hidden="true" />
                    </span>
                    <strong>{formatTime(training?.startTime)}</strong>
                    <span>Starttijd</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--orange">
                        <Users aria-hidden="true" />
                    </span>
                    <strong>{training?.maxParticipants ?? "-"}</strong>
                    <span>Maximum deelnemers</span>
                </article>
            </section>

            <section className="training-detail-overview dashboard-admin-panel" aria-label="Training details">
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
                            {complete ? <CheckCircle2 aria-hidden="true" /> : "-"}
                        </span>
                    </div>
                </div>

                <div className="training-detail-overview__main">
                    <div className="training-detail-section">
                        <h3>
                            <ShieldCheck aria-hidden="true" />
                            Training
                        </h3>

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
                        <h3>
                            <MapPin aria-hidden="true" />
                            Locatie en bedrijf
                        </h3>

                        <dl className="training-detail-list">
                            <div>
                                <dt>
                                    <Building2 aria-hidden="true" />
                                    Bedrijf
                                </dt>
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
                        <h3>
                            <Settings2 aria-hidden="true" />
                            Instellingen
                        </h3>

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
                            className="dashboard-admin-button"
                        >
                            <CheckCircle2 aria-hidden="true" />
                            {statusLoading ? "Opslaan..." : "Status opslaan"}
                        </button>

                        {!training?.deleted && (
                            <button
                                type="button"
                                onClick={handleArchive}
                                className="dashboard-admin-button trainingen-page__button--danger"
                            >
                                <Archive aria-hidden="true" />
                                Archiveren
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <TrainingParticipantsSection
                courseId={id}
                disabled={Boolean(training?.deleted)}
            />
        </section>
    );
}

export default TrainingDetailPage;
