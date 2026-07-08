import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2, GraduationCap, Plus, RefreshCw } from "lucide-react";
import TrainingenTable from "../components/TrainingenTable.jsx";
import trainingService from "../services/trainingService.js";
import "../styles/Trainingen.css";

function AdminTrainingenPage() {
    const [trainingen, setTrainingen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTrainingen = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await trainingService.getAll();
            setTrainingen(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fout bij ophalen trainingen:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            setError(backendMessage || err?.message || "Kon trainingen niet ophalen.");
            setTrainingen([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTrainingen();
    }, [loadTrainingen]);

    const completedCount = trainingen.filter((training) => {
        const status = String(training.status ?? training.trainingStatus ?? "").toLowerCase();
        return status.includes("completed") || status.includes("afgerond");
    }).length;

    return (
        <section className="trainingen-page dashboard-admin-page">
            <section className="dashboard-admin-hero" aria-labelledby="trainingen-title">
                <div>
                    <p className="dashboard__eyebrow">Planning</p>
                    <h1 id="trainingen-title">Trainingen beheren</h1>
                    <p>Bekijk de volledige trainingsplanning, open details en plan nieuwe trainingen in.</p>
                </div>

                <div className="dashboard-admin-hero__actions">
                    <button
                        type="button"
                        className="dashboard-admin-button dashboard-admin-button--secondary"
                        onClick={loadTrainingen}
                        disabled={loading}
                    >
                        <RefreshCw aria-hidden="true" />
                        Alle trainingen ophalen
                    </button>
                    <Link to="/admin/trainingen/new" className="dashboard-admin-button">
                        <Plus aria-hidden="true" />
                        Training toevoegen
                    </Link>
                </div>
            </section>

            <section className="dashboard-admin-stats" aria-label="Training statistieken">
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon">
                        <GraduationCap aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : trainingen.length}</strong>
                    <span>Alle trainingen</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--green">
                        <CheckCircle2 aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : completedCount}</strong>
                    <span>Afgerond</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--orange">
                        <CalendarDays aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : Math.max(trainingen.length - completedCount, 0)}</strong>
                    <span>In planning</span>
                </article>
            </section>

            <section className="dashboard-admin-panel" aria-label="Trainingen overzicht">
                <div className="dashboard-admin-panel__header">
                    <div>
                        <h2>Alle trainingen</h2>
                        <p>Open, bewerk en bewaak de status van trainingen.</p>
                    </div>
                    <span>{trainingen.length} trainingen</span>
                </div>

                {loading && <p className="dashboard__state">Trainingen laden...</p>}
                {error && <p className="trainingen-page__error">{error}</p>}

                {!loading && !error && (
                    <TrainingenTable trainingen={trainingen} onRefresh={loadTrainingen} />
                )}
            </section>
        </section>
    );
}

export default AdminTrainingenPage;
