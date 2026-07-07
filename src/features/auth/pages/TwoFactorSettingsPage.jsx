import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import useAuth from "@/features/auth/hooks/useAuth.js";
import authService from "@/features/auth/services/authService.js";
import "./TwoFactorPage.css";

export default function TwoFactorSettingsPage() {
    const {
        user,
        initTwoFactorSetup,
        verifyTwoFactorSetup,
        disableTwoFactor,
        registerPasskey,
        deletePasskey,
        loading,
        refreshUser,
    } = useAuth();

    const [setupData, setSetupData] = useState(null);
    const [setupCode, setSetupCode] = useState("");
    const [disableCode, setDisableCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passkeys, setPasskeys] = useState([]);

    useEffect(() => {
        const fetchPasskeys = async () => {
            try {
                const response = await authService.listPasskeys();
                setPasskeys(response.data ?? []);
            } catch {
                setPasskeys([]);
            }
        };

        void fetchPasskeys();
    }, [user]);

    const isTwoFactorEnabled = Boolean(user?.twoFactorEnabled);

    const handleInitSetup = async () => {
        setError("");
        setSuccess("");

        try {
            const data = await initTwoFactorSetup();
            setSetupData(data);
        } catch (err) {
            setError(err.message || "Kan 2FA setup niet laden.");
        }
    };

    const handleVerifySetup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await verifyTwoFactorSetup(setupCode);
            await refreshUser();

            setSetupCode("");
            setDisableCode("");
            setSetupData(null);
            setSuccess("2FA is succesvol geactiveerd.");
        } catch (err) {
            setError(err.message || "2FA activeren is mislukt.");
        }
    };

    const handleDisable = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await disableTwoFactor(disableCode);
            setDisableCode("");
            setSetupCode("");
            setSetupData(null);
            setSuccess("2FA is succesvol uitgeschakeld.");
        } catch (err) {
            setError(err.message || "2FA uitschakelen is mislukt.");
        }
    };

    const handleRegisterPasskey = async () => {
        setError("");
        setSuccess("");

        const result = await registerPasskey();

        if (!result.success) {
            setError(result.error || "Passkey-aanmaken mislukt.");
            return;
        }

        setSuccess("Passkey is succesvol aangemaakt.");
        await refreshUser();
    };

    const handleDeletePasskey = async (id) => {
        setError("");
        setSuccess("");

        const result = await deletePasskey(id);

        if (!result.success) {
            setError(result.error || "Passkey verwijderen mislukt.");
            return;
        }

        setSuccess("Passkey is succesvol verwijderd.");
        await refreshUser();
    };

    return (
        <main className="twofactor-page">
            <section className="twofactor-shell" aria-labelledby="twofactor-settings-title">
                <article className="twofactor-card">
                    <header className="twofactor-header">
                        <h1 id="twofactor-settings-title" className="twofactor-title">
                            2FA beveiliging
                        </h1>
                        <p className="twofactor-subtitle">
                            Beheer hier de tweefactorauthenticatie van je account.
                        </p>
                    </header>

                    {error && (
                        <p className="twofactor-error" role="alert" aria-live="polite">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="twofactor-state" aria-live="polite">
                            {success}
                        </p>
                    )}

                    {!isTwoFactorEnabled && !setupData && (
                        <button
                            className="twofactor-button"
                            type="button"
                            onClick={handleInitSetup}
                            disabled={loading}
                        >
                            {loading ? "Bezig..." : "2FA inschakelen"}
                        </button>
                    )}

                    {!isTwoFactorEnabled && setupData && (
                        <section className="twofactor-layout" aria-label="Tweefactorauthenticatie instellen">
                            <article
                                className="twofactor-panel twofactor-panel--qr"
                                aria-labelledby="twofactor-setup-scan-title"
                            >
                                <header className="twofactor-panel-header">
                                    <h2 id="twofactor-setup-scan-title" className="twofactor-section-title">
                                        Stap 1 · Scan de QR-code
                                    </h2>
                                    <p className="twofactor-help">
                                        Open Microsoft Authenticator en scan de QR-code hieronder.
                                    </p>
                                </header>

                                <section className="twofactor-qr-section" aria-label="QR-code voor Microsoft Authenticator">
                                    <div className="twofactor-qr-box">
                                        <QRCodeCanvas value={setupData.otpauthUri} size={180} />
                                    </div>

                                    <section className="twofactor-manual" aria-label="Handmatige instelcode">
                                        <p className="twofactor-manual-label">
                                            Lukt scannen niet? Gebruik dan deze handmatige code.
                                        </p>
                                        <p className="twofactor-manual-value">{setupData.secret}</p>
                                    </section>
                                </section>
                            </article>

                            <article
                                className="twofactor-panel twofactor-panel--form"
                                aria-labelledby="twofactor-setup-confirm-title"
                            >
                                <header className="twofactor-panel-header">
                                    <h2 id="twofactor-setup-confirm-title" className="twofactor-section-title">
                                        Stap 2 · Bevestig je code
                                    </h2>
                                    <p className="twofactor-help">
                                        Voer de 6-cijferige code uit Microsoft Authenticator in om 2FA te activeren.
                                    </p>
                                </header>

                                <form onSubmit={handleVerifySetup} className="twofactor-form">
                                    <section className="twofactor-field">
                                        <label className="twofactor-label" htmlFor="setupCode">
                                            6-cijferige code
                                        </label>
                                        <input
                                            id="setupCode"
                                            className="twofactor-code-input"
                                            type="text"
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            maxLength={6}
                                            placeholder="123456"
                                            value={setupCode}
                                            onChange={(e) =>
                                                setSetupCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                                            }
                                            required
                                        />
                                    </section>

                                    <button
                                        className="twofactor-button"
                                        type="submit"
                                        disabled={loading || setupCode.length !== 6}
                                    >
                                        {loading ? "Bezig met activeren..." : "2FA activeren"}
                                    </button>
                                </form>
                            </article>
                        </section>
                    )}

                    <section className="twofactor-layout twofactor-layout--single" aria-label="Passkeys beheren">
                        <article className="twofactor-panel twofactor-panel--form" aria-labelledby="passkeys-title">
                            <header className="twofactor-panel-header">
                                <h2 id="passkeys-title" className="twofactor-section-title">
                                    Passkeys beheren
                                </h2>
                                <p className="twofactor-help">
                                    Maak een beveiligde passkey aan voor snelle inlog zonder wachtwoord.
                                </p>
                            </header>

                            <button
                                className="twofactor-button"
                                type="button"
                                onClick={handleRegisterPasskey}
                                disabled={loading}
                            >
                                {loading ? "Bezig..." : "Passkey aanmaken"}
                            </button>

                            {passkeys.length > 0 ? (
                                <ul className="twofactor-passkey-list">
                                    {passkeys.map((passkey) => (
                                        <li key={passkey.id} className="twofactor-passkey-item">
                                            <div>
                                                <strong>{passkey.name || "Passkey"}</strong>
                                                <p>{passkey.createdAt ? new Date(passkey.createdAt).toLocaleDateString("nl-NL") : "Aangemaakt"}</p>
                                            </div>
                                            <button
                                                type="button"
                                                className="twofactor-secondary-button"
                                                onClick={() => handleDeletePasskey(passkey.id)}
                                                disabled={loading}
                                            >
                                                Verwijderen
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="twofactor-help">Er zijn nog geen passkeys opgeslagen.</p>
                            )}
                        </article>
                    </section>

                    {isTwoFactorEnabled && (
                        <section className="twofactor-layout twofactor-layout--single" aria-label="Tweefactorauthenticatie uitschakelen">
                            <article className="twofactor-panel twofactor-panel--form" aria-labelledby="twofactor-disable-title">
                                <header className="twofactor-panel-header">
                                    <h2 id="twofactor-disable-title" className="twofactor-section-title">
                                        2FA uitschakelen
                                    </h2>
                                    <p className="twofactor-help">
                                        Vul je huidige code uit Microsoft Authenticator in om tweefactorauthenticatie uit te schakelen.
                                    </p>
                                </header>

                                <form onSubmit={handleDisable} className="twofactor-form">
                                    <section className="twofactor-field">
                                        <label className="twofactor-label" htmlFor="disableCode">
                                            6-cijferige code
                                        </label>
                                        <input
                                            id="disableCode"
                                            className="twofactor-code-input"
                                            type="text"
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            maxLength={6}
                                            placeholder="123456"
                                            value={disableCode}
                                            onChange={(e) =>
                                                setDisableCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                                            }
                                            required
                                        />
                                    </section>

                                    <button
                                        className="twofactor-button"
                                        type="submit"
                                        disabled={loading || disableCode.length !== 6}
                                    >
                                        {loading ? "Bezig met uitschakelen..." : "2FA uitschakelen"}
                                    </button>
                                </form>
                            </article>
                        </section>
                    )}
                </article>
            </section>
        </main>
    );
}