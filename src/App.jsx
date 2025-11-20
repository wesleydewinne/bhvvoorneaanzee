import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

import publicRoutes from "./routes/publicRoutes.jsx";
import privateRoutes from "./routes/privateRoutes.jsx";
import quizRoutes from "./routes/quizRoutes.jsx";

import QuizPrivateRoute from "./components/auth/QuizPrivateRoute.jsx";

import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import Head from "@/components/head/Head.jsx";

function App() {
    return (
        <div className="outer-container">
            <Head />
            <Header />

            <main className="content">
                <div className="fullscreen-center">
                    <Routes>
                        {/* Publieke routes */}
                        {publicRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}

                        {/* Private routes (bevatten zelf ProtectedRoute) */}
                        {privateRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}

                        {/* Quiz backoffice beveiliging */}
                        {quizRoutes.map(({ path, element }) => (
                            <Route
                                key={path}
                                path={path}
                                element={<QuizPrivateRoute>{element}</QuizPrivateRoute>}
                            />
                        ))}

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
