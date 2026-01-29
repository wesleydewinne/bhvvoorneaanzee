import HeaderSection from "@/components/sections/headerSection/HeaderSection";
import "./PloegleiderDetailPage.css";
import { Link } from "react-router-dom";

export default function PloegleiderHerhalingHalveDag() {
    return (
        <>
            <HeaderSection
                mainTitle="Ploegleider BHV – herhalingstraining"
                subTitle="Scenario’s oefenen en scherp blijven in regie en besluitvorming"
            />

            <div className="pl-detail-page">

                {/* INTRO: compact + focus */}
                <section className="pl-section--surface">
                    <div className="pl-container pl-grid-2">
                        <div>
                            <h2>Herhalen door te doen</h2>
                            <p>
                                De ploegleider herhalingstraining is een compacte, praktijkgerichte
                                halve dag waarin het oefenen van scenario’s centraal staat.
                                Geen uitgebreide theorie, maar handelen, evalueren en bijstellen.
                            </p>
                            <p>
                                De training is bedoeld om ploegleiders weer op één lijn te brengen
                                en scherp te houden in overzicht, communicatie en besluitvorming.
                            </p>
                        </div>

                        <aside className="pl-sidebar">
                            <div className="pl-sidebar-title">Focus herhaling</div>
                            <ul className="pl-keypoints">
                                <li>Scenario-oefeningen</li>
                                <li>Regie en overzicht</li>
                                <li>Besluitvorming</li>
                                <li>Evalueren & verbeteren</li>
                            </ul>
                        </aside>
                    </div>
                </section>

                {/* KORTE THEORIE / RESET */}
                <section className="pl-section--muted">
                    <div className="pl-container pl-grid-2-even">
                        <div>
                            <h2>Korte theoretische afstemming</h2>
                            <p>
                                We starten de herhalingstraining met een korte theoretische
                                afstemming. Doel is niet opnieuw leren, maar zorgen dat
                                iedereen weer dezelfde uitgangspunten hanteert.
                            </p>
                            <p>
                                Denk aan rolverdeling, communicatieafspraken en
                                beslismomenten bij opschaling of ontruiming.
                            </p>
                        </div>

                        <div className="pl-card">
                            <div className="pl-card-title">We frissen o.a. op</div>
                            <p>
                                Rol van de ploegleider, besluitvorming onder druk,
                                communicatie met BHV’ers en overdracht aan hulpdiensten.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SCENARIO TRAININGEN */}
                <section className="pl-section--surface">
                    <div className="pl-container">
                        <h2>Scenario trainingen</h2>

                        <div className="pl-grid-3">
                            <div className="pl-phase-card">
                                <h3>Brand & ontruiming</h3>
                                <ul>
                                    <li>Situatiebeeld opbouwen</li>
                                    <li>Besluiten over (gedeeltelijke) ontruiming</li>
                                    <li>Aansturen van BHV’ers</li>
                                    <li>Communicatie met hulpdiensten</li>
                                </ul>
                            </div>

                            <div className="pl-phase-card">
                                <h3>Medische noodsituatie</h3>
                                <ul>
                                    <li>Overzicht houden bij letsel of reanimatie</li>
                                    <li>Taakverdeling binnen BHV</li>
                                    <li>Bewaken van veiligheid en rust</li>
                                    <li>Overdracht aan ambulancezorg</li>
                                </ul>
                            </div>

                            <div className="pl-phase-card">
                                <h3>Complex scenario</h3>
                                <ul>
                                    <li>Meerdere gebeurtenissen tegelijk</li>
                                    <li>Prioriteiten stellen</li>
                                    <li>Opschalen indien nodig</li>
                                    <li>Continu herbeoordelen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EVALUATIE */}
                <section className="pl-section--muted">
                    <div className="pl-container pl-grid-2-even">
                        <div>
                            <h2>Evaluatie en reflectie</h2>
                            <p>
                                Na elk scenario wordt uitgebreid geëvalueerd.
                                Wat ging goed? Wat kan beter? En hoe vertaal je
                                dit naar de praktijk binnen jouw organisatie?
                            </p>
                            <p>
                                De focus ligt op leren van het handelen,
                                niet op “goed of fout”.
                            </p>
                        </div>

                        <div className="pl-card">
                            <div className="pl-card-title">Resultaat</div>
                            <p>
                                Ploegleiders die weer scherp zijn in regie,
                                communicatie en besluitvorming.
                            </p>
                        </div>
                    </div>
                </section>

                {/* USP */}
                <section className="pl-section--accent">
                    <div className="pl-container">
                        <p className="pl-usp-text">
                            De herhalingstraining is kort, intensief en volledig praktijkgericht.
                            Door realistische scenario’s te oefenen blijft de ploegleider
                            voorbereid op situaties die je liever niet meemaakt.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="pl-section--surface">
                    <div className="pl-container">
                        <div className="pl-cta-wrap">
                            <h2>Deze herhalingstraining inzetten?</h2>
                            <p>
                                De scenario’s worden afgestemd op jouw organisatie,
                                risico’s en bestaande BHV-afspraken.
                            </p>

                            <Link to="/offerte" className="pl-cta-button">
                                Offerte aanvragen
                            </Link>

                            <p>
                                Meer weten? Bekijk onze{" "}
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
