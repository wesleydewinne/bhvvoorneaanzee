import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";
import { getRequiredSecurityPath } from "@/features/auth/helpers/passkeyPolicy.js";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const location = useLocation();
    const { authenticated, authInitialized, user, roles = [] } = useAuth();

    if (!authInitialized) {
        return <p>Bezig met laden...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/inloggen" replace state={{ from: location }} />;
    }

    const requiredSecurityPath = getRequiredSecurityPath(user);

    if (requiredSecurityPath && location.pathname !== requiredSecurityPath) {
        return <Navigate to={requiredSecurityPath} replace />;
    }

    if (allowedRoles.length && !allowedRoles.some((role) => roles.includes(role))) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
