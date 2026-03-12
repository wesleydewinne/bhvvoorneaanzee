import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocationForm from "../components/LocationForm.jsx";
import locationService from "../services/locationService.js";
import { mapLocationToForm } from "../helpers/locationHelpers.js";
import "../styles/Locations.css";

function EditLocationPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [saving, setSaving] = useState(false);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        const loadLocation = async () => {
            try {
                setLoadingPage(true);
                setServerError("");

                const data = await locationService.getById(id);
                setInitialValues(mapLocationToForm(data));
            } catch (err) {
                console.error("Fout bij laden locatie voor bewerken:", err);
                setServerError("De locatie kon niet worden geladen.");
            } finally {
                setLoadingPage(false);
            }
        };

        loadLocation();
    }, [id]);

    const handleSubmit = async (payload) => {
        try {
            setSaving(true);
            setServerError("");

            await locationService.update(id, payload);
            navigate(`/admin/locations/${id}`);
        } catch (err) {
            console.error("Fout bij bewerken locatie:", err);
            setServerError("Opslaan van wijzigingen is mislukt.");
        } finally {
            setSaving(false);
        }
    };

    if (loadingPage) {
        return (
            <main className="locations-page">
                <div className="locations-page__container">
                    <p>Locatie laden...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="locations-page">
            <div className="locations-page__container">
                <section className="locations-page__header">
                    <div>
                        <h1>Locatie bewerken</h1>
                        <p>Werk de gegevens van deze locatie bij.</p>
                    </div>

                    <Link
                        to={`/admin/locations/${id}`}
                        className="button button--secondary"
                    >
                        Terug
                    </Link>
                </section>

                <section className="location-form-card">
                    <LocationForm
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        submitLabel="Wijzigingen opslaan"
                        loading={saving}
                        serverError={serverError}
                    />
                </section>
            </div>
        </main>
    );
}

export default EditLocationPage;
