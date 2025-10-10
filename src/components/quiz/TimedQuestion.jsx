import { useEffect, useState } from "react";

function TimedQuestion({ question, onAnswer }) {
    const [time, setTime] = useState(question.time || 10);

    useEffect(() => {
        if (time <= 0) return onAnswer(false);
        const t = setTimeout(() => setTime(time - 1), 1000);
        return () => clearTimeout(t);
    }, [time]);

    return (
        <div>
            <h2>{question.question}</h2>
            <p>Tijd over: {time}s</p>
            {question.options.map((opt, i) => (
                <button key={i} onClick={() => onAnswer(i === question.correct)}>
                    {opt}
                </button>
            ))}
        </div>
    );
}
export default TimedQuestion;
