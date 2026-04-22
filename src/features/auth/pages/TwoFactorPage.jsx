import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import useAuth from "@/features/auth/hooks/useAuth.js";
import "./TwoFactorPage.css";

export default function TwoFactorPage() {
    const {
        authInitialized,
        requiresTwoFactor,
        requiresTwoFactorSetup,
        verifyTwoFactorLogin,
        initTwoFactorSetup,
        verifyTwoFactorSetup,
        loading,
    } = useAuth();

    const [setupData, setSetupData] = useState(null);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!authInitialized) {
            return;
        }

        if (!requiresTwoFactor) {
            navigate("/inloggen", { replace: true });
        }
    }, [authInitialized, requiresTwoFactor, navigate]);

    useEffect(() => {
        if (!authInitialized || !requiresTwoFactor || !requiresTwoFactorSetup) {
            return;
        }

        let cancelled = false;

        const loadSetup = async () => {
            try {
                const data = await initTwoFactorSetup();

                if (!cancelled) {
                    setSetupData(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Kan 2FA setup niet laden.");
                }
            }
        };

        loadSetup();

        return () => {
            cancelled = true;
        };
    }, [authInitialized, requiresTwoFactor, requiresTwoFactorSetup, initTwoFactorSetup]);

    const handleCodeChange = (e) => {
        const sanitizedValue = e.target.value.replace(/\D/g, "").slice(0, 6);
        setCode(sanitizedValue);
    };

    const handleVerifyLogin = async (e) => {
        e.preventDefault();
        setError("");

        const result = await verifyTwoFactorLogin(code);

        if (!result.success) {
            setError(result.error || "2FA verificatie mislukt.");
            return;
        }

        navigate("/dashboard", { replace: true });
    };

    const handleVerifySetup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await verifyTwoFactorSetup(code);
            setCode("");
            setSetupData(null);
        } catch (err) {
            setError(err.message || "2FA activeren is mislukt.");
        }
    };

    if (!authInitialized) {
        return (
            <div className="twofactor-page">
                <div className="twofactor-card">Laden...</div>
            </div>
        );
    }

    return (
        <div className="twofactor-page">
            <div className="twofactor-card">
                <div className="twofactor-header">
                    <h1 className="twofactor-title">
                        {requiresTwoFactorSetup ? "2FA instellen" : "Tweefactorauthenticatie"}
                    </h1>
                    <p className="twofactor-subtitle">
                        {requiresTwoFactorSetup
                            ? "Dit account vereist tweefactorauthenticatie. Scan eerst de QR-code en bevestig daarna met je 6-cijferige code."
                            : "Vul de 6-cijferige code uit je authenticator-app in."}
                    </p>
                </div>

                {error && (
                    <div className="twofactor-error" role="alert" aria-live="polite">
                        {error}
                    </div>
                )}

                {requiresTwoFactorSetup && !setupData && !error && (
                    <div className="twofactor-state">QR-code wordt geladen...</div>
                )}

                {requiresTwoFactorSetup && setupData && (
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
                                <label className="twofactor-label" htmlFor="code">
                                    Bevestig met je 6-cijferige code
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

                            <button
                                className="twofactor-button"
                                type="submit"
                                disabled={loading || code.length !== 6}
                            >
                                {loading ? "Bezig met activeren..." : "2FA activeren"}
                            </button>
                        </form>
                    </div>
                )}

                {!requiresTwoFactorSetup && (
                    <form onSubmit={handleVerifyLogin} className="twofactor-form">
                        <div className="twofactor-field">
                            <label className="twofactor-label" htmlFor="code">
                                Authenticatiecode
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

                        <button
                            className="twofactor-button"
                            type="submit"
                            disabled={loading || code.length !== 6}
                        >
                            {loading ? "Bezig met verifiëren..." : "Code bevestigen"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}