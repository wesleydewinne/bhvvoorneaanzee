import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import locationService from "../services/locationService.js";
import "../styles/Locations.css";

function LocationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadLocation = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await locationService.getById(id);
                setLocation(data);
            } catch (err) {
                console.error("Fout bij ophalen locatie:", err);
                setError("De locatie kon niet worden opgehaald.");
            } finally {
                setLoading(false);
            }
        };

        loadLocation();
    }, [id]);

    const handleDelete = async () => {
        if (!location?.id) {
            return;
        }

        const confirmed = window.confirm(
            `Weet je zeker dat je locatie "${location.locationName}" wilt verwijderen?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            await locationService.remove(location.id);
            navigate("/admin/locations");
        } catch (err) {
            console.error("Fout bij verwijderen locatie:", err);
            alert("Verwijderen van locatie is mislukt.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <main className="locations-page">
                <div className="locations-page__container">
                    <p>Locatie laden...</p>
                </div>
            </main>
        );
    }

    if (error || !location) {
        return (
            <main className="locations-page">
                <div className="locations-page__container">
                    <p className="form-message form-message--error">
                        {error || "Locatie niet gevonden."}
                    </p>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => navigate("/admin/locations")}
                    >
                        Terug naar overzicht
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="locations-page">
            <div className="locations-page__container">
                <section className="locations-page__header">
                    <div>
                        <h1>Locatie details</h1>
                        <p>Bekijk alle gegevens van deze locatie.</p>
                    </div>

                    <div className="locations-page__header-actions">
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => navigate("/admin/locations")}
                        >
                            Terug
                        </button>

                        <button
                            type="button"
                            className="button"
                            onClick={() => navigate(`/admin/locations/${location.id}/edit`)}
                        >
                            Bewerken
                        </button>

                        {location?.id ? (
                            <button
                                type="button"
                                className="button button--danger"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Verwijderen..." : "Verwijderen"}
                            </button>
                        ) : null}
                    </div>
                </section>

                <section className="location-detail-card">
                    <div className="location-detail-grid">
                        <div>
                            <strong>Locatienaam</strong>
                            <p>{location.locationName || "-"}</p>
                        </div>

                        <div>
                            <strong>Adres</strong>
                            <p>{location.address || "-"}</p>
                        </div>

                        <div>
                            <strong>Postcode</strong>
                            <p>{location.postalCode || "-"}</p>
                        </div>

                        <div>
                            <strong>Plaats</strong>
                            <p>{location.city || "-"}</p>
                        </div>

                        <div>
                            <strong>Telefoon</strong>
                            <p>{location.phone || "-"}</p>
                        </div>

                        <div>
                            <strong>E-mail</strong>
                            <p>{location.email || "-"}</p>
                        </div>

                        <div className="location-detail-grid__full">
                            <strong>Omschrijving</strong>
                            <p>{location.description || "-"}</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default LocationDetailPage;
