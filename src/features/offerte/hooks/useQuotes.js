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

            setQuotes(response.data ?? []);
        } catch (err) {
            console.error("Offertes laden mislukt:", err);
            setError("Het laden van de offertes is mislukt.");
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