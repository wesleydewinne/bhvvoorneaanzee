import { useNavigate } from "react-router-dom";
import { Fingerprint, KeyRound } from "lucide-react";

export default function PasskeyCard() {
    const navigate = useNavigate();

    return (
        <section className="profile-card">
            <div className="profile-card__header profile-card__header--actions">
                <div>
                    <h2>
                        <Fingerprint aria-hidden="true" />
                        Passkey
                    </h2>
                </div>

                <button
                    type="button"
                    className="profile-button profile-button--secondary"
                    onClick={() => navigate("/account/passkey-aanmaken")}
                >
                    <KeyRound aria-hidden="true" />
                    Instellen
                </button>
            </div>

            <p>
                Maak een passkey aan om sneller en veiliger in te loggen met Windows Hello,
                Face ID, Touch ID of je apparaat-pincode.
            </p>
            <p>
                Op een computer kun je bij passkey-login ook kiezen voor een ander apparaat.
                De browser toont dan een QR-code die je met je telefoon scant.
            </p>
        </section>
    );
}
