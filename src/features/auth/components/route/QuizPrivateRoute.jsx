import { Navigate } from "react-router-dom";

function QuizPrivateRoute({ children }) {
    const access = localStorage.getItem("quizAccess");
    let hasAccess = false;

    if (access) {
        try {
            const { active, expiry } = JSON.parse(access);
            if (active && Date.now() < expiry) {
                hasAccess = true;
            } else {
                // verlopen → melding opslaan en toegang wissen
                localStorage.removeItem("quizAccess");
                localStorage.setItem("quizMessage", "Je sessie is verlopen. Log opnieuw in om verder te gaan.");
            }
        } catch {
            localStorage.removeItem("quizAccess");
        }
    }

    return hasAccess ? children : <Navigate to="/quiz-access" replace />;
}

export default QuizPrivateRoute;
