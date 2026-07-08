import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, MessageSquare, QrCode, RefreshCw } from "lucide-react";
import evaluationService from "../services/evaluationService";
import "../styles/adminEvaluationResults.css";

export default function AdminEvaluationResultsPage() {
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    useEffect(() => {
        loadSummaries();
    }, []);

    const responseCount = summaries.reduce((total, summary) => total + (summary.responseCount ?? 0), 0);

    return (
        <section className="admin-evaluation-results-page dashboard-admin-page">
                <section className="dashboard-admin-hero" aria-labelledby="evaluations-title">
                    <div>
                        <p className="dashboard__eyebrow">Kwaliteit</p>
                        <h1 id="evaluations-title">Evaluatieoverzicht</h1>
                        <p>Bekijk per training de samenvatting, reacties en QR-code voor evaluaties.</p>
                    </div>

                    <div className="dashboard-admin-hero__actions">
                        <button
                            type="button"
                            className="dashboard-admin-button dashboard-admin-button--secondary"
                            onClick={loadSummaries}
                            disabled={loading}
                        >
                            <RefreshCw aria-hidden="true" />
                            Evaluaties ophalen
                        </button>
                        <Link to="/admin/evaluations/generate" className="dashboard-admin-button">
                            <QrCode aria-hidden="true" />
                            QR maken
                        </Link>
                    </div>
                </section>

                <section className="dashboard-admin-stats" aria-label="Evaluatie statistieken">
                    <article className="dashboard-admin-stat">
                        <span className="dashboard-admin-stat__icon">
                            <BarChart3 aria-hidden="true" />
                        </span>
                        <strong>{loading ? "..." : summaries.length}</strong>
                        <span>Trainingen</span>
                    </article>
                    <article className="dashboard-admin-stat">
                        <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--green">
                            <MessageSquare aria-hidden="true" />
                        </span>
                        <strong>{loading ? "..." : responseCount}</strong>
                        <span>Reacties totaal</span>
                    </article>
                    <article className="dashboard-admin-stat">
                        <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--orange">
                            <QrCode aria-hidden="true" />
                        </span>
                        <strong>QR</strong>
                        <span>Genereren</span>
                    </article>
                </section>

                {loading && <p className="dashboard__state">Overzichten laden...</p>}

                {error && (
                    <p className="dashboard-admin-message dashboard-admin-message--error">{error}</p>
                )}

                {!loading && !error && (
                    <section
                        className="dashboard-admin-panel admin-evaluation-results"
                        aria-labelledby="evaluation-summary-list-title"
                    >
                        <div className="dashboard-admin-panel__header">
                            <div>
                                <h2 id="evaluation-summary-list-title">Samenvattingen</h2>
                                <p>Open details of de QR-code per training.</p>
                            </div>
                            <span>{summaries.length} training{summaries.length === 1 ? "" : "en"}</span>
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
        </section>
    );
}
