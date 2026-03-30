import { useState } from "react";

function toSafeNumber(value) {
    if (value === "" || value === null || value === undefined) {
        return 0;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function roundCurrency(value) {
    return Math.round(value * 100) / 100;
}

export default function useQuoteDetailTrainings({
                                                    setFormState,
                                                    setError
                                                }) {
    const [pricingTrainingIndex, setPricingTrainingIndex] = useState(null);
    const [editingParticipantsIndex, setEditingParticipantsIndex] = useState(null);
    const [participantDraft, setParticipantDraft] = useState("");

    const handleStartEditPricing = (index, training) => {
        setPricingTrainingIndex(index);
        setError("");

        const priceBeforeDiscount =
            training?.priceBeforeDiscount ??
            training?.totalPrice ??
            roundCurrency(
                toSafeNumber(training?.pricePerPerson) * toSafeNumber(training?.participantCount)
            );

        const discountAmount = training?.discountAmount ?? 0;
        const travelSurcharge = training?.travelSurcharge ?? 0;

        const totalPriceAfterDiscount =
            training?.totalPriceAfterDiscount ??
            Math.max(
                roundCurrency(
                    toSafeNumber(priceBeforeDiscount) -
                    toSafeNumber(discountAmount) +
                    toSafeNumber(travelSurcharge)
                ),
                0
            );

        setFormState((prev) => ({
            ...prev,
            priceBeforeDiscount: String(priceBeforeDiscount),
            discountAmount: String(discountAmount),
            travelSurcharge: String(travelSurcharge),
            totalPrice: String(totalPriceAfterDiscount),
            discountTrainingIndex: String(index)
        }));
    };

    const handleCancelEditingPricing = () => {
        setPricingTrainingIndex(null);
        setError("");
    };

    const handleStartEditParticipants = (index, training) => {
        setEditingParticipantsIndex(index);
        setParticipantDraft(String(training?.participantCount ?? ""));
        setError("");
    };

    const handleParticipantDraftChange = (value) => {
        setParticipantDraft(value);
        setError("");
    };

    const handleCancelEditParticipants = () => {
        setEditingParticipantsIndex(null);
        setParticipantDraft("");
        setError("");
    };

    const resetPricingEditState = () => {
        setPricingTrainingIndex(null);
    };

    const resetParticipantEditState = () => {
        setEditingParticipantsIndex(null);
        setParticipantDraft("");
    };

    return {
        pricingTrainingIndex,
        editingParticipantsIndex,
        participantDraft,

        handleStartEditPricing,
        handleCancelEditingPricing,

        handleStartEditParticipants,
        handleParticipantDraftChange,
        handleCancelEditParticipants,

        resetPricingEditState,
        resetParticipantEditState
    };
}