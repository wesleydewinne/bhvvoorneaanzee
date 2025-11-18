import { useState } from "react";
import axiosClient from "@/api/axiosClient";
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
            const res = await axiosClient.post("/auth/login", { email, password });

            localStorage.setItem("token", res.data.token);

            // NA LOGIN → direct via router navigeren
            navigate("/dashboard");
        } catch (err) {
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
