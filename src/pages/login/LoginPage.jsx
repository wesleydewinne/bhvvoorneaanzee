import { useState, useEffect, useRef } from "react";
import api from "@/api/api.js";
import { useNavigate } from "react-router-dom";

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

    // Site key uit .env
    const siteKey = import.meta.env.VITE_TURNSTILE_SITEKEY;

    // Turnstile script laden + widget renderen
    useEffect(() => {
        // Als script al geladen is
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

        // Script nog niet aanwezig → toevoegen
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
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

        return () => {
            // optioneel: cleanup
        };
    }, [siteKey]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!captchaToken) {
            setError("Bevestig eerst de beveiligingscheck (CAPTCHA).");
            return;
        }

        setLoading(true);
        try {
            await api.post("/auth/login", {
                email,
                password,
                captcha: captchaToken,
            });

            // Geen token meer opslaan; cookies regelen alles
            navigate("/dashboard");
        } catch (err) {
            console.error("Login fout:", err);
            if (err.response?.status === 403) {
                setError("Beveiligingscheck (CAPTCHA) ongeldig of verlopen.");
            } else if (err.response?.status === 429) {
                setError(
                    "Te veel mislukte pogingen. Wacht even voordat je opnieuw probeert."
                );
            } else if (err.response?.status === 401) {
                setError("Onjuiste inloggegevens.");
            } else {
                setError("Ongeldige login of serverfout.");
            }

            // CAPTCHA resetten na fout
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
        <div>
            <h1>Inloggen</h1>

            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />

                <label>Wachtwoord</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br /><br />

                {/* Turnstile CAPTCHA */}
                <div ref={captchaRef} style={{ marginBottom: "1rem" }} />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading || !captchaReady}
                >
                    {loading ? "Bezig met inloggen..." : "Inloggen"}
                </button>
            </form>
        </div>
    );
}
