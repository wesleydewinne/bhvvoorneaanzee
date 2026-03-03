import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const { user, loading, authenticated } = useAuthContext();
    const navigate = useNavigate();

    if (loading) return <p>Gegevens laden...</p>;

    if (!authenticated) {
        return <p style={{ color: "red" }}>Je bent niet ingelogd.</p>;
    }

    if (!user) {
        return <p>Geen gebruikersgegevens gevonden.</p>;
    }

    // ✅ Rollen uit alle varianten halen:
    // - user.roles: ["ROLE_ADMIN"]
    // - user.globalRoles: ["ROLE_ADMIN"]
    // - user.roles/globalRoles als objecten
    // - user.authorities: [{ authority: "ROLE_ADMIN" }]
    const roles = (() => {
        const normalize = (item) => {
            if (!item) return null;
            if (typeof item === "string") return item;
            return item.name || item.role || item.authority || null;
        };

        const fromRoles = Array.isArray(user?.roles) ? user.roles.map(normalize) : [];
        const fromGlobalRoles = Array.isArray(user?.globalRoles)
            ? user.globalRoles.map(normalize)
            : [];
        const fromAuthorities = Array.isArray(user?.authorities)
            ? user.authorities.map(normalize)
            : [];

        return [...fromRoles, ...fromGlobalRoles, ...fromAuthorities].filter(Boolean);
    })();

    const primaryRole = roles[0] || "ROLE_ONBEKEND";

    const cleanedRole =
        primaryRole === "ROLE_ONBEKEND"
            ? "Onbekend"
            : (() => {
                const raw = primaryRole.replace("ROLE_", "").toLowerCase();
                return raw.charAt(0).toUpperCase() + raw.slice(1);
            })();

    const displayName =
        user.firstName ??
        user.firstname ??
        user.name ??
        user.username ??
        "Gebruiker";

    const isAdmin = roles.includes("ROLE_ADMIN");

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

            {/* ✅ Admin ingang */}
            {isAdmin && (
                <div className="info-box">
                    <h3>Beheer</h3>
                    <p>Gebruikers en locaties beheren.</p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <button onClick={() => navigate("/admin/users")}>Gebruikers</button>
                        <button onClick={() => navigate("/admin/locations")}>Locaties</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;