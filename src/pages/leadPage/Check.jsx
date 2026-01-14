import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Check.css";
import SafetyWizard from "./SafetyWizard";

import bgImage from "@/assets/image/headerPicture/veiligheidscheck-bg.jpg";
import ongevalBg from "@/assets/image/headerPicture/aanrijding-bg.jpg";

export default function Check() {
    const [wizardActive, setWizardActive] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const navigate = useNavigate();

    async function handleWizardSubmit(data) {
        setSubmitError(null);

        try {
            const response = await fetch("/api/veiligheidscheck", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Backend gaf geen geldige response");
            }

            // ✅ Alleen hier mag je door
            navigate("/veiligheidscheck-bedankt");

        } catch (error) {
            console.error("❌ Verzenden mislukt:", error);
            setSubmitError(
                "Het verzenden is mislukt. Controleer je gegevens en probeer het opnieuw."
            );
        }
    }

    return (
        <div
            className="check-page"
            style={
                !wizardActive
                    ? {
                        backgroundImage: `
                            linear-gradient(
                                rgba(0, 0, 0, 0.55),
                                rgba(0, 0, 0, 0.75)
                            ),
                            url(${bgImage})
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundAttachment: "fixed"
                    }
                    : {}
            }
        >
            {/* =========================
                LANDING MODUS
            ========================= */}
            {!wizardActive && (
                <main className="landing">
                    <header className="check-header">
                        <span className="tagline">
                            Praktische veiligheid • Op locatie • Zonder poespas
                        </span>
                    </header>

                    {/* HERKENNING + WAARDE */}
                    <section className="info info--intro">
                        <div className="info-grid">
                            <div className="info-card">
                                <h3>Herken je één van deze situaties?</h3>
                                <ul>
                                    <li>BHV’ers zijn ooit opgeleid, maar niet meer actueel</li>
                                    <li>Ontruimingsplan bestaat, maar wordt nooit geoefend</li>
                                    <li>EHBO is geregeld, maar niemand weet wie wat doet</li>
                                    <li>De rol van ploegleider is onduidelijk bij incidenten</li>
                                </ul>
                            </div>

                            <div className="info-card">
                                <h3>Wat levert deze veiligheidscheck je op?</h3>
                                <ul>
                                    <li>Inzicht of BHV, EHBO en ontruiming echt op orde zijn</li>
                                    <li>Duidelijkheid over rollen zoals ploegleider</li>
                                    <li>Signalering van veelvoorkomende risico’s</li>
                                    <li>Gratis e-book met praktische verbeterstappen</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* HERO + CTA */}
                    <section className="hero">
                        <div className="hero-content">
                            <span className="pill">
                                Gratis veiligheidscheck + praktisch e-book
                            </span>

                            <h1>
                                Weet jij zeker dat jouw BHV, EHBO en ontruiming <br />
                                <span className="highlight-veiligheid">
                                    vandaag nog goed geregeld zijn?
                                </span>
                            </h1>

                            <p className="subtitle">
                                Veel organisaties denken dat alles op orde is — tot er daadwerkelijk iets gebeurt.
                                Met deze <strong>gratis veiligheidscheck</strong> krijg je binnen{" "}
                                <strong>2 minuten</strong> inzicht in risico’s,
                                verantwoordelijkheden en verbeterpunten.
                            </p>

                            <p className="authority">
                                Gebaseerd op praktijkervaring met BHV-, EHBO- en
                                ontruimingstrajecten bij organisaties in{" "}
                                <strong>Voorne aan Zee en omgeving</strong>.
                            </p>

                            <div className="cta-group">
                                <button
                                    className="btn primary"
                                    onClick={() => setWizardActive(true)}
                                >
                                    Start de veiligheidscheck (gratis, 2 minuten) →
                                </button>
                            </div>

                            <ul className="trust">
                                <li>✔ Eén vraag per scherm</li>
                                <li>✔ Geen verkoopdruk</li>
                                <li>✔ Direct bevestiging per mail</li>
                            </ul>
                        </div>
                    </section>
                </main>
            )}

            {/* =========================
                CHECK / WIZARD MODUS
            ========================= */}
            {wizardActive && (
                <section
                    className="wizard-mode"
                    style={{
                        backgroundImage: `
                            linear-gradient(
                                rgba(0, 0, 0, 0.55),
                                rgba(0, 0, 0, 0.55)
                            ),
                            url(${ongevalBg})
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    <SafetyWizard onSubmit={handleWizardSubmit} />

                    {submitError && (
                        <p className="wizard-error">
                            {submitError}
                        </p>
                    )}
                </section>
            )}
        </div>
    );
}
