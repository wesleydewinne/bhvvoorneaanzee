import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import "./Dashboard.css";

function Dashboard() {
    const { user, loading, authenticated } = useAuthContext();

    if (loading) {
        return <p>Gegevens laden...</p>;
    }

    if (!authenticated) {
        return <p style={{ color: "red" }}>Je bent niet ingelogd.</p>;
    }

    if (!user) {
        return <p>Geen gebruikersgegevens gevonden.</p>;
    }

    const roles = Array.isArray(user.roles) ? user.roles : [];
    const primaryRole = roles.length > 0 ? roles[0] : "ROLE_ONBEKEND";

    const cleanedRoleRaw = primaryRole.replace("ROLE_", "").toLowerCase();
    const cleanedRole =
        cleanedRoleRaw.charAt(0).toUpperCase() + cleanedRoleRaw.slice(1);

    const displayName =
        user.firstname ??
        user.name ??
        user.username ??
        "Gebruiker";

    return (
        <div className="dashboard-container">
            <h2>Welkom terug, {displayName}!</h2>
            <p className="username">Ingelogd als: {user.email}</p>

            <div className="info-box">
                <h3>Jouw accountgegevens</h3>
                <ul>
                    <li>Naam: {displayName}</li>
                    <li>Email: {user.email}</li>
                    <li>Rol: {cleanedRole}</li>
                    {user.location && <li>Locatie: {user.location}</li>}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
