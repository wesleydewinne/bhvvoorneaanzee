import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
        <section className="trainingen-page">
            <div className="trainingen-page__header">
                <div>
                    <h1>Training bewerken</h1>
                    <p>Pas de gegevens van deze training aan.</p>
                </div>

                <Link to={`/admin/trainingen/${id}`} className="trainingen-page__button trainingen-page__button--secondary">
                    Terug
                </Link>
            </div>

            {loading && <p>Training laden...</p>}
            {!loading && error && <p className="trainingen-page__error">{error}</p>}

            {!loading && training && (
                <TrainingForm
                    mode="edit"
                    initialValues={training}
                    onSubmit={handleUpdate}
                    loading={saving}
                    error={error}
                />
            )}
        </section>
    );
}

export default EditTrainingPage;