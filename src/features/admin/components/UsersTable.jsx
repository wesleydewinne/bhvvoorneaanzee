import { Link } from "react-router-dom";
import { useState } from "react";
import userService from "../services/userService";

export default function UsersTable({ users, onRefresh }) {
    const [busyId, setBusyId] = useState(null);

    const handleDeactivate = async (id) => {
        try {
            setBusyId(id);
            await userService.deactivate(id);
            await onRefresh?.();
        } finally {
            setBusyId(null);
        }
    };

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Naam</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Status</th>
                <th>Acties</th>
            </tr>
            </thead>

            <tbody>
            {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => {
                    const disabled = isUserDisabled(user);

                    return (
                        <tr
                            key={user.id}
                            style={{
                                opacity: disabled ? 0.55 : 1,
                                textDecoration: disabled ? "line-through" : "none",
                            }}
                        >
                            <td>
                                <Link to={`/admin/users/${user.id}`} style={{ textDecoration: "underline" }}>
                                    #{user.id}
                                </Link>
                            </td>
                            <td>{getFullName(user)}</td>
                            <td>{user.email ?? "-"}</td>
                            <td>{getRolesLabel(user)}</td>
                            <td>{getStatusLabel(user)}</td>
                            <td>
                                <button type="button" onClick={() => handleDeactivate(user.id)} disabled={busyId === user.id}>
                                    {busyId === user.id ? "Bezig..." : "Deactiveer"}
                                </button>
                            </td>
                        </tr>
                    );
                })
            ) : (
                <tr>
                    <td colSpan={6}>Geen gebruikers gevonden</td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

function isUserDisabled(user) {
    if (user?.status) return String(user.status).toUpperCase() === "DISABLED";
    if (typeof user?.enabled === "boolean") return user.enabled === false;
    return false;
}

function getStatusLabel(user) {
    if (user?.status) return String(user.status).toUpperCase();
    if (typeof user?.enabled === "boolean") return user.enabled ? "ACTIVE" : "DISABLED";
    return "-";
}

function getFullName(user) {
    const first = (user?.firstName ?? user?.firstname ?? "").trim();
    const last = (user?.lastName ?? user?.lastname ?? "").trim();
    const full = `${first} ${last}`.trim();
    return full || "-";
}

function getRolesLabel(user) {
    const roles = user?.globalRoles ?? user?.roles ?? [];
    if (!Array.isArray(roles) || roles.length === 0) return "-";
    return roles.map((r) => String(r).replace("ROLE_", "")).join(", ");
}