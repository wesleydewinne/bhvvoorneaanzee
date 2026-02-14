import { useState } from "react";

function VideoQuestion({ question, onAnswer }) {
    const [selected, setSelected] = useState(null);

    const handleConfirm = () => {
        if (selected === null) return;
        const isCorrect = selected === question.correct;
        onAnswer(isCorrect);
        setSelected(null); // reset voor volgende vraag
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            {/* Video player */}
            <video
                controls
                style={{
                    marginBottom: "1.5rem",
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "8px",
                }}
            >
                <source src={question.video} type="video/mp4" />
                Je browser ondersteunt geen video afspelen.
            </video>

            {/* Opties (responsive grid) */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "0.75rem",
                    maxWidth: "800px",
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
                            border: selected === i ? "2px solid #535bf2" : "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            textAlign: "center",
                            whiteSpace: "normal",
                            minHeight: "60px",
                        }}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Bevestigen knop */}
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
        </div>
    );
}

export default VideoQuestion;
