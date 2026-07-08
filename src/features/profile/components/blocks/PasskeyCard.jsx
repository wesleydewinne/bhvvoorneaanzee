import { useNavigate } from "react-router-dom";

export default function PasskeyCard() {
    const navigate = useNavigate();

    return (
        <section className="profile-card">
            <div className="profile-card__header profile-card__header--actions">
                <div>
                    <h2>Passkey</h2>
                </div>

                <button
                    type="button"
                    className="profile-button profile-button--secondary"
                    onClick={() => navigate("/account/passkey-aanmaken")}
                >
                    Instellen
                </button>
            </div>

            <p>
                Maak een passkey aan om sneller en veiliger in te loggen met Windows Hello,
                Face ID, Touch ID of je apparaat-pincode.
            </p>
        </section>
    );
}
