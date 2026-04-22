import { Navigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";

export default function ProtectedRoute({ children }) {
    const { authenticated, authInitialized } = useAuth();

    if (!authInitialized) {
        return <p>Bezig met laden...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/inloggen" replace />;
    }

    return children;
}