import { useEffect, useState } from 'react';
import { useGoogleReviews } from './useGoogleReviews';
import ReviewSkeleton from './ReviewSkeleton';
import './ReviewCarousel.css';

const INTERVAL = 8000;

/* ===== helper hook ===== */
function useMediaQuery(query) {
    const [matches, setMatches] = useState(
        typeof window !== 'undefined'
            ? window.matchMedia(query).matches
            : false
    );

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);

        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

/* ===== component ===== */
export default function ReviewCarousel() {
    const { status, reviews, rating, total } = useGoogleReviews();

    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const prefersReducedMotion = useMediaQuery(
        '(prefers-reduced-motion: reduce)'
    );
    const isMobile = useMediaQuery('(max-width: 768px)');

    const offsets = isMobile
        ? [-1, 0, 1]
        : [-2, -1, 0, 1, 2];

    useEffect(() => {
        if (
            paused ||
            prefersReducedMotion ||
            reviews.length === 0
        ) return;

        const timer = setInterval(() => {
            setActive(prev => (prev + 1) % reviews.length);
        }, INTERVAL);

        return () => clearInterval(timer);
    }, [paused, prefersReducedMotion, reviews.length]);

    /* ===== states ===== */

    if (status === 'loading') {
        return (
            <div className="review-stack">
                <ReviewSkeleton />
            </div>
        );
    }

    if (status === 'fallback') {
        return (
            <div className="review-card review-fallback">
                <strong>Uitstekend beoordeeld</strong>
                <p>
                    {rating} / 5 op basis van {total} Google reviews
                </p>
            </div>
        );
    }

    /* ===== render ===== */

    return (
        <div
            className="review-stack"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >
            {offsets.map(offset => {
                const index =
                    (active + offset + reviews.length) % reviews.length;

                const review = reviews[index];
                if (!review) return null;

                return (
                    <div
                        key={`${index}-${offset}`}
                        className="review-card"
                        style={getCardStyle(offset)}
                    >
                        <p className="review-text">“{review.text}”</p>
                        <strong className="review-author">
                            — {review.author}
                        </strong>
                    </div>
                );
            })}
        </div>
    );
}

/* ===== styling helper ===== */
function getCardStyle(offset) {
    return {
        transform: `
      translateX(calc(${offset} * var(--card-overlap)))
      scale(${1 - Math.abs(offset) * 0.06})
      rotateY(${offset * -6}deg)
      translateZ(${offset === 0 ? '0px' : '-80px'})
    `,
        filter: `blur(${Math.abs(offset) * 1.5}px)`,
        opacity: offset === 0 ? 1 : 0.55,
        zIndex: 10 - Math.abs(offset)
    };
}
