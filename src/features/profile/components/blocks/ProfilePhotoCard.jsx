import { useEffect, useState } from "react";
import { Camera, Upload } from "lucide-react";
import profileService from "../../services/profileService.js";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

function getInitials(firstName, lastName) {
    const first = firstName?.trim()?.charAt(0) ?? "";
    const last = lastName?.trim()?.charAt(0) ?? "";
    return `${first}${last}`.toUpperCase() || "?";
}

export default function ProfilePhotoCard({
    profile,
    profilePhotoUrl = "",
    onPhotoUploaded,
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl("");
            return undefined;
        }

        const nextPreviewUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(nextPreviewUrl);

        return () => {
            URL.revokeObjectURL(nextPreviewUrl);
        };
    }, [selectedFile]);

    const imageSrc = previewUrl || profilePhotoUrl || profile.profileImageUrl;
    const initials = getInitials(profile.firstName, profile.lastName);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;

        setSuccessMessage("");
        setErrorMessage("");

        if (!file) {
            setSelectedFile(null);
            return;
        }

        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            setSelectedFile(null);
            setErrorMessage("Kies een JPG, PNG of WebP afbeelding.");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setSelectedFile(null);
            setErrorMessage("De afbeelding mag maximaal 2 MB zijn.");
            return;
        }

        setSelectedFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setErrorMessage("Kies eerst een afbeelding.");
            return;
        }

        try {
            setUploading(true);
            setSuccessMessage("");
            setErrorMessage("");

            const updatedProfile = await profileService.uploadProfilePhoto(selectedFile);

            await onPhotoUploaded?.(updatedProfile);
            setSelectedFile(null);
            setSuccessMessage("Profielfoto is bijgewerkt.");
        } catch (err) {
            console.error("Fout bij uploaden profielfoto:", err);

            setErrorMessage(err?.message || "Uploaden van de profielfoto is mislukt.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="profile-card">
            <div className="profile-card__header">
                <h2>
                    <Camera aria-hidden="true" />
                    Profielfoto
                </h2>
            </div>

            {successMessage && (
                <div className="profile-alert profile-alert--success">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="profile-alert profile-alert--error">
                    {errorMessage}
                </div>
            )}

            <form className="profile-photo-form" onSubmit={handleSubmit}>
                <div className="profile-photo-preview" aria-hidden="true">
                    {imageSrc ? (
                        <img src={imageSrc} alt="" />
                    ) : (
                        <span>{initials}</span>
                    )}
                </div>

                <label className="profile-photo-input">
                    <span>Nieuwe foto kiezen</span>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>

                <small>JPG, PNG of WebP. Maximaal 2 MB.</small>

                <button
                    type="submit"
                    className="profile-button"
                    disabled={uploading || !selectedFile}
                >
                    <Upload aria-hidden="true" />
                    {uploading ? "Uploaden..." : "Foto uploaden"}
                </button>
            </form>
        </section>
    );
}
