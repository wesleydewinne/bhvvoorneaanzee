import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";
import { requiresPasskeyForUser } from "@/features/auth/helpers/passkeyPolicy.js";

const PASSWORD_CHANGE_PATH = "/account/wachtwoord-wijzigen";
const PASSKEY_SETUP_PATH = "/account/passkey-aanmaken";

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const { authenticated, authInitialized, user } = useAuth();

    if (!authInitialized) {
        return <p>Bezig met laden...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/inloggen" replace />;
    }

    if (
        requiresPasskeyForUser(user) &&
        location.pathname !== PASSKEY_SETUP_PATH
    ) {
        return <Navigate to={PASSKEY_SETUP_PATH} replace />;
    }

    if (user?.mustChangePassword && location.pathname !== PASSWORD_CHANGE_PATH) {
        return <Navigate to={PASSWORD_CHANGE_PATH} replace />;
    }

    return children;
}
