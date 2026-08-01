import { useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";
import profileService from "@/features/profile/services/profileService.js";
import "./TwoFactorPage.css";

export default function RequiredPasswordChangePage() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const validPassword = newPassword.length >= 12 && /[A-Z]/.test(newPassword)
        && /[a-z]/.test(newPassword) && /\d/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword);

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        if (!validPassword || newPassword !== confirmation) {
            setError("Gebruik minimaal 12 tekens met hoofdletter, kleine letter, cijfer en speciaal teken.");
            return;
        }
        try {
            setSaving(true);
            await profileService.changePassword({ currentPassword, newPassword });
            await logout();
            navigate("/inloggen", { replace: true, state: { passwordChanged: true } });
        } catch (err) {
            setError(err?.message || "Wachtwoord wijzigen is mislukt.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="twofactor-page">
            <article className="twofactor-card">
                <header className="twofactor-header">
                    <span className="twofactor-header-icon"><ShieldCheck aria-hidden="true" /></span>
                    <span className="twofactor-eyebrow">Eerste aanmelding</span>
                    <h1 className="twofactor-title">Kies een nieuw wachtwoord</h1>
                    <p className="twofactor-subtitle">Vervang eerst het tijdelijke wachtwoord. Daarna log je opnieuw in en stel je jouw passkey in.</p>
                </header>
                {error && <p className="twofactor-error" role="alert">{error}</p>}
                <form className="twofactor-form" onSubmit={submit}>
                    <label className="twofactor-label" htmlFor="current-password">Tijdelijk wachtwoord</label>
                    <input id="current-password" className="twofactor-input" type="password" autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                    <label className="twofactor-label" htmlFor="new-password">Nieuw wachtwoord</label>
                    <input id="new-password" className="twofactor-input" type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <label className="twofactor-label" htmlFor="confirm-password">Herhaal nieuw wachtwoord</label>
                    <input id="confirm-password" className="twofactor-input" type="password" autoComplete="new-password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} required />
                    <p className="twofactor-help"><KeyRound aria-hidden="true" /> Minimaal 12 tekens met hoofdletter, kleine letter, cijfer en speciaal teken.</p>
                    <button className="twofactor-button" type="submit" disabled={saving || !currentPassword || !validPassword || newPassword !== confirmation}>
                        {saving ? "Opslaan..." : "Wachtwoord opslaan"}
                    </button>
                </form>
            </article>
        </main>
    );
}
