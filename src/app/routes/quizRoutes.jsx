import { lazy } from "react";
import { QUIZ_PATHS } from "./routePaths.js";

const QuizIntroPage = lazy(() => import("../../pages/quiz/QuizIntroPage.jsx"));
const QuizPage = lazy(() => import("../../pages/quiz/QuizPage.jsx"));
const ResultPage = lazy(() => import("../../pages/quiz/ResultPage.jsx"));

const quizRoutes = [
    { path: QUIZ_PATHS.intro, element: <QuizIntroPage /> },
    { path: QUIZ_PATHS.quiz, element: <QuizPage /> },
    { path: QUIZ_PATHS.result, element: <ResultPage /> },
];

export default quizRoutes;
