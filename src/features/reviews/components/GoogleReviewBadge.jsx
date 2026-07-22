import useReviewSummary from "@/features/reviews/hooks/useReviewSummary.js";
import "@/features/reviews/style/GoogleReviewBadge.css";

function GoogleReviewBadge() {
    const { summary } = useReviewSummary();

    const googleReviewsUrl =
        "https://www.google.com/maps/search/?api=1&query=BHV%20Voorne%20aan%20Zee%20Druivenhoek%2012%203181%20PK%20Rozenburg";

    const hasSummary = Number.isFinite(Number(summary?.averageRating))
        && Number(summary?.reviewCount) > 0;
    const averageRating = hasSummary ? Number(summary.averageRating) : 0;
    const formattedRating = hasSummary
        ? averageRating.toFixed(1).replace(".", ",")
        : null;

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => {
            const fillPercentage = Math.max(0, Math.min(1, rating - index)) * 100;

            return (
                <span key={index} className="google-review-badge__star" aria-hidden="true">
                    <span className="google-review-badge__star-base">{"\u2605"}</span>
                    <span
                        className="google-review-badge__star-fill"
                        style={{ width: `${fillPercentage}%` }}
                    >
                        {"\u2605"}
                    </span>
                </span>
            );
        });
    };

    return (
        <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-review-badge"
            aria-label={hasSummary
                ? `${formattedRating} van 5 op basis van ${summary.reviewCount} Google reviews`
                : "Bekijk onze Google reviews"}
        >
            <span className="google-review-badge__header">
                <span className="google-review-badge__brand" aria-hidden="true">
                    <span className="google-review-badge__brand-blue">G</span>
                    <span className="google-review-badge__brand-red">o</span>
                    <span className="google-review-badge__brand-yellow">o</span>
                    <span className="google-review-badge__brand-blue">g</span>
                    <span className="google-review-badge__brand-green">l</span>
                    <span className="google-review-badge__brand-red">e</span>
                </span>

                <span className="google-review-badge__shop" aria-hidden="true">
                    <span className="google-review-badge__awning" />
                    <span className="google-review-badge__shop-body">G</span>
                </span>
            </span>

            <span className="google-review-badge__subbrand">My Business</span>

            <span className="google-review-badge__review-content">
                <span className="google-review-badge__review-row">
                    <strong>Reviews</strong>
                </span>

                <span
                    className={`google-review-badge__summary${hasSummary ? " is-loaded" : ""}`}
                    aria-live="polite"
                >
                    {hasSummary && (
                        <>
                            <span className="google-review-badge__stars">
                                {renderStars(averageRating)}
                            </span>

                            <span className="google-review-badge__score">
                                {formattedRating} / 5 uit {summary.reviewCount} reviews
                            </span>
                        </>
                    )}
                </span>

                <span className="google-review-badge__source">
                    Bekijk reviews
                </span>
            </span>
        </a>
    );
}

export default GoogleReviewBadge;
