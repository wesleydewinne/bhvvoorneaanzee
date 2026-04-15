import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import useAuth from "@/features/auth/hooks/useAuth.js";

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
            try {
                const data = await initTwoFactorSetup();
                setSetupData(data);
            } catch (err) {
                setError(err.message || "Kan 2FA setup niet laden.");
            }
        };

        loadSetup();
    }, [
        requiresTwoFactor,
        requiresTwoFactorSetup,
        initTwoFactorSetup,
        navigate,
    ]);

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

        const result = await verifyTwoFactorLogin(code);

        if (!result.success) {
            setError(result.error || "2FA verificatie mislukt.");
            return;
        }

        await refreshUser();
        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="login">
            <div className="login__card">
                <div className="login__header">
                    <h1 className="login__title">Tweefactorauthenticatie</h1>
                    <p className="login__subtitle">
                        Rond je aanmelding af met je authenticatie-app.
                    </p>
                </div>

                {requiresTwoFactorSetup && !setupComplete && setupData && (
                    <div className="space-y-4">
                        <p>Scan deze QR-code met Microsoft Authenticator.</p>

                        <QRCodeCanvas value={setupData.otpauthUri} size={220} />

                        <p>
                            Handmatige code: <strong>{setupData.secret}</strong>
                        </p>

                        <form onSubmit={handleVerifySetup} className="login__form">
                            <div className="login__field">
                                <label className="login__label" htmlFor="setupCode">
                                    Bevestig met je 6-cijferige code
                                </label>
                                <input
                                    id="setupCode"
                                    className="login__input"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="login__error" role="alert" aria-live="polite">
                                    {error}
                                </div>
                            )}

                            <button className="login__button" type="submit" disabled={loading}>
                                2FA activeren
                            </button>
                        </form>
                    </div>
                )}

                {(!requiresTwoFactorSetup || setupComplete) && (
                    <form onSubmit={handleVerifyLogin} className="login__form">
                        <div className="login__field">
                            <label className="login__label" htmlFor="code">
                                Vul je authenticatiecode in
                            </label>
                            <input
                                id="code"
                                className="login__input"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="login__error" role="alert" aria-live="polite">
                                {error}
                            </div>
                        )}

                        <button className="login__button" type="submit" disabled={loading}>
                            Code bevestigen
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}