import "./CTAButton.css";
import { Link } from "react-router-dom";

export default function CTASection() {
    return (
        <div className="cta-grid">
            {/* Kolom 1 */}
            <div className="cta-item">
                <h3 className="cta-heading">Zoek je cursus</h3>
                <p>
                    Of je nu start als bedrijfshulpverlener, je kennis wilt bijspijkeren of doorgroeien met een specialistische training:
                    wij leren je met vertrouwen en zekerheid te handelen bij noodsituaties.
                </p>
                <Link to="/aanbod" className="cta-button">
                    Bekijk ons aanbod
                </Link>
            </div>

            {/* Kolom 2 */}
            <div className="cta-item">
                <h3 className="cta-heading">Offerte</h3>
                <p>
                    Incompany trainingen zorgen ervoor dat jouw team samen leert en direct oefent in de eigen werkomgeving.
                    Al vanaf 4 deelnemers regelen wij dit op locatie, en je profiteert van een aantrekkelijk tarief per persoon.
                </p>
                <Link to="/offerte" className="cta-button">
                    Offerte aanvragen
                </Link>
            </div>

            {/* Kolom 3 */}
            <div className="cta-item">
                <h3 className="cta-heading">Advies</h3>
                <p>
                    BHV Voorne aan Zee is jouw allround partner in bedrijfsveiligheid.
                    Voor elke bedrijfsspecifieke veiligheidsvraag hebben wij een passende incompany training of oplossing.
                    Plan een afspraak met een van onze trainers voor persoonlijk advies.
                </p>
                <Link to="/formulier?type=advies" className="cta-button">
                    Adviesgesprek aanvragen
                </Link>
            </div>
        </div>
    );
}
