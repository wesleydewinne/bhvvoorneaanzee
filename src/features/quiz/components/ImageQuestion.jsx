import { useState } from "react";

function ImageQuestion({ question, onAnswer }) {
    const [selected, setSelected] = useState(null);

    const handleConfirm = () => {
        if (selected === null) return;
        const isCorrect = selected === question.correct; // correct is index
        const chosenAnswer = question.options[selected]; // sla echte afbeelding-URL op
        onAnswer(isCorrect, chosenAnswer);
        setSelected(null); // reset voor volgende vraag
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            {/* Afbeeldingen tonen */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                    justifyItems: "center",
                    marginBottom: "1.5rem",
                }}
            >
                {question.options.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`Optie ${i + 1}`}
                        onClick={() => setSelected(i)}
                        style={{
                            width: "100%",
                            maxWidth: "180px",
                            border: selected === i ? "3px solid #646cff" : "2px solid #ddd",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    />
                ))}
            </div>

            <button
                onClick={handleConfirm}
                disabled={selected === null}
                style={{
                    padding: "0.75rem 1.5rem",
                    background: selected === null ? "#aaa" : "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor: selected === null ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                }}
            >
                Bevestigen
            </button>
        </div>
    );
}

export default ImageQuestion;
