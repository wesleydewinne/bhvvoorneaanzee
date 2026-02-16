import "./WorkshopPage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";

function ReanimatieMetGebruikAedVolwassene() {
    return (
        <div className="workshop">

            <HeaderSection
                mainTitle="Workshop Reanimatie Volwassene"
                subTitle="Levensreddend handelen met AED (2 uur)"
            />

            <article className="workshop__container">

                {/* Intro + Programma */}
                <section className="workshop__layout">

                    <div className="workshop__intro">
                        <h2>Snel en doeltreffend handelen bij een hartstilstand</h2>

                        <p>
                            Een circulatiestilstand kan iedereen overkomen.
                            <strong> De eerste minuten zijn cruciaal</strong> voor de overlevingskans.
                            Door direct en correct te handelen kan ernstige hersenschade worden voorkomen.
                        </p>

                        <p>
                            In deze praktijkgerichte workshop leren deelnemers
                            hoe zij een hartstilstand herkennen en
                            <strong> effectief reanimeren volgens de geldende richtlijnen</strong>.
                            Ook het veilig en correct gebruiken van een AED staat centraal.
                        </p>

                        <p>
                            De training is geschikt voor BHV’ers,
                            medewerkers zonder BHV-rol en organisaties
                            die hun personeel willen voorbereiden op
                            levensreddend handelen.
                        </p>
                    </div>

                    <aside className="workshop__program">
                        <h2>Programma (2 uur)</h2>
                        <table className="workshop__table">
                            <tbody>
                            <tr>
                                <td>Herkennen van circulatiestilstand</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Alarmeren & 112-procedure</td>
                                <td>15 min</td>
                            </tr>
                            <tr>
                                <td>Reanimatie volgens richtlijnen</td>
                                <td>35 min</td>
                            </tr>
                            <tr>
                                <td>Gebruik van AED</td>
                                <td>25 min</td>
                            </tr>
                            <tr>
                                <td>Teamreanimatie & praktijkoefening</td>
                                <td>25 min</td>
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
                            <li>Bewustzijn controleren</li>
                            <li>Ademhaling beoordelen</li>
                            <li>112 correct inschakelen</li>
                            <li>Direct starten met reanimatie</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Reanimatievaardigheden</h2>
                        <ul>
                            <li>Juiste handpositie</li>
                            <li>Compressiediepte en tempo</li>
                            <li>Beademingstechniek</li>
                            <li>Continuïteit van compressies</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Gebruik van AED</h2>
                        <ul>
                            <li>Veilig aansluiten van elektroden</li>
                            <li>Volgen van gesproken instructies</li>
                            <li>Veilig schokmoment</li>
                            <li>Samenwerking binnen teamreanimatie</li>
                        </ul>
                    </section>

                </section>

                {/* Highlight */}
                <aside className="workshop__highlight">
                    <h2>Iedere seconde telt</h2>
                    <p>
                        Door snel te starten met reanimatie en het gebruik van een AED
                        kan de overlevingskans aanzienlijk worden vergroot.
                        Goede voorbereiding maakt het verschil.
                    </p>
                </aside>

                {/* FAQ */}
                <section className="workshop__faq">
                    <h2 className="workshop__faq-title">Veelgestelde vragen</h2>

                    <div className="workshop__faq-cards">

                        <article className="workshop__faq-card">
                            <h3>Moet ik medische kennis hebben?</h3>
                            <p>
                                Nee, de workshop is geschikt voor iedereen.
                                De instructie is praktisch en duidelijk opgebouwd.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Wordt er geoefend op poppen?</h3>
                            <p>
                                Ja, deelnemers oefenen intensief op reanimatiepoppen
                                en met een trainings-AED.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Is deze workshop geschikt als opfriscursus?</h3>
                            <p>
                                Zeker. De training is ideaal als herhaling
                                of als aanvulling op BHV-opleiding.
                            </p>
                        </article>

                    </div>
                </section>

                {/* CTA */}
                <footer className="workshop__cta">
                    <p>Wilt u uw medewerkers voorbereiden op levensreddend handelen?</p>
                    <a href="/contact" className="workshop__button">
                        Vraag informatie aan
                    </a>
                </footer>

            </article>

        </div>
    );
}

export default ReanimatieMetGebruikAedVolwassene;
