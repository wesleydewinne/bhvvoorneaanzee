import { useMemo, useState } from "react";
import { formatCurrency } from "../helpers/quoteFormatters.js";

function toSafeNumber(value) {
    if (value === "" || value === null || value === undefined) {
        return 0;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function PlusIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 5v14M5 12h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M4 7h16M9 7V5h6v2M8 7l1 12h6l1-12M10 11v5M14 11v5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 20h9M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function QuoteDetailTrainingCard({
                                                    trainings = [],
                                                    trainingOptions = [],
                                                    formState,
                                                    editingParticipantsIndex,
                                                    participantDraft,
                                                    pricingTrainingIndex,
                                                    onAddTraining,
                                                    onStartEditParticipants,
                                                    onParticipantDraftChange,
                                                    onSaveParticipants,
                                                    onCancelEditParticipants,
                                                    onStartEditPricing,
                                                    onDoneEditingPricing,
                                                    onCancelEditingPricing,
                                                    onFieldChange,
                                                    onRemoveTraining
                                                }) {
    const [selectedTrainingType, setSelectedTrainingType] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const trainingTypeOptions = useMemo(() => {
        return Array.isArray(trainingOptions) ? trainingOptions : [];
    }, [trainingOptions]);

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setSelectedTrainingType("");
    };

    const handleAddTrainingClick = async () => {
        const saved = await onAddTraining?.(selectedTrainingType);

        if (saved) {
            closeAddModal();
        }
    };

    return (
        <section className="quote-detail-card">
            <div className="quote-training-header">
                <div>
                    <h2 className="quote-training-title">Trainingen</h2>
                    <p className="quote-training-subtitle">
                        Beheer hier de gekoppelde trainingen, deelnemers en prijsgegevens.
                    </p>
                </div>

                <button
                    type="button"
                    className="quote-training-add-btn"
                    onClick={openAddModal}
                    aria-label="Training toevoegen"
                >
                    <PlusIcon />
                    <span>Training toevoegen</span>
                </button>
            </div>

            {!trainings.length && (
                <p className="quote-training-empty">
                    Er zijn nog geen trainingen gekoppeld aan deze offerte.
                </p>
            )}

            <div className="quote-training-list">
                {trainings.map((training, index) => {
                    const isEditingParticipants = editingParticipantsIndex === index;
                    const isEditingPricing = pricingTrainingIndex === index;

                    const trainingTitle =
                        training?.trainingDisplayName ||
                        training?.trainingName ||
                        training?.trainingType ||
                        `Training ${index + 1}`;

                    const participantCount = training?.participantCount ?? "";
                    const numberOfExercises = training?.numberOfExercises ?? "";
                    const numberOfGroups = training?.numberOfGroups ?? "";
                    const groupDistribution = training?.groupDistribution ?? "-";

                    const displayPriceBeforeDiscount = isEditingPricing
                        ? toSafeNumber(formState?.priceBeforeDiscount)
                        : toSafeNumber(training?.priceBeforeDiscount ?? training?.totalPrice);

                    const displayDiscountAmount = isEditingPricing
                        ? toSafeNumber(formState?.discountAmount)
                        : (
                            training?.discountAmount !== null &&
                            training?.discountAmount !== undefined &&
                            Number(training?.discountAmount) !== 0
                                ? toSafeNumber(training?.discountAmount)
                                : Math.max(
                                    toSafeNumber(training?.priceBeforeDiscount ?? training?.totalPrice) +
                                    toSafeNumber(training?.travelSurcharge) -
                                    toSafeNumber(training?.totalPriceAfterDiscount ?? training?.totalPrice),
                                    0
                                )
                        );

                    const displayTravelSurcharge = isEditingPricing
                        ? toSafeNumber(formState?.travelSurcharge)
                        : toSafeNumber(training?.travelSurcharge);

                    const displayTotalPrice = isEditingPricing
                        ? toSafeNumber(formState?.totalPrice)
                        : toSafeNumber(training?.totalPriceAfterDiscount ?? training?.totalPrice);

                    return (
                        <article
                            key={training?.id ?? `training-${index}`}
                            className="quote-training-item"
                        >
                            <div className="quote-training-item-top">
                                <div>
                                    <h3>{trainingTitle}</h3>
                                    <p className="quote-training-type">
                                        Type: {training?.trainingType || "-"}
                                    </p>
                                </div>

                                <span className="quote-training-badge">
                                    Training {index + 1}
                                </span>
                            </div>

                            <div className="quote-training-content-grid">
                                <div className="quote-training-field">
                                    <label>Deelnemers</label>

                                    {isEditingParticipants ? (
                                        <div className="quote-training-inline-edit">
                                            <input
                                                type="number"
                                                min="1"
                                                value={participantDraft}
                                                onChange={(e) =>
                                                    onParticipantDraftChange?.(e.target.value)
                                                }
                                            />

                                            <div className="quote-training-inline-actions">
                                                <button
                                                    type="button"
                                                    className="quote-inline-save-btn"
                                                    onClick={() => onSaveParticipants?.(index)}
                                                >
                                                    Opslaan
                                                </button>

                                                <button
                                                    type="button"
                                                    className="quote-btn quote-btn-secondary"
                                                    onClick={onCancelEditParticipants}
                                                >
                                                    Annuleren
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>{participantCount || "-"}</p>
                                    )}
                                </div>

                                <div className="quote-training-field">
                                    <label>Oefeningen</label>
                                    <p>{numberOfExercises || "-"}</p>
                                </div>

                                <div className="quote-training-field">
                                    <label>Aantal groepen</label>
                                    <p>{numberOfGroups || "-"}</p>
                                </div>

                                <div className="quote-training-field">
                                    <label>Groepsverdeling</label>
                                    <p>{groupDistribution}</p>
                                </div>

                                <div className="quote-training-field">
                                    <label>Op locatie</label>
                                    <p>{training?.onSite ? "Ja" : "Nee"}</p>
                                </div>

                                <div className="quote-training-field">
                                    <label>Extra retour-km</label>
                                    <p>{toSafeNumber(training?.extraReturnKm).toFixed(2)} km</p>
                                </div>
                            </div>

                            <div className="quote-training-pricing-block">
                                <div className="quote-training-pricing-header">
                                    <strong>Prijsgegevens</strong>
                                </div>

                                {isEditingPricing ? (
                                    <div className="quote-training-pricing-grid">
                                        <div className="quote-training-field">
                                            <label htmlFor={`priceBeforeDiscount-${index}`}>
                                                Prijs vóór korting
                                            </label>
                                            <input
                                                id={`priceBeforeDiscount-${index}`}
                                                type="number"
                                                step="0.01"
                                                value={formState?.priceBeforeDiscount ?? ""}
                                                onChange={(e) =>
                                                    onFieldChange?.(
                                                        "priceBeforeDiscount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="quote-training-field">
                                            <label htmlFor={`discountAmount-${index}`}>
                                                Korting
                                            </label>
                                            <input
                                                id={`discountAmount-${index}`}
                                                type="number"
                                                step="0.01"
                                                value={formState?.discountAmount ?? ""}
                                                onChange={(e) =>
                                                    onFieldChange?.(
                                                        "discountAmount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="quote-training-field">
                                            <label htmlFor={`travelSurcharge-${index}`}>
                                                Reiskosten
                                            </label>
                                            <input
                                                id={`travelSurcharge-${index}`}
                                                type="number"
                                                step="0.01"
                                                value={formState?.travelSurcharge ?? ""}
                                                onChange={(e) =>
                                                    onFieldChange?.(
                                                        "travelSurcharge",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="quote-training-field">
                                            <label htmlFor={`totalPrice-${index}`}>
                                                Eindtotaal
                                            </label>
                                            <input
                                                id={`totalPrice-${index}`}
                                                type="number"
                                                step="0.01"
                                                value={formState?.totalPrice ?? ""}
                                                onChange={(e) =>
                                                    onFieldChange?.("totalPrice", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="quote-training-pricing-edit-actions">
                                            <button
                                                type="button"
                                                className="quote-inline-save-btn"
                                                onClick={onDoneEditingPricing}
                                            >
                                                Opslaan
                                            </button>

                                            <button
                                                type="button"
                                                className="quote-btn quote-btn-secondary"
                                                onClick={onCancelEditingPricing}
                                            >
                                                Annuleren
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="quote-training-pricing-grid">
                                        <div className="quote-training-field">
                                            <label>Prijs per persoon</label>
                                            <p>
                                                {formatCurrency(
                                                    toSafeNumber(training?.pricePerPerson)
                                                )}
                                            </p>
                                        </div>

                                        <div className="quote-training-field">
                                            <label>Prijs vóór korting</label>
                                            <p>{formatCurrency(displayPriceBeforeDiscount)}</p>
                                        </div>

                                        <div className="quote-training-field">
                                            <label>Korting</label>
                                            <p>{formatCurrency(displayDiscountAmount)}</p>
                                        </div>

                                        <div className="quote-training-field">
                                            <label>Reiskosten</label>
                                            <p>{formatCurrency(displayTravelSurcharge)}</p>
                                        </div>

                                        <div className="quote-training-field">
                                            <label>Eindtotaal</label>
                                            <p className="quote-training-total-price">
                                                {formatCurrency(displayTotalPrice)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="quote-training-toolbar">
                                <button
                                    type="button"
                                    className="quote-training-icon-btn quote-training-icon-btn-danger"
                                    onClick={() => onRemoveTraining?.(index)}
                                    aria-label={`Verwijder ${trainingTitle}`}
                                    title="Training verwijderen"
                                >
                                    <TrashIcon />
                                </button>

                                <button
                                    type="button"
                                    className="quote-training-icon-btn"
                                    onClick={() => onStartEditParticipants?.(index, training)}
                                    aria-label={`Wijzig deelnemers voor ${trainingTitle}`}
                                    title="Deelnemers wijzigen"
                                >
                                    <UsersIcon />
                                </button>

                                <button
                                    type="button"
                                    className="quote-training-icon-btn"
                                    onClick={() => onStartEditPricing?.(index, training)}
                                    aria-label={`Wijzig prijs voor ${trainingTitle}`}
                                    title="Prijs wijzigen"
                                >
                                    <EditIcon />
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>

            {isAddModalOpen && (
                <div className="quote-modal-overlay" onClick={closeAddModal}>
                    <div
                        className="quote-modal"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-training-title"
                    >
                        <div className="quote-modal-header">
                            <h3 id="add-training-title">Training toevoegen</h3>
                            <button
                                type="button"
                                className="quote-modal-close"
                                onClick={closeAddModal}
                                aria-label="Sluiten"
                            >
                                ×
                            </button>
                        </div>

                        <div className="quote-modal-body">
                            <div className="quote-training-field">
                                <label htmlFor="new-training-type">Trainingstype</label>
                                <select
                                    id="new-training-type"
                                    value={selectedTrainingType}
                                    onChange={(e) => setSelectedTrainingType(e.target.value)}
                                >
                                    <option value="">Kies trainingstype</option>
                                    {trainingTypeOptions.map((option) => (
                                        <option key={option.code} value={option.code}>
                                            {option.displayName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="quote-modal-actions">
                            <button
                                type="button"
                                className="quote-btn quote-btn-secondary"
                                onClick={closeAddModal}
                            >
                                Annuleren
                            </button>

                            <button
                                type="button"
                                className="quote-btn quote-btn-primary"
                                onClick={handleAddTrainingClick}
                                disabled={!selectedTrainingType}
                            >
                                Toevoegen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}