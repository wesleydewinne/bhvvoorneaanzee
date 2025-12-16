import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

export default function PrivateRoute() {
    const { loading, authenticated } = useAuth();

    if (loading) return null; // of spinner

    if (!authenticated) {
        return <Navigate to="/inloggen" replace />;
    }

    return <Outlet />;
}
