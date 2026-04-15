import { Navigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";

export default function PublicRoute({ children }) {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (authenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}