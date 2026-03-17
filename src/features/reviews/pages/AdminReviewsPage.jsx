import { useState } from "react";
import reviewService from "../services/reviewService.js";
import "../style/AdminReviewsPage.css";

function AdminReviewsPage() {
    const [refreshing, setRefreshing] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [lastRefreshedAt, setLastRefreshedAt] = useState("");

    const handleRefreshReviews = async () => {
        try {
            setRefreshing(true);
            setSuccessMessage("");
            setErrorMessage("");

            const data = await reviewService.refreshReviews();

            setSuccessMessage(
                data?.message || "Google reviews zijn succesvol vernieuwd."
            );

            if (data?.refreshedAt) {
                setLastRefreshedAt(data.refreshedAt);
            }
        } catch (error) {
            console.error("Fout bij verversen van reviews:", error);

            setErrorMessage(
                error?.message || "Het verversen van reviews is mislukt."
            );
        } finally {
            setRefreshing(false);
        }
    };

    const formatDateTime = (value) => {
        if (!value) return "Nog niet beschikbaar";

        try {
            return new Date(value).toLocaleString("nl-NL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return value;
        }
    };

    return (
        <main className="admin-reviews-page">
            <div className="admin-reviews-page__container">
                <section className="admin-reviews-page__header">
                    <h1 className="admin-reviews-page__title">Reviews beheren</h1>
                    <p className="admin-reviews-page__intro">
                        Vanaf deze pagina kun je Google reviews handmatig vernieuwen.
                        Later kun je hier ook moderatie, zichtbaarheid en filtering beheren.
                    </p>
                </section>

                <section className="admin-reviews-card">
                    <div className="admin-reviews-card__content">
                        <h2 className="admin-reviews-card__title">
                            Google reviews verversen
                        </h2>

                        <p className="admin-reviews-card__description">
                            Gebruik deze actie om de nieuwste Google reviews op te halen
                            en op te slaan in de backend.
                        </p>

                        <ul className="admin-reviews-card__meta">
                            <li className="admin-reviews-card__meta-item">
                                Handmatige synchronisatie van reviews
                            </li>
                            <li className="admin-reviews-card__meta-item">
                                Handig wanneer de eerste vulling nog leeg is
                            </li>
                            <li className="admin-reviews-card__meta-item">
                                Laatste verversing: {formatDateTime(lastRefreshedAt)}
                            </li>
                        </ul>
                    </div>

                    <div className="admin-reviews-card__actions">
                        <button
                            type="button"
                            className="admin-reviews-card__button"
                            onClick={handleRefreshReviews}
                            disabled={refreshing}
                        >
                            {refreshing ? "Bezig met verversen..." : "Google reviews verversen"}
                        </button>
                    </div>
                </section>

                {successMessage && (
                    <p className="admin-reviews-message admin-reviews-message--success">
                        {successMessage}
                    </p>
                )}

                {errorMessage && (
                    <p className="admin-reviews-message admin-reviews-message--error">
                        {errorMessage}
                    </p>
                )}
            </div>
        </main>
    );
}

export default AdminReviewsPage;