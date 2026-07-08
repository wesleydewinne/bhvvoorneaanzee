import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Plus, RefreshCw, Search } from "lucide-react";
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
    const linkedCompanyCount = useMemo(() => {
        const companyIds = new Set();

        locations.forEach((location) => {
            const companies = location.companies ?? location.linkedCompanies ?? [];

            if (Array.isArray(companies)) {
                companies.forEach((company) => {
                    const value = company.id ?? company.companyId ?? company.name ?? company.companyName;
                    if (value) {
                        companyIds.add(value);
                    }
                });
            }
        });

        return companyIds.size;
    }, [locations]);

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
        <section className="locations-page dashboard-admin-page">
            <section className="dashboard-admin-hero" aria-labelledby="locations-title">
                <div>
                    <p className="dashboard__eyebrow">Locatiebeheer</p>
                    <h1 id="locations-title">Locaties beheren</h1>
                    <p>
                        Bekijk alle trainingslocaties, controleer gekoppelde bedrijven
                        en voeg nieuwe locaties toe.
                    </p>
                </div>

                <div className="dashboard-admin-hero__actions">
                    <button
                        type="button"
                        className="dashboard-admin-button dashboard-admin-button--secondary"
                        onClick={loadLocations}
                        disabled={loading}
                    >
                        <RefreshCw aria-hidden="true" />
                        Alle locaties ophalen
                    </button>
                    <button
                        type="button"
                        className="dashboard-admin-button"
                        onClick={() => navigate("/admin/locations/new")}
                    >
                        <Plus aria-hidden="true" />
                        Locatie toevoegen
                    </button>
                </div>
            </section>

            <section className="dashboard-admin-stats" aria-label="Locatie statistieken">
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon">
                        <MapPin aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : locations.length}</strong>
                    <span>Alle locaties</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--green">
                        <Search aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : filteredLocations.length}</strong>
                    <span>Zichtbaar na filter</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--orange">
                        <Building2 aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : linkedCompanyCount}</strong>
                    <span>Gekoppelde bedrijven</span>
                </article>
            </section>

            <section className="dashboard-admin-panel" aria-label="Locaties zoeken en beheren">
                <div className="dashboard-admin-panel__header">
                    <div>
                        <h2>Alle locaties</h2>
                        <p>Zoek, open, bewerk of verwijder een locatie.</p>
                    </div>
                    <span>{filteredLocations.length} resultaten</span>
                </div>

                <div className="locations-toolbar">
                    <LocationSearchBar value={searchTerm} onChange={setSearchTerm} />
                </div>

                {loading ? <p className="dashboard__state">Locaties laden...</p> : null}
                {error ? <p className="form-message form-message--error">{error}</p> : null}

                {!loading && !error ? (
                    <LocationsTable
                        locations={filteredLocations}
                        onDelete={handleDelete}
                    />
                ) : null}
            </section>
        </section>
    );
}

export default AdminLocationsPage;
