import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "@/api/api.js";
import contactBg from "@/assets/image/headerPicture/contact-bg.jpg";
import "./ContactOns.css";

function ContactOns() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        naam: "",
        email: "",
        bericht: "",
        company: "" // honeypot
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [lastSubmit, setLastSubmit] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const validateForm = () => {
        if (!formData.naam.trim()) return "Naam is verplicht.";
        if (!formData.email.trim()) return "E-mailadres is verplicht.";
        if (!formData.bericht.trim()) return "Bericht is verplicht.";

        if (formData.naam.length > 100) return "Naam is te lang.";
        if (formData.bericht.length > 2000) return "Bericht is te lang.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return "Ongeldig e-mailadres.";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        // Honeypot check
        if (formData.company) {
            console.warn("Bot detected");
            return;
        }

        // Cooldown check (30 sec)
        const now = Date.now();
        if (lastSubmit && now - lastSubmit < 30000) {
            setError("Je kunt maximaal één bericht per 30 seconden versturen.");
            return;
        }

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post("/contact", {
                naam: formData.naam,
                email: formData.email,
                bericht: formData.bericht
            });

            setSuccess(true);
            setLastSubmit(now);
            setFormData({ naam: "", email: "", bericht: "", company: "" });

            setTimeout(() => {
                navigate("/", { state: { contactSuccess: true } });
            }, 1500);

        } catch (err) {
            setError("Versturen mislukt. Probeer het later opnieuw.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact">

            {/* FIXED BACKGROUND */}
            <div
                className="contact-background"
                style={{ backgroundImage: `url(${contactBg})` }}
            ></div>

            <div className="contact-overlay"></div>

            {/* HERO */}
            <section className="contact-hero">
                <div className="contact-hero-inner">
                    <h1>Contact</h1>
                    <p>
                        Heb je vragen over BHV, EHBO, ontruimingsoefeningen of veiligheidstrainingen?
                        Of wil je een{" "}
                        <Link to="/offerte" className="contact-offerte-link">
                            offerte op maat
                        </Link>{" "}
                        voor jouw organisatie?
                        <br /><br />
                        Neem gerust contact met ons op.<br />
                        Wij denken graag met je mee.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="contact-content">
                <div className="contact-grid">

                    {/* INFO */}
                    <aside className="contact-info">
                        <h2>Direct contact</h2>

                        <ul className="contact-list">
                            <li>✉️ klantenservice@bhvvoorneaanzee.nl</li>
                        </ul>

                        <div className="contact-gebied">
                            <h3>Werkgebied</h3>
                            <p>
                                BHV Voorne aan Zee verzorgt BHV- en EHBO-trainingen,
                                ontruimingsoefeningen en veiligheidstrainingen in
                                Voorne aan Zee en omliggende regio’s zoals
                                Rotterdam-Rijnmond, Haaglanden, Zeeland en Midden-
                                en West-Brabant.
                            </p>
                        </div>
                    </aside>

                    {/* FORM */}
                    <div className="contact-formulier">
                        <h2>Stuur een bericht</h2>

                        <form onSubmit={handleSubmit} noValidate>

                            {/* Honeypot veld */}
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                style={{ display: "none" }}
                                tabIndex="-1"
                                autoComplete="off"
                            />

                            <div className="form-row">
                                <label htmlFor="naam">Naam</label>
                                <input
                                    type="text"
                                    id="naam"
                                    name="naam"
                                    value={formData.naam}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="email">E-mailadres</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="bericht">Bericht</label>

                                <textarea
                                    id="bericht"
                                    name="bericht"
                                    rows="5"
                                    value={formData.bericht}
                                    onChange={handleChange}
                                    maxLength={3000}
                                    required
                                />

                                <div className="char-counter">
                                    {formData.bericht.length}/3000 tekens
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="cta-button"
                                disabled={loading}
                            >
                                {loading ? "Versturen..." : "Verstuur bericht"}
                            </button>

                            {success && (
                                <p className="form-success">
                                    ✔ Bericht succesvol verzonden! Je wordt doorgestuurd...
                                </p>
                            )}

                            {error && (
                                <p className="form-error">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default ContactOns;
