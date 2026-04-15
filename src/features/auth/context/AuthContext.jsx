import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
import api from "@/api/api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
    const [requiresTwoFactorSetup, setRequiresTwoFactorSetup] = useState(false);
    const [tempLoginToken, setTempLoginToken] = useState(null);

    const clearAuthState = useCallback(() => {
        setUser(null);
        setRoles([]);
        setAuthenticated(false);
        setRequiresTwoFactor(false);
        setRequiresTwoFactorSetup(false);
        setTempLoginToken(null);
    }, []);

    const fetchCurrentUser = useCallback(async () => {
        try {
            setLoading(true);

            const response = await api.get("/auth/me");
            const data = response.data;

            setUser(data || null);
            setRoles(data?.globalRoles || []);
            setAuthenticated(true);

            return data;
        } catch (err) {
            clearAuthState();
            return null;
        } finally {
            setLoading(false);
        }
    }, [clearAuthState]);

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const login = async (credentials) => {
        setLoading(true);

        try {
            const response = await api.post("/auth/login", credentials);
            const data = response.data;

            if (data?.requiresTwoFactor) {
                setRequiresTwoFactor(true);
                setRequiresTwoFactorSetup(Boolean(data.requiresTwoFactorSetup));
                setTempLoginToken(data.tempLoginToken || null);
                setAuthenticated(false);

                return {
                    success: true,
                    requiresTwoFactor: true,
                    requiresTwoFactorSetup: Boolean(data.requiresTwoFactorSetup),
                };
            }

            await fetchCurrentUser();

            return {
                success: true,
                requiresTwoFactor: false,
            };
        } catch (err) {
            clearAuthState();

            return {
                success: false,
                error:
                    err.response?.data?.message ||
                    (typeof err.response?.data === "string" ? err.response.data : null) ||
                    err.message ||
                    "Inloggen mislukt. Controleer je gegevens.",
            };
        } finally {
            setLoading(false);
        }
    };

    const verifyTwoFactorLogin = async (code) => {
        setLoading(true);

        try {
            await api.post("/auth/2fa/verify-login", {
                tempLoginToken,
                code,
            });

            setRequiresTwoFactor(false);
            setRequiresTwoFactorSetup(false);
            setTempLoginToken(null);

            await fetchCurrentUser();

            return { success: true };
        } catch (err) {
            return {
                success: false,
                error:
                    err.response?.data?.message ||
                    (typeof err.response?.data === "string" ? err.response.data : null) ||
                    err.message ||
                    "2FA verificatie mislukt.",
            };
        } finally {
            setLoading(false);
        }
    };

    const initTwoFactorSetup = async () => {
        try {
            const response = await api.post("/auth/2fa/setup/init", {
                tempLoginToken,
            });
            return response.data;
        } catch (err) {
            throw new Error(
                err.response?.data?.message ||
                (typeof err.response?.data === "string" ? err.response.data : null) ||
                err.message ||
                "Kan 2FA setup niet laden."
            );
        }
    };

    const verifyTwoFactorSetup = async (code) => {
        try {
            const response = await api.post("/auth/2fa/setup/verify", {
                tempLoginToken,
                code,
            });
            return response.data;
        } catch (err) {
            throw new Error(
                err.response?.data?.message ||
                (typeof err.response?.data === "string" ? err.response.data : null) ||
                err.message ||
                "Ongeldige 2FA code."
            );
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.error("Fout bij uitloggen:", err);
        } finally {
            clearAuthState();
        }
    };

    useEffect(() => {
        const interceptorId = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.autoLogout) {
                    clearAuthState();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptorId);
        };
    }, [clearAuthState]);

    const value = {
        user,
        roles,
        authenticated,
        loading,
        requiresTwoFactor,
        requiresTwoFactorSetup,
        tempLoginToken,
        login,
        logout,
        refreshUser: fetchCurrentUser,
        verifyTwoFactorLogin,
        initTwoFactorSetup,
        verifyTwoFactorSetup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}