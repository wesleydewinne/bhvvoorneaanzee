import useAuth from "@/hooks/useAuth";

export default function ProtectedRoute({ children }) {
    const { loading, authenticated } = useAuth();

    if (loading) return <p>Bezig met laden...</p>;
    if (!authenticated) return null;

    return children;
}
