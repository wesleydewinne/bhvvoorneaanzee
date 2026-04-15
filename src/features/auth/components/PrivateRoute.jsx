import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";

export default function PrivateRoute() {
    const { loading, authenticated } = useAuth();

    if (loading) return null;

    if (!authenticated) {
        return <Navigate to="/inloggen" replace />;
    }

    return <Outlet />;
}