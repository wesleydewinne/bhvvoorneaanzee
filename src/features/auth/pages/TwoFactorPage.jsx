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
        if (!authInitialized) return;

        if (!requiresTwoFactor) {
            navigate("/inloggen", { replace: true });
        }
    }, [authInitialized, requiresTwoFactor, navigate]);

    useEffect(() => {
        if (!authInitialized || !requiresTwoFactor || !requiresTwoFactorSetup) return;

        let cancelled = false;

        const loadSetup = async () => {
            try {
                const data = await initTwoFactorSetup();
                if (!cancelled) setSetupData(data);
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Kan 2FA setup niet laden.");
                }
            }
        };

        void loadSetup();

        return () => {
            cancelled = true;
        };
    }, [authInitialized, requiresTwoFactor, requiresTwoFactorSetup, initTwoFactorSetup]);

    const handleCodeChange = (e) => {
        const sanitized = e.target.value.replace(/\D/g, "").slice(0, 6);
        setCode(sanitized);
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
            <main className="twofactor-page">
                <section className="twofactor-card">Laden...</section>
            </main>
        );
    }

    return (
        <main className="twofactor-page">
            <article className="twofactor-card">
                <header className="twofactor-header">
                    <h1 className="twofactor-title">
                        {requiresTwoFactorSetup ? "2FA instellen" : "Tweefactorauthenticatie"}
                    </h1>

                    <p className="twofactor-subtitle">
                        {requiresTwoFactorSetup
                            ? "Scan de QR-code met Microsoft Authenticator en bevestig daarna met je code."
                            : "Voer de 6-cijferige code uit je authenticator-app in om door te gaan."}
                    </p>
                </header>

                {error && (
                    <p className="twofactor-error" role="alert">
                        {error}
                    </p>
                )}

                {requiresTwoFactorSetup && !setupData && !error && (
                    <p className="twofactor-state">QR-code wordt geladen...</p>
                )}

                {/* =========================
                   2FA SETUP
                ========================= */}
                {requiresTwoFactorSetup && setupData && (
                    <section className="twofactor-layout">
                        <article className="twofactor-panel twofactor-panel--qr">
                            <header>
                                <h2 className="twofactor-section-title">
                                    Stap 1 · Scan de QR-code
                                </h2>
                            </header>

                            <section className="twofactor-qr-section">
                                <figure className="twofactor-qr-box">
                                    <QRCodeCanvas value={setupData.otpauthUri} size={180} />
                                </figure>

                                <section className="twofactor-manual">
                                    <p className="twofactor-manual-label">
                                        Handmatige code
                                    </p>
                                    <p className="twofactor-manual-value">
                                        {setupData.secret}
                                    </p>
                                </section>
                            </section>
                        </article>

                        <article className="twofactor-panel twofactor-panel--form">
                            <header>
                                <h2 className="twofactor-section-title">
                                    Stap 2 · Bevestig je code
                                </h2>
                            </header>

                            <form onSubmit={handleVerifySetup} className="twofactor-form">
                                <section className="twofactor-field">
                                    <label className="twofactor-label" htmlFor="code">
                                        6-cijferige code
                                    </label>

                                    <input
                                        id="code"
                                        className="twofactor-code-input"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={6}
                                        placeholder="123456"
                                        value={code}
                                        onChange={handleCodeChange}
                                        required
                                    />
                                </section>

                                <button
                                    className="twofactor-button"
                                    type="submit"
                                    disabled={loading || code.length !== 6}
                                >
                                    {loading ? "Bezig..." : "2FA activeren"}
                                </button>
                            </form>
                        </article>
                    </section>
                )}

                {/* =========================
                   2FA LOGIN
                ========================= */}
                {!requiresTwoFactorSetup && (
                    <form onSubmit={handleVerifyLogin} className="twofactor-form">
                        <section className="twofactor-field">
                            <label className="twofactor-label" htmlFor="code">
                                Authenticatiecode
                            </label>

                            <input
                                id="code"
                                className="twofactor-code-input"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                placeholder="123456"
                                value={code}
                                onChange={handleCodeChange}
                                required
                            />
                        </section>

                        <button
                            className="twofactor-button"
                            type="submit"
                            disabled={loading || code.length !== 6}
                        >
                            {loading ? "Bezig..." : "Code bevestigen"}
                        </button>
                    </form>
                )}
            </article>
        </main>
    );
}