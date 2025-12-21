import { useGoogleReviews } from './useGoogleReviews';
import ReviewCarousel from './ReviewCarousel';
import './ReviewSection.css';

export default function ReviewSection() {
    const { status, reviews, rating, total } = useGoogleReviews();

    return (
        <section className="section section--reviews">
            <div className="container container--narrow">

                <header className="reviews-header">
                    <h2 className="reviews-title">
                        ⭐ Reviews (na trainingen, zoals afgesproken)
                    </h2>

                    {status === 'success' && rating && total && (
                        <p className="reviews-summary">
                            Gemiddeld <strong>{rating.toFixed(1)} / 5</strong> op basis van{' '}
                            <strong>{total} Google reviews</strong>
                        </p>
                    )}
                </header>

                <ReviewCarousel status={status} reviews={reviews} />

            </div>
        </section>
    );
}
