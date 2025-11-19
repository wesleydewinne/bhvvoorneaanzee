import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import "./Dashboard.css";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosClient.get("/auth/me");
                console.log("USER DATA FROM BACKEND:", res.data); // <- hier log je alles
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

    if (loading) {
        return <p>Gegevens laden...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!user) {
        // fallback, zou normaal niet voorkomen als loading klaar is
        return <p>Geen gebruikersgegevens gevonden.</p>;
    }

    return (
        <div className="dashboard-container">
            <h2>Welkom terug, {user.name}!</h2>
            <p className="username">Ingelogd als: {user.username}</p>

            <div className="info-box">
                <h3>Jouw accountgegevens</h3>
                <ul>
                    <li>Naam: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Rol: {user.roles.replace("ROL_", "").toLowerCase().replace(/^\w/, c => c.toUpperCase())}</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
