import { useState } from "react";
import { RefreshCw, Star, Wand2 } from "lucide-react";
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
        <section className="admin-reviews-page dashboard-admin-page">
                <section className="dashboard-admin-hero" aria-labelledby="reviews-title">
                    <div>
                        <p className="dashboard__eyebrow">Reputatie</p>
                        <h1 id="reviews-title">Reviews beheren</h1>
                        <p>
                            Vernieuw Google reviews handmatig en controleer wanneer de synchronisatie is uitgevoerd.
                        </p>
                    </div>

                    <div className="dashboard-admin-hero__actions">
                        <button
                            type="button"
                            className="dashboard-admin-button"
                            onClick={handleRefreshReviews}
                            disabled={refreshing}
                        >
                            <RefreshCw aria-hidden="true" />
                            {refreshing ? "Bezig met verversen..." : "Reviews verversen"}
                        </button>
                    </div>
                </section>

                <section className="dashboard-admin-stats" aria-label="Review status">
                    <article className="dashboard-admin-stat">
                        <span className="dashboard-admin-stat__icon">
                            <Star aria-hidden="true" />
                        </span>
                        <strong>Google</strong>
                        <span>Reviewbron</span>
                    </article>
                    <article className="dashboard-admin-stat">
                        <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--green">
                            <RefreshCw aria-hidden="true" />
                        </span>
                        <strong>{refreshing ? "..." : "Sync"}</strong>
                        <span>Handmatig verversen</span>
                    </article>
                    <article className="dashboard-admin-stat">
                        <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--orange">
                            <Wand2 aria-hidden="true" />
                        </span>
                        <strong>{lastRefreshedAt ? "Actief" : "-"}</strong>
                        <span>Laatste status</span>
                    </article>
                </section>

                <section className="dashboard-admin-panel">
                    <div className="dashboard-admin-panel__header">
                        <div>
                            <h2>Google reviews verversen</h2>
                            <p>Haal de nieuwste reviews op en sla ze op in de backend.</p>
                        </div>
                        <span>Laatste verversing: {formatDateTime(lastRefreshedAt)}</span>
                    </div>

                    <div className="dashboard-admin-hero__actions">
                        <button
                            type="button"
                            className="dashboard-admin-button"
                            onClick={handleRefreshReviews}
                            disabled={refreshing}
                        >
                            <RefreshCw aria-hidden="true" />
                            {refreshing ? "Bezig met verversen..." : "Google reviews verversen"}
                        </button>
                    </div>
                </section>

                {successMessage && (
                    <p className="dashboard-admin-message dashboard-admin-message--success">
                        {successMessage}
                    </p>
                )}

                {errorMessage && (
                    <p className="dashboard-admin-message dashboard-admin-message--error">
                        {errorMessage}
                    </p>
                )}
        </section>
    );
}

export default AdminReviewsPage;
