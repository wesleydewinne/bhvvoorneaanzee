import { Routes, Route } from "react-router-dom";

import publicRoutes from "@/app/routes/publicRoutes.jsx";
import privateRoutes from "@/app/routes/privateRoutes.jsx";
import quizRoutes from "@/app/routes/quizRoutes.jsx";

import QuizPrivateRoute from "@/features/auth/components/QuizPrivateRoute";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage.jsx";

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
