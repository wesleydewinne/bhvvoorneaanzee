import { useNavigate } from "react-router-dom";

function LocationsTable({ locations }) {
    const navigate = useNavigate();

    if (!locations.length) {
        return (
            <div className="locations-empty">
                <p>Geen locaties gevonden.</p>
            </div>
        );
    }

    return (
        <div className="locations-table-wrapper">
            <table className="locations-table">
                <thead>
                <tr>
                    <th>Locatienaam</th>
                    <th>Adres</th>
                    <th>Postcode</th>
                    <th>Plaats</th>
                    <th>Telefoon</th>
                    <th>E-mail</th>
                    <th className="locations-table__actions-column">Acties</th>
                </tr>
                </thead>
                <tbody>
                {locations.map((location) => (
                    <tr key={location.id}>
                        <td>{location.locationName || "-"}</td>
                        <td>{location.address || "-"}</td>
                        <td>{location.postalCode || "-"}</td>
                        <td>{location.city || "-"}</td>
                        <td>{location.phone || "-"}</td>
                        <td>{location.email || "-"}</td>
                        <td className="locations-table__actions-cell">
                            <div className="locations-table__icon-actions">
                                <button
                                    type="button"
                                    className="icon-action-button"
                                    onClick={() => navigate(`/admin/locations/${location.id}`)}
                                    aria-label={`Bekijk locatie ${location.locationName}`}
                                    title="Bekijken"
                                >
                                    👁
                                </button>

                                <button
                                    type="button"
                                    className="icon-action-button"
                                    onClick={() => navigate(`/admin/locations/${location.id}/edit`)}
                                    aria-label={`Bewerk locatie ${location.locationName}`}
                                    title="Bewerken"
                                >
                                    ✏️
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default LocationsTable;
