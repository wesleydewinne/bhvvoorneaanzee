import { useState } from "react";

function MultiSelectQuestion({ question, onAnswer }) {
    const [selected, setSelected] = useState([]);

    const toggle = (i) =>
        setSelected((prev) =>
            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );

    const handleConfirm = () => {
        if (!question.correct) {
            // Geen correct → altijd goed, geef de selectie terug
            onAnswer(true, selected);
            return;
        }

        const isCorrect =
            selected.sort().toString() === question.correct.sort().toString();
        onAnswer(isCorrect, selected);
    };

    return (
        <div style={{ textAlign: "center" }}>
            {/* Vraag */}
            <h2 style={{ marginBottom: "1rem" }}>{question.question}</h2>

            {/* Optioneel aantal juiste antwoorden tonen */}
            {question.correct && question.showAnswerCount && (
                <p style={{ marginBottom: "1.5rem", color: "#666" }}>
                    Kies <strong>{question.correct.length}</strong> juiste antwoorden
                </p>
            )}

            {/* Opties container */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "0.75rem",
                    maxWidth: "800px",
                    margin: "0 auto 1.5rem",
                    textAlign: "left",
                }}
            >
                {question.options.map((opt, i) => (
                    <label
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem 1rem",
                            background: "#f9f9f9",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "background 0.2s",
                            minHeight: "60px",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#f1f1f1")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = "#f9f9f9")
                        }
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(i)}
                            onChange={() => toggle(i)}
                            style={{ transform: "scale(1.2)" }}
                        />
                        {opt}
                    </label>
                ))}
            </div>

            {/* Bevestigen */}
            <button
                onClick={handleConfirm}
                style={{
                    padding: "0.75rem 1.5rem",
                    background: "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#535bf2")}
                onMouseOut={(e) => (e.target.style.background = "#646cff")}
            >
                Bevestigen
            </button>
        </div>
    );
}

export default MultiSelectQuestion;
