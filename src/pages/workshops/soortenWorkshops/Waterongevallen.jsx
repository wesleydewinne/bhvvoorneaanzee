import "./WorkshopPage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";

function Waterongevallen() {
    return (
        <div className="workshop">

            <HeaderSection
                mainTitle="Workshop Waterongevallen"
                subTitle="Veilig handelen bij incidenten op en rond water (2–3 uur)"
            />

            <article className="workshop__container">

                {/* Intro + Programma */}
                <section className="workshop__layout">

                    <div className="workshop__intro">
                        <h2>Veilig optreden bij incidenten rond water</h2>

                        <p>
                            Incidenten op of rond water vragen om
                            <strong> snel én doordacht handelen</strong>.
                            Paniek, onderkoeling en beperkte zichtbaarheid
                            maken reddingsacties complex en risicovol.
                        </p>

                        <p>
                            In deze praktijkgerichte workshop leren deelnemers
                            hoe zij <strong>veilig kunnen handelen zonder zichzelf
                            in gevaar te brengen</strong>.
                            De veiligheid van de hulpverlener staat altijd voorop.
                        </p>

                        <p>
                            Door gerichte training ontstaat inzicht in risico’s,
                            juiste besluitvorming en het effectief inzetten
                            van reddingsmiddelen.
                        </p>
                    </div>

                    <aside className="workshop__program">
                        <h2>Programma (2–3 uur)</h2>
                        <table className="workshop__table">
                            <tbody>
                            <tr>
                                <td>Risicoanalyse bij waterincidenten</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Veilig benaderen slachtoffer</td>
                                <td>25 min</td>
                            </tr>
                            <tr>
                                <td>Gebruik reddingsmiddelen</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Onderkoeling & verdrinking</td>
                                <td>25 min</td>
                            </tr>
                            <tr>
                                <td>Scenario-oefeningen</td>
                                <td>40 min</td>
                            </tr>
                            <tr>
                                <td>Evaluatie & leerpunten</td>
                                <td>20 min</td>
                            </tr>
                            </tbody>
                        </table>
                    </aside>

                </section>

                {/* Drie inhoudsblokken */}
                <section className="workshop__three">

                    <section className="workshop__card">
                        <h2>Risico’s rond water</h2>
                        <ul>
                            <li>Paniekreacties bij slachtoffers</li>
                            <li>Beperkte grip en gladde ondergrond</li>
                            <li>Stroming en diepte</li>
                            <li>Risico op meerdere slachtoffers</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Reddingsmiddelen</h2>
                        <ul>
                            <li>Gebruik van werplijn</li>
                            <li>Inzetten van reddingsboei</li>
                            <li>Gebruik van hulpmiddelen op locatie</li>
                            <li>Wat juist niet doen bij verdrinking</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Praktijk & samenwerking</h2>
                        <ul>
                            <li>Veilig handelen zonder zelf te water te gaan</li>
                            <li>Alarmeren van hulpdiensten</li>
                            <li>Communicatie tijdens incident</li>
                            <li>Herkennen van onderkoeling (hypothermie)</li>
                        </ul>
                    </section>

                </section>

                {/* Highlight */}
                <aside className="workshop__highlight">
                    <h2>Eerst je eigen veiligheid</h2>
                    <p>
                        Onjuist handelen bij een waterongeval kan leiden tot meerdere slachtoffers.
                        Door vooraf te trainen weet u wanneer en hoe u veilig kunt ingrijpen.
                    </p>
                </aside>

                {/* FAQ */}
                <section className="workshop__faq">
                    <h2 className="workshop__faq-title">Veelgestelde vragen</h2>

                    <div className="workshop__faq-cards">

                        <article className="workshop__faq-card">
                            <h3>Moet ik kunnen zwemmen?</h3>
                            <p>
                                Nee. De workshop richt zich op veilig handelen
                                zonder onnodige risico’s te nemen.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Wordt er geoefend bij water?</h3>
                            <p>
                                Indien mogelijk kan praktijk worden uitgevoerd
                                nabij een waterlocatie.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Is dit geschikt voor bedrijven aan het water?</h3>
                            <p>
                                Ja, de training is zeer waardevol voor havens,
                                bouwprojecten en recreatiegebieden.
                            </p>
                        </article>

                    </div>
                </section>

                {/* CTA */}
                <footer className="workshop__cta">
                    <p>Wilt u voorbereid zijn op incidenten op of rond water?</p>
                    <a href="/contact" className="workshop__button">
                        Vraag informatie aan
                    </a>
                </footer>

            </article>

        </div>
    );
}

export default Waterongevallen;
