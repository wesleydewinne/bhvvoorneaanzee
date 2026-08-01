import { useCallback, useEffect, useState } from "react";
import quoteService from "../services/quoteService.js";

function normalizeText(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value);
}

export function normalizeQuoteToFormState(detail) {
    return {
        status: detail?.status || "",
        validUntil: detail?.validUntil || "",
        internalNotes: normalizeText(detail?.internalNotes),
        remarks: normalizeText(detail?.remarks),
        discountCode: normalizeText(detail?.discountCode),
        discountTrainingIndex:
            detail?.discountTrainingIndex === null || detail?.discountTrainingIndex === undefined
                ? ""
                : String(detail.discountTrainingIndex),
        travelSurcharge:
            detail?.travelSurcharge === null || detail?.travelSurcharge === undefined
                ? ""
                : String(detail.travelSurcharge),
        travelSurchargePerTraining:
            detail?.travelSurchargePerTraining === null ||
            detail?.travelSurchargePerTraining === undefined
                ? ""
                : String(detail.travelSurchargePerTraining),
        priceBeforeDiscount:
            detail?.priceBeforeDiscount === null || detail?.priceBeforeDiscount === undefined
                ? ""
                : String(detail.priceBeforeDiscount),
        discountAmount:
            detail?.discountAmount === null || detail?.discountAmount === undefined
                ? ""
                : String(detail.discountAmount),
        totalPrice:
            detail?.totalPrice === null || detail?.totalPrice === undefined
                ? ""
                : String(detail.totalPrice),
        totalExtraKm:
            detail?.totalExtraKm === null || detail?.totalExtraKm === undefined
                ? ""
                : String(detail.totalExtraKm)
    };
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

function normalizeTraining(training) {
    const participants = Number(training?.participantCount || 0);
    const baseSalesAmount = Number(training?.baseSalesAmount || 0);
    const subtotal = Number(training?.subtotalExcludingVat || 0);

    return {
        ...training,
        trainingDisplayName: training?.trainingName,
        trainingType: training?.trainingName,
        pricePerPerson:
            participants > 0 ? baseSalesAmount / participants : baseSalesAmount,
        priceBeforeDiscount: baseSalesAmount,
        discountAmount: Math.max(baseSalesAmount - subtotal, 0),
        travelSurcharge: 0,
        totalPriceAfterDiscount: subtotal,
        totalPrice: subtotal,
        totalCostAmount: Number(training?.totalCostAmount || 0),
        marginAmount: Number(training?.marginAmount || 0),
        marginPercentage: Number(training?.marginPercentage || 0),
    };
}

export function normalizeQuoteDetail(detail) {
    if (!detail || Array.isArray(detail?.trainings)) {
        return detail;
    }

    const customer = detail.customer || {};
    const trainings = Array.isArray(detail.quoteTrainings)
        ? detail.quoteTrainings.map(normalizeTraining)
        : [];

    return {
        ...detail,
        createdAt: detail.quoteDate,
        customerName: customer.contactPerson || customer.name,
        company: customer.name,
        email: customer.email,
        phone: customer.phone,
        street: customer.street,
        houseNumber: customer.houseNumber,
        postalCode: customer.postalCode,
        city: customer.city,
        remarks: detail.introduction || "",
        trainings,
        priceBeforeDiscount: trainings.reduce(
            (sum, training) => sum + training.priceBeforeDiscount,
            0
        ),
        discountAmount: trainings.reduce(
            (sum, training) => sum + training.discountAmount,
            0
        ),
        totalPrice: Number(detail.subtotalExcludingVat || 0),
        travelSurcharge: 0,
        totalExtraKm: 0,
    };
}

export default function useQuoteDetailData(id) {
    const [quote, setQuote] = useState(null);
    const [trainingOptions, setTrainingOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadQuote = useCallback(
        async ({ withLoader = true } = {}) => {
            if (!id) {
                return null;
            }

            if (withLoader) {
                setLoading(true);
            }

            setError("");

            try {
                const response = await quoteService.getQuoteById(id);
                const detail = normalizeQuoteDetail(response?.data);

                if (!detail) {
                    throw new Error("Geen offertedetails ontvangen van de server.");
                }

                setQuote(detail);
                return detail;
            } catch (err) {
                setError(
                    extractApiErrorMessage(
                        err,
                        "Het laden van de offerte is mislukt."
                    )
                );
                return null;
            } finally {
                if (withLoader) {
                    setLoading(false);
                }
            }
        },
        [id]
    );

    const loadTrainingTypes = useCallback(async () => {
        try {
            const response = await quoteService.getTrainingTypes();
            const options = Array.isArray(response?.data) ? response.data : [];
            setTrainingOptions(options);
            return options;
        } catch (err) {
            console.error("Trainingtypes laden mislukt:", err);
            return [];
        }
    }, []);

    useEffect(() => {
        void loadQuote();
    }, [loadQuote]);

    useEffect(() => {
        void loadTrainingTypes();
    }, [loadTrainingTypes]);

    return {
        quote,
        setQuote,
        trainingOptions,
        loading,
        error,
        setError,
        loadQuote
    };
}
