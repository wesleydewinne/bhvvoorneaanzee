import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard.jsx";

const INTERVAL = 8000;

export default function ReviewCarousel({ status, reviews }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (status !== "success" || reviews.length <= 1) return;

        const timer = setInterval(() => {
            setActive((v) => (v + 1) % reviews.length);
        }, INTERVAL);

        return () => clearInterval(timer);
    }, [status, reviews.length]);

    if (status === "loading") {
        return <div className="review-loading">Reviews laden…</div>;
    }

    // 👇 GEEN fallback meer hier
    if (status !== "success" || reviews.length === 0) {
        return null;
    }

    const offsets =
        reviews.length >= 5
            ? [-2, -1, 0, 1, 2]
            : reviews.length === 4
                ? [-1, 0, 1, 2]
                : reviews.length === 3
                    ? [-1, 0, 1]
                    : reviews.length === 2
                        ? [0, 1]
                        : [0];

    return (
        <div className="reviews-track">
            {offsets.map((offset) => {
                const index = (active + offset + reviews.length) % reviews.length;

                return (
                    <ReviewCard
                        key={`${index}-${offset}`}
                        review={reviews[index]}
                        offset={offset}
                    />
                );
            })}
        </div>
    );
}