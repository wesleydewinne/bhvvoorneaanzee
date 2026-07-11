import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, LockKeyhole, LogIn, Mail, ShieldCheck } from "lucide-react";
import useAuth from "@/features/auth/hooks/useAuth.js";
import { getPostLoginPath } from "@/features/auth/helpers/passkeyPolicy.js";
import "./LoginPage.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaReady, setCaptchaReady] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const captchaRef = useRef(null);
    const widgetIdRef = useRef(null);

    const { login, loginWithPasskey, loading } = useAuth();

    const siteKey = import.meta.env.VITE_TURNSTILE_SITEKEY;

    useEffect(() => {
        const renderTurnstile = () => {
            if (!window.turnstile || !captchaRef.current || widgetIdRef.current) {
                return;
            }

            widgetIdRef.current = window.turnstile.render(captchaRef.current, {
                sitekey: siteKey,
                callback: (token) => {
                    setCaptchaToken(token);
                    setCaptchaReady(true);
                },
                "expired-callback": () => {
                    setCaptchaToken("");
                    setCaptchaReady(false);
                },
                "error-callback": () => {
                    setCaptchaToken("");
                    setCaptchaReady(false);
                },
            });
        };

        if (window.turnstile) {
            renderTurnstile();
            return;
        }

        const existingScript = document.querySelector(
            'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]'
        );

        if (existingScript) {
            existingScript.addEventListener("load", renderTurnstile);
            return () => {
                existingScript.removeEventListener("load", renderTurnstile);
            };
        }

        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.addEventListener("load", renderTurnstile);
        document.body.appendChild(script);

        return () => {
            script.removeEventListener("load", renderTurnstile);
        };
    }, [siteKey]);

    const resetCaptcha = () => {
        if (window.turnstile && widgetIdRef.current) {
            window.turnstile.reset(widgetIdRef.current);
        }

        setCaptchaToken("");
        setCaptchaReady(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!captchaToken) {
            setError("Bevestig eerst de beveiligingscheck.");
            return;
        }

        const result = await login({
            email,
            password,
            captcha: captchaToken,
        });

        if (!result.success) {
            setError(result.error || "Ongeldige login of serverfout.");
            resetCaptcha();
            return;
        }

        if (result.requiresTwoFactor) {
            navigate("/inloggen/2fa", { replace: true });
            return;
        }

        navigate(getPostLoginPath(result.user), { replace: true });
    };

    const handlePasskeyLogin = async () => {
        setError("");

        const result = await loginWithPasskey();

        if (!result.success) {
            setError(result.error || "Passkey-login is niet gelukt.");
            return;
        }

        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="login">
            <div className="login__card">
                <div className="login__header">
                    <span className="login__security-icon"><ShieldCheck aria-hidden="true" /></span>
                    <span className="login__eyebrow">Beveiligde toegang</span>
                    <h1 className="login__title">Inloggen</h1>
                    <p className="login__subtitle">
                        Gebruik je accountgegevens om door te gaan.
                    </p>
                </div>

                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__field">
                        <label className="login__label" htmlFor="email">
                            <Mail aria-hidden="true" />
                            E-mailadres
                        </label>
                        <input
                            id="email"
                            className="login__input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="login__field">
                        <label className="login__label" htmlFor="password">
                            <LockKeyhole aria-hidden="true" />
                            Wachtwoord
                        </label>
                        <input
                            id="password"
                            className="login__input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div className="login__captcha">
                        <div ref={captchaRef} />
                        {!captchaReady && (
                            <p className="login__hint">
                                Bevestig de beveiligingscheck om te kunnen inloggen.
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="login__error" role="alert" aria-live="polite">
                            {error}
                        </div>
                    )}

                    <button
                        className="login__button"
                        type="submit"
                        disabled={loading || !captchaReady}
                    >
                        <LogIn aria-hidden="true" />
                        {loading ? "Bezig met inloggen..." : "Inloggen"}
                    </button>

                    <div className="login__divider"><span>of veilig zonder wachtwoord</span></div>

                    <button
                        className="login__button login__button--secondary"
                        type="button"
                        disabled={loading}
                        onClick={handlePasskeyLogin}
                    >
                        <Fingerprint aria-hidden="true" />
                        {loading ? "Bezig met passkey..." : "Inloggen met passkey"}
                    </button>
                </form>
            </div>
        </div>
    );
}
