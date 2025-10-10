import QuizIntroPage from "../pages/quiz/QuizIntroPage.jsx";
import QuizPage from "../pages/quiz/QuizPage.jsx";
import ResultPage from "../pages/quiz/ResultPage.jsx";

const quizRoutes = [
    { path: "/quiz-intro", element: <QuizIntroPage /> },
    { path: "/quiz", element: <QuizPage /> },
    { path: "/quiz-result", element: <ResultPage /> },
];

export default quizRoutes;
