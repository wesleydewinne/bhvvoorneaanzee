import { useState } from "react";

function ChecklistQuestion({ question, onAnswer }) {
    const [checked, setChecked] = useState([]);

    const toggle = (i) =>
        setChecked((prev) =>
            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );

    const handleConfirm = () => {
        if (!question.correct) {
            // Geen correct → altijd goed, maar geef keuzes terug
            onAnswer(true, checked);
            return;
        }
        const isCorrect =
            checked.sort().toString() === question.correct.sort().toString();
        onAnswer(isCorrect, checked);
    };

    return (
        <div style={{ textAlign: "center" }}>
            {/* Vraag */}
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            {/* Optioneel aantal correcte antwoorden tonen */}
            {question.correct && question.showAnswerCount && (
                <p style={{ marginBottom: "1rem", color: "#666" }}>
                    Vink <strong>{question.correct.length}</strong> juiste opties aan
                </p>
            )}

            {/* Opties in grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1rem",
                    maxWidth: "700px",
                    margin: "0 auto 2rem",
                    textAlign: "left",
                }}
            >
                {question.options.map((opt, i) => (
                    <label
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.75rem 1rem",
                            background: checked.includes(i) ? "#e6e9ff" : "#f9f9f9",
                            border: checked.includes(i)
                                ? "2px solid #646cff"
                                : "1px solid #ddd",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            fontSize: "1.5rem",
                            fontWeight: checked.includes(i) ? "600" : "400",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background = checked.includes(i)
                                ? "#d7dbfa"
                                : "#f1f1f1")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = checked.includes(i)
                                ? "#e6e9ff"
                                : "#f9f9f9")
                        }
                    >
                        <input
                            type="checkbox"
                            checked={checked.includes(i)}
                            onChange={() => toggle(i)}
                            style={{ transform: "scale(1.3)", accentColor: "#646cff" }}
                        />
                        {opt}
                    </label>
                ))}
            </div>

            {/* Bevestigen-knop */}
            <button
                onClick={handleConfirm}
                style={{
                    padding: "0.75rem 1.5rem",
                    background: "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1.5rem",
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

export default ChecklistQuestion;
