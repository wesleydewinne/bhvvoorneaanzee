import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, LockKeyhole, LogIn, Mail, ShieldCheck } from "lucide-react";
import useAuth from "@/features/auth/hooks/useAuth.js";
import { getPostLoginPath } from "@/features/auth/helpers/passkeyPolicy.js";
import "./LoginPage.css";

export default function LoginPage() {
    const captchaDisabled = import.meta.env.DEV && import.meta.env.VITE_DISABLE_CAPTCHA === "true";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState(captchaDisabled ? "local-development" : "");
    const [captchaReady, setCaptchaReady] = useState(captchaDisabled);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const captchaRef = useRef(null);
    const widgetIdRef = useRef(null);

    const { login, loginWithPasskey, loading } = useAuth();

    const siteKey = import.meta.env.VITE_TURNSTILE_SITEKEY;
    const requestLoginHref = `mailto:klantenservice@bhvvoorneaanzee.nl?subject=${encodeURIComponent("Inloggegevens aanvragen")}&body=${encodeURIComponent(`Hallo,\n\nIk wil graag inloggegevens aanvragen${email ? ` voor ${email}` : ""}.\n\nMet vriendelijke groet,`)}`;

    useEffect(() => {
        if (captchaDisabled) {
            return;
        }

        const renderTurnstile = () => {
            if (!window.turnstile || !captchaRef.current || widgetIdRef.current) {
                return;
            }

            widgetIdRef.current = window.turnstile.render(captchaRef.current, {
                sitekey: siteKey,
                appearance: "always",
                size: "flexible",
                theme: "light",
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
    }, [captchaDisabled, siteKey]);

    const resetCaptcha = () => {
        if (captchaDisabled) {
            setCaptchaToken("local-development");
            setCaptchaReady(true);
            return;
        }

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

                {error && <div className="login__error" role="alert" aria-live="polite">{error}</div>}

                <div className="login__methods">
                    <form className="login__method-card login__form" onSubmit={handleSubmit}>
                        <div className="login__method-header">
                            <span className="login__method-icon"><LockKeyhole aria-hidden="true" /></span>
                            <div><h2>Met wachtwoord</h2><p>Log in met je e-mailadres en wachtwoord.</p></div>
                        </div>

                        <div className="login__field">
                            <label className="login__label" htmlFor="email"><Mail aria-hidden="true" />E-mailadres</label>
                            <input id="email" className="login__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                        </div>

                        <div className="login__field">
                            <label className="login__label" htmlFor="password"><LockKeyhole aria-hidden="true" />Wachtwoord</label>
                            <input id="password" className="login__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
                        </div>

                        <button className="login__button" type="submit" disabled={loading || !captchaReady}>
                            <LogIn aria-hidden="true" />{loading ? "Bezig met inloggen..." : "Inloggen"}
                        </button>
                    </form>

                    <section className="login__method-card login__method-card--passkey">
                        <div className="login__method-header">
                            <span className="login__method-icon login__method-icon--passkey"><Fingerprint aria-hidden="true" /></span>
                            <div><h2>Met passkey</h2><p>Gebruik Face ID, Touch ID, Windows Hello of je apparaatcode.</p></div>
                        </div>
                        <div className="login__passkey-visual"><Fingerprint aria-hidden="true" /></div>
                        <button className="login__button login__button--secondary" type="button" disabled={loading} onClick={handlePasskeyLogin}>
                            <Fingerprint aria-hidden="true" />{loading ? "Bezig met passkey..." : "Inloggen met passkey"}
                        </button>
                    </section>
                </div>

                {!captchaDisabled && (
                    <section className="login__captcha login__captcha--shared" aria-label="Beveiligingscontrole voor wachtwoordlogin">
                        <p className="login__captcha-title"><ShieldCheck aria-hidden="true" /> Beveiligingscontrole voor inloggen met wachtwoord</p>
                        <div className="login__turnstile" ref={captchaRef} />
                        {!captchaReady && <p className="login__hint">Bevestig dat je geen robot bent om met een wachtwoord in te loggen.</p>}
                    </section>
                )}

                <p className="login__request-access">Nog geen account? <a href={requestLoginHref}>Vraag inloggegevens aan</a></p>
            </div>
        </div>
    );
}
