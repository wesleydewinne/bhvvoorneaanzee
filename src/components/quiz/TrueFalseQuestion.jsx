function TrueFalseQuestion({ question, onAnswer }) {
    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <button
                    onClick={() => onAnswer(question.correct === true)}
                    style={{
                        padding: "0.75rem 2rem",
                        background: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "1.6rem",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#43a047")}
                    onMouseOut={(e) => (e.target.style.background = "#4caf50")}
                >
                    Juist
                </button>
                <button
                    onClick={() => onAnswer(question.correct === false)}
                    style={{
                        padding: "0.75rem 2rem",
                        background: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "1.6rem",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#e53935")}
                    onMouseOut={(e) => (e.target.style.background = "#f44336")}
                >
                    Onjuist
                </button>
            </div>
        </div>
    );
}

export default TrueFalseQuestion;
