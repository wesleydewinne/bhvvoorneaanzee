import { useEffect, useState } from "react";
import Head from "@/shared/components/seo/head/Head.jsx";
import Layout from "@/shared/components/layout/layout/Layout.jsx";
import AppRouter from "@/app/appRouter/AppRouter.jsx";
import SessionWarningPopup from "@/shared/components/ui/sessionWarningPopup/SessionWarningPopup.jsx";
import useSessionTimer from "@/shared/hooks/useSessionTimer.js";
import useAuth from "@/features/auth/hooks/useAuth.js";
import api from "@/api/api.js";
import { Analytics } from "@vercel/analytics/react";

function App() {
    const [showPopup, setShowPopup] = useState(false);

    const { authenticated, authInitialized, logout } = useAuth();

    useEffect(() => {
        if (!authenticated) {
            setShowPopup(false);
        }
    }, [authenticated]);

    useSessionTimer({
        enabled: authInitialized && authenticated,
        refreshLifetimeHours: 10,
        warningMinutes: 15,
        onShowWarning: () => setShowPopup(true),
        onAutoLogout: async () => {
            try {
                await logout();
            } finally {
                setShowPopup(false);
                window.location.href = "/inloggen";
            }
        },
    });

    const handleStayLoggedIn = async () => {
        try {
            await api.post("/auth/refresh");
            setShowPopup(false);
        } catch (err) {
            await logout();
            setShowPopup(false);
            window.location.href = "/inloggen";
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setShowPopup(false);
            window.location.href = "/inloggen";
        }
    };

    return (
        <>
            <Head />
            <Analytics />

            {authenticated && showPopup && (
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