import "./WorkshopPage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";

function BedienaarBrandmeldcentrale() {
    return (
        <div className="workshop">

            <HeaderSection
                mainTitle="Workshop Bedienaar Brandmeldcentrale"
                subTitle="Professioneel handelen bij brandmeldingen en storingen (2 uur)"
            />

            <article className="workshop__container">

                {/* Intro + Programma */}
                <section className="workshop__layout">

                    <div className="workshop__intro">
                        <h2>Correct handelen bij een brandmelding</h2>

                        <p>
                            Een brandmelding vraagt om directe en juiste actie.
                            <strong> Foutief handelen kan leiden tot onnodige ontruimingen
                                of juist gevaarlijke vertraging</strong>.
                        </p>

                        <p>
                            In deze praktijkgerichte workshop leren deelnemers
                            hoe een brandmeldcentrale (BMC) werkt en
                            hoe zij <strong>gestructureerd en professioneel</strong>
                            handelen bij brandmeldingen en storingen.
                        </p>

                        <p>
                            De training is gericht op medewerkers die verantwoordelijk zijn
                            voor de bediening van de BMC binnen hun organisatie.
                            Het doel is dat iedere deelnemer begrijpt
                            wanneer een melding reëel is, hoe te resetten
                            en wanneer opschaling noodzakelijk is.
                        </p>
                    </div>

                    <aside className="workshop__program">
                        <h2>Programma (2 uur)</h2>
                        <table className="workshop__table">
                            <tbody>
                            <tr>
                                <td>Opbouw en werking BMC</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Brandmelding vs. storingsmelding</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Resetprocedure en controle</td>
                                <td>25 min</td>
                            </tr>
                            <tr>
                                <td>Doormelding naar PAC/RAC</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Communicatie met BHV & hulpdiensten</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Praktijkcasussen</td>
                                <td>15 min</td>
                            </tr>
                            </tbody>
                        </table>
                    </aside>

                </section>

                {/* Drie inhoudsblokken */}
                <section className="workshop__three">

                    <section className="workshop__card">
                        <h2>Technische kennis</h2>
                        <ul>
                            <li>Opbouw van een brandmeldinstallatie</li>
                            <li>Zones en detectoren herkennen</li>
                            <li>Doormeldingen begrijpen</li>
                            <li>Storingen interpreteren</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Handelwijze bij melding</h2>
                        <ul>
                            <li>Stappenplan bij brandmelding</li>
                            <li>Controle ter plaatse organiseren</li>
                            <li>Correct resetten van de centrale</li>
                            <li>Opschalen of ontruimen indien nodig</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Communicatie & verantwoordelijkheid</h2>
                        <ul>
                            <li>Afstemming met BHV</li>
                            <li>Contact met meldkamer</li>
                            <li>Registratie en rapportage</li>
                            <li>Voorkomen van ongewenste alarmen</li>
                        </ul>
                    </section>

                </section>

                {/* Highlight */}
                <aside className="workshop__highlight">
                    <h2>Voorkom onnodige ontruimingen</h2>
                    <p>
                        Goed getrainde bedienaars zorgen voor rust,
                        overzicht en correcte besluitvorming.
                        Dit voorkomt onnodige kosten en verhoogt de veiligheid binnen uw organisatie.
                    </p>
                </aside>

                {/* FAQ */}
                <section className="workshop__faq">
                    <h2 className="workshop__faq-title">Veelgestelde vragen</h2>

                    <div className="workshop__faq-cards">

                        <article className="workshop__faq-card">
                            <h3>Moet ik technisch onderlegd zijn?</h3>
                            <p>
                                Nee, de workshop is praktisch ingericht
                                en geschikt voor iedere medewerker
                                die verantwoordelijk is voor de BMC.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Is dit verplicht volgens wetgeving?</h3>
                            <p>
                                In veel organisaties wordt een aangewezen bedienaar
                                verwacht. Scholing vergroot veiligheid en aansprakelijkheidsbewustzijn.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Kan dit op onze eigen installatie?</h3>
                            <p>
                                Ja, de workshop kan worden afgestemd
                                op het type brandmeldcentrale binnen uw organisatie.
                            </p>
                        </article>

                    </div>
                </section>

                {/* CTA */}
                <footer className="workshop__cta">
                    <p>Wilt u zekerheid bij iedere brandmelding binnen uw organisatie?</p>
                    <a href="/contact" className="workshop__button">
                        Vraag informatie aan
                    </a>
                </footer>

            </article>

        </div>
    );
}

export default BedienaarBrandmeldcentrale;
