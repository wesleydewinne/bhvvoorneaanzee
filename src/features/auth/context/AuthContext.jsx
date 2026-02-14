// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/api.js";

// Vorm van de context
const AuthContext = createContext({
    user: null,
    roles: [],
    authenticated: false,
    loading: true,
    login: async () => {},
    logout: async () => {},
    refreshUser: async () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔄 User ophalen via /auth/me (wordt gebruikt bij load én na login)
    const fetchCurrentUser = async () => {
        try {
            const response = await api.get("/auth/me");
            const data = response.data;

            setUser(data || null);

            // ga er vanuit dat backend roles zo terugstuurt: ["ROLE_ADMIN", ...]
            const userRoles = data?.roles || [];
            setRoles(userRoles);

            setAuthenticated(true);
        } catch (err) {
            // 401 etc → niet ingelogd
            setUser(null);
            setRoles([]);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    // 🔐 Login: backend zet httpOnly cookies, daarna opnieuw /auth/me ophalen
    const login = async (credentials) => {
        setLoading(true);
        try {
            await api.post("/auth/login", credentials);
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

    // 🚪 Logout
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

    // Bij eerste load: check of er al een geldige sessie is
    useEffect(() => {
        fetchCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Eventueel: automatische afhandeling van 401 met autoLogout uit je axios interceptor
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

// Eigen hook om de context te gebruiken
export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuthContext moet binnen een AuthProvider gebruikt worden");
    }
    return ctx;
}
