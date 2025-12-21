import './ContactOns.css';

function ContactOns() {
    return (
        <div className="contact">

            {/* HERO / INTRO */}
            <section className="contact-hero">
                <div className="contact-hero-inner">
                    <h1>Contact</h1>
                    <p>
                        Vragen over BHV, EHBO of ontruimingsoefeningen?
                        Of wil je een offerte op maat?
                        Neem gerust contact op — we denken graag met je mee.
                    </p>
                </div>

                {/* decoratieve shapes */}
                <span className="shape shape-1"></span>
                <span className="shape shape-2"></span>
            </section>

            {/* CONTENT */}
            <section className="contact-content">
                <div className="contact-grid">

                    {/* INFO */}
                    <aside className="contact-info">
                        <h2>Direct contact</h2>

                        <ul className="contact-list">
                            <li>
                                <span className="icon">✉️</span>
                                <span>info@bhvvoorneaanzee.nl</span>
                            </li>
                            <li>
                                <span className="icon">📞</span>
                                <span>[telefoonnummer]</span>
                            </li>
                        </ul>

                        <div className="contact-gebied">
                            <h3>Werkgebied</h3>
                            <p>
                                Voorne aan Zee, Rotterdam en omliggende regio’s.
                                Trainingen vinden voornamelijk plaats op locatie.
                            </p>
                        </div>
                    </aside>

                    {/* FORM */}
                    <div className="contact-formulier">
                        <h2>Stuur een bericht</h2>

                        <form>
                            <div className="form-row">
                                <label htmlFor="naam">Naam</label>
                                <input type="text" id="naam" name="naam" required />
                            </div>

                            <div className="form-row">
                                <label htmlFor="email">E-mailadres</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className="form-row">
                                <label htmlFor="bericht">Bericht</label>
                                <textarea id="bericht" name="bericht" rows="5" required />
                            </div>

                            <button type="submit" className="cta-button">
                                Verstuur bericht
                            </button>
                        </form>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default ContactOns;
