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
        <div className="twofactor-page">
            <div className="twofactor-card">
                <div className="twofactor-header">
                    <h1 className="twofactor-title">2FA beveiliging</h1>
                    <p className="twofactor-subtitle">
                        Beheer hier de tweefactorauthenticatie van je account.
                    </p>
                </div>

                {error && (
                    <div className="twofactor-error" role="alert" aria-live="polite">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="twofactor-state" aria-live="polite">
                        {success}
                    </div>
                )}

                {!isTwoFactorEnabled && !setupData && (
                    <button
                        className="twofactor-button"
                        type="button"
                        onClick={handleInitSetup}
                        disabled={loading}
                    >
                        2FA inschakelen
                    </button>
                )}

                {!isTwoFactorEnabled && setupData && (
                    <div className="twofactor-setup">
                        <p className="twofactor-text">
                            Scan deze QR-code met Microsoft Authenticator of Google Authenticator.
                        </p>

                        <div className="twofactor-qr">
                            <QRCodeCanvas value={setupData.otpauthUri} size={220} />
                        </div>

                        <div className="twofactor-manual-code">
                            <span>Handmatige code:</span>
                            <strong>{setupData.secret}</strong>
                        </div>

                        <form onSubmit={handleVerifySetup} className="twofactor-form">
                            <div className="twofactor-field">
                                <label className="twofactor-label" htmlFor="setupCode">
                                    Bevestig met je 6-cijferige code
                                </label>
                                <input
                                    id="setupCode"
                                    className="twofactor-input"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={6}
                                    value={setupCode}
                                    onChange={(e) =>
                                        setSetupCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                                    }
                                    required
                                />
                            </div>

                            <button
                                className="twofactor-button"
                                type="submit"
                                disabled={loading || setupCode.length !== 6}
                            >
                                {loading ? "Bezig met activeren..." : "2FA activeren"}
                            </button>
                        </form>
                    </div>
                )}

                {isTwoFactorEnabled && (
                    <form onSubmit={handleDisable} className="twofactor-form">
                        <div className="twofactor-field">
                            <label className="twofactor-label" htmlFor="disableCode">
                                Vul je huidige 2FA-code in om 2FA uit te schakelen
                            </label>
                            <input
                                id="disableCode"
                                className="twofactor-input"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                value={disableCode}
                                onChange={(e) =>
                                    setDisableCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                                }
                                required
                            />
                        </div>

                        <button
                            className="twofactor-button"
                            type="submit"
                            disabled={loading || disableCode.length !== 6}
                        >
                            {loading ? "Bezig met uitschakelen..." : "2FA uitschakelen"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}