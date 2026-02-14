import { useState } from "react";

function OpenQuestion({ question, onAnswer }) {
    const [input, setInput] = useState("");

    const check = () => {
        const isCorrect = question.correct.some(
            (ans) => ans.toLowerCase() === input.trim().toLowerCase()
        );
        onAnswer(isCorrect);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Typ je antwoord..."
                    style={{
                        padding: "0.75rem 1rem",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        fontSize: "1.5rem",
                        width: "250px",
                        outline: "none",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#646cff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
                <button
                    onClick={check}
                    style={{
                        padding: "0.75rem 1.5rem",
                        background: "#646cff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "1.6rem",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#535bf2")}
                    onMouseOut={(e) => (e.target.style.background = "#646cff")}
                >
                    Bevestigen
                </button>
            </div>
        </div>
    );
}

export default OpenQuestion;
