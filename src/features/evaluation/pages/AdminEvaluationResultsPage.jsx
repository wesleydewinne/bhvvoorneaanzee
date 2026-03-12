import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evaluationService from "../services/evaluationService";
import "../styles/adminEvaluationResults.css";

export default function AdminEvaluationResultsPage() {
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadSummaries() {
            try {
                setLoading(true);
                setError("");

                const data = await evaluationService.getAllSummaries();
                setSummaries(data ?? []);
            } catch (err) {
                console.error(err);
                setError("Het laden van de evaluatieoverzichten is mislukt.");
            } finally {
                setLoading(false);
            }
        }

        loadSummaries();
    }, []);

    return (
        <main className="admin-evaluation-results-page">
            <div className="admin-evaluation-results-page__container">
                <header className="admin-evaluation-results-page__header">
                    <h1>Evaluatieoverzicht</h1>
                    <p className="admin-evaluation-results-page__intro">
                        Bekijk per training de samenvatting van de evaluaties.
                    </p>
                </header>

                {loading && (
                    <div className="admin-evaluation-results-page__message">
                        <p>Overzichten laden...</p>
                    </div>
                )}

                {error && (
                    <div className="admin-evaluation-results-page__message admin-evaluation-results-page__message--error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <section
                        className="admin-evaluation-results"
                        aria-labelledby="evaluation-summary-list-title"
                    >
                        <div className="admin-evaluation-results__toolbar">
                            <h2 id="evaluation-summary-list-title">Samenvattingen</h2>
                            <p className="admin-evaluation-results__count">
                                {summaries.length} training{summaries.length === 1 ? "" : "en"}
                            </p>
                        </div>

                        {summaries.length === 0 ? (
                            <p>Er zijn nog geen evaluaties beschikbaar.</p>
                        ) : (
                            <ul className="evaluation-summary-list">
                                {summaries.map((summary, index) => (
                                    <li key={summary.trainingId ?? index}>
                                        <article className="evaluation-summary-card">
                                            <div className="evaluation-summary-card__header">
                                                <h3>{summary.trainingTitle ?? "Onbekende training"}</h3>
                                            </div>

                                            <div className="evaluation-summary-card__meta">
                                                <p>
                                                    <strong>Training ID:</strong> {summary.trainingId ?? "-"}
                                                </p>
                                            </div>

                                            <div className="evaluation-summary-card__stats">
                                                <div className="evaluation-summary-card__stat">
                                                    <span>Aantal reacties</span>
                                                    <strong>{summary.responseCount ?? 0}</strong>
                                                </div>

                                                <div className="evaluation-summary-card__stat">
                                                    <span>Gemiddelde aanbeveling</span>
                                                    <strong>
                                                        {typeof summary.averages?.recommend === "number"
                                                            ? summary.averages.recommend.toFixed(1)
                                                            : "-"}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="admin-evaluation-detail-page__actions">
                                                <Link to={`/admin/evaluations/${summary.trainingId}`}>
                                                    Bekijk details
                                                </Link>

                                                <Link to={`/admin/evaluations/${summary.trainingId}/qr`}>
                                                    QR-code
                                                </Link>
                                            </div>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}
            </div>
        </main>
    );
}