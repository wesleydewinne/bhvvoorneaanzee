import { useState } from "react";

function SliderQuestion({ question, onAnswer }) {
    const [val, setVal] = useState(
        question.min ? Math.round((question.min + (question.max || 10)) / 2) : 5
    );
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleConfirm = () => {
        if (question.correct !== undefined) {
            const correct = val === question.correct;
            setIsCorrect(correct);
            onAnswer(correct, val);
        } else {
            onAnswer(true, val);
        }
        setAnswered(true);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            <input
                type="range"
                min={question.min || 1}
                max={question.max || 10}
                value={val}
                onChange={(e) => setVal(Number(e.target.value))}
                style={{ width: "100%", maxWidth: "400px" }}
            />

            <p style={{ margin: "1rem 0", color: "#333" }}>
                Waarde: <strong>{val}</strong> (tussen {question.min || 1} en{" "}
                {question.max || 10})
            </p>

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

            {/* Feedback */}
            {answered && question.correct !== undefined && question.showAnswerCorrect && (
                <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                    Het juiste antwoord is: {question.correct}
                </p>
            )}
            {answered && isCorrect === true && (
                <p style={{ marginTop: "0.5rem", color: "green" }}>Goed gedaan ✅</p>
            )}
            {answered && isCorrect === false && (
                <p style={{ marginTop: "0.5rem", color: "red" }}>Helaas ❌</p>
            )}
        </div>
    );
}

export default SliderQuestion;
