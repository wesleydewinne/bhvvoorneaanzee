import { useState } from "react";
import api, { setAccessToken } from "@/api/api.js";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", { email, password });

            // Nieuw token opslaan
            setAccessToken(res.data.accessToken);

            // Navigeren
            navigate("/dashboard");
        } catch (err) {
            console.error("Login fout:", err);
            setError("Ongeldige login of serverfout.");
        }
    };

    return (
        <div>
            <h1>Inloggen</h1>

            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />

                <label>Wachtwoord</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">Inloggen</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
