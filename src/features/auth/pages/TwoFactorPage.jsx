import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import useAuth from "@/features/auth/hooks/useAuth.js";
import "./TwoFactorPage.css";

export default function TwoFactorPage() {
    const {
        requiresTwoFactor,
        requiresTwoFactorSetup,
        verifyTwoFactorLogin,
        initTwoFactorSetup,
        verifyTwoFactorSetup,
        refreshUser,
        loading,
    } = useAuth();

    const [setupData, setSetupData] = useState(null);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [setupComplete, setSetupComplete] = useState(false);
    const [setupLoading, setSetupLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!requiresTwoFactor) {
            navigate("/inloggen", { replace: true });
            return;
        }

        if (!requiresTwoFactorSetup) {
            return;
        }

        const loadSetup = async () => {
            setSetupLoading(true);
            setError("");

            try {
                const data = await initTwoFactorSetup();
                setSetupData(data);
            } catch (err) {
                setError(err.message || "Kan 2FA setup niet laden.");
            } finally {
                setSetupLoading(false);
            }
        };

        loadSetup();
    }, [
        requiresTwoFactor,
        requiresTwoFactorSetup,
        initTwoFactorSetup,
        navigate,
    ]);

    const handleCodeChange = (e) => {
        const sanitizedValue = e.target.value.replace(/\D/g, "").slice(0, 6);
        setCode(sanitizedValue);
    };

    const handleVerifySetup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await verifyTwoFactorSetup(code);
            setSetupComplete(true);
            setCode("");
        } catch (err) {
            setError(err.message || "Ongeldige 2FA code.");
        }
    };

    const handleVerifyLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await verifyTwoFactorLogin(code);

            if (!result.success) {
                setError(result.error || "2FA verificatie mislukt.");
                return;
            }

            await refreshUser();
            navigate("/dashboard", { replace: true });
        } catch (err) {
            setError(err.message || "2FA verificatie mislukt.");
        }
    };

    const showSetupFlow = requiresTwoFactorSetup && !setupComplete;

    return (
        <div className="twofactor-page">
            <div className="twofactor-card">
                <div className="twofactor-header">
                    <h1 className="twofactor-title">Tweefactorauthenticatie</h1>
                    <p className="twofactor-subtitle">
                        Rond je aanmelding af met je authenticatie-app.
                    </p>
                </div>

                {showSetupFlow && setupLoading && (
                    <div className="twofactor-state">
                        Setup wordt geladen...
                    </div>
                )}

                {showSetupFlow && !setupLoading && setupData && (
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
                                    value={code}
                                    onChange={handleCodeChange}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="twofactor-error" role="alert" aria-live="polite">
                                    {error}
                                </div>
                            )}

                            <button
                                className="twofactor-button"
                                type="submit"
                                disabled={loading || code.length !== 6}
                            >
                                2FA activeren
                            </button>
                        </form>
                    </div>
                )}

                {showSetupFlow && !setupLoading && !setupData && (
                    <div className="twofactor-error" role="alert" aria-live="polite">
                        {error || "2FA setup kon niet worden geladen."}
                    </div>
                )}

                {(!requiresTwoFactorSetup || setupComplete) && (
                    <form onSubmit={handleVerifyLogin} className="twofactor-form">
                        <div className="twofactor-field">
                            <label className="twofactor-label" htmlFor="code">
                                Vul je authenticatiecode in
                            </label>
                            <input
                                id="code"
                                className="twofactor-input"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                value={code}
                                onChange={handleCodeChange}
                                required
                            />
                        </div>

                        {error && (
                            <div className="twofactor-error" role="alert" aria-live="polite">
                                {error}
                            </div>
                        )}

                        <button
                            className="twofactor-button"
                            type="submit"
                            disabled={loading || code.length !== 6}
                        >
                            Code bevestigen
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}