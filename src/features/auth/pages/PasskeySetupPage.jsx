import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth.js";
import { requiresPasskeyForUser } from "@/features/auth/helpers/passkeyPolicy.js";
import authService from "@/features/auth/services/authService.js";
import { isPasskeySupported } from "@/features/auth/utils/passkeyUtils.js";
import "./TwoFactorPage.css";

export default function PasskeySetupPage() {
    const navigate = useNavigate();
    const { user, registerPasskey, loading } = useAuth();

    const [passkeys, setPasskeys] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const supported = isPasskeySupported();
    const passkeyRequired = requiresPasskeyForUser(user);

    const loadPasskeys = async () => {
        try {
            setPageLoading(true);
            const response = await authService.listPasskeys();
            setPasskeys(Array.isArray(response.data) ? response.data : []);
        } catch {
            setPasskeys([]);
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        void loadPasskeys();
    }, []);

    useEffect(() => {
        if (!pageLoading && passkeyRequired && passkeys.length > 0) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate, pageLoading, passkeyRequired, passkeys.length]);

    const handleRegisterPasskey = async () => {
        setError("");
        setSuccess("");

        if (!supported) {
            setError("Deze browser of dit apparaat ondersteunt geen passkeys.");
            return;
        }

        const result = await registerPasskey();

        if (!result.success) {
            setError(result.error || "Passkey aanmaken is mislukt.");
            return;
        }

        setSuccess("Passkey is aangemaakt. Je kunt voortaan sneller en veiliger inloggen.");
        await loadPasskeys();
    };

    return (
        <main className="twofactor-page">
            <section className="twofactor-shell" aria-labelledby="passkey-setup-title">
                <article className="twofactor-card">
                    <header className="twofactor-header">
                        <h1 id="passkey-setup-title" className="twofactor-title">
                            Passkey instellen
                        </h1>
                        <p className="twofactor-subtitle">
                            {passkeyRequired
                                ? "Je bent aangemeld. Voor medewerkers is een passkey verplicht, zodat het account beter beschermd is."
                                : "Je bent aangemeld. Je mag optioneel een passkey aanmaken, zodat je later zonder wachtwoord kunt inloggen op dit apparaat."}
                        </p>
                    </header>

                    {error ? (
                        <p className="twofactor-error" role="alert" aria-live="polite">
                            {error}
                        </p>
                    ) : null}

                    {success ? (
                        <p className="twofactor-state" aria-live="polite">
                            {success}
                        </p>
                    ) : null}

                    <section className="twofactor-layout">
                        <article className="twofactor-panel twofactor-panel--form">
                            <header className="twofactor-panel-header">
                                <h2 className="twofactor-section-title">
                                    Sneller inloggen
                                </h2>
                                <p className="twofactor-help">
                                    Een passkey gebruikt de beveiliging van je apparaat, zoals
                                    Windows Hello, Face ID, Touch ID of een beveiligingssleutel.
                                </p>
                            </header>

                            <div className="twofactor-form">
                                <button
                                    className="twofactor-button"
                                    type="button"
                                    onClick={handleRegisterPasskey}
                                    disabled={loading || pageLoading || !supported}
                                >
                                    {loading ? "Passkey aanmaken..." : "Passkey aanmaken"}
                                </button>

                                {!passkeyRequired ? (
                                    <button
                                        className="twofactor-secondary-button"
                                        type="button"
                                        onClick={() => navigate("/dashboard", { replace: true })}
                                    >
                                        Nu overslaan
                                    </button>
                                ) : (
                                    <p className="twofactor-help">
                                        Deze stap is verplicht voor medewerkers. Cursisten en externe rollen
                                        kunnen deze stap overslaan.
                                    </p>
                                )}
                            </div>
                        </article>

                        <article className="twofactor-panel twofactor-panel--form">
                            <header className="twofactor-panel-header">
                                <h2 className="twofactor-section-title">
                                    Huidige passkeys
                                </h2>
                                <p className="twofactor-help">
                                    Je kunt passkeys later beheren via je beveiligingsinstellingen.
                                </p>
                            </header>

                            {pageLoading ? (
                                <p className="twofactor-help">Passkeys laden...</p>
                            ) : passkeys.length > 0 ? (
                                <ul className="twofactor-passkey-list">
                                    {passkeys.map((passkey) => (
                                        <li key={passkey.id} className="twofactor-passkey-item">
                                            <div>
                                                <strong>{passkey.name || "Passkey"}</strong>
                                                <p>
                                                    {passkey.createdAt
                                                        ? new Date(passkey.createdAt).toLocaleDateString("nl-NL")
                                                        : "Aangemaakt"}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="twofactor-help">
                                    Er is nog geen passkey gekoppeld aan je account.
                                </p>
                            )}
                        </article>
                    </section>
                </article>
            </section>
        </main>
    );
}
