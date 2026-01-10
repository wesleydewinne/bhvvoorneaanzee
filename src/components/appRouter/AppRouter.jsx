import { Routes, Route } from "react-router-dom";

import publicRoutes from "@/routes/publicRoutes";
import privateRoutes from "@/routes/privateRoutes";
import quizRoutes from "@/routes/quizRoutes";

import QuizPrivateRoute from "@/components/auth/QuizPrivateRoute";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";

function AppRouter() {
    return (
        <Routes>

            {/* Publieke routes */}
            {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}

            {/* Private routes */}
            {privateRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}

            {/* Quiz routes */}
            {quizRoutes.map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={<QuizPrivateRoute>{element}</QuizPrivateRoute>}
                />
            ))}

            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    );
}

export default AppRouter;
