import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AccessPage.css";

function AccessPage() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check of er een melding is
        const message = localStorage.getItem("quizMessage");
        if (message) {
            setError(message);
            localStorage.removeItem("quizMessage"); // meteen wissen na tonen
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === "BHV2025") {
            const expiry = Date.now() + 6 * 60 * 60 * 1000; // 6 uur geldig
            localStorage.setItem("quizAccess", JSON.stringify({ active: true, expiry }));

            navigate("/quiz-intro");
        } else {
            setError("Ongeldige toegangscode");
        }
    };

    return (
        <div className="page-container small">
            <h1>Toegang tot de BHV Quiz</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Voer toegangscode in"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit">Doorgaan</button>
            </form>
        </div>
    );
}

export default AccessPage;
