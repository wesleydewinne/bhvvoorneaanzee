import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import authService from "@/features/auth/services/authService.js";
import {
    clearPendingTwoFactorState,
    persistPendingTwoFactorState,
    readPendingTwoFactorState,
} from "@/features/auth/utils/twoFactorStorage.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const initialPendingState = readPendingTwoFactorState();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [requiresTwoFactor, setRequiresTwoFactor] = useState(initialPendingState.requiresTwoFactor);
    const [requiresTwoFactorSetup, setRequiresTwoFactorSetup] = useState(initialPendingState.requiresTwoFactorSetup);

    const authenticated = Boolean(user);

    const getErrorMessage = useCallback((err, fallbackMessage) => {
        return (
            err?.response?.data?.message ||
            (typeof err?.response?.data === "string" ? err.response.data : null) ||
            err?.message ||
            fallbackMessage
        );
    }, []);

    const setPendingTwoFactorState = useCallback((required, setupRequired) => {
        const normalizedRequired = Boolean(required);
        const normalizedSetupRequired = Boolean(setupRequired);

        setRequiresTwoFactor(normalizedRequired);
        setRequiresTwoFactorSetup(normalizedSetupRequired);
        persistPendingTwoFactorState(normalizedRequired, normalizedSetupRequired);
    }, []);

    const clearTwoFactorState = useCallback(() => {
        setRequiresTwoFactor(false);
        setRequiresTwoFactorSetup(false);
        clearPendingTwoFactorState();
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const response = await authService.getMe();
            setUser(response.data);
            clearTwoFactorState();
            return response.data;
        } catch (err) {
            setUser(null);
            throw err;
        }
    }, [clearTwoFactorState]);

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            try {
                const response = await authService.getMe();

                if (!isMounted) {
                    return;
                }

                setUser(response.data);
                clearTwoFactorState();
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

        void initializeAuth();

        return () => {
            isMounted = false;
        };
    }, [clearTwoFactorState]);

    const login = useCallback(async (payload) => {
        setLoading(true);

        try {
            const response = await authService.login(payload);
            const data = response.data;

            if (data.requiresTwoFactor) {
                setUser(null);
                setPendingTwoFactorState(true, Boolean(data.requiresTwoFactorSetup));

                return {
                    success: true,
                    requiresTwoFactor: true,
                    requiresTwoFactorSetup: Boolean(data.requiresTwoFactorSetup),
                    message: data.message ?? "",
                };
            }

            clearTwoFactorState();
            await refreshUser();

            return {
                success: true,
                requiresTwoFactor: false,
                requiresTwoFactorSetup: false,
            };
        } catch (err) {
            setUser(null);
            clearTwoFactorState();

            return {
                success: false,
                error: getErrorMessage(err, "Inloggen mislukt."),
            };
        } finally {
            setLoading(false);
        }
    }, [clearTwoFactorState, getErrorMessage, refreshUser, setPendingTwoFactorState]);

    const verifyTwoFactorLogin = useCallback(async (code) => {
        setLoading(true);

        try {
            await authService.verifyTwoFactorLogin(code);
            clearTwoFactorState();
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
    }, [clearTwoFactorState, getErrorMessage, refreshUser]);

    const initTwoFactorSetup = useCallback(async () => {
        setLoading(true);

        try {
            const response = await authService.initTwoFactorSetup();
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
            await authService.verifyTwoFactorSetup(code);
            setPendingTwoFactorState(true, false);

            return { success: true };
        } catch (err) {
            throw new Error(getErrorMessage(err, "2FA activeren is mislukt."));
        } finally {
            setLoading(false);
        }
    }, [getErrorMessage, setPendingTwoFactorState]);

    const disableTwoFactor = useCallback(async (code) => {
        setLoading(true);

        try {
            await authService.disableTwoFactor(code);
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
            await authService.logout();
        } catch {
            // bewust leeg
        } finally {
            setUser(null);
            clearTwoFactorState();
            setLoading(false);
        }
    }, [clearTwoFactorState]);

    useEffect(() => {
        const handleLogoutRequired = async () => {
            setUser(null);
            clearTwoFactorState();
        };

        window.addEventListener("auth:logout-required", handleLogoutRequired);

        return () => {
            window.removeEventListener("auth:logout-required", handleLogoutRequired);
        };
    }, [clearTwoFactorState]);

    const value = useMemo(() => ({
        user,
        authenticated,
        loading,
        authInitialized,
        requiresTwoFactor,
        requiresTwoFactorSetup,
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