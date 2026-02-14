import { useEffect, useState } from "react";
import api from "@/api/api.js";

export default function useSessionTimer({
                                            refreshLifetimeHours = 10,
                                            warningMinutes = 15,
                                            onShowWarning,
                                            onAutoLogout
                                        }) {
    const [warningShown, setWarningShown] = useState(false);

    useEffect(() => {
        // Totale refresh token geldigheid
        const refreshLifetimeMs = refreshLifetimeHours * 60 * 60 * 1000;

        // Moment van waarschuwen (bijv. laatste 15 min)
        const warningTimeMs = refreshLifetimeMs - (warningMinutes * 60 * 1000);

        // Timer voor waarschuwing
        const warningTimer = setTimeout(() => {
            setWarningShown(true);
            onShowWarning();
        }, warningTimeMs);

        // Timer voor auto-logout
        const logoutTimer = setTimeout(() => {
            onAutoLogout();
        }, refreshLifetimeMs);

        return () => {
            clearTimeout(warningTimer);
            clearTimeout(logoutTimer);
        };
    }, []);

    return { warningShown };
}
