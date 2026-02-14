import { useState } from "react";

function PollQuestion({ question, onAnswer }) {
    const [selected, setSelected] = useState(null);

    const handleConfirm = () => {
        if (selected === null) return;
        // Poll heeft geen goed/fout, altijd true, maar geeft de keuze terug
        onAnswer(true, selected);
        setSelected(null); // reset voor de volgende keer
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            {/* Opties */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "0.75rem",
                    maxWidth: "500px",
                    margin: "0 auto 1.5rem",
                }}
            >
                {question.options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => setSelected(i)}
                        style={{
                            padding: "0.75rem 1rem",
                            background: selected === i ? "#646cff" : "#f9f9f9",
                            color: selected === i ? "white" : "black",
                            border: selected === i ? "1px solid #535bf2" : "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Bevestigen */}
            <button
                onClick={handleConfirm}
                disabled={selected === null}
                style={{
                    padding: "0.75rem 1.5rem",
                    background: selected === null ? "#aaa" : "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1.5rem",
                    cursor: selected === null ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                }}
            >
                Bevestigen
            </button>

            <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#666" }}>
                (Geen goed/fout, dit is een peiling)
            </p>
        </div>
    );
}

export default PollQuestion;
