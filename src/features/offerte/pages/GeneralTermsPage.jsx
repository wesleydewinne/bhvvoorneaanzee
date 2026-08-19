import { Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Offerte.css";

export default function GeneralTermsPage() {
  return (
    <main className="quote-public-page">
      <article className="quote-public-card quote-terms-page">
        <header>
          <div className="quote-public-card__icon" aria-hidden="true">
            <FileText />
          </div>
          <p className="quote-eyebrow">W &amp; S Adviesgroep B.V.</p>
          <h1>Algemene voorwaarden</h1>
          <p>Handelend onder de naam BHV Voorne aan Zee</p>
        </header>

        <section className="quote-acceptance-section">
          <h2>Document in voorbereiding</h2>
          <p>
            De definitieve algemene voorwaarden worden momenteel voorbereid.
            Zodra de tekst is vastgesteld, wordt op deze vaste pagina altijd de
            actuele versie gepubliceerd.
          </p>
          <p>
            Heeft u ondertussen vragen over de voorwaarden die bij een offerte
            horen? Neem dan vóór het geven van akkoord contact met ons op.
          </p>
        </section>

        <section id="download" className="quote-acceptance-section quote-terms-download">
          <Download aria-hidden="true" />
          <div>
            <h2>PDF downloaden</h2>
            <p>
              De downloadbare PDF wordt beschikbaar zodra de definitieve versie
              van de algemene voorwaarden is gepubliceerd.
            </p>
          </div>
          <button className="quote-secondary-button" type="button" disabled>
            PDF binnenkort beschikbaar
          </button>
        </section>

        <Link className="quote-primary-button" to="/contact">
          Contact opnemen
        </Link>
      </article>
    </main>
  );
}
