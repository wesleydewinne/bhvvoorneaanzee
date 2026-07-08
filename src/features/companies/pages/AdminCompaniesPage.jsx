import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Plus, RefreshCw, Search } from "lucide-react";
import companyService from "../services/companyService.js";
import CompanySearchBar from "../components/CompanySearchBar.jsx";
import CompaniesTable from "../components/CompaniesTable.jsx";
import { filterCompanies, getBackendMessage } from "../helpers/companyHelpers.js";
import "../styles/Companies.css";

function AdminCompaniesPage() {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCompanies = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await companyService.getAll();
            setCompanies(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fout bij ophalen bedrijven:", err);
            setError(getBackendMessage(err, "Het ophalen van bedrijven is mislukt."));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCompanies();
    }, []);

    const filteredCompanies = useMemo(() => {
        return filterCompanies(companies, searchTerm);
    }, [companies, searchTerm]);

    const handleDelete = async (company) => {
        const confirmed = window.confirm(
            `Weet je zeker dat je bedrijf "${company.name}" wilt verwijderen?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await companyService.remove(company.id);
            await loadCompanies();
        } catch (err) {
            console.error("Fout bij verwijderen bedrijf:", err);
            alert(getBackendMessage(err, "Verwijderen van bedrijf is mislukt."));
        }
    };

    return (
        <section className="companies-page dashboard-admin-page">
            <section className="dashboard-admin-hero" aria-labelledby="companies-title">
                <div>
                    <p className="dashboard__eyebrow">Relatiebeheer</p>
                    <h1 id="companies-title">Bedrijven beheren</h1>
                    <p>Bekijk alle bedrijven, zoek relaties en voeg nieuwe bedrijven toe.</p>
                </div>

                <div className="dashboard-admin-hero__actions">
                    <button
                        type="button"
                        className="dashboard-admin-button dashboard-admin-button--secondary"
                        onClick={loadCompanies}
                        disabled={loading}
                    >
                        <RefreshCw aria-hidden="true" />
                        Alle bedrijven ophalen
                    </button>
                    <button
                        type="button"
                        className="dashboard-admin-button"
                        onClick={() => navigate("/admin/companies/new")}
                    >
                        <Plus aria-hidden="true" />
                        Bedrijf toevoegen
                    </button>
                </div>
            </section>

            <section className="dashboard-admin-stats" aria-label="Bedrijf statistieken">
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon">
                        <BriefcaseBusiness aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : companies.length}</strong>
                    <span>Alle bedrijven</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--green">
                        <Search aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : filteredCompanies.length}</strong>
                    <span>Zichtbaar na filter</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--orange">
                        <Plus aria-hidden="true" />
                    </span>
                    <strong>Nieuw</strong>
                    <span>Snel toevoegen</span>
                </article>
            </section>

            <section className="dashboard-admin-panel" aria-label="Bedrijven zoeken en beheren">
                <div className="dashboard-admin-panel__header">
                    <div>
                        <h2>Alle bedrijven</h2>
                        <p>Zoek, open, bewerk of verwijder een bedrijf.</p>
                    </div>
                    <span>{filteredCompanies.length} resultaten</span>
                </div>

                <section className="companies-toolbar">
                    <CompanySearchBar value={searchTerm} onChange={setSearchTerm} />
                </section>

                {loading ? <p className="dashboard__state">Bedrijven laden...</p> : null}

                {error ? (
                    <p className="form-message form-message--error">{error}</p>
                ) : null}

                {!loading && !error ? (
                    <CompaniesTable
                        companies={filteredCompanies}
                        onDelete={handleDelete}
                    />
                ) : null}
            </section>
        </section>
    );
}

export default AdminCompaniesPage;
