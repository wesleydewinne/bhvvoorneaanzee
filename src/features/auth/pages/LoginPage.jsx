import { useState, useEffect, useRef } from "react";
import api from "@/api/api.js";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js"; // blijft hetzelfde

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
                widgetIdRef.current = window.turnstile.render(
                    captchaRef.current,
                    {
                        sitekey: siteKey,
                        callback: (token) => {
                            setCaptchaToken(token);
                            setCaptchaReady(true);
                        },
                    }
                );
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
            // 1️⃣ login bij backend → zet httpOnly cookies
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
                setError(
                    "Te veel mislukte inlog pogingen. Wacht minimaal 15 en probeer opnieuw."
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
                <label>Email</label>
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />

                <label>Wachtwoord</label>
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />
                <br />

                {/* Turnstile CAPTCHA */}
                <div ref={captchaRef} style={{ marginBottom: "1rem" }} />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" disabled={loading || !captchaReady}>
                    {loading ? "Bezig met inloggen..." : "Inloggen"}
                </button>
            </form>
        </div>
    );
}
