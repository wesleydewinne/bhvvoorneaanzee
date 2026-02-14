// src/context/QuizContext.jsx
import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [answers, setAnswers] = useState({});

    const saveAnswer = (questionId, givenAnswer, isCorrect) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: { given: givenAnswer, isCorrect },
        }));
    };

    const resetQuiz = () => setAnswers({});

    return (
        <QuizContext.Provider value={{ answers, saveAnswer, resetQuiz }}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    return useContext(QuizContext);
}
