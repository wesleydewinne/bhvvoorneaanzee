import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "@/api/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
    const [requiresTwoFactorSetup, setRequiresTwoFactorSetup] = useState(false);
    const [tempLoginToken, setTempLoginToken] = useState(null);

    const authenticated = Boolean(user);

    const getErrorMessage = useCallback((err, fallbackMessage) => {
        return (
            err?.response?.data?.message ||
            (typeof err?.response?.data === "string" ? err.response.data : null) ||
            err?.message ||
            fallbackMessage
        );
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
            return response.data;
        } catch (err) {
            setUser(null);
            throw err;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            try {
                const response = await api.get("/auth/me");

                if (!isMounted) {
                    return;
                }

                setUser(response.data);
            } catch {
                if (!isMounted) {
                    return;
                }

                setUser(null);
            } finally {
                if (isMounted) {
                    setAuthInitialized(true);
                }
            }
        };

        initializeAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    const login = useCallback(async (payload) => {
        setLoading(true);

        try {
            const response = await api.post("/auth/login", payload);
            const data = response.data;

            if (data.requiresTwoFactor) {
                setUser(null);
                setRequiresTwoFactor(true);
                setRequiresTwoFactorSetup(Boolean(data.requiresTwoFactorSetup));
                setTempLoginToken(data.tempLoginToken ?? null);

                return {
                    success: true,
                    requiresTwoFactor: true,
                    requiresTwoFactorSetup: Boolean(data.requiresTwoFactorSetup),
                    message: data.message ?? "",
                };
            }

            setRequiresTwoFactor(false);
            setRequiresTwoFactorSetup(false);
            setTempLoginToken(null);

            await refreshUser();

            return {
                success: true,
                requiresTwoFactor: false,
                requiresTwoFactorSetup: false,
            };
        } catch (err) {
            setUser(null);
            setRequiresTwoFactor(false);
            setRequiresTwoFactorSetup(false);
            setTempLoginToken(null);

            return {
                success: false,
                error: getErrorMessage(err, "Inloggen mislukt."),
            };
        } finally {
            setLoading(false);
        }
    }, [getErrorMessage, refreshUser]);

    const verifyTwoFactorLogin = useCallback(async (code) => {
        if (!tempLoginToken) {
            return {
                success: false,
                error: "Geen tijdelijke login token gevonden.",
            };
        }

        setLoading(true);

        try {
            await api.post("/auth/2fa/login/verify", {
                tempLoginToken,
                code,
            });

            setRequiresTwoFactor(false);
            setRequiresTwoFactorSetup(false);
            setTempLoginToken(null);

            await refreshUser();

            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: getErrorMessage(err, "2FA verificatie mislukt."),
            };
        } finally {
            setLoading(false);
        }
    }, [getErrorMessage, refreshUser, tempLoginToken]);

    const initTwoFactorSetup = useCallback(async () => {
        setLoading(true);

        try {
            const response = await api.post("/auth/2fa/setup/init");
            return response.data;
        } catch (err) {
            throw new Error(getErrorMessage(err, "Kan 2FA setup niet laden."));
        } finally {
            setLoading(false);
        }
    }, [getErrorMessage]);

    const verifyTwoFactorSetup = useCallback(async (code) => {
        setLoading(true);

        try {
            await api.post("/auth/2fa/setup/verify", { code });

            setRequiresTwoFactor(false);
            setRequiresTwoFactorSetup(false);

            await refreshUser();
        } catch (err) {
            throw new Error(getErrorMessage(err, "2FA activeren is mislukt."));
        } finally {
            setLoading(false);
        }
    }, [getErrorMessage, refreshUser]);

    const disableTwoFactor = useCallback(async (code) => {
        setLoading(true);

        try {
            await api.post("/auth/2fa/disable", { code });
            await refreshUser();
        } catch (err) {
            throw new Error(getErrorMessage(err, "2FA uitschakelen is mislukt."));
        } finally {
            setLoading(false);
        }
    }, [getErrorMessage, refreshUser]);

    const logout = useCallback(async () => {
        setLoading(true);

        try {
            await api.post("/auth/logout");
        } catch {
            // bewust leeg
        } finally {
            setUser(null);
            setRequiresTwoFactor(false);
            setRequiresTwoFactorSetup(false);
            setTempLoginToken(null);
            setLoading(false);
        }
    }, []);

    const value = useMemo(() => ({
        user,
        authenticated,
        loading,
        authInitialized,
        requiresTwoFactor,
        requiresTwoFactorSetup,
        tempLoginToken,
        login,
        logout,
        refreshUser,
        verifyTwoFactorLogin,
        initTwoFactorSetup,
        verifyTwoFactorSetup,
        disableTwoFactor,
    }), [
        user,
        authenticated,
        loading,
        authInitialized,
        requiresTwoFactor,
        requiresTwoFactorSetup,
        tempLoginToken,
        login,
        logout,
        refreshUser,
        verifyTwoFactorLogin,
        initTwoFactorSetup,
        verifyTwoFactorSetup,
        disableTwoFactor,
    ]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}