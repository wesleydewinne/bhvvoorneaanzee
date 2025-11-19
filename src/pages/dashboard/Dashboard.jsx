import { useEffect, useState } from "react";
import axiosClient from "@/api/api.js";
import "./Dashboard.css";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosClient.get("/auth/me");
                console.log("USER DATA FROM BACKEND:", res.data);
                setUser(res.data);
            } catch (err) {
                console.error("Kon gebruikersdata niet ophalen:", err);
                setError("Kon gegevens niet laden.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Loading state
    if (loading) {
        return <p>Gegevens laden...</p>;
    }

    // Error state
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    // Geen user teruggekregen
    if (!user) {
        return <p>Geen gebruikersgegevens gevonden.</p>;
    }

    // ------- Rol netjes formatteren -------
    // Backend: roles: ["ROLE_ADMIN"]
    const roles = Array.isArray(user.roles) ? user.roles : [];
    const primaryRole = roles.length > 0 ? roles[0] : "ROLE_ONBEKEND";

    // "ROLE_ADMIN" -> "Admin"
    const cleanedRoleRaw = primaryRole.replace("ROLE_", "").toLowerCase();
    const cleanedRole =
        cleanedRoleRaw.charAt(0).toUpperCase() + cleanedRoleRaw.slice(1);

    // Naam fallback: gebruik name als die bestaat, anders username
    const displayName = user.name ?? user.username ?? "Gebruiker";

    return (
        <div className="dashboard-container">
            <h2>Welkom terug, {displayName}!</h2>
            <p className="username">Ingelogd als: {user.username}</p>

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
