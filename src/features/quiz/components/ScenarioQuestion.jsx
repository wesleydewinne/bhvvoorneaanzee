import { useState } from "react";

function ScenarioQuestion({ question, onAnswer }) {
    const [answers, setAnswers] = useState({}); // { index: gekozenOpt }

    const handleSelect = (subIndex, optionIndex) => {
        setAnswers((prev) => ({ ...prev, [subIndex]: optionIndex }));
    };

    const handleConfirm = () => {
        // Check correctheid van alle subvragen
        const allCorrect = question.subQuestions.every((q, i) => {
            return answers[i] === q.correct;
        });

        onAnswer(allCorrect, answers); // tweede param = gegeven antwoorden
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>Scenario: {question.scenario}</h2>

            {question.subQuestions.map((q, i) => (
                <div
                    key={i}
                    style={{
                        marginBottom: "1.5rem",
                        padding: "1rem",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        textAlign: "left",
                    }}
                >
                    <p style={{ fontWeight: 500, marginBottom: "0.5rem" }}>
                        {i + 1}. {q.text}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {q.options.map((opt, j) => (
                            <button
                                key={j}
                                onClick={() => handleSelect(i, j)}
                                style={{
                                    padding: "0.5rem 1rem",
                                    background: answers[i] === j ? "#646cff" : "#f9f9f9",
                                    color: answers[i] === j ? "white" : "black",
                                    border: answers[i] === j ? "1px solid #535bf2" : "1px solid #ddd",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    textAlign: "left",
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={handleConfirm}
                disabled={Object.keys(answers).length !== question.subQuestions.length}
                style={{
                    padding: "0.75rem 1.5rem",
                    background:
                        Object.keys(answers).length === question.subQuestions.length
                            ? "#646cff"
                            : "#aaa",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1.5rem",
                    cursor:
                        Object.keys(answers).length === question.subQuestions.length
                            ? "pointer"
                            : "not-allowed",
                    transition: "background 0.2s",
                    marginTop: "1rem",
                }}
            >
                Bevestigen
            </button>
        </div>
    );
}

export default ScenarioQuestion;
