import { useState } from "react";
import { useNavigate } from "react-router-dom";
import evaluationService from "../services/evaluationService";
import "../styles/adminEvaluationQr.css";

export default function AdminEvaluationGeneratePage() {
    const navigate = useNavigate();

    const [trainingId, setTrainingId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (!trainingId || Number.isNaN(Number(trainingId)) || Number(trainingId) <= 0) {
            setError("Vul een geldig training ID in.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await evaluationService.generateQr(trainingId);

            navigate(`/admin/evaluations/${trainingId}/qr`);
        } catch (err) {
            console.error(err);
            setError("Het genereren van de QR-code is mislukt. Controleer of het training ID bestaat.");
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setTrainingId("");
        setError("");
    }

    return (
        <main className="admin-evaluation-qr-page">
            <div className="admin-evaluation-qr-page__container">
                <header className="admin-evaluation-qr-page__header">
                    <h1>QR-code genereren</h1>
                    <p className="admin-evaluation-qr-page__intro">
                        Vul een bestaand training ID in om een evaluatie-QR-code te genereren.
                    </p>
                </header>

                {error && (
                    <div className="admin-evaluation-qr-page__message admin-evaluation-qr-page__message--error">
                        <p>{error}</p>
                    </div>
                )}

                <section className="evaluation-qr-panel" aria-labelledby="generate-qr-form-title">
                    <h2 id="generate-qr-form-title">Training selecteren</h2>

                    <form className="evaluation-form" onSubmit={handleSubmit}>
                        <div className="evaluation-form__group">
                            <div className="evaluation-form__field">
                                <label htmlFor="trainingId">Training ID</label>
                                <input
                                    id="trainingId"
                                    name="trainingId"
                                    type="number"
                                    min="1"
                                    value={trainingId}
                                    onChange={(event) => setTrainingId(event.target.value)}
                                    placeholder="Bijvoorbeeld 12"
                                    required
                                />
                                <p className="evaluation-form__hint">
                                    Gebruik het ID van een bestaande training.
                                </p>
                            </div>
                        </div>

                        <div className="evaluation-form__actions">
                            <button type="submit" disabled={loading}>
                                {loading ? "Bezig met genereren..." : "Genereer QR-code"}
                            </button>

                            <button type="button" onClick={handleReset} disabled={loading}>
                                Leegmaken
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}