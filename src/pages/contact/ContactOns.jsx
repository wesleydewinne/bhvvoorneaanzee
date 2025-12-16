import './Contact.css';

function Contact() {
    return (
        <div className="contact">
            <section className="contact-intro">
                <h1>Contact</h1>
                <p>
                    Heb je vragen over BHV- of EHBO-trainingen, wil je een offerte
                    aanvragen of sparren over veiligheid binnen jouw organisatie?
                    Neem gerust contact op.
                </p>
            </section>

            <section className="contact-direct">
                <h2>Direct contact</h2>
                <ul>
                    <li>
                        <strong>E-mail:</strong>{' '}
                        <a href="mailto:info@bhvvoorneaanzee.nl">
                            info@bhvvoorneaanzee.nl
                        </a>
                    </li>
                    <li>
                        <strong>Telefoon:</strong> [telefoonnummer]
                    </li>
                </ul>
            </section>

            <section className="contact-formulier">
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
            </section>

            <section className="contact-bedrijf">
                <h2>Bedrijfsgegevens</h2>
                <p>
                    <strong>BHV Voorne aan Zee</strong><br />
                    Vestigingsplaats: [plaats]<br />
                    KvK: [kvk-nummer]<br />
                    BTW: [btw-nummer]<br />
                    E-mail: info@bhvvoorneaanzee.nl
                </p>
            </section>

            <section className="contact-regio">
                <h2>Werkgebied</h2>
                <p>
                    Wij zijn actief in Voorne aan Zee, Rotterdam en omliggende regio’s.
                    Trainingen vinden voornamelijk plaats op locatie.
                </p>
            </section>
        </div>
    );
}

export default Contact;
