function getTrainingLabel(training, index) {
    const trainingType =
        training?.trainingDisplayName ||
        training?.trainingName ||
        training?.displayName ||
        training?.trainingType ||
        `Training ${index + 1}`;

    const participantCount =
        training?.participantCount ??
        training?.aantal ??
        training?.participants ??
        null;

    if (participantCount !== null && participantCount !== undefined && participantCount !== "") {
        return `${trainingType} (${participantCount} cursisten)`;
    }

    return trainingType;
}

export default function QuoteDetailPricingCard({
                                                   trainings = [],
                                                   formState,
                                                   onFieldChange,
                                                   onDoneEditingPricing,
                                                   onCancelEditingPricing
                                               }) {
    return (
        <section>
            <h2>Prijs aanpassen</h2>

            <div className="quote-pricing-section">
                <h3 className="quote-pricing-section-title">Korting toepassen</h3>

                <div className="quote-detail-grid">
                    <div>
                        <label htmlFor="discountCode">Kortingscode</label>
                        <input
                            id="discountCode"
                            type="text"
                            value={formState.discountCode}
                            onChange={(e) => onFieldChange("discountCode", e.target.value)}
                            placeholder="Bijvoorbeeld: WELKOM10"
                        />
                    </div>

                    <div>
                        <label htmlFor="discountTrainingIndex">Korting toepassen op training</label>
                        <select
                            id="discountTrainingIndex"
                            value={formState.discountTrainingIndex}
                            onChange={(e) => onFieldChange("discountTrainingIndex", e.target.value)}
                        >
                            <option value="">Geen specifieke training geselecteerd</option>
                            {trainings.map((training, index) => (
                                <option
                                    key={training.id ?? `${training.trainingType ?? "training"}-${index}`}
                                    value={index}
                                >
                                    {getTrainingLabel(training, index)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="priceBeforeDiscount">Prijs vóór korting</label>
                        <input
                            id="priceBeforeDiscount"
                            type="number"
                            step="0.01"
                            value={formState.priceBeforeDiscount}
                            onChange={(e) => onFieldChange("priceBeforeDiscount", e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="discountAmount">Kortingsbedrag</label>
                        <input
                            id="discountAmount"
                            type="number"
                            step="0.01"
                            value={formState.discountAmount}
                            onChange={(e) => onFieldChange("discountAmount", e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="quote-pricing-section">
                <h3 className="quote-pricing-section-title">Totaal</h3>

                <div className="quote-detail-grid">
                    <div className="quote-detail-col-span-2">
                        <label htmlFor="totalPrice">Eindtotaal</label>
                        <input
                            id="totalPrice"
                            type="number"
                            step="0.01"
                            value={formState.totalPrice}
                            readOnly
                        />
                        <small style={{ display: "block", marginTop: "0.5rem", color: "#667085" }}>
                            Wordt automatisch berekend: prijs vóór korting - korting + reiskosten.
                        </small>
                    </div>
                </div>
            </div>

            <div className="quote-pricing-section">
                <h3 className="quote-pricing-section-title">Reiskosten</h3>

                <div className="quote-detail-grid">
                    <div>
                        <label htmlFor="travelSurchargePerTraining">Reiskosten per rit</label>
                        <input
                            id="travelSurchargePerTraining"
                            type="number"
                            step="0.01"
                            value={formState.travelSurchargePerTraining}
                            onChange={(e) => onFieldChange("travelSurchargePerTraining", e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="travelSurcharge">Totale reiskosten</label>
                        <input
                            id="travelSurcharge"
                            type="number"
                            step="0.01"
                            value={formState.travelSurcharge}
                            onChange={(e) => onFieldChange("travelSurcharge", e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="totalExtraKm">Totale extra retour-km</label>
                        <input
                            id="totalExtraKm"
                            type="number"
                            step="0.01"
                            value={formState.totalExtraKm}
                            onChange={(e) => onFieldChange("totalExtraKm", e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginTop: "1rem"
                }}
            >
                <button
                    type="button"
                    className="quote-btn quote-btn-primary"
                    onClick={onDoneEditingPricing}
                >
                    Gereed
                </button>

                <button
                    type="button"
                    className="quote-btn"
                    onClick={onCancelEditingPricing}
                >
                    Annuleren
                </button>
            </div>
        </section>
    );
}