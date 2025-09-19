import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") || "contact";

    // Titel per type bepalen
    const titles = {
        offerte: "Offerte aanvragen",
        advies: "Adviesgesprek aanvragen",
        contact: "Contactformulier",
    };

    const [formData, setFormData] = useState({
        naam: "",
        email: "",
        bedrijf: "",
        aantalDeelnemers: "",
        bericht: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let toEmail = "info@bhvvoorneaanzee.nl";
        if (type === "offerte") toEmail = "offerte@bhvvoorneaanzee.nl";
        if (type === "advies") toEmail = "advies@bhvvoorneaanzee.nl";

        console.log("Formulier verzonden:", formData, "naar:", toEmail);
        alert(`Bedankt! Je ${titles[type]} is verzonden naar ${toEmail}.`);
    };

    return (
        <div className="form-wrapper">
            {/* Dynamische titel */}
            <h1 className="form-title">{titles[type]}</h1>

            <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                    Naam *
                    <input
                        type="text"
                        name="naam"
                        value={formData.naam}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    E-mail *
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                {type === "offerte" && (
                    <>
                        <label>
                            Bedrijfsnaam
                            <input
                                type="text"
                                name="bedrijf"
                                value={formData.bedrijf}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Aantal deelnemers
                            <input
                                type="number"
                                name="aantalDeelnemers"
                                value={formData.aantalDeelnemers}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                )}

                <label>
                    Bericht
                    <textarea
                        name="bericht"
                        rows="4"
                        value={formData.bericht}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit" className="cta-button">
                    Versturen
                </button>
            </form>
        </div>
    );
}
