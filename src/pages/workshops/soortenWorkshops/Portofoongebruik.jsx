import "./WorkshopPage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";

function Portofoongebruik() {
    return (
        <div className="workshop">

            <HeaderSection
                mainTitle="Workshop Portofoongebruik"
                subTitle="Effectief communiceren tijdens incidenten en ontruimingen (2–3 uur)"
            />

            <article className="workshop__container">

                {/* Intro + Programma */}
                <section className="workshop__layout">

                    <div className="workshop__intro">
                        <h2>Duidelijke communicatie onder druk</h2>

                        <p>
                            Tijdens incidenten en ontruimingen is communicatie cruciaal.
                            <strong> Onduidelijke meldingen of slechte spreekdiscipline
                                kunnen leiden tot verwarring en vertraging</strong>.
                        </p>

                        <p>
                            In deze praktijkgerichte workshop leren deelnemers
                            hoe zij <strong>kort, helder en gestructureerd</strong>
                            communiceren via portofoons.
                            De nadruk ligt op regie houden, duidelijke meldprocedures
                            en professioneel handelen tijdens calamiteiten.
                        </p>

                        <p>
                            De training is geschikt voor BHV’ers, ploegleiders,
                            beveiliging en facilitair medewerkers.
                            Het doel is dat iedere deelnemer begrijpt
                            hoe communicatie bijdraagt aan veiligheid
                            en een gecontroleerde inzet.
                        </p>
                    </div>

                    <aside className="workshop__program">
                        <h2>Programma (2–3 uur)</h2>
                        <table className="workshop__table">
                            <tbody>
                            <tr>
                                <td>Introductie & communicatierollen</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Basis portofoontechniek</td>
                                <td>20 min</td>
                            </tr>
                            <tr>
                                <td>Spreekdiscipline & call-signs</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Meldprocedures tijdens incident</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>Praktijkoefeningen</td>
                                <td>60 min</td>
                            </tr>
                            <tr>
                                <td>Evaluatie & verbeterpunten</td>
                                <td>20 min</td>
                            </tr>
                            </tbody>
                        </table>
                    </aside>

                </section>

                {/* Drie inhoudsblokken */}
                <section className="workshop__three">

                    <section className="workshop__card">
                        <h2>Basisprincipes</h2>
                        <ul>
                            <li>Correct gebruik van portofoon</li>
                            <li>Push-to-talk techniek</li>
                            <li>Duidelijke articulatie</li>
                            <li>Voorkomen van dubbele meldingen</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Spreekdiscipline</h2>
                        <ul>
                            <li>Gebruik van call-signs</li>
                            <li>Korte en duidelijke meldingen</li>
                            <li>Bevestigen van berichten</li>
                            <li>Communiceren onder stress</li>
                        </ul>
                    </section>

                    <section className="workshop__card">
                        <h2>Praktijkoefeningen</h2>
                        <ul>
                            <li>Communicatie tijdens ontruiming</li>
                            <li>Simulatie van incidentmelding</li>
                            <li>Rolverdeling ploegleider & BHV</li>
                            <li>Evaluatie van communicatie</li>
                        </ul>
                    </section>

                </section>

                {/* Highlight */}
                <aside className="workshop__highlight">
                    <h2>Regie en rust tijdens incidenten</h2>
                    <p>
                        Goede portofooncommunicatie zorgt voor overzicht,
                        snelle besluitvorming en gecontroleerde inzet.
                        Heldere communicatie voorkomt onnodige risico’s.
                    </p>
                </aside>

                {/* FAQ */}
                <section className="workshop__faq">
                    <h2 className="workshop__faq-title">Veelgestelde vragen</h2>

                    <div className="workshop__faq-cards">

                        <article className="workshop__faq-card">
                            <h3>Moet ik ervaring hebben met portofoons?</h3>
                            <p>
                                Nee, de workshop is geschikt voor zowel beginners
                                als deelnemers met ervaring.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Worden portofoons verzorgd?</h3>
                            <p>
                                Ja, oefenportofoons worden tijdens de training
                                beschikbaar gesteld.
                            </p>
                        </article>

                        <article className="workshop__faq-card">
                            <h3>Kan dit gecombineerd worden met een ontruimingsoefening?</h3>
                            <p>
                                Ja, deze workshop sluit perfect aan op
                                praktijkgerichte ontruimingsoefeningen.
                            </p>
                        </article>

                    </div>
                </section>

                {/* CTA */}
                <footer className="workshop__cta">
                    <p>Wilt u de communicatie binnen uw BHV-organisatie professionaliseren?</p>
                    <a href="/contact" className="workshop__button">
                        Vraag informatie aan
                    </a>
                </footer>

            </article>

        </div>
    );
}

export default Portofoongebruik;
