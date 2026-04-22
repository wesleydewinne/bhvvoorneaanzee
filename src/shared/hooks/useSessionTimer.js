import { useEffect, useRef } from "react";

/**
 * Session timer hook
 *
 * - Toont waarschuwing voordat sessie verloopt
 * - Logt automatisch uit na verlopen sessie
 * - Werkt alleen als enabled = true
 */
export default function useSessionTimer({
                                            enabled = true,
                                            refreshLifetimeHours = 10,
                                            warningMinutes = 15,
                                            onShowWarning,
                                            onAutoLogout,
                                        }) {
    const warningTimeoutRef = useRef(null);
    const logoutTimeoutRef = useRef(null);

    useEffect(() => {
        // ❌ Niet actief → alles stoppen
        if (!enabled) {
            if (warningTimeoutRef.current) {
                clearTimeout(warningTimeoutRef.current);
                warningTimeoutRef.current = null;
            }

            if (logoutTimeoutRef.current) {
                clearTimeout(logoutTimeoutRef.current);
                logoutTimeoutRef.current = null;
            }

            return;
        }

        // ⏱ Berekeningen
        const totalMs = refreshLifetimeHours * 60 * 60 * 1000;
        const warningMs = totalMs - warningMinutes * 60 * 1000;

        // 🔔 Warning timer
        warningTimeoutRef.current = setTimeout(() => {
            if (onShowWarning) {
                onShowWarning();
            }
        }, warningMs);

        // 🚪 Auto logout timer
        logoutTimeoutRef.current = setTimeout(() => {
            if (onAutoLogout) {
                onAutoLogout();
            }
        }, totalMs);

        // 🧹 Cleanup
        return () => {
            if (warningTimeoutRef.current) {
                clearTimeout(warningTimeoutRef.current);
                warningTimeoutRef.current = null;
            }

            if (logoutTimeoutRef.current) {
                clearTimeout(logoutTimeoutRef.current);
                logoutTimeoutRef.current = null;
            }
        };
    }, [
        enabled,
        refreshLifetimeHours,
        warningMinutes,
        onShowWarning,
        onAutoLogout,
    ]);
}