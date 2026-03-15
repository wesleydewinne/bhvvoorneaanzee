import { useState } from "react";
import profileService from "../../services/profileService.js";

export default function ChangePasswordCard() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleToggle = () => {
        setSuccessMessage("");
        setErrorMessage("");
        setIsOpen((prev) => !prev);
    };

    const handleCancel = () => {
        setFormData({
            currentPassword: "",
            newPassword: "",
        });
        setSuccessMessage("");
        setErrorMessage("");
        setIsOpen(false);
    };

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

            await profileService.changePassword(formData);

            setSuccessMessage("Wachtwoord is gewijzigd.");
            setFormData({
                currentPassword: "",
                newPassword: "",
            });
            setIsOpen(false);
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
            <div className="profile-card__header profile-card__header--actions">
                <div>
                    <h2>Wachtwoord</h2>
                </div>

                {!isOpen && (
                    <button
                        type="button"
                        className="profile-button profile-button--secondary"
                        onClick={handleToggle}
                    >
                        Wijzigen
                    </button>
                )}
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

            {!isOpen ? (
                <p>Je wachtwoord is beveiligd opgeslagen en kan hier gewijzigd worden.</p>
            ) : (
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
                        <button
                            type="submit"
                            className="profile-button"
                            disabled={saving}
                        >
                            {saving ? "Opslaan..." : "Opslaan"}
                        </button>

                        <button
                            type="button"
                            className="profile-button profile-button--secondary"
                            onClick={handleCancel}
                            disabled={saving}
                        >
                            Annuleren
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
}