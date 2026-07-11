import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import authService from "@/features/auth/services/authService.js";
import {
    clearPendingTwoFactorState,
    persistPendingTwoFactorState,
    readPendingTwoFactorState,
} from "@/features/auth/utils/twoFactorStorage.js";
import { getAuthRoles } from "@/features/auth/helpers/passkeyPolicy.js";
import {
    getDefaultPasskeyName,
    getPasskeyTransactionId,
    normalizePasskeyOptions,
    serializePasskeyCredential,
} from "@/features/auth/utils/passkeyUtils.js";

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
            setLoading(true);

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
                    setLoading(false);
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
            const refreshedUser = await refreshUser();

            return {
                success: true,
                requiresTwoFactor: false,
                requiresTwoFactorSetup: false,
                user: refreshedUser,
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
            const refreshedUser = await refreshUser();

            return { success: true, user: refreshedUser };
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

    const loginWithPasskey = useCallback(async () => {
        setLoading(true);

        try {
            const response = await authService.startPasskeyLogin();
            const options = normalizePasskeyOptions(response.data);

            const credential = await navigator.credentials.get({ publicKey: options });
            const payload = serializePasskeyCredential(credential);

            await authService.finishPasskeyLogin(payload);
            clearTwoFactorState();
            await refreshUser();

            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: getErrorMessage(err, "Passkey-login mislukt."),
            };
        } finally {
            setLoading(false);
        }
    }, [clearTwoFactorState, getErrorMessage, refreshUser]);

    const registerPasskey = useCallback(async (credentialName) => {
        setLoading(true);

        try {
            const response = await authService.startPasskeyRegistration();
            const registrationId = getPasskeyTransactionId(response.data, "registrationId");

            if (!registrationId) {
                throw new Error("Passkey-registratie mist een registrationId. Probeer het opnieuw.");
            }

            const options = normalizePasskeyOptions(response.data);

            const credential = await navigator.credentials.create({ publicKey: options });
            const serializedCredential = serializePasskeyCredential(credential);
            const payload = {
                registrationId,
                credential: serializedCredential,
                credentialName: credentialName?.trim() || getDefaultPasskeyName(),
            };

            await authService.finishPasskeyRegistration(payload);
            await refreshUser();

            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: getErrorMessage(err, "Passkey-aanmaken mislukt."),
            };
        } finally {
            setLoading(false);
        }
    }, [getErrorMessage, refreshUser]);

    const deletePasskey = useCallback(async (id) => {
        setLoading(true);

        try {
            await authService.deletePasskey(id);
            await refreshUser();

            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: getErrorMessage(err, "Passkey verwijderen mislukt."),
            };
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

    const roles = useMemo(() => getAuthRoles(user), [user]);

    const value = useMemo(() => ({
        user,
        roles,
        authenticated,
        loading,
        authInitialized,
        requiresTwoFactor,
        requiresTwoFactorSetup,
        login,
        loginWithPasskey,
        registerPasskey,
        deletePasskey,
        logout,
        refreshUser,
        verifyTwoFactorLogin,
        initTwoFactorSetup,
        verifyTwoFactorSetup,
        disableTwoFactor,
    }), [
        user,
        roles,
        authenticated,
        loading,
        authInitialized,
        requiresTwoFactor,
        requiresTwoFactorSetup,
        login,
        loginWithPasskey,
        registerPasskey,
        deletePasskey,
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
