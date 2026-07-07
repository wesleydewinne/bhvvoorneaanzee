import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../services/companyService.js";
import { getBackendMessage } from "../helpers/companyHelpers.js";
import "../styles/Companies.css";

function CompanyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadCompany = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await companyService.getById(id);
                setCompany(data);
            } catch (err) {
                console.error("Fout bij ophalen bedrijf:", err);
                setError(getBackendMessage(err, "Het bedrijf kon niet worden opgehaald."));
            } finally {
                setLoading(false);
            }
        };

        loadCompany();
    }, [id]);

    const handleDelete = async () => {
        if (!company?.id) {
            return;
        }

        const confirmed = window.confirm(
            `Weet je zeker dat je bedrijf "${company.name}" wilt verwijderen?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            await companyService.remove(company.id);
            navigate("/admin/companies");
        } catch (err) {
            console.error("Fout bij verwijderen bedrijf:", err);
            alert(getBackendMessage(err, "Verwijderen van bedrijf is mislukt."));
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <main className="companies-page">
                <div className="companies-page__container">
                    <p>Bedrijf laden...</p>
                </div>
            </main>
        );
    }

    if (error || !company) {
        return (
            <main className="companies-page">
                <div className="companies-page__container">
                    <p className="form-message form-message--error">
                        {error || "Bedrijf niet gevonden."}
                    </p>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Terug naar overzicht
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="companies-page">
            <div className="companies-page__container">
                <section className="companies-page__header">
                    <div>
                        <h1>Bedrijf details</h1>
                        <p>Bekijk alle gegevens van dit bedrijf.</p>
                    </div>

                    <div className="companies-page__header-actions">
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Terug
                        </button>

                        <button
                            type="button"
                            className="button"
                            onClick={() => navigate(`/admin/companies/${company.id}/edit`)}
                        >
                            Bewerken
                        </button>

                        <button
                            type="button"
                            className="button button--danger"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting ? "Verwijderen..." : "Verwijderen"}
                        </button>
                    </div>
                </section>

                <section className="company-detail-card">
                    <div className="company-detail-grid">
                        <div>
                            <strong>ID</strong>
                            <p>{company.id ?? "-"}</p>
                        </div>

                        <div>
                            <strong>Bedrijfsnaam</strong>
                            <p>{company.name || "-"}</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default CompanyDetailPage;