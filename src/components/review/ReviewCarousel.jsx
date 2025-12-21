import { useEffect, useState } from 'react';
import { useGoogleReviews } from './useGoogleReviews';
import ReviewSkeleton from './ReviewSkeleton';
import './ReviewCarousel.css';

const INTERVAL = 8000;

export default function ReviewCarousel() {
    const { status, reviews, rating, total } = useGoogleReviews();
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (reviews.length === 0) return;

        const timer = setInterval(() => {
            setActive(prev => (prev + 1) % reviews.length);
        }, INTERVAL);

        return () => clearInterval(timer);
    }, [reviews.length]);

    if (status === 'loading') {
        return (
            <section className="review-carousel">
                <ReviewSkeleton />
            </section>
        );
    }

    if (status === 'fallback') {
        return (
            <section className="review-carousel review-fallback">
                <strong>{rating} ★★★★★</strong>
                <p>Gebaseerd op {total} Google reviews</p>
            </section>
        );
    }

    const review = reviews[active];

    return (
        <section className="review-carousel">
            <article className="review-card-main">
                <div className="review-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < 5 ? 'filled' : ''}>★</span>
                    ))}
                </div>

                <p className="review-text">“{review.text}”</p>

                <footer className="review-footer">
                    <span className="review-author">— {review.author}</span>
                    {review.date && (
                        <span className="review-date">{review.date}</span>
                    )}
                </footer>
            </article>
        </section>
    );
}
