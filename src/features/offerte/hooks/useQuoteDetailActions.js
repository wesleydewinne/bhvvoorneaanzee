import { useState } from "react";
import quoteService from "../services/quoteService.js";
import { normalizeQuoteToFormState } from "./useQuoteDetailData.js";

function toNullableNumber(value) {
    if (value === "" || value === null || value === undefined) {
        return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
}

function toNullableInteger(value) {
    if (value === "" || value === null || value === undefined) {
        return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : Math.trunc(parsed);
}

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

function extractApiErrorMessage(err, fallbackMessage) {
    const responseData = err?.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
        return responseData;
    }

    if (responseData?.message && String(responseData.message).trim()) {
        return responseData.message;
    }

    if (responseData?.error && String(responseData.error).trim()) {
        return responseData.error;
    }

    if (err?.message && String(err.message).trim()) {
        return err.message;
    }

    return fallbackMessage;
}

function normalizeTrainingsForUpdate(trainings) {
    if (!Array.isArray(trainings)) {
        return [];
    }

    return trainings.map((training) => ({
        id: training?.id ?? null,
        participantCount: toNullableInteger(training?.participantCount),
        onSite: training?.onSite ?? false,
        numberOfGroups: toNullableInteger(training?.numberOfGroups),
        groupDistribution: training?.groupDistribution ?? null,
        pricePerPerson: toNullableNumber(training?.pricePerPerson),
        totalPrice: toNullableNumber(training?.totalPrice),
        discountAmount: toNullableNumber(training?.discountAmount),
        travelSurcharge: toNullableNumber(training?.travelSurcharge),
        totalPriceAfterDiscount: toNullableNumber(training?.totalPriceAfterDiscount),
        priceBeforeDiscount: toNullableNumber(training?.priceBeforeDiscount),
        extraReturnKm: toNullableNumber(training?.extraReturnKm),
        trainingType: training?.trainingType ?? null,
        trainingName: training?.trainingName ?? null,
        trainingDisplayName: training?.trainingDisplayName ?? null
    }));
}

function calculateQuoteTotals(trainings = []) {
    return (Array.isArray(trainings) ? trainings : []).reduce(
        (acc, training) => {
            const priceBeforeDiscount = roundCurrency(
                toSafeNumber(training?.priceBeforeDiscount ?? training?.totalPrice ?? 0)
            );
            const discountAmount = roundCurrency(toSafeNumber(training?.discountAmount));
            const travelSurcharge = roundCurrency(toSafeNumber(training?.travelSurcharge));
            const totalExtraKm = roundCurrency(toSafeNumber(training?.extraReturnKm));

            const totalPrice = roundCurrency(
                Math.max(
                    toSafeNumber(training?.totalPriceAfterDiscount ?? training?.totalPrice),
                    0
                )
            );

            acc.priceBeforeDiscount = roundCurrency(
                acc.priceBeforeDiscount + priceBeforeDiscount
            );
            acc.discountAmount = roundCurrency(
                acc.discountAmount + discountAmount
            );
            acc.travelSurcharge = roundCurrency(
                acc.travelSurcharge + travelSurcharge
            );
            acc.totalPrice = roundCurrency(
                acc.totalPrice + totalPrice
            );
            acc.totalExtraKm = roundCurrency(
                acc.totalExtraKm + totalExtraKm
            );

            return acc;
        },
        {
            priceBeforeDiscount: 0,
            discountAmount: 0,
            travelSurcharge: 0,
            totalPrice: 0,
            totalExtraKm: 0
        }
    );
}

function buildUpdatePayload(formState, trainings = []) {
    const normalizedTrainings = normalizeTrainingsForUpdate(trainings);
    const totals = calculateQuoteTotals(normalizedTrainings);

    return {
        status: formState.status || null,
        internalNotes: formState.internalNotes?.trim() || null,
        remarks: formState.remarks?.trim() || null,
        discountCode: formState.discountCode?.trim() || null,

        discountTrainingIndex: toNullableInteger(formState.discountTrainingIndex),
        travelSurcharge: toNullableNumber(totals.travelSurcharge),
        travelSurchargePerTraining: null,
        priceBeforeDiscount: toNullableNumber(totals.priceBeforeDiscount),

        discountAmount:
            formState?.discountAmount !== "" &&
            formState?.discountAmount !== null &&
            formState?.discountAmount !== undefined
                ? toNullableNumber(formState.discountAmount)
                : toNullableNumber(totals.discountAmount),

        totalPrice: toNullableNumber(totals.totalPrice),
        totalExtraKm: toNullableNumber(totals.totalExtraKm),

        trainings: normalizedTrainings
    };
}

async function syncQuoteState({
                                  updated,
                                  loadQuote,
                                  setQuote,
                                  setFormState
                              }) {
    if (updated && typeof updated === "object" && !Array.isArray(updated)) {
        setQuote(updated);
        setFormState(normalizeQuoteToFormState(updated));
        return true;
    }

    const refreshed = await loadQuote({ withLoader: false });

    if (!refreshed) {
        return false;
    }

    setQuote(refreshed);
    setFormState(normalizeQuoteToFormState(refreshed));
    return true;
}

function calculateNumberOfGroups(participantCount) {
    if (!participantCount || participantCount < 1) {
        return 1;
    }

    return Math.ceil(participantCount / 10);
}

function calculateGroupDistribution(participantCount, numberOfGroups) {
    if (!participantCount || participantCount < 1) {
        return "";
    }

    if (!numberOfGroups || numberOfGroups < 1) {
        return String(participantCount);
    }

    const baseSize = Math.floor(participantCount / numberOfGroups);
    const remainder = participantCount % numberOfGroups;

    const groups = Array.from({ length: numberOfGroups }, (_, index) =>
        index < remainder ? baseSize + 1 : baseSize
    );

    return groups.join(", ");
}

export default function useQuoteDetailActions({
                                                  id,
                                                  quote,
                                                  formState,
                                                  setQuote,
                                                  setFormState,
                                                  loadQuote,
                                                  setError
                                              }) {
    const [saving, setSaving] = useState(false);
    const [patchSaving, setPatchSaving] = useState(false);
    const [archiving, setArchiving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const clearMessages = () => {
        setError("");
        setSuccessMessage("");
    };

    const saveQuote = async (trainings = null, nextFormState = null) => {
        if (!id || !formState) {
            return false;
        }

        setSaving(true);
        clearMessages();

        try {
            const trainingsForSave = Array.isArray(trainings)
                ? trainings
                : Array.isArray(quote?.trainings)
                    ? quote.trainings
                    : [];

            const formStateForSave = nextFormState ?? formState;

            const payload = buildUpdatePayload(formStateForSave, trainingsForSave);
            const response = await quoteService.updateQuote(id, payload);
            const updated = response?.data;

            const synced = await syncQuoteState({
                updated,
                loadQuote,
                setQuote,
                setFormState
            });

            if (!synced) {
                setError("De offerte lijkt opgeslagen, maar vernieuwen van de detailpagina is mislukt.");
                return false;
            }

            setSuccessMessage("Offerte succesvol opgeslagen.");
            return true;
        } catch (err) {
            setError(
                extractApiErrorMessage(err, "Het opslaan van de offerte is mislukt.")
            );
            return false;
        } finally {
            setSaving(false);
        }
    };

    const addTraining = async (selectedType, trainingOptions = []) => {
        if (!selectedType) {
            setError("Kies eerst een trainingstype.");
            setSuccessMessage("");
            return false;
        }

        const matchedTraining = trainingOptions.find(
            (training) => training.code === selectedType
        );

        const newTraining = {
            id: null,
            trainingType: selectedType,
            trainingName: matchedTraining?.displayName ?? selectedType,
            trainingDisplayName: matchedTraining?.displayName ?? selectedType,
            participantCount: 1,
            onSite: true,
            numberOfGroups: null,
            groupDistribution: null,
            pricePerPerson: null,
            priceBeforeDiscount: null,
            discountAmount: 0,
            travelSurcharge: 0,
            extraReturnKm: 0,
            totalPriceAfterDiscount: null,
            totalPrice: null
        };

        const updatedTrainings = [...(quote?.trainings ?? []), newTraining];
        const saved = await saveQuote(updatedTrainings);

        if (saved) {
            setSuccessMessage("Nieuwe training toegevoegd.");
        }

        return saved;
    };

    const removeTraining = async (indexToRemove) => {
        const updatedTrainings = (quote?.trainings ?? []).filter(
            (_, index) => index !== indexToRemove
        );

        const saved = await saveQuote(updatedTrainings);

        if (saved) {
            setSuccessMessage("Training verwijderd.");
        }

        return saved;
    };

    const updateTrainingParticipants = async (index, participantDraft) => {
        const participantCount = Math.max(1, Math.trunc(toSafeNumber(participantDraft)));

        const updatedTrainings = (quote?.trainings ?? []).map((training, trainingIndex) => {
            if (trainingIndex !== index) {
                return training;
            }

            const pricePerPerson = toSafeNumber(training?.pricePerPerson);
            const numberOfGroups = calculateNumberOfGroups(participantCount);
            const groupDistribution = calculateGroupDistribution(
                participantCount,
                numberOfGroups
            );

            const priceBeforeDiscount = roundCurrency(pricePerPerson * participantCount);
            const discountAmount = roundCurrency(toSafeNumber(training?.discountAmount));
            const travelSurcharge = roundCurrency(toSafeNumber(training?.travelSurcharge));
            const totalPriceAfterDiscount = Math.max(
                roundCurrency(priceBeforeDiscount - discountAmount + travelSurcharge),
                0
            );

            return {
                ...training,
                participantCount,
                numberOfGroups,
                groupDistribution,
                priceBeforeDiscount,
                discountAmount,
                travelSurcharge,
                totalPriceAfterDiscount,
                totalPrice: totalPriceAfterDiscount
            };
        });

        const saved = await saveQuote(updatedTrainings);

        if (saved) {
            setSuccessMessage("Aantal deelnemers bijgewerkt.");
        }

        return saved;
    };

    const updateTrainingPricing = async (index, currentFormState) => {
        if (index === null || !currentFormState) {
            return false;
        }

        const priceBeforeDiscount = roundCurrency(
            toSafeNumber(currentFormState.priceBeforeDiscount)
        );
        const discountAmount = roundCurrency(
            toSafeNumber(currentFormState.discountAmount)
        );
        const travelSurcharge = roundCurrency(
            toSafeNumber(currentFormState.travelSurcharge)
        );
        const totalPriceAfterDiscount = Math.max(
            roundCurrency(priceBeforeDiscount - discountAmount + travelSurcharge),
            0
        );

        const updatedTrainings = (quote?.trainings ?? []).map((training, trainingIndex) =>
            trainingIndex === index
                ? {
                    ...training,
                    priceBeforeDiscount,
                    discountAmount,
                    travelSurcharge,
                    totalPriceAfterDiscount,
                    totalPrice: totalPriceAfterDiscount
                }
                : training
        );

        const nextFormState = {
            ...currentFormState,
            discountTrainingIndex: String(index)
        };

        const saved = await saveQuote(updatedTrainings, nextFormState);

        if (saved) {
            setSuccessMessage("Prijs van training bijgewerkt.");
        }

        return saved;
    };

    const saveStatus = async () => {
        if (!id || !formState) {
            return false;
        }

        if (formState.status === quote?.status) {
            return true;
        }

        setPatchSaving(true);
        clearMessages();

        try {
            const response = await quoteService.patchQuote(id, {
                status: formState.status || null
            });

            const updated = response?.data;

            const synced = await syncQuoteState({
                updated,
                loadQuote,
                setQuote,
                setFormState
            });

            if (!synced) {
                setError("De status lijkt opgeslagen, maar vernieuwen van de detailpagina is mislukt.");
                return false;
            }

            setSuccessMessage("Status succesvol bijgewerkt.");
            return true;
        } catch (err) {
            setError(
                extractApiErrorMessage(err, "Status wijzigen is niet gelukt.")
            );
            return false;
        } finally {
            setPatchSaving(false);
        }
    };

    const archiveQuote = async () => {
        if (!id) {
            return false;
        }

        setArchiving(true);
        clearMessages();

        try {
            const response = await quoteService.archiveQuote(id);
            const updated = response?.data;

            const synced = await syncQuoteState({
                updated,
                loadQuote,
                setQuote,
                setFormState
            });

            if (!synced) {
                setError("De offerte lijkt gearchiveerd, maar vernieuwen van de detailpagina is mislukt.");
                return false;
            }

            setSuccessMessage("Offerte is gearchiveerd.");
            return true;
        } catch (err) {
            setError(
                extractApiErrorMessage(err, "Het archiveren van de offerte is mislukt.")
            );
            return false;
        } finally {
            setArchiving(false);
        }
    };

    return {
        saving,
        patchSaving,
        archiving,
        successMessage,
        setSuccessMessage,
        clearMessages,
        saveQuote,
        saveStatus,
        archiveQuote,
        addTraining,
        removeTraining,
        updateTrainingParticipants,
        updateTrainingPricing
    };
}