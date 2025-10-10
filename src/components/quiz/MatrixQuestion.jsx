import { useState } from "react";
import { useQuiz } from "../../context/QuizContext.jsx";

function MatrixQuestion({ question, onAnswer }) {
    const { saveAnswer } = useQuiz();
    const [answers, setAnswers] = useState({}); // { row: gekozenCol }

    const handleChange = (row, col) => {
        setAnswers((prev) => ({ ...prev, [row]: col }));
    };

    const handleConfirm = () => {
        let isCorrect = true;

        if (question.correct) {
            // Check of alle rijen correct zijn beantwoord
            isCorrect = question.rows.every(
                (row) => answers[row] === question.correct[row]
            );
        }

        // ⬇️ direct opslaan in context
        saveAnswer(question.id, answers, isCorrect);

        // teruggeven aan quiz flow
        onAnswer(isCorrect, answers);
    };

    return (
        <div style={{ textAlign: "center" }}>
            {/* Vraag */}
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            {/* Matrix tabel */}
            <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
                <table
                    style={{
                        borderCollapse: "collapse",
                        margin: "0 auto",
                        minWidth: "500px",
                        fontSize: "0.95rem",
                    }}
                >
                    <thead>
                    <tr style={{ background: "#f3f3f3" }}>
                        <th
                            style={{
                                border: "1px solid #ddd",
                                padding: "0.75rem 1rem",
                                textAlign: "left",
                            }}
                        >
                            Situatie
                        </th>
                        {question.columns.map((col, i) => (
                            <th
                                key={i}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "0.75rem 1rem",
                                }}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {question.rows.map((row, i) => (
                        <tr key={i}>
                            <td
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "0.75rem 1rem",
                                    textAlign: "left",
                                    fontWeight: 500,
                                }}
                            >
                                {row}
                            </td>
                            {question.columns.map((col, j) => (
                                <td
                                    key={j}
                                    style={{
                                        border: "1px solid #ddd",
                                        textAlign: "center",
                                        padding: "0.5rem",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name={`row-${i}`}
                                        value={col}
                                        checked={answers[row] === col}
                                        onChange={() => handleChange(row, col)}
                                        style={{ transform: "scale(1.2)", cursor: "pointer" }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Bevestigen */}
            <button
                onClick={handleConfirm}
                disabled={Object.keys(answers).length !== question.rows.length}
                style={{
                    padding: "0.75rem 1.5rem",
                    background:
                        Object.keys(answers).length === question.rows.length
                            ? "#646cff"
                            : "#aaa",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor:
                        Object.keys(answers).length === question.rows.length
                            ? "pointer"
                            : "not-allowed",
                    transition: "background 0.2s",
                }}
            >
                Bevestigen
            </button>
        </div>
    );
}

export default MatrixQuestion;
