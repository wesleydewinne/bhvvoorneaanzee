// -------------------------------
// 📌 Bestaande imports
// -------------------------------
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

import publicRoutes from "./routes/publicRoutes.jsx";
import privateRoutes from "./routes/privateRoutes.jsx";
import quizRoutes from "./routes/quizRoutes.jsx";

import QuizPrivateRoute from "./components/auth/QuizPrivateRoute.jsx";

import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import Head from "@/components/head/Head.jsx";

// -------------------------------
// ⭐ Nieuwe imports voor sessiebeheer
// -------------------------------
import useSessionTimer from "@/hooks/useSessionTimer";
import SessionWarningPopup from "@/components/sessionWarningPopup/SessionWarningPopup.jsx";
import api from "@/api/api";
import { useState } from "react";

function App() {

    // ------------------------------------------
    // 🔥 Sessie popup staat
    // ------------------------------------------
    const [showPopup, setShowPopup] = useState(false);

    // ------------------------------------------
    // 🔥 Sessie timer systeem
    // ------------------------------------------
    useSessionTimer({
        refreshLifetimeHours: 10,
        warningMinutes: 15,
        onShowWarning: () => setShowPopup(true),
        onAutoLogout: async () => {
            await api.post("/auth/logout");
            window.location.href = "/inloggen";
        }
    });

    // ------------------------------------------
    // 🔄 Popup acties
    // ------------------------------------------
    const handleStayLoggedIn = async () => {
        await api.post("/auth/refresh");
        setShowPopup(false);
    };

    const handleLogout = async () => {
        await api.post("/auth/logout");
        window.location.href = "/inloggen";
    };


    return (
        <>
            {/* --------------------------------------
                ⭐ De popup komt boven ALLES te staan
             --------------------------------------- */}
            {showPopup && (
                <SessionWarningPopup
                    minutesRemaining={15}
                    onStayLoggedIn={handleStayLoggedIn}
                    onLogout={handleLogout}
                />
            )}

            {/* --------------------------------------
                ✔️ Rest van jouw bestaande app
             --------------------------------------- */}
            <Head />
            <Header />

            <div className="outer-container">
                <main className="content">
                    <div className="fullscreen-center">

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

                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
}

export default App;
