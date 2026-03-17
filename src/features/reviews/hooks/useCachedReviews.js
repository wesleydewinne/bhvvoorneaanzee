import { useEffect, useState } from "react";

export function useCachedReviews() {
    const [status, setStatus] = useState("loading");
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        fetch("https://jouw-backend-domein.nl/api/public/reviews")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Kan reviews niet ophalen");
                }
                return res.json();
            })
            .then((data) => {
                setReviews(data.reviews ?? []);
                setRating(data.rating ?? null);
                setTotal(data.total ?? null);
                setStatus("success");
            })
            .catch(() => {
                setStatus("fallback");
            });
    }, []);

    return { status, reviews, rating, total };
}