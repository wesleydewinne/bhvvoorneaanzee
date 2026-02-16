import "./WorkshopPage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";

function StopDeBloedingRedEenLeven() {
    return (
        <div className="workshop">

            <HeaderSection
                mainTitle="Workshop Stop de Bloeding"
                subTitle="Levensreddend handelen bij ernstig bloedverlies (2–3 uur)"
            />

            <article className="workshop__container">

                {/* Intro + Programma */}
                <section className="workshop__layout">

                    <div className="workshop__intro">
                        <h2>Direct handelen bij levensbedreigend bloedverlies</h2>

                        <p>
                            Ernstig bloedverlies kan binnen enkele minuten fataal zijn.
                            <strong> Snel en doeltreffend ingrijpen is cruciaal</strong>
                            om een slachtoffer in leven te houden tot professionele hulp arriveert.
                        </p>

                        <p>
                            In deze praktijkgerichte workshop leren deelnemers
                            hoe zij <strong>levensbedreigende bloedingen herkennen</strong>
                            en effectief stoppen met de juiste technieken.
                            Praktijk staat centraal: oefenen met realistisch materiaal
                            geeft vertrouwen en handelingsbekwaamheid.
                        </p>

                        <p>
                            De training is geschikt voor BHV’ers en organisaties
                            waar risico op ernstig letsel aanwezig is,
                            zoals industrie, bouw, logistiek en beveiliging.
                        </p>
                    </div>

                    <aside className="workshop__program">
                        <h2>Programma (2–3 uur)</h2>
                        <table className="workshop__table">
                            <tbody>
                            <tr>
                                <td>Herkennen van ernstig bloedverlies</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Veilig benaderen slachtoffer</td>
                                <td>15 min</td>
                            </tr>
                            <tr>
                                <td>Drukverband aanleggen</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Correct gebruik tourniquet</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Wondtamponnade</td>
                                <td>25 min</td>
                            </tr>
                            <tr>
                                <td>Scenario-oefeningen</td>
                                <td>30 min</td>
                            </tr>
                            </tbody>
                        </table>
                    </aside>

                </section>

                {/* Drie inhoudsblokken */}
                <section className="workshop__three">

                    <section className="workshop__card">
                        <h2>Herkennen & Alarmeren</h2>
                        <ul>
                            <li>Levensbedreigend bloedverlies herkennen</li>
                            <li>112 correct inschakelen</li>
                            <li>Veiligheid voor hulpverlener waarborgen</li>
                            <li>Samenwerken binnen BHV-team</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Stoppen van de bloeding</h2>
                        <ul>
                            <li>Druk uitoefenen op de wond</li>
                            <li>Aanleggen van drukverband</li>
                            <li>Correct toepassen van tourniquet</li>
                            <li>Wondtamponnade bij diepe verwondingen</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Praktijk & Realisme</h2>
                        <ul>
                            <li>Oefenen met realistisch letsel</li>
                            <li>Besluitvorming onder tijdsdruk</li>
                            <li>Communicatie tijdens incident</li>
                            <li>Evaluatie en verbeterpunten</li>
                        </ul>
                    </section>

                </section>

                {/* Highlight */}
                <aside className="workshop__highlight">
                    <h2>Binnen enkele minuten beslissend</h2>
                    <p>
                        Ernstig bloedverlies kan snel leiden tot shock en overlijden.
                        Met de juiste kennis en vaardigheden kan iedereen
                        het verschil maken tussen leven en dood.
                    </p>
                </aside>

                {/* FAQ */}
                <section className="workshop__faq">
                    <h2 className="workshop__faq-title">Veelgestelde vragen</h2>

                    <div className="workshop__faq-cards">

                        <article className="workshop__faq-card">
                            <h3>Is deze workshop alleen voor BHV’ers?</h3>
                            <p>
                                Nee, de training is geschikt voor iedereen
                                die voorbereid wil zijn op ernstig letsel.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Wordt er met echte materialen geoefend?</h3>
                            <p>
                                Ja, deelnemers oefenen met realistisch
                                oefenmateriaal en tourniquets.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Is dit geschikt voor risicovolle werkomgevingen?</h3>
                            <p>
                                Zeker. Deze workshop is zeer waardevol
                                voor bouw, industrie en logistiek.
                            </p>
                        </article>

                    </div>
                </section>

                {/* CTA */}
                <footer className="workshop__cta">
                    <p>Wilt u voorbereid zijn op ernstig bloedverlies binnen uw organisatie?</p>
                    <a href="/contact" className="workshop__button">
                        Vraag informatie aan
                    </a>
                </footer>

            </article>

        </div>
    );
}

export default StopDeBloedingRedEenLeven;
