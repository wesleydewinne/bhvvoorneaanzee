export default function ReviewCard({ review, offset }) {
    return (
        <article
            className="review-card"
            style={{
                transform: `
          translateX(${offset * 260}px)
          scale(${offset === 0 ? 1 : 0.92})
        `,
                opacity: offset === 0 ? 1 : 0.55,
                zIndex: 10 - Math.abs(offset),
                filter: `blur(${Math.abs(offset) * 0.8}px)`,
            }}
        >
            <div className="review-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span
                        key={i}
                        className={i < review.rating ? 'filled' : ''}
                    >
            ★
          </span>
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
    );
}
