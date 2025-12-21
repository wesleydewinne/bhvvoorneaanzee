import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard.jsx';

const OFFSETS = [-2, -1, 0, 1, 2];
const INTERVAL = 8000;

export default function ReviewCarousel({ status, reviews }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (status !== 'success' || reviews.length === 0) return;

        const timer = setInterval(() => {
            setActive((v) => (v + 1) % reviews.length);
        }, INTERVAL);

        return () => clearInterval(timer);
    }, [status, reviews.length]);

    if (status === 'loading') {
        return <div className="review-loading">Reviews laden…</div>;
    }

    if (status !== 'success') {
        return (
            <div className="review-fallback">
                Reviews zijn momenteel niet beschikbaar.
            </div>
        );
    }

    return (
        <div className="reviews-track">
            {OFFSETS.map((offset) => {
                const index =
                    (active + offset + reviews.length) % reviews.length;

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
