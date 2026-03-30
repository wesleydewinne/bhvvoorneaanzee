import { useCallback, useEffect, useState } from "react";
import quoteService from "../services/quoteService.js";

export default function useQuotes(initialFilter = "open") {
    const [filter, setFilter] = useState(initialFilter);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadQuotes = useCallback(async (activeFilter = filter) => {
        setLoading(true);
        setError("");

        try {
            let response;

            if (activeFilter === "archived") {
                response = await quoteService.getArchivedQuotes();
            } else if (activeFilter === "all") {
                response = await quoteService.getAllQuotes();
            } else {
                response = await quoteService.getOpenQuotes();
            }

            console.log("[useQuotes] activeFilter:", activeFilter);
            console.log("[useQuotes] raw response:", response);
            console.log("[useQuotes] response.data:", response?.data);

            const data = response?.data;

            // 🔥 FIX: werkt met array én pageable response
            let normalizedQuotes = [];

            if (Array.isArray(data)) {
                normalizedQuotes = data;
            } else if (Array.isArray(data?.content)) {
                normalizedQuotes = data.content;
            } else if (Array.isArray(data?.data)) {
                normalizedQuotes = data.data;
            } else {
                normalizedQuotes = [];
            }

            console.log("[useQuotes] normalizedQuotes:", normalizedQuotes);

            setQuotes(normalizedQuotes);

        } catch (err) {
            console.error("❌ Offertes laden mislukt:", err);
            console.error("[useQuotes] status:", err?.response?.status);
            console.error("[useQuotes] data:", err?.response?.data);

            setError(
                err?.response?.data?.message ||
                "Het laden van de offertes is mislukt."
            );
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadQuotes(filter);
    }, [filter, loadQuotes]);

    const changeFilter = (nextFilter) => {
        setFilter(nextFilter);
    };

    const refresh = () => loadQuotes(filter);

    return {
        quotes,
        loading,
        error,
        filter,
        setFilter: changeFilter,
        refresh,
    };
}