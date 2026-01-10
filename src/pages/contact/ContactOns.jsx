import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";
import "./ContactOns.css";

function ContactOns() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        naam: "",
        email: "",
        bericht: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post("/contact", formData);
            setSuccess(true);
            setFormData({ naam: "", email: "", bericht: "" });

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
            <div className="contact-background"></div>
            <div className="contact-overlay"></div>

            {/* HERO */}
            <section className="contact-hero">
                <div className="contact-hero-inner">
                    <h1>Contact</h1>
                    <p>
                        Heb je vragen over BHV, EHBO, ontruimingsoefeningen of veiligheidstrainingen?
                        Of wil je een <a href="/offerte" className="contact-offerte-link">offerte op maat</a> voor jouw organisatie?
                        Neem gerust contact met ons op — wij denken graag met je mee.
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
                            {/*<li>📞 </li>*/}
                        </ul>

                        <div className="contact-gebied">
                            <h3>Werkgebied</h3>

                            <p>
                                BHV Voorne aan Zee verzorgt BHV- en EHBO-trainingen, ontruimingsoefeningen en
                                veiligheidstrainingen in Voorne aan Zee en omliggende regio’s zoals
                                Rotterdam-Rijnmond, Haaglanden, Zeeland en Midden- en West-Brabant.
                            </p>

                            <p>
                                Trainingen vinden plaats op locatie bij de opdrachtgever of in overleg op een externe locatie.
                            </p>
                        </div>
                    </aside>

                    {/* FORM */}
                    <div className="contact-formulier">
                        <h2>Stuur een bericht</h2>

                        <form onSubmit={handleSubmit} noValidate>

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
                                    required
                                />
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
