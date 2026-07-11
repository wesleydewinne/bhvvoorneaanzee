import { useEffect, useState } from "react";
import { Plus, Save, Trash2, UserPlus, Users } from "lucide-react";
import trainingService from "../services/trainingService.js";
import {
    ATTENDANCE_STATUS_OPTIONS,
    RESULT_STATUS_OPTIONS,
    getAttendanceStatusLabel,
    getResultStatusLabel,
} from "../helpers/trainingHelpers.js";

function getBackendMessage(err, fallbackMessage) {
    return (
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (typeof err?.response?.data === "string" ? err.response.data : null) ||
        err?.message ||
        fallbackMessage
    );
}

function getParticipantDisplayName(participant) {
    const fullNameFromParts = `${participant?.firstName || ""} ${participant?.lastName || ""}`.trim();

    return (
        participant?.fullName ||
        participant?.userFullName ||
        participant?.name ||
        participant?.displayName ||
        fullNameFromParts ||
        `Gebruiker #${participant?.userId || "-"}`
    );
}

function getParticipantEmail(participant) {
    return participant?.email || participant?.userEmail || "";
}

function TrainingParticipantsSection({ courseId, disabled = false }) {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [newUserId, setNewUserId] = useState("");
    const [adding, setAdding] = useState(false);

    const [updatingParticipantId, setUpdatingParticipantId] = useState(null);
    const [resultForms, setResultForms] = useState({});

    const loadParticipants = async () => {
        if (!courseId) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await trainingService.getParticipants(courseId);
            const nextParticipants = Array.isArray(data) ? data : [];

            setParticipants(nextParticipants);

            const nextResultForms = {};

            nextParticipants.forEach((participant) => {
                nextResultForms[participant.id] = {
                    resultStatus: participant.resultStatus || "",
                    notes: participant.notes || "",
                };
            });

            setResultForms(nextResultForms);
        } catch (err) {
            console.error("Fout bij ophalen deelnemers:", err);
            setError(getBackendMessage(err, "Kon deelnemers niet ophalen."));
            setParticipants([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadParticipants();
    }, [courseId]);

    const handleAddParticipant = async (event) => {
        event.preventDefault();

        if (!newUserId.trim()) {
            setError("Vul een gebruiker ID in.");
            return;
        }

        try {
            setAdding(true);
            setError("");

            await trainingService.addParticipant(courseId, {
                userId: Number(newUserId),
            });

            setNewUserId("");
            await loadParticipants();
        } catch (err) {
            console.error("Fout bij toevoegen deelnemer:", err);
            setError(getBackendMessage(err, "Kon deelnemer niet toevoegen."));
        } finally {
            setAdding(false);
        }
    };

    const handleAttendanceChange = async (participantId, attendanceStatus) => {
        if (!attendanceStatus) {
            return;
        }

        try {
            setUpdatingParticipantId(participantId);
            setError("");

            await trainingService.updateAttendance(courseId, participantId, {
                attendanceStatus,
            });

            await loadParticipants();
        } catch (err) {
            console.error("Fout bij wijzigen aanwezigheid:", err);
            setError(getBackendMessage(err, "Kon aanwezigheid niet wijzigen."));
        } finally {
            setUpdatingParticipantId(null);
        }
    };

    const handleResultFormChange = (participantId, field, value) => {
        setResultForms((prev) => ({
            ...prev,
            [participantId]: {
                ...prev[participantId],
                [field]: value,
            },
        }));
    };

    const handleSaveResult = async (participantId) => {
        const resultForm = resultForms[participantId] || {};

        if (!resultForm.resultStatus) {
            setError("Kies eerst een resultaat.");
            return;
        }

        try {
            setUpdatingParticipantId(participantId);
            setError("");

            await trainingService.updateResult(courseId, participantId, {
                resultStatus: resultForm.resultStatus,
                notes: resultForm.notes || null,
            });

            await loadParticipants();
        } catch (err) {
            console.error("Fout bij opslaan resultaat:", err);
            setError(getBackendMessage(err, "Kon resultaat niet opslaan."));
        } finally {
            setUpdatingParticipantId(null);
        }
    };

    const handleRemoveParticipant = async (participant) => {
        const confirmed = window.confirm(
            `Weet je zeker dat je "${getParticipantDisplayName(participant)}" wilt verwijderen uit deze training?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setUpdatingParticipantId(participant.id);
            setError("");

            await trainingService.removeParticipant(courseId, participant.id);
            await loadParticipants();
        } catch (err) {
            console.error("Fout bij verwijderen deelnemer:", err);
            setError(getBackendMessage(err, "Kon deelnemer niet verwijderen."));
        } finally {
            setUpdatingParticipantId(null);
        }
    };

    return (
        <div className="training-participants-card">
            <div className="training-participants-card__header">
                <div>
                    <h2>
                        <Users aria-hidden="true" />
                        Deelnemers
                    </h2>
                    <p>Beheer deelnemers, aanwezigheid en resultaten van deze training.</p>
                </div>
                <span>{participants.length}</span>
            </div>

            {error && <p className="trainingen-page__error">{error}</p>}

            {!disabled && (
                <form
                    className="training-participants-form"
                    onSubmit={handleAddParticipant}
                >
                    <div className="training-form__field">
                        <label htmlFor="newUserId">
                            <UserPlus aria-hidden="true" />
                            Gebruiker ID toevoegen
                        </label>

                        <input
                            id="newUserId"
                            type="number"
                            min="1"
                            value={newUserId}
                            onChange={(event) => setNewUserId(event.target.value)}
                            placeholder="Bijvoorbeeld 12"
                            disabled={adding}
                        />

                        <small className="training-form__hint">
                            Voeg een bestaande gebruiker toe aan deze training.
                        </small>
                    </div>

                    <div className="training-participants-form__actions">
                        <button type="submit" disabled={adding}>
                            <Plus aria-hidden="true" />
                            {adding ? "Toevoegen..." : "Deelnemer toevoegen"}
                        </button>
                    </div>
                </form>
            )}

            {loading && <p>Deelnemers laden...</p>}

            {!loading && participants.length === 0 && (
                <div className="trainingen-empty-state">
                    <p>Er zijn nog geen deelnemers gekoppeld aan deze training.</p>
                </div>
            )}

            {!loading && participants.length > 0 && (
                <div className="trainingen-table-wrapper">
                    <table className="trainingen-table">
                        <thead>
                        <tr>
                            <th>Deelnemer</th>
                            <th>Gebruiker ID</th>
                            <th>Aanwezigheid</th>
                            <th>Resultaat</th>
                            <th>Notities</th>
                            <th className="trainingen-table__actions-column">
                                Acties
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {participants.map((participant) => {
                            const isUpdating = updatingParticipantId === participant.id;

                            const resultForm = resultForms[participant.id] || {
                                resultStatus: participant.resultStatus || "",
                                notes: participant.notes || "",
                            };

                            return (
                                <tr key={participant.id}>
                                    <td>
                                        <strong>
                                            {getParticipantDisplayName(participant)}
                                        </strong>

                                        {getParticipantEmail(participant) && (
                                            <small className="training-participants-table__meta">
                                                {getParticipantEmail(participant)}
                                            </small>
                                        )}
                                    </td>

                                    <td>{participant.userId || "-"}</td>

                                    <td>
                                        <select
                                            value={participant.attendanceStatus || ""}
                                            onChange={(event) =>
                                                handleAttendanceChange(
                                                    participant.id,
                                                    event.target.value
                                                )
                                            }
                                            disabled={disabled || isUpdating}
                                        >
                                            <option value="">Kies aanwezigheid</option>

                                            {ATTENDANCE_STATUS_OPTIONS.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>

                                        {participant.attendanceStatus && (
                                            <small className="training-participants-table__meta">
                                                Huidig:{" "}
                                                {getAttendanceStatusLabel(
                                                    participant.attendanceStatus
                                                )}
                                            </small>
                                        )}
                                    </td>

                                    <td>
                                        <select
                                            value={resultForm.resultStatus}
                                            onChange={(event) =>
                                                handleResultFormChange(
                                                    participant.id,
                                                    "resultStatus",
                                                    event.target.value
                                                )
                                            }
                                            disabled={disabled || isUpdating}
                                        >
                                            <option value="">Kies resultaat</option>

                                            {RESULT_STATUS_OPTIONS.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>

                                        {participant.resultStatus && (
                                            <small className="training-participants-table__meta">
                                                Huidig:{" "}
                                                {getResultStatusLabel(
                                                    participant.resultStatus
                                                )}
                                            </small>
                                        )}
                                    </td>

                                    <td>
                                        <textarea
                                            value={resultForm.notes}
                                            onChange={(event) =>
                                                handleResultFormChange(
                                                    participant.id,
                                                    "notes",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Optionele notitie"
                                            disabled={disabled || isUpdating}
                                            rows={2}
                                        />
                                    </td>

                                    <td className="trainingen-table__actions-cell">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSaveResult(participant.id)
                                            }
                                            disabled={disabled || isUpdating}
                                            className="trainingen-page__button trainingen-page__button--small"
                                        >
                                            <Save aria-hidden="true" />
                                            {isUpdating
                                                ? "Opslaan..."
                                                : "Resultaat opslaan"}
                                        </button>

                                        {!disabled && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveParticipant(participant)
                                                }
                                                disabled={isUpdating}
                                                className="trainingen-page__button trainingen-page__button--danger trainingen-page__button--small"
                                            >
                                                <Trash2 aria-hidden="true" />
                                                Verwijderen
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TrainingParticipantsSection;
