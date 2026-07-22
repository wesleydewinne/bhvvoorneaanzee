import { useCallback, useEffect, useState } from "react";
import quoteService from "../services/quoteService.js";

function extractQuotes(response) {
    const data = response?.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.data)) return data.data;

    return [];
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
            const response = activeFilter === "archived"
                ? await quoteService.getArchivedQuotes()
                : activeFilter === "all"
                    ? await quoteService.getAllQuotes()
                    : await quoteService.getOpenQuotes();

            setQuotes(extractQuotes(response));
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
