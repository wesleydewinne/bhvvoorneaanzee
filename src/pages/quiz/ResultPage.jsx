import { useQuiz } from "@/features/quiz/context/QuizContext.jsx";
import quizData from "@/shared/data/quizData.json";

function ResultPage() {
    const { answers } = useQuiz();

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <h1>Resultaten</h1>
            {quizData.map((q) => {
                const data = answers[q.id];
                if (!data) return null;

                return (
                    <div
                        key={q.id}
                        style={{
                            marginBottom: "1rem",
                            padding: "1rem",
                            borderRadius: "6px",
                            background: data.isCorrect ? "#e6ffe6" : "#ffe6e6",
                            border: `1px solid ${data.isCorrect ? "#66cc66" : "#cc6666"}`,
                        }}
                    >
                        <p>
                            <strong>Vraag {q.id}:</strong> {data.isCorrect ? "✅ Goed" : "❌ Fout"}
                        </p>
                        <p>
                            <strong>Jouw antwoord:</strong>{" "}
                            {Array.isArray(data.given) ? data.given.join(", ") : data.given}
                        </p>
                        {!data.isCorrect && (
                            <p>
                                <strong>Correct antwoord:</strong>{" "}
                                {JSON.stringify(q.correct)}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ResultPage;
