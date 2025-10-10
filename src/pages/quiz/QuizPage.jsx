import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext.jsx";
import QuestionRenderer from "../../components/quiz/QuestionRenderer.jsx";
import quizData from "../../data/quizData.json";
import "./QuizPage.css";

function QuizPage() {
    const [quiz, setQuiz] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState({});
    const [visited, setVisited] = useState({});
    const [finished, setFinished] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const { saveAnswer } = useQuiz();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("✅ QuizData geladen:", quizData);
        setQuiz(quizData);
    }, []);

    const handleAnswer = (isCorrect, givenAnswer) => {
        const q = quiz[current];

        // ✅ Opslaan in context
        saveAnswer(q.id, givenAnswer, isCorrect);

        setAnswered((prev) => ({ ...prev, [current]: true }));
        setVisited((prev) => ({ ...prev, [current]: true }));
        if (isCorrect) setScore((s) => s + 1);

        if (current + 1 < quiz.length) {
            setCurrent((c) => c + 1);
        } else {
            checkFinish();
        }
    };

    const skipQuestion = () => {
        setVisited((prev) => ({ ...prev, [current]: true }));
        if (current + 1 < quiz.length) {
            setCurrent((c) => c + 1);
        }
    };

    const checkFinish = () => {
        const allAnswered = quiz.every((_, i) => answered[i]);
        if (allAnswered) {
            setFinished(true);
            // ⬅️ direct naar resultatenpagina
            navigate("/quiz-result");
        }
    };

    if (quiz.length === 0) return <p>Loading quiz...</p>;

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1>BHV Quiz</h1>
                <button className="info-btn" onClick={() => setShowInfo(true)}>i</button>
            </div>

            {/* uitleg popup */}
            {showInfo && (
                <div className="info-popup">
                    <div className="info-content">
                        <h2>Uitleg quiz</h2>
                        <ul>
                            <li><span className="dot gray"></span> Niet geopend</li>
                            <li><span className="dot purple"></span> Huidige vraag</li>
                            <li><span className="dot orange"></span> Openstaand</li>
                            <li><span className="dot green"></span> Beantwoord</li>
                        </ul>
                        <button onClick={() => setShowInfo(false)}>Sluiten</button>
                    </div>
                </div>
            )}

            {/* bolletjes */}
            <div className="progress-dots">
                {quiz.map((q, index) => {
                    let dotClass = "dot";
                    if (answered[index]) dotClass += " green";
                    else if (index === current) dotClass += " purple";
                    else if (visited[index]) dotClass += " orange";
                    else dotClass += " gray";

                    return (
                        <span
                            key={q.id}
                            className={dotClass}
                            onClick={() => setCurrent(index)}
                        ></span>
                    );
                })}
            </div>

            <p>Vraag {current + 1} van {quiz.length}</p>

            {!finished ? (
                <div>
                    <QuestionRenderer
                        question={quiz[current]}
                        onAnswer={handleAnswer}
                    />
                    <button onClick={skipQuestion}>Overslaan</button>
                    <button
                        onClick={checkFinish}
                        disabled={quiz.some((_, i) => !answered[i])}
                    >
                        Quiz afronden
                    </button>
                </div>
            ) : (
                <div className="quiz-result">
                    <h2>Klaar!</h2>
                    <p>Je score: {score} / {quiz.length}</p>
                </div>
            )}
        </div>
    );
}

export default QuizPage;
