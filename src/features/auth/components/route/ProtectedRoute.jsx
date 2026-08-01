import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";
import { getRequiredSecurityPath } from "@/features/auth/helpers/passkeyPolicy.js";

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const { authenticated, authInitialized, user } = useAuth();

    if (!authInitialized) {
        return <p>Bezig met laden...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/inloggen" replace />;
    }

    const requiredSecurityPath = getRequiredSecurityPath(user);

    if (requiredSecurityPath && location.pathname !== requiredSecurityPath) {
        return <Navigate to={requiredSecurityPath} replace />;
    }

    return children;
}
