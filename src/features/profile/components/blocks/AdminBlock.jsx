import { useNavigate } from "react-router-dom";

export default function AdminBlock() {
    const navigate = useNavigate();

    return (
        <section className="profile-card">
            <div className="profile-card__header">
                <h2>Beheer</h2>
            </div>

            <p>Toegang tot gebruikersbeheer en andere administratieve onderdelen.</p>

            <div className="profile-form__actions">
                <button
                    type="button"
                    className="profile-button"
                    onClick={() => navigate("/admin/users")}
                >
                    Ga naar gebruikersbeheer
                </button>
            </div>
        </section>
    );
}