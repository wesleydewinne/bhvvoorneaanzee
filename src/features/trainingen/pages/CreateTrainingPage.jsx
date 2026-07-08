import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrainingForm from "../components/TrainingForm.jsx";
import trainingService from "../services/trainingService.js";
import "../styles/Trainingen.css";

function CreateTrainingPage() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async (payload) => {
        try {
            setSaving(true);
            setError("");

            const createdTraining = await trainingService.create(payload);
            navigate(`/admin/trainingen/${createdTraining.id}`);
        } catch (err) {
            console.error("Fout bij aanmaken training:", err);
            setError(err?.message || "Kon training niet aanmaken.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="trainingen-page dashboard-admin-page">
            <section className="dashboard-admin-hero" aria-labelledby="create-training-title">
                <div>
                    <p className="dashboard__eyebrow">Trainingen</p>
                    <h1 id="create-training-title">Nieuwe training aanmaken</h1>
                    <p>Plan een nieuwe training aan en vul de belangrijkste gegevens snel in.</p>
                </div>

                <div className="trainingen-page__header-actions">
                    <Link to="/admin/trainingen" className="dashboard-admin-button dashboard-admin-button--secondary">
                        Terug naar overzicht
                    </Link>
                </div>
            </section>

            <section className="dashboard-admin-panel" aria-label="Nieuwe training formulier">
                <div className="dashboard-admin-panel__header">
                    <div>
                        <h2>Traininggegevens</h2>
                        <p>Vul de basisgegevens van de training in en kies locatie, bedrijf en trainer.</p>
                    </div>
                </div>

                <TrainingForm
                    mode="create"
                    onSubmit={handleCreate}
                    loading={saving}
                    error={error}
                />
            </section>
        </section>
    );
}

export default CreateTrainingPage;