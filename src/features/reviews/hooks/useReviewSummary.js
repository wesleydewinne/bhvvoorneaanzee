import { useEffect, useState } from "react";
import reviewService from "@/features/reviews/services/reviewService.js";

function useReviewSummary() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchSummary = async () => {
            try {
                setLoading(true);
                const data = await reviewService.getReviewSummary();

                if (isMounted) {
                    setSummary(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchSummary();

        return () => {
            isMounted = false;
        };
    }, []);

    return { summary, loading, error };
}

export default useReviewSummary;