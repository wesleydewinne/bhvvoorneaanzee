import { usePublicReviews } from "../hooks/usePublicReviews.js";
import ReviewCarousel from "./ReviewCarousel.jsx";
import "../style/ReviewSection.css";

export default function ReviewSection() {
    const { status, reviews, rating, total } = usePublicReviews();

    return (
        <section className="section section--reviews">
            <div className="container container--narrow">
                <header className="reviews-header">
                    <h2 className="reviews-title">⭐ Reviews (na trainingen)</h2>

                    {status === "success" && rating && total && (
                        <p className="reviews-summary">
                            Gemiddeld <strong>{rating.toFixed(1)} / 5</strong> op basis van{" "}
                            <strong>{total} Google reviews</strong>
                        </p>
                    )}

                    {status === "fallback" && (
                        <p className="reviews-summary">
                            Reviews zijn momenteel niet beschikbaar.
                        </p>
                    )}
                </header>

                <ReviewCarousel status={status} reviews={reviews} />
            </div>
        </section>
    );
}