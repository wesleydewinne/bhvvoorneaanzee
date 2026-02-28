import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import ProfileLayout from "@/features/profile/profile/ProfileLayout.jsx";
import "./ProfilePage.css";

export default function ProfilePage() {
    const { user, loading, authenticated } = useAuthContext();

    if (loading) {
        return <p>Laden...</p>;
    }

    if (!authenticated) {
        return <p style={{ color: "red" }}>Je bent niet ingelogd.</p>;
    }

    if (!user) {
        return <p>Geen profiel gevonden</p>;
    }

    // Debug logging alleen in development
    if (import.meta.env.DEV) {
        console.log("Profile response:", user);
    }

    return <ProfileLayout profile={user} />;
}
