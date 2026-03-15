import { Link } from "react-router-dom";
import { getRolesLabel, getStatusLabel } from "../helpers/userFormatters.js";
import UserStatusBadge from "./UserStatusBadge.jsx";

export default function UsersTable({
                                       users,
                                       statusFilter,
                                       onStatusFilterChange
                                   }) {

    return (
        <div className="um-table-card">

            <div className="um-table-wrapper">
                <table className="um-table">

                    <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Geboortedatum</th>
                        <th>E-mail</th>
                        <th>Rollen</th>

                        <th className="um-status-header">
                            Status

                            <select
                                className="um-status-filter"
                                value={statusFilter}
                                onChange={(e) =>
                                    onStatusFilterChange(e.target.value)
                                }
                            >
                                <option value="ALL">Alle</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="DISABLED">DISABLED</option>
                            </select>
                        </th>

                        <th>Acties</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => {

                            const status = getStatusLabel(user);

                            return (
                                <tr key={user.id}>

                                    <td>{user.firstName ?? "-"}</td>
                                    <td>{user.lastName ?? "-"}</td>

                                    <td>
                                        {user.dateOfBirth
                                            ? new Date(user.dateOfBirth).toLocaleDateString("nl-NL")
                                            : "-"}
                                    </td>

                                    <td>{user.email ?? "-"}</td>

                                    <td>{getRolesLabel(user)}</td>

                                    <td>
                                        <UserStatusBadge status={status} />
                                    </td>

                                    <td>
                                        <Link
                                            to={`/admin/users/${user.id}`}
                                            className="um-button um-button--secondary"
                                        >
                                            Bekijken
                                        </Link>
                                    </td>

                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>Geen gebruikers gevonden</td>
                        </tr>
                    )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}