import "./Check.css";
import { Link } from "react-router-dom";

export default function VeiligheidscheckBedankt() {
    return (
        <main className="bedankt-page">
            <section className="bedankt-hero">
                <div className="bedankt-card">
                    <span className="bedankt-pill">
    Veiligheidscheck verzonden
</span>

                    <h1>
                        Goed dat je dit hebt gecheckt
                    </h1>

                    <p className="bedankt-subtitle">
                        Je veiligheidscheck is succesvol verzonden. <br />
                        Binnen enkele minuten ontvang je een e-mail met praktische inzichten:
                    </p>

                    <ul className="bedankt-list">
                        <li>✔ Een heldere samenvatting van je huidige situatie</li>
                        <li>✔ Het gratis praktische e-book met concrete verbeterstappen</li>
                        <li>✔ Inzicht in risico’s en wat je nu al kunt verbeteren</li>
                    </ul>

                    <p className="bedankt-note">
                        Heb je aangegeven dat je hier snel iets mee wilt doen?
                        Dan nemen we mogelijk contact met je op voor een korte,
                        vrijblijvende toelichting.
                    </p>


                    <div className="bedankt-links">
                        <a href="/" className="bedankt-link">
                            ← Terug naar de website
                        </a>

                        <a href="/contact" className="bedankt-link primary">
                            Direct contact opnemen
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
