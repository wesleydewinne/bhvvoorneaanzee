import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Eye, Mail, Pencil, Phone, Trash2, UserRound } from "lucide-react";

function CompaniesTable({ companies, onDelete }) {
    const navigate = useNavigate();

    if (!companies.length) {
        return (
            <div className="companies-empty">
                <p>Geen bedrijven gevonden.</p>
            </div>
        );
    }

    return (
        <div className="companies-grid">
            {companies.map((company) => (
                <article key={company.id} className="company-overview-card">
                    <div className="company-overview-card__header">
                        <span className="company-overview-card__icon"><BriefcaseBusiness aria-hidden="true" /></span>
                        <div>
                            <h3>{company.name || "Naamloos bedrijf"}</h3>
                            <small>Relatie #{company.id}</small>
                        </div>
                    </div>

                    <dl className="company-overview-card__details">
                        <div><UserRound aria-hidden="true" /><dt>Contactpersoon</dt><dd>{company.primaryContactName || "Niet ingevuld"}</dd></div>
                        <div><Mail aria-hidden="true" /><dt>E-mail</dt><dd>{company.primaryContactEmail || "Niet ingevuld"}</dd></div>
                        <div><Phone aria-hidden="true" /><dt>Telefoon</dt><dd>{company.primaryContactPhone || "Niet ingevuld"}</dd></div>
                    </dl>

                    <div className="company-overview-card__actions">
                                <button
                                    type="button"
                                    className="icon-action-button"
                                    onClick={() => navigate(`/admin/companies/${company.id}`)}
                                    aria-label={`Bekijk bedrijf ${company.name}`}
                                    title="Bekijken"
                                >
                                    <Eye aria-hidden="true" />
                                </button>

                                <button
                                    type="button"
                                    className="icon-action-button"
                                    onClick={() => navigate(`/admin/companies/${company.id}/edit`)}
                                    aria-label={`Bewerk bedrijf ${company.name}`}
                                    title="Bewerken"
                                >
                                    <Pencil aria-hidden="true" />
                                </button>

                                {onDelete ? (
                                    <button
                                        type="button"
                                        className="icon-action-button icon-action-button--danger"
                                        onClick={() => onDelete(company)}
                                        aria-label={`Verwijder bedrijf ${company.name}`}
                                        title="Verwijderen"
                                    >
                                        <Trash2 aria-hidden="true" />
                                    </button>
                                ) : null}
                    </div>
                </article>
            ))}
        </div>
    );
}

export default CompaniesTable;
