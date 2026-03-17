import { useEffect, useState } from "react";
import reviewService from "../services/reviewService.js";

export function usePublicReviews() {
    const [status, setStatus] = useState("loading");
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [total, setTotal] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const loadReviews = async () => {
            try {
                setStatus("loading");
                setError(null);

                const data = await reviewService.getPublicReviews();

                if (!mounted) return;

                setReviews(data.reviews ?? []);
                setRating(data.rating ?? null);
                setTotal(data.total ?? null);
                setUpdatedAt(data.updatedAt ?? null);
                setStatus("success");
            } catch (err) {
                if (!mounted) return;

                setError(err?.message || "Reviews konden niet worden geladen.");
                setStatus("fallback");
            }
        };

        loadReviews();

        return () => {
            mounted = false;
        };
    }, []);

    return { status, reviews, rating, total, updatedAt, error };
}