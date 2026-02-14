import { useEffect, useState } from "react";
import profileService from "@/features/profile/services/profileService.js";
import ProfileLayout from "@/features/profile/profile/ProfileLayout.jsx";
import "./ProfilePage.css";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        profileService
            .getMyProfile()
            .then(setProfile)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Laden...</p>;
    if (!profile) return <p>Geen profiel gevonden</p>;

    return <ProfileLayout profile={profile} />;
}
