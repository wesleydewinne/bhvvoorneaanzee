import { Link } from "react-router-dom";
import "../styles/Offerte.css";

export default function QuoteAcceptancePage() {
  return (
    <main className="quote-public-page">
      <section className="quote-public-card">
        <p className="quote-eyebrow">Digitaal akkoord</p>
        <h1>Offerte bekijken</h1>
        <p>
          De beveiligde digitale akkoordfunctie wordt gekoppeld zodra een
          persoonlijke offertelink is verstrekt. Heb je vragen over een
          ontvangen offerte, neem dan contact met ons op.
        </p>
        <Link className="quote-primary-button" to="/contact">
          Contact opnemen
        </Link>
      </section>
    </main>
  );
}
