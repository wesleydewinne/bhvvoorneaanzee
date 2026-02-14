import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection";
import "./PloegleiderDetailPage.css";
import { Link } from "react-router-dom";

export default function PloegleiderBasis1daagseElearning() {
    return (
        <>
            <HeaderSection
                mainTitle="Ploegleider BHV – basistraining"
                subTitle="Overzicht, aansturing en communicatie tijdens incidenten"
            />

            <div className="pl-detail-page">

                {/* INTRO: 2 kolommen */}
                <section className="pl-section--surface">
                    <div className="pl-container pl-grid-2">
                        <div>
                            <h2>De rol van de ploegleider</h2>
                            <p>
                                De ploegleider BHV is de schakel tussen de BHV-organisatie en de daadwerkelijke inzet.
                                Waar BHV’ers uitvoeren, zorgt de ploegleider voor overzicht, prioriteiten en aansturing.
                            </p>
                            <p>
                                In deze basistraining leer je hoe je rustig en duidelijk leidinggeeft tijdens incidenten,
                                hoe je informatie verzamelt en hoe je de juiste keuzes maakt wanneer elke seconde telt.
                            </p>
                        </div>

                        <aside className="pl-sidebar">
                            <div className="pl-sidebar-title">Focus van de training</div>
                            <ul className="pl-keypoints">
                                <li>Overzicht houden</li>
                                <li>Team aansturen</li>
                                <li>Beslissingen nemen</li>
                                <li>Heldere communicatie</li>
                            </ul>
                        </aside>
                    </div>
                </section>

                {/* KERNVERANTWOORDELIJKHEDEN: cards */}
                <section className="pl-section--muted">
                    <div className="pl-container">
                        <h2>Kernverantwoordelijkheden</h2>

                        <div className="pl-card-grid">
                            <div className="pl-card">
                                <div className="pl-card-title">Aansturen</div>
                                <p>Taken verdelen, BHV’ers gericht inzetten en bijsturen waar nodig.</p>
                            </div>

                            <div className="pl-card">
                                <div className="pl-card-title">Prioriteren</div>
                                <p>Inschatten wat nú moet gebeuren: veiligheid, slachtofferzorg, ontruiming.</p>
                            </div>

                            <div className="pl-card">
                                <div className="pl-card-title">Communiceren</div>
                                <p>Rust brengen, duidelijk rapporteren en schakelen met meldkamer/hulpdiensten.</p>
                            </div>

                            <div className="pl-card">
                                <div className="pl-card-title">Overdragen</div>
                                <p>Informatie en situatiebeeld gestructureerd overdragen aan externe hulpdiensten.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TAKEN PER FASE: 3 kolommen */}
                <section className="pl-section--surface">
                    <div className="pl-container">
                        <h2>Taken per fase</h2>

                        <div className="pl-grid-3">
                            <div className="pl-phase-card">
                                <h3>Voor het incident</h3>
                                <ul>
                                    <li>Kennis van procedures en communicatieafspraken</li>
                                    <li>Rol- en taakverdeling binnen BHV afstemmen</li>
                                    <li>Verzamelpunten, routes en risico’s kennen</li>
                                </ul>
                            </div>

                            <div className="pl-phase-card">
                                <h3>Tijdens het incident</h3>
                                <ul>
                                    <li>Overzicht houden en prioriteiten stellen</li>
                                    <li>BHV’ers aansturen op basis van situatie</li>
                                    <li>Beslissen over ontruiming (gedeeltelijk/volledig)</li>
                                    <li>Afstemmen met externe hulpdiensten</li>
                                </ul>
                            </div>

                            <div className="pl-phase-card">
                                <h3>Na het incident</h3>
                                <ul>
                                    <li>Evaluatie met BHV-team</li>
                                    <li>Rapportage en terugkoppeling</li>
                                    <li>Verbeterpunten vastleggen en borgen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OPZET: 2 kolommen even */}
                <section className="pl-section--muted">
                    <div className="pl-container pl-grid-2-even">
                        <div>
                            <h2>Opzet van de training</h2>
                            <p>
                                De training is praktijkgericht en gericht op toepasbaarheid.
                                Theorie is kort en doelgericht: je oefent vooral op communicatie, regie en besluitvorming.
                            </p>
                            <p>
                                Scenario’s worden afgestemd op de werkomgeving en bestaande BHV-afspraken,
                                zodat je het direct herkent én kunt vertalen naar je eigen praktijk.
                            </p>
                        </div>

                        <div className="pl-card">
                            <div className="pl-card-title">We oefenen o.a.</div>
                            <p>
                                Regie nemen, informatie verzamelen, inzet aansturen, communiceren onder druk
                                en gestructureerd overdragen.
                            </p>
                        </div>
                    </div>
                </section>

                {/* USP */}
                <section className="pl-section--accent">
                    <div className="pl-container">
                        <p className="pl-usp-text">
                            Deze training is bedoeld om ploegleiders zelfverzekerd en effectief te laten handelen.
                            Niet meer “meedoen”, maar “sturen”: overzicht, rust en duidelijke communicatie.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="pl-section--surface">
                    <div className="pl-container">
                        <div className="pl-cta-wrap">
                            <h2>Interesse in de ploegleider basistraining?</h2>
                            <p>
                                We stemmen de training af op jouw organisatie, risico’s en BHV-structuur.
                                Vraag een voorstel op maat aan.
                            </p>

                            <Link to="/offerte" className="pl-cta-button">
                                Offerte aanvragen
                            </Link>

                            <p>
                                Eerst nog vragen? Bekijk onze{" "}
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
