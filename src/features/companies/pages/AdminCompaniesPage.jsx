import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <main className="companies-page">
            <div className="companies-page__container">
                <section className="companies-page__header">
                    <div>
                        <h1>Bedrijven beheren</h1>
                        <p>Bekijk, zoek, voeg toe en beheer bedrijven.</p>
                    </div>

                    <button
                        type="button"
                        className="button"
                        onClick={() => navigate("/admin/companies/new")}
                    >
                        Nieuw bedrijf
                    </button>
                </section>

                <section className="companies-toolbar">
                    <CompanySearchBar value={searchTerm} onChange={setSearchTerm} />
                </section>

                {loading ? <p>Bedrijven laden...</p> : null}

                {error ? (
                    <p className="form-message form-message--error">{error}</p>
                ) : null}

                {!loading && !error ? (
                    <CompaniesTable
                        companies={filteredCompanies}
                        onDelete={handleDelete}
                    />
                ) : null}
            </div>
        </main>
    );
}

export default AdminCompaniesPage;