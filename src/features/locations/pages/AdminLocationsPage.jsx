import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import locationService from "../services/locationService.js";
import { filterLocations } from "../helpers/locationHelpers.js";
import LocationSearchBar from "../components/LocationSearchBar.jsx";
import LocationsTable from "../components/LocationsTable.jsx";
import "../styles/Locations.css";

function AdminLocationsPage() {
    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadLocations = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await locationService.getAll();
            setLocations(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fout bij ophalen locaties:", err);
            setError("Het ophalen van locaties is mislukt.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLocations();
    }, []);

    const filteredLocations = useMemo(() => {
        return filterLocations(locations, searchTerm);
    }, [locations, searchTerm]);

    const handleDelete = async (location) => {
        const confirmed = window.confirm(
            `Weet je zeker dat je locatie "${location.locationName}" wilt verwijderen?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await locationService.remove(location.id);
            await loadLocations();
        } catch (err) {
            console.error("Fout bij verwijderen locatie:", err);
            alert("Verwijderen van locatie is mislukt.");
        }
    };

    return (
        <main className="locations-page">
            <div className="locations-page__container">
                <section className="locations-page__header">
                    <div>
                        <h1>Locaties beheren</h1>
                        <p>
                            Bekijk, zoek, voeg toe en beheer alle trainingslocaties.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="button"
                        onClick={() => navigate("/admin/locations/new")}
                    >
                        Nieuwe locatie
                    </button>
                </section>

                <section className="locations-toolbar">
                    <LocationSearchBar value={searchTerm} onChange={setSearchTerm} />
                </section>

                {loading ? <p>Locaties laden...</p> : null}
                {error ? <p className="form-message form-message--error">{error}</p> : null}

                {!loading && !error ? (
                    <LocationsTable
                        locations={filteredLocations}
                        onDelete={handleDelete}
                    />
                ) : null}
            </div>
        </main>
    );
}

export default AdminLocationsPage;
