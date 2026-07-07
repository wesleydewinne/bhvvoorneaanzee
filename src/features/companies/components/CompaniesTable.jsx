import { useNavigate } from "react-router-dom";

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
        <div className="companies-table-wrapper">
            <table className="companies-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Bedrijfsnaam</th>
                    <th className="companies-table__actions-column">Acties</th>
                </tr>
                </thead>

                <tbody>
                {companies.map((company) => (
                    <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name || "-"}</td>

                        <td className="companies-table__actions-cell">
                            <div className="companies-table__icon-actions">
                                <button
                                    type="button"
                                    className="icon-action-button"
                                    onClick={() => navigate(`/admin/companies/${company.id}`)}
                                    aria-label={`Bekijk bedrijf ${company.name}`}
                                    title="Bekijken"
                                >
                                    👁
                                </button>

                                <button
                                    type="button"
                                    className="icon-action-button"
                                    onClick={() => navigate(`/admin/companies/${company.id}/edit`)}
                                    aria-label={`Bewerk bedrijf ${company.name}`}
                                    title="Bewerken"
                                >
                                    ✏️
                                </button>

                                {onDelete ? (
                                    <button
                                        type="button"
                                        className="icon-action-button icon-action-button--danger"
                                        onClick={() => onDelete(company)}
                                        aria-label={`Verwijder bedrijf ${company.name}`}
                                        title="Verwijderen"
                                    >
                                        🗑
                                    </button>
                                ) : null}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompaniesTable;