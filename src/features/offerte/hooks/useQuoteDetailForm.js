import { useEffect, useState } from "react";
import { normalizeQuoteToFormState } from "./useQuoteDetailData.js";

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

export default function useQuoteDetailForm(quote) {
    const [formState, setFormState] = useState(null);

    useEffect(() => {
        if (!quote) {
            return;
        }

        setFormState(normalizeQuoteToFormState(quote));
    }, [quote]);

    const updateField = (name, value) => {
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const priceBeforeDiscountValue = formState?.priceBeforeDiscount;
    const discountAmountValue = formState?.discountAmount;
    const travelSurchargeValue = formState?.travelSurcharge;
    const totalPriceValue = formState?.totalPrice;

    useEffect(() => {
        if (!formState) {
            return;
        }

        const priceBeforeDiscount = roundCurrency(toSafeNumber(priceBeforeDiscountValue));
        const rawDiscountAmount = roundCurrency(toSafeNumber(discountAmountValue));
        const travelSurcharge = roundCurrency(toSafeNumber(travelSurchargeValue));

        const normalizedDiscountAmount = Math.min(rawDiscountAmount, priceBeforeDiscount);
        const calculatedTotalPrice = Math.max(
            roundCurrency(priceBeforeDiscount - normalizedDiscountAmount + travelSurcharge),
            0
        );

        const nextDiscountAmount = String(normalizedDiscountAmount);
        const nextTotalPrice = String(calculatedTotalPrice);

        if (
            discountAmountValue === nextDiscountAmount &&
            totalPriceValue === nextTotalPrice
        ) {
            return;
        }

        setFormState((prev) => {
            if (!prev) {
                return prev;
            }

            return {
                ...prev,
                discountAmount: nextDiscountAmount,
                totalPrice: nextTotalPrice
            };
        });
    }, [
        formState,
        priceBeforeDiscountValue,
        discountAmountValue,
        travelSurchargeValue,
        totalPriceValue
    ]);

    return {
        formState,
        setFormState,
        updateField
    };
}