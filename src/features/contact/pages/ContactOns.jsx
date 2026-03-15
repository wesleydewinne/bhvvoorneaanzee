// src/features/contact/pages/ContactOns.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import contactService from "@/features/contact/services/contactService.js";
import contactBg from "@/assets/image/common/backgrounds/contact-bg.jpg";
import "../styles/ContactOns.css";

const SUBMIT_COOLDOWN_MS = 30000;
const REDIRECT_DELAY_MS = 2000;

function ContactOns() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        naam: "",
        email: "",
        bericht: "",
        company: ""
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [lastSubmit, setLastSubmit] = useState(null);

    const sanitizedFormData = useMemo(() => ({
        naam: formData.naam.trim(),
        email: formData.email.trim(),
        bericht: formData.bericht.trim(),
        company: formData.company.trim()
    }), [formData]);

    const validateForm = () => {
        const { naam, email, bericht } = sanitizedFormData;

        if (!naam) return "Naam is verplicht.";
        if (!email) return "E-mailadres is verplicht.";
        if (!bericht) return "Bericht is verplicht.";

        if (naam.length > 100) return "Naam mag maximaal 100 tekens bevatten.";
        if (email.length > 150) return "E-mailadres mag maximaal 150 tekens bevatten.";
        if (bericht.length > 3000) return "Bericht mag maximaal 3000 tekens bevatten.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Ongeldig e-mailadres.";

        return null;
    };

    const validationError = validateForm();

    const getRemainingCooldownSeconds = () => {
        if (!lastSubmit) return 0;

        const elapsed = Date.now() - lastSubmit;
        const remaining = Math.ceil((SUBMIT_COOLDOWN_MS - elapsed) / 1000);

        return remaining > 0 ? remaining : 0;
    };

    const isSubmitDisabled = loading || Boolean(validationError);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (error) setError("");
        if (successMessage) setSuccessMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (sanitizedFormData.company) {
            console.warn("Honeypot geactiveerd.");
            return;
        }

        const remainingSeconds = getRemainingCooldownSeconds();
        if (remainingSeconds > 0) {
            setError(`Je kunt over ${remainingSeconds} seconden opnieuw een bericht versturen.`);
            return;
        }

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError("");
        setSuccessMessage("Bericht wordt verstuurd...");

        try {
            await contactService.sendMessage({
                naam: sanitizedFormData.naam,
                email: sanitizedFormData.email,
                bericht: sanitizedFormData.bericht
            });

            setLastSubmit(Date.now());

            setFormData({
                naam: "",
                email: "",
                bericht: "",
                company: ""
            });

            setSuccessMessage("Bericht is succesvol verzonden. Je wordt doorgestuurd...");

            setTimeout(() => {
                navigate("/contact/bedankt");
            }, REDIRECT_DELAY_MS);
        } catch (err) {
            console.error("Fout bij versturen contactbericht:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "";

            setSuccessMessage("");
            setError(
                backendMessage ||
                "Helaas is het versturen mislukt. Stuur een e-mail naar klantenservice@bhvvoorneaanzee.nl"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact">
            <div
                className="contact-background"
                style={{ backgroundImage: `url(${contactBg})` }}
            ></div>

            <div className="contact-overlay"></div>

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
                        Neem gerust contact met ons op.
                        <br />
                        Wij denken graag met je mee.
                    </p>
                </div>
            </section>

            <section className="contact-content">
                <div className="contact-grid">
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

                    <div className="contact-formulier">
                        <h2>Stuur een bericht</h2>

                        <form onSubmit={handleSubmit} noValidate>
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
                                    maxLength={100}
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
                                    maxLength={150}
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
                                disabled={isSubmitDisabled}
                            >
                                {loading ? "Versturen..." : "Verstuur bericht"}
                            </button>

                            {successMessage && (
                                <p className="form-success">
                                    {successMessage}
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