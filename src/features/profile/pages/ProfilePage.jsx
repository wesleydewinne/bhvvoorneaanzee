import { useEffect, useState } from "react";
import ProfileLayout from "../components/ProfileLayout.jsx";
import profileService from "../services/profileService.js";
import { mapProfileResponseToViewModel } from "../helpers/profileMapper.js";
import "../styles/Profile.css";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await profileService.getMe();

                if (!isMounted) return;

                setProfile(mapProfileResponseToViewModel(data));
            } catch (err) {
                console.error("Fout bij laden profiel:", err);
                if (!isMounted) return;
                setError("Het profiel kon niet worden geladen.");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleProfileUpdated = (updatedData) => {
        setProfile(mapProfileResponseToViewModel(updatedData));
    };

    if (loading) {
        return (
            <section className="profile-page">
                <div className="profile-state-card">
                    <p>Laden...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="profile-page">
                <div className="profile-state-card profile-state-card--error">
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    if (!profile) {
        return (
            <section className="profile-page">
                <div className="profile-state-card">
                    <p>Geen profielgegevens gevonden.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="profile-page">
            <ProfileLayout
                profile={profile}
                onProfileUpdated={handleProfileUpdated}
            />
        </section>
    );
}