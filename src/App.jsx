import { useState } from "react";
import Head from "@/components/head/Head";
import Layout from "@/components/layout/Layout";
import AppRouter from "@/components/appRouter/AppRouter";

import useSessionTimer from "@/hooks/useSessionTimer";
import SessionWarningPopup from "@/components/sessionWarningPopup/SessionWarningPopup";
import api from "@/api/api";
import { Analytics } from "@vercel/analytics/next"

function App() {

    const [showPopup, setShowPopup] = useState(false);

    useSessionTimer({
        refreshLifetimeHours: 10,
        warningMinutes: 15,
        onShowWarning: () => setShowPopup(true),
        onAutoLogout: async () => {
            await api.post("/auth/logout");
            window.location.href = "/inloggen";
        }
    });

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
            <Head />

            <Analytics/>

            {showPopup && (
                <SessionWarningPopup
                    minutesRemaining={15}
                    onStayLoggedIn={handleStayLoggedIn}
                    onLogout={handleLogout}
                />
            )}

            <Layout>
                <main className="content">
                    <AppRouter />
                </main>
            </Layout>
        </>
    );
}

export default App;
