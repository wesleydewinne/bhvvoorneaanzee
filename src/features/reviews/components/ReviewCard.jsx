import { Star } from "lucide-react";

export default function ReviewCard({ review, offset }) {
    const rating = Number(review?.rating || 0);

    return (
        <article
            className="review-card"
            style={{
                transform: `translateX(${offset * 260}px) scale(${offset === 0 ? 1 : 0.92})`,
                opacity: offset === 0 ? 1 : 0.55,
                zIndex: 10 - Math.abs(offset),
                filter: `blur(${Math.abs(offset) * 0.8}px)`,
            }}
        >
            <div className="review-stars" aria-label={`${rating} van 5 sterren`}>
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={index < Math.round(rating) ? "filled" : ""}>
                        <Star aria-hidden="true" />
                    </span>
                ))}
            </div>

            <p className="review-text">&ldquo;{review.text}&rdquo;</p>

            <footer className="review-footer">
                <span className="review-author">&mdash; {review.author}</span>
                {review.date ? <span className="review-date">{review.date}</span> : null}
            </footer>
        </article>
    );
}
