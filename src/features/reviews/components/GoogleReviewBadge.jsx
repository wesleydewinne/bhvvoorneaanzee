import useReviewSummary from "@/features/reviews/hooks/useReviewSummary.js";
import "@/features/reviews/style/GoogleReviewBadge.css";

function GoogleReviewBadge() {
    const { summary, loading, error } = useReviewSummary();

    if (loading || error || !summary) {
        return null;
    }

    const averageRating = Number(summary.averageRating || 0);
    const formattedRating = averageRating.toFixed(1).replace(".", ",");

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => {
            const fillPercentage = Math.max(0, Math.min(1, rating - index)) * 100;

            return (
                <span key={index} className="google-review-badge__star">
                    <span className="google-review-badge__star-base">★</span>
                    <span
                        className="google-review-badge__star-fill"
                        style={{ width: `${fillPercentage}%` }}
                    >
                        ★
                    </span>
                </span>
            );
        });
    };

    return (
        <a
            href={summary.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-review-badge"
        >
            <div className="google-review-badge__stars">
                {renderStars(averageRating)}
            </div>

            <div className="google-review-badge__content">
                <strong>{formattedRating} / 5</strong>
                <span>op basis van {summary.reviewCount} Google reviews</span>
            </div>
        </a>
    );
}

export default GoogleReviewBadge;