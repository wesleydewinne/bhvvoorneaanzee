import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EvaluationBarList from "../components/EvaluationBarList";
import EvaluationCommentsList from "../components/EvaluationCommentsList";
import EvaluationMetricCards from "../components/EvaluationMetricCards";
import EvaluationResultsTable from "../components/EvaluationResultsTable";
import evaluationService from "../services/evaluationService";
import { buildCsvFilename, getBarItems, getMetricCards } from "../helpers/evaluationHelpers";
import "../styles/adminEvaluationDetail.css";

export default function AdminEvaluationDetailPage() {
    const navigate = useNavigate();
    const { trainingId } = useParams();

    const [summary, setSummary] = useState(null);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const [summaryData, responseData] = await Promise.all([
                    evaluationService.getSummary(trainingId),
                    evaluationService.getResponsesByTrainingId(trainingId),
                ]);

                setSummary(summaryData);
                setResponses(responseData ?? []);
            } catch (err) {
                console.error(err);
                setError("Het laden van de evaluatiegegevens is mislukt.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [trainingId]);

    async function handleDownloadCsv() {
        try {
            setDownloading(true);

            const blobData = await evaluationService.downloadCsv(trainingId);
            const blob = new Blob([blobData], { type: "text/csv;charset=utf-8;" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = buildCsvFilename(trainingId);
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            setError("Het downloaden van het CSV-bestand is mislukt.");
        } finally {
            setDownloading(false);
        }
    }

    const averages = summary?.averages ?? {};
    const cards = getMetricCards(averages);
    const barItems = getBarItems(averages);

    return (
        <main className="admin-evaluation-detail-page">
            <div className="admin-evaluation-detail-page__container">
                <header className="admin-evaluation-detail-page__header">
                    <div className="admin-evaluation-detail-page__header-content">
                        <h1>Evaluatiedetails</h1>
                        <p className="admin-evaluation-detail-page__intro">
                            Overzicht van scores, opmerkingen en individuele reacties.
                        </p>

                        {summary?.trainingTitle && (
                            <p>
                                <strong>Training:</strong> {summary.trainingTitle}
                            </p>
                        )}
                    </div>

                    <div className="admin-evaluation-detail-page__actions">
                        <button
                            type="button"
                            onClick={() => navigate(`/admin/evaluations/${trainingId}/qr`)}
                        >
                            QR-code genereren
                        </button>

                        <button
                            type="button"
                            onClick={handleDownloadCsv}
                            disabled={downloading}
                        >
                            {downloading ? "CSV downloaden..." : "Download CSV"}
                        </button>
                    </div>
                </header>

                {loading && (
                    <div className="admin-evaluation-detail-page__message">
                        <p>Gegevens laden...</p>
                    </div>
                )}

                {error && (
                    <div className="admin-evaluation-detail-page__message admin-evaluation-detail-page__message--error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <section className="evaluation-detail-section">
                            <EvaluationMetricCards cards={cards} />
                        </section>

                        <section className="evaluation-detail-section">
                            <EvaluationBarList items={barItems} />
                        </section>

                        <section className="evaluation-detail-section">
                            <EvaluationCommentsList responses={responses} />
                        </section>

                        <section className="evaluation-detail-section">
                            <EvaluationResultsTable responses={responses} />
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}