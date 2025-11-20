import useAuth from "@/hooks/useAuth";

export default function PublicRoute({ children }) {
    const { authenticated, loading } = useAuth();

    if (loading) return null;

    if (authenticated) {
        window.location.href = "/dashboard";  // direct naar dashboard
        return null;
    }

    return children;
}
