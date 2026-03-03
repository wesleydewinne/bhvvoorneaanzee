import { useState, useEffect, useRef } from "react";
import api from "@/api/api.js";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";
import "./LoginPage.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaReady, setCaptchaReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const captchaRef = useRef(null);
    const widgetIdRef = useRef(null);

    const { refreshUser } = useAuth();

    const siteKey = import.meta.env.VITE_TURNSTILE_SITEKEY;

    useEffect(() => {
        if (window.turnstile && captchaRef.current && !widgetIdRef.current) {
            widgetIdRef.current = window.turnstile.render(captchaRef.current, {
                sitekey: siteKey,
                callback: (token) => {
                    setCaptchaToken(token);
                    setCaptchaReady(true);
                },
            });
            return;
        }

        const script = document.createElement("script");
        script.src =
            "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (captchaRef.current && !widgetIdRef.current) {
                widgetIdRef.current = window.turnstile.render(captchaRef.current, {
                    sitekey: siteKey,
                    callback: (token) => {
                        setCaptchaToken(token);
                        setCaptchaReady(true);
                    },
                });
            }
        };
        document.body.appendChild(script);
    }, [siteKey]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!captchaToken) {
            setError("Bevestig eerst de beveiligingscheck");
            return;
        }

        setLoading(true);
        try {
            await api.post("/auth/login", {
                email,
                password,
                captcha: captchaToken,
            });

            await refreshUser();
            navigate("/dashboard");
        } catch (err) {
            console.error("Login fout:", err);

            if (err.response?.status === 403) {
                setError("Beveiligingscheck ongeldig of verlopen.");
            } else if (err.response?.status === 429) {
                setError("Te veel mislukte inlog pogingen. Wacht minimaal 15 en probeer opnieuw.");
            } else if (err.response?.status === 401) {
                setError("Onjuiste inloggegevens.");
            } else {
                setError("Ongeldige login of serverfout.");
            }

            if (window.turnstile && widgetIdRef.current) {
                window.turnstile.reset(widgetIdRef.current);
                setCaptchaToken("");
                setCaptchaReady(false);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login__card">
                <div className="login__header">
                    <h1 className="login__title">Inloggen</h1>
                    <p className="login__subtitle">Gebruik je accountgegevens om door te gaan.</p>
                </div>

                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__field">
                        <label className="login__label" htmlFor="email">Email</label>
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
                        <label className="login__label" htmlFor="password">Wachtwoord</label>
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
                            <p className="login__hint">Bevestig de beveiligingscheck om te kunnen inloggen.</p>
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
                        {loading ? (
                            <>
                                <span className="login__spinner" aria-hidden="true" />
                                Bezig met inloggen...
                            </>
                        ) : (
                            "Inloggen"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}