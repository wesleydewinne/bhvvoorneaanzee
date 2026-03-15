// src/features/contact/pages/ContactBedanktPage.jsx
import { Link } from "react-router-dom";
import contactBg from "@/assets/image/common/backgrounds/contact-bg.jpg";
import "../styles/ContactOns.css";

function ContactBedanktPage() {
    return (
        <div className="contact-bedankt">
            <div
                className="contact-bedankt-background"
                style={{ backgroundImage: `url(${contactBg})` }}
            ></div>

            <div className="contact-bedankt-overlay"></div>

            <section className="contact-bedankt-section">
                <div className="contact-bedankt-card">
                    <span className="contact-bedankt-badge">Uw bericht is verzonden</span>

                    <h1>Bedankt voor je bericht</h1>

                    <p>
                        Je bericht is succesvol verzonden. We nemen zo snel mogelijk
                        contact met je op.
                    </p>

                    <div className="contact-bedankt-actions">
                        <Link to="/" className="cta-button">
                            Terug naar home
                        </Link>

                        <Link to="/bhv" className="contact-secondary-button">
                            Bekijk trainingen
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactBedanktPage;