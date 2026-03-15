import { useEffect, useState } from "react";
import profileService from "../../services/profileService.js";

export default function ProfileEditBlock({ profile, onProfileUpdated }) {
    const [formData, setFormData] = useState(createInitialFormState(profile));
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setFormData(createInitialFormState(profile));
    }, [profile]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setSuccessMessage("");
            setErrorMessage("");

            const payload = {
                firstName: normalizeOptionalString(formData.firstName),
                lastName: normalizeOptionalString(formData.lastName),
                phoneNumber: normalizeOptionalString(formData.phoneNumber),
                profileImageUrl: normalizeOptionalString(formData.profileImageUrl),
                dateOfBirth: normalizeOptionalString(formData.dateOfBirth),
                companyName: normalizeOptionalString(formData.companyName),
                functionTitle: normalizeOptionalString(formData.functionTitle),
            };

            const updatedProfile = await profileService.updateProfile(payload);

            onProfileUpdated?.(updatedProfile);
            setSuccessMessage("Profiel is bijgewerkt.");
        } catch (err) {
            console.error("Fout bij opslaan profiel:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            setErrorMessage(backendMessage || "Opslaan van het profiel is mislukt.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="profile-card">
            <div className="profile-card__header">
                <h2>Gegevens wijzigen</h2>
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

            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="profile-form__grid">
                    <div className="profile-form__field">
                        <label htmlFor="firstName">Voornaam</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            maxLength={100}
                        />
                    </div>

                    <div className="profile-form__field">
                        <label htmlFor="lastName">Achternaam</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            maxLength={100}
                        />
                    </div>

                    <div className="profile-form__field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={profile.email || ""}
                            disabled
                        />
                        <small>E-mail kan momenteel niet via het profiel worden aangepast.</small>
                    </div>

                    <div className="profile-form__field">
                        <label htmlFor="phoneNumber">Telefoonnummer</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            maxLength={20}
                        />
                    </div>

                    <div className="profile-form__field">
                        <label htmlFor="dateOfBirth">Geboortedatum</label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="profile-form__field">
                        <label htmlFor="companyName">Bedrijfsnaam</label>
                        <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            value={formData.companyName}
                            onChange={handleChange}
                            maxLength={100}
                        />
                    </div>

                    <div className="profile-form__field">
                        <label htmlFor="functionTitle">Functie</label>
                        <input
                            id="functionTitle"
                            name="functionTitle"
                            type="text"
                            value={formData.functionTitle}
                            onChange={handleChange}
                            maxLength={100}
                        />
                    </div>

                    <div className="profile-form__field profile-form__field--full">
                        <label htmlFor="profileImageUrl">Profielfoto URL</label>
                        <input
                            id="profileImageUrl"
                            name="profileImageUrl"
                            type="text"
                            value={formData.profileImageUrl}
                            onChange={handleChange}
                            maxLength={255}
                        />
                    </div>
                </div>

                <div className="profile-form__actions">
                    <button type="submit" className="profile-button" disabled={saving}>
                        {saving ? "Opslaan..." : "Opslaan"}
                    </button>
                </div>
            </form>
        </section>
    );
}

function createInitialFormState(profile) {
    return {
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName ?? "",
        phoneNumber: profile?.phoneNumber ?? "",
        profileImageUrl: profile?.profileImageUrl ?? "",
        dateOfBirth: profile?.dateOfBirth ?? "",
        companyName: profile?.companyName ?? "",
        functionTitle: profile?.functionTitle ?? "",
    };
}

function normalizeOptionalString(value) {
    if (typeof value !== "string") return null;

    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
}