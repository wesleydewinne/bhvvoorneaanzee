import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationForm from "../components/LocationForm.jsx";
import locationService from "../services/locationService.js";
import { createEmptyLocationForm } from "../helpers/locationHelpers.js";
import "../styles/Locations.css";

function CreateLocationPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleSubmit = async (payload) => {
        try {
            setLoading(true);
            setServerError("");

            const created = await locationService.create(payload);
            navigate(`/admin/locations/${created.id}`);
        } catch (err) {
            console.error("Fout bij aanmaken locatie:", err);
            setServerError("Aanmaken van locatie is mislukt.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="locations-page">
            <div className="locations-page__container">
                <section className="locations-page__header">
                    <div>
                        <h1>Nieuwe locatie</h1>
                        <p>Voeg een nieuwe trainingslocatie toe.</p>
                    </div>

                    <Link to="/admin/locations" className="button button--secondary">
                        Terug
                    </Link>
                </section>

                <section className="location-form-card">
                    <LocationForm
                        initialValues={createEmptyLocationForm()}
                        onSubmit={handleSubmit}
                        submitLabel="Locatie aanmaken"
                        loading={loading}
                        serverError={serverError}
                    />
                </section>
            </div>
        </main>
    );
}

export default CreateLocationPage;
