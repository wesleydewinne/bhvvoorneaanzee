import { useCallback, useEffect, useState } from "react";
import quoteService from "../services/quoteService.js";

function buildUpdatePayload(formState) {
    return {
        status: formState.status || null,
        internalNotes: formState.internalNotes ?? null,
        remarks: formState.remarks ?? null,
        discountCode: formState.discountCode ?? null,
        discountTrainingIndex:
            formState.discountTrainingIndex === "" || formState.discountTrainingIndex === null
                ? null
                : Number(formState.discountTrainingIndex),
        travelSurcharge:
            formState.travelSurcharge === "" ? null : Number(formState.travelSurcharge),
        travelSurchargePerTraining:
            formState.travelSurchargePerTraining === ""
                ? null
                : Number(formState.travelSurchargePerTraining),
        priceBeforeDiscount:
            formState.priceBeforeDiscount === "" ? null : Number(formState.priceBeforeDiscount),
        discountAmount:
            formState.discountAmount === "" ? null : Number(formState.discountAmount),
        totalPrice:
            formState.totalPrice === "" ? null : Number(formState.totalPrice),
    };
}

export default function useQuoteDetail(id) {
    const [quote, setQuote] = useState(null);
    const [formState, setFormState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [archiving, setArchiving] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const loadQuote = useCallback(async () => {
        if (!id) return;

        setLoading(true);
        setError("");

        try {
            const response = await quoteService.getQuoteById(id);
            const detail = response.data;

            setQuote(detail);
            setFormState({
                status: detail.status || "",
                internalNotes: detail.internalNotes || "",
                remarks: detail.remarks || "",
                discountCode: detail.discountCode || "",
                discountTrainingIndex:
                    detail.discountTrainingIndex ?? "",
                travelSurcharge: detail.travelSurcharge ?? "",
                travelSurchargePerTraining: detail.travelSurchargePerTraining ?? "",
                priceBeforeDiscount: detail.priceBeforeDiscount ?? "",
                discountAmount: detail.discountAmount ?? "",
                totalPrice: detail.totalPrice ?? "",
            });
        } catch (err) {
            console.error("Offertedetail laden mislukt:", err);
            setError("Het laden van de offerte is mislukt.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadQuote();
    }, [loadQuote]);

    const updateField = (name, value) => {
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveQuote = async () => {
        if (!id || !formState) return;

        setSaving(true);
        setError("");
        setSuccessMessage("");

        try {
            const payload = buildUpdatePayload(formState);
            const response = await quoteService.updateQuote(id, payload);
            const updated = response.data;

            setQuote(updated);
            setFormState({
                status: updated.status || "",
                internalNotes: updated.internalNotes || "",
                remarks: updated.remarks || "",
                discountCode: updated.discountCode || "",
                discountTrainingIndex: updated.discountTrainingIndex ?? "",
                travelSurcharge: updated.travelSurcharge ?? "",
                travelSurchargePerTraining: updated.travelSurchargePerTraining ?? "",
                priceBeforeDiscount: updated.priceBeforeDiscount ?? "",
                discountAmount: updated.discountAmount ?? "",
                totalPrice: updated.totalPrice ?? "",
            });
            setSuccessMessage("Offerte succesvol opgeslagen.");
        } catch (err) {
            console.error("Offerte opslaan mislukt:", err);
            setError("Het opslaan van de offerte is mislukt.");
        } finally {
            setSaving(false);
        }
    };

    const archiveQuote = async () => {
        if (!id) return;

        setArchiving(true);
        setError("");
        setSuccessMessage("");

        try {
            await quoteService.archiveQuote(id);
            await loadQuote();
            setSuccessMessage("Offerte is gearchiveerd.");
        } catch (err) {
            console.error("Offerte archiveren mislukt:", err);
            setError("Het archiveren van de offerte is mislukt.");
        } finally {
            setArchiving(false);
        }
    };

    return {
        quote,
        formState,
        loading,
        saving,
        archiving,
        error,
        successMessage,
        updateField,
        saveQuote,
        archiveQuote,
        refresh: loadQuote,
    };
}