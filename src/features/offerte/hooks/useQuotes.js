import { useCallback, useEffect, useState } from "react";
import quoteService from "../services/quoteService.js";

function extractQuotes(response) {
    const data = response?.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.data)) return data.data;

    return [];
}

function normalizeQuote(quote) {
    const customer = quote?.customer || {};
    return {
        ...quote,
        createdAt: quote?.quoteDate,
        company: customer.name,
        street: customer.street,
        houseNumber: customer.houseNumber,
        postalCode: customer.postalCode,
        city: customer.city,
        mode: "OFFERTE",
    };
}

function extractErrorMessage(error) {
    const responseData = error?.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
        return responseData;
    }

    return responseData?.message || error?.message || "Het laden van de offertes is mislukt.";
}

export default function useQuotes(initialFilter = "open") {
    const [filter, setFilter] = useState(initialFilter);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadQuotes = useCallback(async (activeFilter) => {
        setLoading(true);
        setError("");

        try {
            const response = await quoteService.getAllQuotes();
            const allQuotes = extractQuotes(response).map(normalizeQuote);
            const closedStatuses = ["ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"];
            setQuotes(
                activeFilter === "all"
                    ? allQuotes
                    : activeFilter === "archived"
                        ? allQuotes.filter((quote) => closedStatuses.includes(quote.status))
                        : allQuotes.filter((quote) => !closedStatuses.includes(quote.status))
            );
        } catch (requestError) {
            setQuotes([]);
            setError(extractErrorMessage(requestError));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadQuotes(filter);
    }, [filter, loadQuotes]);

    return {
        quotes,
        loading,
        error,
        filter,
        setFilter,
        refresh: () => loadQuotes(filter),
    };
}
