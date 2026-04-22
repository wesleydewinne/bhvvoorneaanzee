import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";
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

    const { login, loading } = useAuth();

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

        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="login">
            <div className="login__card">
                <div className="login__header">
                    <h1 className="login__title">Inloggen</h1>
                    <p className="login__subtitle">
                        Gebruik je accountgegevens om door te gaan.
                    </p>
                </div>

                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__field">
                        <label className="login__label" htmlFor="email">
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
                        {loading ? "Bezig met inloggen..." : "Inloggen"}
                    </button>
                </form>
            </div>
        </div>
    );
}