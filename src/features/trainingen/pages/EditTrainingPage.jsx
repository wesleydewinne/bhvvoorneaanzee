import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, RefreshCw } from "lucide-react";
import TrainingForm from "../components/TrainingForm.jsx";
import trainingService from "../services/trainingService.js";
import "../styles/Trainingen.css";

function EditTrainingPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTraining = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await trainingService.getById(id);
                setTraining(data);
            } catch (err) {
                console.error("Fout bij ophalen training:", err);
                setError(err?.message || "Kon training niet ophalen.");
            } finally {
                setLoading(false);
            }
        };

        loadTraining();
    }, [id]);

    const handleUpdate = async (payload) => {
        try {
            setSaving(true);
            setError("");

            await trainingService.update(id, payload);
            navigate(`/admin/trainingen/${id}`);
        } catch (err) {
            console.error("Fout bij opslaan training:", err);
            setError(err?.message || "Kon training niet opslaan.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="trainingen-page dashboard-admin-page">
            <section className="dashboard-admin-hero" aria-labelledby="edit-training-title">
                <div>
                    <p className="dashboard__eyebrow">Trainingen</p>
                    <h1 id="edit-training-title">Training bewerken</h1>
                    <p>Pas planning, locatie en gekoppelde gegevens van deze training aan.</p>
                </div>

                <div className="dashboard-admin-hero__actions">
                    <Link to={`/admin/trainingen/${id}`} className="dashboard-admin-button dashboard-admin-button--secondary">
                        <ArrowLeft aria-hidden="true" />
                        Terug naar details
                    </Link>
                </div>
            </section>

            {loading && (
                <p className="dashboard__state">
                    <RefreshCw aria-hidden="true" />
                    Training laden...
                </p>
            )}

            {!loading && training && (
                <section className="dashboard-admin-panel" aria-label="Training bewerken formulier">
                    <div className="dashboard-admin-panel__header">
                        <div>
                            <h2>Traininggegevens</h2>
                            <p>Werk de gegevens bij en sla de training direct op.</p>
                        </div>
                        <span>
                            <Pencil aria-hidden="true" />
                            Bewerken
                        </span>
                    </div>

                    <TrainingForm
                        mode="edit"
                        initialValues={training}
                        onSubmit={handleUpdate}
                        loading={saving}
                        error={error}
                    />
                </section>
            )}

            {!loading && error && !training && <p className="dashboard-admin-message dashboard-admin-message--error">{error}</p>}
        </section>
    );
}

export default EditTrainingPage;
