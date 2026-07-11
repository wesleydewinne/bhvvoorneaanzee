import { useEffect, useState } from "react";
import reviewService from "@/features/reviews/services/reviewService.js";

function useReviewSummary() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        let idleId = null;
        let timeoutId = null;

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

        const scheduleFetch = () => {
            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(fetchSummary, { timeout: 2500 });
                return;
            }

            timeoutId = window.setTimeout(fetchSummary, 1200);
        };

        if (document.readyState === "complete") {
            scheduleFetch();
        } else {
            window.addEventListener("load", scheduleFetch, { once: true });
        }

        return () => {
            isMounted = false;
            window.removeEventListener("load", scheduleFetch);

            if (idleId !== null && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, []);

    return { summary, loading, error };
}

export default useReviewSummary;
