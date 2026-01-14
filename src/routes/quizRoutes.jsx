import QuizIntroPage from "../pages/quiz/QuizIntroPage.jsx";
import QuizPage from "../pages/quiz/QuizPage.jsx";
import ResultPage from "../pages/quiz/ResultPage.jsx";
import { QUIZ_PATHS } from "./routePaths";

const quizRoutes = [
    { path: QUIZ_PATHS[0], element: <QuizIntroPage /> },
    { path: QUIZ_PATHS[1], element: <QuizPage /> },
    { path: QUIZ_PATHS[2], element: <ResultPage /> },
];

export default quizRoutes;