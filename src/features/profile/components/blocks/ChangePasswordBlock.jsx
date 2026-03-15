import { useState } from "react";
import profileService from "../../services/profileService.js";

export default function ChangePasswordBlock() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

            await profileService.changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            setSuccessMessage("Wachtwoord is gewijzigd.");
            setFormData({
                currentPassword: "",
                newPassword: "",
            });
        } catch (err) {
            console.error("Fout bij wijzigen wachtwoord:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            setErrorMessage(backendMessage || "Wachtwoord wijzigen is mislukt.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="profile-card">
            <div className="profile-card__header">
                <h2>Wachtwoord wijzigen</h2>
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
                        <label htmlFor="currentPassword">Huidig wachtwoord</label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="profile-form__field">
                        <label htmlFor="newPassword">Nieuw wachtwoord</label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <small>
                            Minimaal 8 tekens, met hoofdletter, kleine letter, cijfer en speciaal teken.
                        </small>
                    </div>
                </div>

                <div className="profile-form__actions">
                    <button type="submit" className="profile-button" disabled={saving}>
                        {saving ? "Opslaan..." : "Wijzig wachtwoord"}
                    </button>
                </div>
            </form>
        </section>
    );
}