import { useState } from "react";
import { CheckCircle2, Circle, KeyRound, LockKeyhole, Save, X } from "lucide-react";
import profileService from "../../services/profileService.js";

export default function ChangePasswordCard() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
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
            confirmPassword: "",
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

        if (!passwordIsValid || !passwordsMatch) {
            setErrorMessage("Controleer de wachtwoordeisen en vul twee keer hetzelfde nieuwe wachtwoord in.");
            return;
        }

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
                confirmPassword: "",
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

    const passwordRequirements = [
        { label: "Minimaal 8 tekens", valid: formData.newPassword.length >= 8 },
        { label: "Een hoofdletter", valid: /[A-Z]/.test(formData.newPassword) },
        { label: "Een kleine letter", valid: /[a-z]/.test(formData.newPassword) },
        { label: "Een cijfer", valid: /\d/.test(formData.newPassword) },
        { label: "Een speciaal teken", valid: /[^A-Za-z0-9]/.test(formData.newPassword) },
    ];
    const passwordIsValid = passwordRequirements.every((requirement) => requirement.valid);
    const passwordsMatch = Boolean(formData.confirmPassword) &&
        formData.newPassword === formData.confirmPassword;

    return (
        <section className="profile-card">
            <div className="profile-card__header profile-card__header--actions">
                <div>
                    <h2>
                        <LockKeyhole aria-hidden="true" />
                        Wachtwoord
                    </h2>
                </div>

                {!isOpen && (
                    <button
                        type="button"
                        className="profile-button profile-button--secondary"
                        onClick={handleToggle}
                    >
                        <KeyRound aria-hidden="true" />
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

                        <div className="profile-form__field">
                            <label htmlFor="confirmPassword">Herhaal nieuw wachtwoord</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />
                            {formData.confirmPassword && (
                                <small className={passwordsMatch ? "password-match password-match--valid" : "password-match password-match--invalid"}>
                                    {passwordsMatch ? "De wachtwoorden zijn gelijk." : "De wachtwoorden zijn nog niet gelijk."}
                                </small>
                            )}
                        </div>

                        <ul className="password-requirements" aria-label="Wachtwoordeisen">
                            {passwordRequirements.map((requirement) => (
                                <li className={requirement.valid ? "is-valid" : ""} key={requirement.label}>
                                    {requirement.valid ? <CheckCircle2 aria-hidden="true" /> : <Circle aria-hidden="true" />}
                                    {requirement.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="profile-form__actions">
                        <button
                            type="submit"
                            className="profile-button"
                            disabled={saving}
                        >
                            <Save aria-hidden="true" />
                            {saving ? "Opslaan..." : "Opslaan"}
                        </button>

                        <button
                            type="button"
                            className="profile-button profile-button--secondary"
                            onClick={handleCancel}
                            disabled={saving || !passwordIsValid || !passwordsMatch}
                        >
                            <X aria-hidden="true" />
                            Annuleren
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
}
