import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import useAuth from "@/features/auth/hooks/useAuth.js";
import "./TwoFactorPage.css";

export default function TwoFactorSettingsPage() {
    const {
        user,
        initTwoFactorSetup,
        verifyTwoFactorSetup,
        disableTwoFactor,
        loading,
        refreshUser,
    } = useAuth();

    const [setupData, setSetupData] = useState(null);
    const [setupCode, setSetupCode] = useState("");
    const [disableCode, setDisableCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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