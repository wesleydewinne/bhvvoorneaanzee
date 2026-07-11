import { useEffect, useRef, useState } from "react";
import { AlertCircle, RefreshCw, UserRound } from "lucide-react";
import ProfileLayout from "../components/ProfileLayout.jsx";
import profileService from "../services/profileService.js";
import { mapProfileResponseToViewModel } from "../helpers/profileMapper.js";
import "../styles/Profile.css";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const photoObjectUrlRef = useRef("");

    const replaceProfilePhotoUrl = (nextUrl) => {
        if (photoObjectUrlRef.current) {
            URL.revokeObjectURL(photoObjectUrlRef.current);
        }

        photoObjectUrlRef.current = nextUrl || "";
        setProfilePhotoUrl(nextUrl || "");
    };

    const loadProfilePhoto = async (canApply = () => true) => {
        try {
            const photoBlob = await profileService.getProfilePhoto();
            const nextPhotoUrl = URL.createObjectURL(photoBlob);

            if (canApply()) {
                replaceProfilePhotoUrl(nextPhotoUrl);
            } else {
                URL.revokeObjectURL(nextPhotoUrl);
            }
        } catch (err) {
            if (err?.status !== 404) {
                console.warn("Profielfoto kon niet worden geladen:", err);
            }

            if (canApply()) {
                replaceProfilePhotoUrl("");
            }
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await profileService.getMe();

                if (!isMounted) return;

                setProfile(mapProfileResponseToViewModel(data));

                await loadProfilePhoto(() => isMounted);
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

            if (photoObjectUrlRef.current) {
                URL.revokeObjectURL(photoObjectUrlRef.current);
                photoObjectUrlRef.current = "";
            }
        };
    }, []);

    const handleProfileUpdated = (updatedData) => {
        setProfile(mapProfileResponseToViewModel(updatedData));
    };

    const handlePhotoUploaded = async (updatedData) => {
        if (updatedData && typeof updatedData === "object") {
            setProfile(mapProfileResponseToViewModel(updatedData));
        }

        await loadProfilePhoto();
    };

    if (loading) {
        return (
            <section className="profile-page">
                <div className="profile-state-card">
                    <p>
                        <RefreshCw aria-hidden="true" />
                        Laden...
                    </p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="profile-page">
                <div className="profile-state-card profile-state-card--error">
                    <p>
                        <AlertCircle aria-hidden="true" />
                        {error}
                    </p>
                </div>
            </section>
        );
    }

    if (!profile) {
        return (
            <section className="profile-page">
                <div className="profile-state-card">
                    <p>
                        <UserRound aria-hidden="true" />
                        Geen profielgegevens gevonden.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="profile-page">
            <ProfileLayout
                profile={profile}
                profilePhotoUrl={profilePhotoUrl}
                onProfileUpdated={handleProfileUpdated}
                onPhotoUploaded={handlePhotoUploaded}
            />
        </section>
    );
}
