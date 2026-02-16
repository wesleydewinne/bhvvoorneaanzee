import "./WorkshopPage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";

function KinderEhboHuiskamertraining() {
    return (
        <div className="workshop">

            <HeaderSection
                mainTitle="Kinder-EHBO Huiskamertraining"
                subTitle="Zeker handelen bij noodsituaties met kinderen (2,5–3 uur)"
            />

            <article className="workshop__container">

                {/* Intro + Programma */}
                <section className="workshop__layout">

                    <div className="workshop__intro">
                        <h2>Rust en zekerheid bij noodsituaties met kinderen</h2>

                        <p>
                            Wat doet u als een kind zich verslikt? Of bij een val,
                            brandwond of koortsstuip? In noodsituaties met kinderen
                            telt elke seconde — maar vooral <strong>rust en juiste kennis</strong>.
                        </p>

                        <p>
                            Tijdens deze praktische huiskamertraining leren ouders
                            en verzorgers hoe zij <strong>zelfverzekerd en effectief</strong>
                            kunnen handelen bij veelvoorkomende kinderongevallen.
                        </p>

                        <p>
                            In een kleine, vertrouwde setting is er ruimte voor
                            persoonlijke vragen, eigen situaties en intensieve
                            praktijkoefeningen.
                        </p>
                    </div>

                    <aside className="workshop__program">
                        <h2>Programma (2,5–3 uur)</h2>
                        <table className="workshop__table">
                            <tbody>
                            <tr>
                                <td>Introductie & basis eerste hulp</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Verslikking baby & kind</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Reanimatie baby & kind</td>
                                <td>40 min</td>
                            </tr>
                            <tr>
                                <td>Veelvoorkomende kinderongevallen</td>
                                <td>35 min</td>
                            </tr>
                            <tr>
                                <td>Scenario-oefeningen</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Vragen & afronding</td>
                                <td>15 min</td>
                            </tr>
                            </tbody>
                        </table>
                    </aside>

                </section>

                {/* Drie inhoudsblokken */}
                <section className="workshop__three">

                    <section className="workshop__card">
                        <h2>Levensreddend handelen</h2>
                        <ul>
                            <li>Verslikking bij baby’s en kinderen</li>
                            <li>Reanimatie volgens richtlijnen</li>
                            <li>Bewusteloosheid herkennen</li>
                            <li>Wanneer direct 112 bellen</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Veelvoorkomende ongevallen</h2>
                        <ul>
                            <li>Brandwonden behandelen</li>
                            <li>Vallen en hoofdletsel beoordelen</li>
                            <li>Koortsstuipen herkennen</li>
                            <li>Allergische reacties</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Praktische vaardigheden</h2>
                        <ul>
                            <li>Oefenen op kinder- en babypoppen</li>
                            <li>Rustig en gestructureerd handelen</li>
                            <li>Communicatie tijdens noodsituaties</li>
                            <li>Zelfvertrouwen opbouwen</li>
                        </ul>
                    </section>

                </section>

                {/* Highlight */}
                <aside className="workshop__highlight">
                    <h2>Kleine groep, maximale aandacht</h2>
                    <p>
                        De huiskamertraining wordt gegeven in een kleine groep
                        van 4–8 deelnemers. Hierdoor ontstaat een veilige,
                        persoonlijke leeromgeving met veel praktijk.
                    </p>
                </aside>

                {/* FAQ */}
                <section className="workshop__faq">
                    <h2 className="workshop__faq-title">Veelgestelde vragen</h2>

                    <div className="workshop__faq-cards">

                        <article className="workshop__faq-card">
                            <h3>Heb ik voorkennis nodig?</h3>
                            <p>
                                Nee, deze training is speciaal bedoeld voor
                                ouders en verzorgers zonder medische achtergrond.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Wordt er veel geoefend?</h3>
                            <p>
                                Ja, praktijk staat centraal. Iedere deelnemer
                                oefent actief met realistisch materiaal.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Waar wordt de training gegeven?</h3>
                            <p>
                                Bij iemand thuis of op een kleine locatie
                                binnen regio Rotterdam-Rijnmond, Haaglanden
                                en Zeeland.
                            </p>
                        </article>

                    </div>
                </section>

                {/* CTA */}
                <footer className="workshop__cta">
                    <p>Wilt u samen met andere ouders een huiskamertraining organiseren?</p>
                    <a href="/contact" className="workshop__button">
                        Vraag informatie aan
                    </a>
                </footer>

            </article>

        </div>
    );
}

export default KinderEhboHuiskamertraining;
