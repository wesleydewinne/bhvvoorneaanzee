import HeaderSection from "@/components/sections/headerSection/HeaderSection";
import "./PloegleiderDetailPage.css";
import { Link } from "react-router-dom";

export default function PloegleiderBasis2Daagse() {
    return (
        <>
            <HeaderSection
                mainTitle="Ploegleider BHV – 2-daagse training"
                subTitle="Verdieping in coördinatie, opschaling en leiderschap"
            />

            <div className="pl-detail-page">

                {/* INTRO: 2 kolommen */}
                <section className="pl-section--surface">
                    <div className="pl-container pl-grid-2">
                        <div>
                            <h2>Meer regie, meer complexiteit</h2>
                            <p>
                                De 2-daagse ploegleidertraining is bedoeld voor organisaties waar incidenten meer
                                impact kunnen hebben: meerdere afdelingen, grotere aantallen personen, of verhoogde risico’s.
                            </p>
                            <p>
                                Je leert hoe je besluitvorming en coördinatie vormgeeft bij onvolledige informatie,
                                hoe je opschaalt wanneer nodig, en hoe je meerdere inzetten tegelijk aanstuurt.
                            </p>
                        </div>

                        <aside className="pl-sidebar">
                            <div className="pl-sidebar-title">Verdiepingspunten</div>
                            <ul className="pl-keypoints">
                                <li>Opschaling</li>
                                <li>Complexe scenario’s</li>
                                <li>Meerdere inzetten</li>
                                <li>Evaluatie & borging</li>
                            </ul>
                        </aside>
                    </div>
                </section>

                {/* VERANTWOORDELIJKHEDEN: cards */}
                <section className="pl-section--muted">
                    <div className="pl-container">
                        <h2>Wat je extra leert in 2 dagen</h2>

                        <div className="pl-card-grid">
                            <div className="pl-card">
                                <div className="pl-card-title">Opschalen</div>
                                <p>Wanneer en hoe schaal je op? Wat communiceer je en naar wie?</p>
                            </div>

                            <div className="pl-card">
                                <div className="pl-card-title">Coördineren</div>
                                <p>Meerdere BHV’ers aansturen: taakverdeling, prioriteiten en continu bijstellen.</p>
                            </div>

                            <div className="pl-card">
                                <div className="pl-card-title">Samenwerken</div>
                                <p>Afstemmen met directie en hulpdiensten, inclusief duidelijke overdracht.</p>
                            </div>

                            <div className="pl-card">
                                <div className="pl-card-title">Borgen</div>
                                <p>Evalueren, rapporteren en verbeterpunten vertalen naar afspraken en oefenen.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TAKEN PER FASE: 3 kolommen */}
                <section className="pl-section--surface">
                    <div className="pl-container">
                        <h2>Taken per fase (verdieping)</h2>

                        <div className="pl-grid-3">
                            <div className="pl-phase-card">
                                <h3>Voor het incident</h3>
                                <ul>
                                    <li>Afstemmen BHV-structuur, rollen en communicatie</li>
                                    <li>Scenario’s en risico’s vertalen naar inzetafspraken</li>
                                    <li>Oefenen en borgen van procedures</li>
                                </ul>
                            </div>

                            <div className="pl-phase-card">
                                <h3>Tijdens het incident</h3>
                                <ul>
                                    <li>Situatiebeeld opbouwen (wat weet je wél/niet)</li>
                                    <li>Besluiten nemen: ontruiming, afzetting, opschaling</li>
                                    <li>Meerdere inzetten tegelijk coördineren</li>
                                    <li>Overdracht aan hulpdiensten met kerninfo</li>
                                </ul>
                            </div>

                            <div className="pl-phase-card">
                                <h3>Na het incident</h3>
                                <ul>
                                    <li>Evaluatie met team: wat ging goed, wat kan beter</li>
                                    <li>Rapportage en terugkoppeling naar organisatie</li>
                                    <li>Verbeterpunten omzetten naar acties en oefenmomenten</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OPZET: 2 kolommen */}
                <section className="pl-section--muted">
                    <div className="pl-container pl-grid-2-even">
                        <div>
                            <h2>Opzet van de training</h2>
                            <p>
                                Dag 1 legt een stevige basis in rol, communicatie en regie.
                                Dag 2 gaat verder: complexere scenario’s, opschaling en samenwerken met meerdere disciplines.
                            </p>
                            <p>
                                Hierdoor ontstaat niet alleen kennis, maar vooral gedrag: rustig sturen, goed informeren
                                en keuzes maken die de veiligheid vergroten.
                            </p>
                        </div>

                        <div className="pl-card">
                            <div className="pl-card-title">We trainen op</div>
                            <p>
                                Situatiebeeld, besluitvorming, taakverdeling, opschaling,
                                communicatie onder druk en overdracht.
                            </p>
                        </div>
                    </div>
                </section>

                {/* PROGRAMMA: 2 blokken naast elkaar */}
                <section className="pl-section--surface">
                    <div className="pl-container">
                        <h2>Indeling (voorbeeld)</h2>

                        <div className="pl-program">
                            <div className="pl-program-day">
                                <h3>Dag 1 – Basis & regie</h3>
                                <ul>
                                    <li>Rol, verantwoordelijkheid en positionering</li>
                                    <li>Communicatie en leiderschap onder druk</li>
                                    <li>Scenario’s: brand & ontruiming (basis)</li>
                                    <li>Overdracht: hoe breng je kerninformatie</li>
                                </ul>
                            </div>

                            <div className="pl-program-day">
                                <h3>Dag 2 – Complex & opschaling</h3>
                                <ul>
                                    <li>Meerdere incidenten / gelijktijdige inzetten</li>
                                    <li>Opschaling en besluitvorming met beperkte info</li>
                                    <li>Scenario’s: complex ontruimen / medische inzet</li>
                                    <li>Evaluatie en borging: verbeteren en oefenen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* USP */}
                <section className="pl-section--accent">
                    <div className="pl-container">
                        <p className="pl-usp-text">
                            De 2-daagse training geeft ploegleiders de ruimte om echt te groeien in regie.
                            Door intensief scenario’s te oefenen ontstaat routine in overzicht, communicatie en opschaling.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="pl-section--surface">
                    <div className="pl-container">
                        <div className="pl-cta-wrap">
                            <h2>Wil je deze 2-daagse ploegleidertraining inzetten?</h2>
                            <p>
                                We stemmen inhoud en scenario’s af op jouw organisatie. Vraag een voorstel op maat aan.
                            </p>

                            <Link to="/offerte" className="pl-cta-button">
                                Offerte aanvragen
                            </Link>

                            <p>
                                Twijfel je wat past? Bekijk onze{" "}
                                <Link to="/veelgestelde-vragen" className="pl-inline-link">
                                    veelgestelde vragen
                                </Link>.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}
