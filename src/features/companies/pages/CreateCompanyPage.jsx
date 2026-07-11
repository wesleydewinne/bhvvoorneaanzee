import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyForm from "../components/CompanyForm.jsx";
import companyService from "../services/companyService.js";
import {
    createEmptyCompanyForm,
    getBackendMessage,
} from "../helpers/companyHelpers.js";
import "../styles/Companies.css";

function CreateCompanyPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleSubmit = async (payload, logoFile) => {
        try {
            setLoading(true);
            setServerError("");

            const created = await companyService.create(payload);
            if (logoFile) await companyService.uploadLogo(created.id, logoFile);
            navigate(`/admin/companies/${created.id}`);
        } catch (err) {
            console.error("Fout bij aanmaken bedrijf:", err);
            setServerError(getBackendMessage(err, "Aanmaken van bedrijf is mislukt."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="companies-page">
            <div className="companies-page__container">
                <section className="companies-page__header">
                    <div>
                        <h1>Nieuw bedrijf</h1>
                        <p>Voeg een nieuw bedrijf toe.</p>
                    </div>

                    <Link to="/admin/companies" className="button button--secondary">
                        Terug
                    </Link>
                </section>

                <section className="company-form-card">
                    <CompanyForm
                        initialValues={createEmptyCompanyForm()}
                        onSubmit={handleSubmit}
                        submitLabel="Bedrijf aanmaken"
                        loading={loading}
                        serverError={serverError}
                    />
                </section>
            </div>
        </main>
    );
}

export default CreateCompanyPage;
