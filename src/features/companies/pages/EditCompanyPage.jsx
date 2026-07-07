import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CompanyForm from "../components/CompanyForm.jsx";
import companyService from "../services/companyService.js";
import {
    getBackendMessage,
    mapCompanyToForm,
} from "../helpers/companyHelpers.js";
import "../styles/Companies.css";

function EditCompanyPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [saving, setSaving] = useState(false);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        const loadCompany = async () => {
            try {
                setLoadingPage(true);
                setServerError("");

                const data = await companyService.getById(id);
                setInitialValues(mapCompanyToForm(data));
            } catch (err) {
                console.error("Fout bij laden bedrijf voor bewerken:", err);
                setServerError(getBackendMessage(err, "Het bedrijf kon niet worden geladen."));
            } finally {
                setLoadingPage(false);
            }
        };

        loadCompany();
    }, [id]);

    const handleSubmit = async (payload) => {
        try {
            setSaving(true);
            setServerError("");

            await companyService.update(id, payload);
            navigate(`/admin/companies/${id}`);
        } catch (err) {
            console.error("Fout bij bewerken bedrijf:", err);
            setServerError(getBackendMessage(err, "Opslaan van wijzigingen is mislukt."));
        } finally {
            setSaving(false);
        }
    };

    if (loadingPage) {
        return (
            <main className="companies-page">
                <div className="companies-page__container">
                    <p>Bedrijf laden...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="companies-page">
            <div className="companies-page__container">
                <section className="companies-page__header">
                    <div>
                        <h1>Bedrijf bewerken</h1>
                        <p>Werk de gegevens van dit bedrijf bij.</p>
                    </div>

                    <Link
                        to={`/admin/companies/${id}`}
                        className="button button--secondary"
                    >
                        Terug
                    </Link>
                </section>

                <section className="company-form-card">
                    <CompanyForm
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

export default EditCompanyPage;