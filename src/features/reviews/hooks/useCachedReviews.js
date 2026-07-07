import { useEffect, useState } from "react";
import reviewService from "../services/reviewService.js";

export function useCachedReviews() {
    const [status, setStatus] = useState("loading");
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        let mounted = true;

        const loadReviews = async () => {
            try {
                const data = await reviewService.getPublicReviews();

                if (!mounted) return;

                setReviews(data.reviews ?? []);
                setRating(data.rating ?? null);
                setTotal(data.total ?? null);
                setStatus("success");
            } catch {
                if (!mounted) return;

                setStatus("fallback");
            }
        };

        loadReviews();

        return () => {
            mounted = false;
        };
    }, []);

    return { status, reviews, rating, total };
}
