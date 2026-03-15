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
        <section className="trainingen-page">
            <div className="trainingen-page__header">
                <div>
                    <h1>Nieuwe training aanmaken</h1>
                    <p>Vul de basisgegevens van de training in.</p>
                </div>

                <Link to="/admin/trainingen" className="trainingen-page__button trainingen-page__button--secondary">
                    Terug
                </Link>
            </div>

            <TrainingForm
                mode="create"
                onSubmit={handleCreate}
                loading={saving}
                error={error}
            />
        </section>
    );
}

export default CreateTrainingPage;