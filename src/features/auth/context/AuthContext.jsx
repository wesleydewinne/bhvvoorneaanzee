// src/context/AuthContext.jsx
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect
} from "react";
import api from "@/api/api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    /**
     * Huidige gebruiker ophalen (cookie-validatie)
     */
    const fetchCurrentUser = useCallback(async () => {
        try {
            setLoading(true);

            const response = await api.get("/auth/me");
            const data = response.data;

            setUser(data || null);
            setRoles(data?.roles || []);
            setAuthenticated(true);
        } catch (err) {
            setUser(null);
            setRoles([]);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Automatische auth-check bij app start
     */
    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    /**
     * Login
     */
    const login = async (credentials) => {
        setLoading(true);

        try {
            await api.post("/auth/login", credentials);

            // Na login opnieuw profiel ophalen
            await fetchCurrentUser();

            return { success: true };
        } catch (err) {
            setUser(null);
            setRoles([]);
            setAuthenticated(false);
            setLoading(false);

            return {
                success: false,
                error:
                    err.response?.data?.message ||
                    "Inloggen mislukt. Controleer je gegevens.",
            };
        }
    };

    /**
     * Logout
     */
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.error("Fout bij uitloggen:", err);
        } finally {
            setUser(null);
            setRoles([]);
            setAuthenticated(false);
        }
    };

    /**
     * Axios interceptor voor auto-logout
     */
    useEffect(() => {
        const interceptorId = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.autoLogout) {
                    setUser(null);
                    setRoles([]);
                    setAuthenticated(false);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptorId);
        };
    }, []);

    const value = {
        user,
        roles,
        authenticated,
        loading,
        login,
        logout,
        refreshUser: fetchCurrentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
