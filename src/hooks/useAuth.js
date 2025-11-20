import { useEffect, useState } from "react";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        async function checkAuth() {
            try {
                await api.get("/auth/me"); // 200 = ingelogd

                if (mounted) {
                    setAuthenticated(true);
                    setLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setAuthenticated(false);
                    setLoading(false);
                    navigate("/inloggen");
                }
            }
        }

        checkAuth();
        return () => (mounted = false);
    }, [navigate]);

    return { loading, authenticated };
}
