import { Navigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";

export default function PublicRoute({ children }) {
    const { authenticated, authInitialized } = useAuth();

    if (!authInitialized) {
        return null;
    }

    if (authenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}