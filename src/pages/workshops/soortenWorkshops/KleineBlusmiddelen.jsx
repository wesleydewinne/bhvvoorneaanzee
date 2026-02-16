import "./WorkshopPage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import ServiceRegionsSection from "@/shared/components/sections/ServiceAreaSection/ServiceRegionsSection.jsx";

function KleineBlusmiddelen() {
    return (
        <div className="workshop">

            <HeaderSection
                mainTitle="Workshop Kleine Blusmiddelen"
                subTitle="Praktisch leren handelen bij beginnende brand (3 uur)"
            />

            <article className="workshop__container">

                {/* Intro + Programma */}
                <section className="workshop__layout">

                    <div className="workshop__intro">
                        <h2>Veilig en verantwoord leren blussen</h2>

                        <p>
                            Een brand begint vaak klein: een prullenbak, een apparaat of een accu
                            die oververhit raakt. <strong>Juist in de eerste minuten kan adequaat handelen
                            het verschil maken</strong> tussen een beheersbare situatie en grote schade.
                        </p>

                        <p>
                            In deze praktijkgerichte workshop leren deelnemers hoe zij
                            <strong>veilig en verantwoord</strong> kunnen optreden bij een beginnende brand.
                            Niet alleen het gebruik van kleine blusmiddelen staat centraal,
                            maar vooral het <em>inschatten van risico’s en bewaken van de eigen veiligheid</em>.
                        </p>

                        <p>
                            De training is geschikt voor zowel BHV’ers als medewerkers zonder BHV-rol.
                            Het doel is dat iedere deelnemer begrijpt wanneer een inzet verantwoord is,
                            welk blusmiddel geschikt is en wanneer <strong>ontruimen de juiste keuze</strong> is.
                        </p>
                    </div>


                    <aside className="workshop__program">
                        <h2>Programma (3 uur)</h2>
                        <table className="workshop__table">
                            <tbody>
                            <tr>
                                <td>Introductie & veiligheid</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Risico’s bij brand</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Brandklassen & blusmiddelen</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Demonstratie</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Praktijkoefeningen</td>
                                <td>70 min</td>
                            </tr>
                            <tr>
                                <td>Lithium-verdieping</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Evaluatie</td>
                                <td>20 min</td>
                            </tr>
                            </tbody>
                        </table>
                    </aside>

                </section>

                {/* Drie inhoudsblokken */}
                <section className="workshop__three">

                    <section className="workshop__card">
                        <h2>Risico’s bij brand</h2>
                        <ul>
                            <li>Snelle rookontwikkeling</li>
                            <li>Giftige gassen</li>
                            <li>Explosiegevaar</li>
                            <li>Snelle branduitbreiding</li>
                            <li>Hoge hittebelasting</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Brandklassen & blusmiddelen</h2>
                        <ul>
                            <li>Verschillende brandklassen</li>
                            <li>Gebruik van schuim & CO₂</li>
                            <li>Beperkingen van poeder</li>
                            <li>Wanneer water gevaarlijk is</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Individuele praktijkoefeningen</h2>
                        <ul>
                            <li>Correct gebruik van blusser</li>
                            <li>Blussen van vloeistofbrand</li>
                            <li>Gebruik van blusdeken</li>
                            <li>Grenzen van inzet herkennen</li>
                        </ul>
                    </section>

                </section>

                {/* Lithium */}
                <aside className="workshop__highlight">
                    <h2>Lithium-ion batterijen</h2>
                    <p>
                        Extra aandacht voor accubranden en de specifieke risico’s van
                        lithium-ion batterijen binnen moderne werkomgevingen.
                    </p>
                </aside>

                {/* FAQ */}
                <section className="workshop__faq">
                    <h2 className="workshop__faq-title">Veelgestelde vragen</h2>

                    <div className="workshop__faq-cards">

                        <article className="workshop__faq-card">
                            <h3>Moet ik BHV’er zijn?</h3>
                            <p>Nee, zowel BHV’ers als niet-BHV’ers kunnen deelnemen.</p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Kan dit overal gegeven worden?</h3>
                            <p>
                                De locatie moet beschikken over een eigen terrein.
                                Openbaar terrein is niet toegestaan.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Kan het afgestemd worden?</h3>
                            <p>
                                Ja, de workshop wordt aangepast aan uw werkomgeving en risico’s.
                            </p>
                        </article>

                    </div>
                </section>

                {/* CTA */}
                <footer className="workshop__cta">
                    <p>Wilt u uw medewerkers zelfverzekerd laten handelen bij brandincidenten?</p>
                    <a href="/contact" className="workshop__button">
                        Vraag informatie aan
                    </a>
                </footer>

            </article>

        </div>
    );
}

export default KleineBlusmiddelen;
