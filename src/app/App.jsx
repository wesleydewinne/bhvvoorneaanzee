import { Suspense, useEffect, useState } from "react";
import Head from "@/shared/components/seo/head/Head.jsx";
import Layout from "@/shared/components/layout/layout/Layout.jsx";
import AppRouter from "@/app/appRouter/AppRouter.jsx";
import SessionWarningPopup from "@/shared/components/ui/sessionWarningPopup/SessionWarningPopup.jsx";
import useSessionTimer from "@/shared/hooks/useSessionTimer.js";
import useAuth from "@/features/auth/hooks/useAuth.js";
import api from "@/api/api.js";
import { Analytics } from "@vercel/analytics/react";

const isProductionSite = import.meta.env.PROD &&
    !["localhost", "127.0.0.1"].includes(window.location.hostname);

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
            {isProductionSite && <Analytics />}

            {authenticated && showPopup && (
                <SessionWarningPopup
                    minutesRemaining={15}
                    onStayLoggedIn={handleStayLoggedIn}
                    onLogout={handleLogout}
                />
            )}

            <Suspense fallback={null}>
                <Layout>
                    <main className="content">
                        <AppRouter />
                    </main>
                </Layout>
            </Suspense>
        </>
    );
}

export default App;
