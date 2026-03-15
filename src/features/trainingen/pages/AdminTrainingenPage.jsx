import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

    return (
        <section className="trainingen-page">
            <div className="trainingen-page__header">
                <div>
                    <h1>Trainingen beheren</h1>
                    <p>Overzicht van alle trainingen.</p>
                </div>

                <Link to="/admin/trainingen/new" className="trainingen-page__button">
                    Nieuwe training
                </Link>
            </div>

            {loading && <p>Trainingen laden...</p>}
            {error && <p className="trainingen-page__error">{error}</p>}

            {!loading && !error && (
                <TrainingenTable trainingen={trainingen} onRefresh={loadTrainingen} />
            )}
        </section>
    );
}

export default AdminTrainingenPage;