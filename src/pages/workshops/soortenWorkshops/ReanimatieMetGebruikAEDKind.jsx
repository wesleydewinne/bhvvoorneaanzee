import "./WorkshopPage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";

function ReanimatieMetGebruikAedKind() {
    return (
        <div className="workshop">

            <HeaderSection
                mainTitle="Workshop Reanimatie Kind & Baby"
                subTitle="Levensreddend handelen bij kinderen en baby’s (2–3 uur)"
            />

            <article className="workshop__container">

                {/* Intro + Programma */}
                <section className="workshop__layout">

                    <div className="workshop__intro">
                        <h2>Snel handelen bij een noodsituatie met een kind</h2>

                        <p>
                            Een circulatiestilstand of verstikking bij een kind of baby
                            vraagt om <strong>direct en correct handelen</strong>.
                            De aanpak verschilt wezenlijk van reanimatie bij volwassenen.
                        </p>

                        <p>
                            In deze praktijkgerichte workshop leren deelnemers
                            hoe zij een noodsituatie herkennen en
                            <strong> veilig en effectief reanimeren volgens de richtlijnen</strong>.
                            Daarnaast wordt uitgebreid geoefend op handelen bij verslikking.
                        </p>

                        <p>
                            Door intensief te oefenen op realistische oefenpoppen
                            ontwikkelen deelnemers het vertrouwen en de vaardigheden
                            die nodig zijn om in een echte situatie adequaat op te treden.
                        </p>
                    </div>

                    <aside className="workshop__program">
                        <h2>Programma (2–3 uur)</h2>
                        <table className="workshop__table">
                            <tbody>
                            <tr>
                                <td>Herkennen van noodsituaties</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Alarmeren & 112-procedure</td>
                                <td>15 min</td>
                            </tr>
                            <tr>
                                <td>Reanimatie bij kinderen</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Reanimatie bij baby’s</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Gebruik AED bij kinderen</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Handelen bij verslikking</td>
                                <td>25 min</td>
                            </tr>
                            <tr>
                                <td>Praktijkoefeningen & evaluatie</td>
                                <td>20 min</td>
                            </tr>
                            </tbody>
                        </table>
                    </aside>

                </section>

                {/* Drie inhoudsblokken */}
                <section className="workshop__three">

                    <section className="workshop__card">
                        <h2>Reanimatie bij kinderen</h2>
                        <ul>
                            <li>Bewustzijn en ademhaling controleren</li>
                            <li>Correcte borstcompressies</li>
                            <li>Beademingstechniek</li>
                            <li>Teamreanimatie</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Reanimatie bij baby’s</h2>
                        <ul>
                            <li>Specifieke handpositie</li>
                            <li>Aangepaste compressiediepte</li>
                            <li>Beademing bij zuigelingen</li>
                            <li>Veilig gebruik van AED</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Verslikking & verstikking</h2>
                        <ul>
                            <li>Herkennen van verstikking</li>
                            <li>Rugslagen bij baby’s</li>
                            <li>Buikstoten bij kinderen</li>
                            <li>Overgang naar reanimatie indien nodig</li>
                        </ul>
                    </section>

                </section>

                {/* Highlight */}
                <aside className="workshop__highlight">
                    <h2>Kinderen vragen om een andere aanpak</h2>
                    <p>
                        De techniek en aanpak verschillen van volwassen reanimatie.
                        Door gerichte training ontstaat zekerheid en rust
                        in een stressvolle situatie.
                    </p>
                </aside>

                {/* FAQ */}
                <section className="workshop__faq">
                    <h2 className="workshop__faq-title">Veelgestelde vragen</h2>

                    <div className="workshop__faq-cards">

                        <article className="workshop__faq-card">
                            <h3>Is deze training geschikt voor ouders?</h3>
                            <p>
                                Ja, de workshop is ideaal voor ouders,
                                gastouders en iedereen die met kinderen werkt.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Wordt er veel geoefend?</h3>
                            <p>
                                Ja, praktijk staat centraal.
                                Deelnemers oefenen intensief op kind- en babypoppen.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Kan deze workshop op locatie worden gegeven?</h3>
                            <p>
                                Ja, de training wordt incompany of op locatie verzorgd
                                in regio Rotterdam-Rijnmond, Haaglanden en Zeeland.
                            </p>
                        </article>

                    </div>
                </section>

                {/* CTA */}
                <footer className="workshop__cta">
                    <p>Wilt u voorbereid zijn op noodsituaties met kinderen?</p>
                    <a href="/contact" className="workshop__button">
                        Vraag informatie aan
                    </a>
                </footer>

            </article>

        </div>
    );
}

export default ReanimatieMetGebruikAedKind;
