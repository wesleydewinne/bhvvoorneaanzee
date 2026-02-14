import { useState } from "react";
import Head from "@/shared/components/seo/head/Head.jsx";
import Layout from "@/shared/components/layout/layout/Layout.jsx";
import AppRouter from "@/app/appRouter/AppRouter.jsx";

import useSessionTimer from "@/shared/hooks/useSessionTimer.js";
import SessionWarningPopup from "@/shared/components/ui/sessionWarningPopup/SessionWarningPopup.jsx";
import api from "@/api/api.js";
import { Analytics } from "@vercel/analytics/react";

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
