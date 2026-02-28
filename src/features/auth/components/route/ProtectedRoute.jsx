import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { authenticated, loading } = useAuthContext();

    if (loading) return <p>Bezig met laden...</p>;

    if (!authenticated) {
        return <Navigate to="/inloggen" replace />;
    }

    return children;
}
