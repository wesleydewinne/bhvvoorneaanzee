import { useMemo, useState } from "react";
import "./BhvRitme.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import heroImage from "@/assets/image/trainingen/cardImage/bhvtraining.webp";

export default function BhvRitme() {
    const [tab, setTab] = useState("ritme2");

    const content = useMemo(
        () => ({
            ritme2: {
                title: "Ritme 2",
                subtitle: "2 trainingsmomenten per jaar",
                summary:
                    "Perfect als je BHV onderhoud wilt zonder een volle dag. Jaarlijks de basis en 6 maanden later scenario’s.",
                timeline: [
                    {
                        when: "Moment 1",
                        heading: "Basis-herhaling (3,5 uur)",
                        text:
                            "Vaste onderdelen scherp houden: alarmeren, brand, ontruiming en levensreddend handelen. Veel doen, weinig zitten.",
                    },
                    {
                        when: "Moment 2 (na ± 6 maanden)",
                        heading: "Scenario-training",
                        text:
                            "Realistische situaties van jullie werkvloer: taakverdeling, communicatie en beslissingen onder druk.",
                    },
                ],
                bestFor: [
                    "Teams met beperkte tijd/planning",
                    "Bedrijven die BHV ‘levend’ willen houden",
                    "Organisaties die kort en praktisch willen trainen",
                ],
            },
            ritme3: {
                title: "Ritme 3",
                subtitle: "3 trainingsmomenten per jaar",
                summary:
                    "Voor extra borging door het jaar. Ideaal bij hoger risico, veel verloop of als je vaker wilt oefenen met scenario’s.",
                timeline: [
                    {
                        when: "Moment 1",
                        heading: "Basis-herhaling (3,5 uur)",
                        text:
                            "Kernhandelingen op niveau brengen en opfrissen: alarmeren, brand, ontruiming, levensreddend handelen.",
                    },
                    {
                        when: "Moment 2 (na ± 4 maanden)",
                        heading: "Scenario-training (team & communicatie)",
                        text:
                            "Oefenen op samenwerking: wie doet wat, hoe stuur je aan, hoe voorkom je chaos, hoe houd je overzicht.",
                    },
                    {
                        when: "Moment 3 (na ± 8 maanden)",
                        heading: "Verdieping (risico-specifiek)",
                        text:
                            "Afgestemd op jullie bedrijf: ontruiming/brand/medisch — wat bij jullie omgeving het meest relevant is.",
                    },
                ],
                bestFor: [
                    "Hoger risicoprofiel of complex gebouw",
                    "Teams met veel nieuw personeel/verloop",
                    "Bedrijven die maximale zekerheid willen",
                ],
            },
        }),
        []
    );

    const active = content[tab];

    return (
        <main className="bhvRitme">
            {/* HERO (via shared component) */}
            <HeaderSection
                mainTitle="BHV Ritme"
                subTitle="Verspreid trainen door het jaar: minder kennisverlies, realistische scenario’s en beter teamwork."
                image={heroImage}
            />

            {/* WERKWIJZE */}
            <section id="werkwijze" className="section">
                <header className="section__header">
                    <h2>Hoe werkt BHV Ritme?</h2>
                    <p>
                        Je verspreidt training over het jaar. Daardoor blijft kennis beter hangen en train je
                        realistischer dan bij één lange dag.
                        We werken in korte, praktische momenten: eerst zetten we de basis strak neer (zodat handelingen
                        automatisch worden),
                        daarna trainen we scenario’s die passen bij jullie gebouw en risico’s. Door die herhaling door
                        het jaar blijft BHV
                        “levend” in het team: sneller handelen, beter samenwerken en minder stress als het echt gebeurt.
                    </p>
                </header>

                <ol className="steps">
                    <li className="step">
                        <div className="step__nr">1</div>
                        <div className="step__body">
                            <h3>Basis scherp zetten</h3>
                            <p className="muted">
                                Korte uitleg, daarna oefenen. Handelingen moeten automatisch worden: alarmeren, brand,
                                ontruiming,
                                levensreddend handelen.
                            </p>
                        </div>
                    </li>

                    <li className="step">
                        <div className="step__nr">2</div>
                        <div className="step__body">
                            <h3>Scenario’s uit jullie praktijk</h3>
                            <p className="muted">
                                Realistische situaties passend bij jullie gebouw/werk. Focus op rollen, samenwerking, communicatie en
                                keuzes onder druk.
                            </p>
                        </div>
                    </li>

                    <li className="step">
                        <div className="step__nr">3</div>
                        <div className="step__body">
                            <h3>Borging door het jaar</h3>
                            <p className="muted">
                                Door herhaling verspreid over het jaar zakt kennis minder weg en blijft veiligheid actief in het team.
                            </p>
                        </div>
                    </li>
                </ol>

                <div className="note">
                    <strong>Voorwaarde:</strong> BHV Ritme is een herhaalprogramma en kan alleen na het behalen van de{" "}
                    <strong>BHV basiscursus</strong>.
                </div>
            </section>

            {/* KEUZE */}
            <section id="keuze" className="section">
                <header className="section__header">
                    <h2>Kies jouw ritme</h2>
                    <p>Klik op Ritme 2 of Ritme 3. Je ziet direct de opbouw en voor wie het bedoeld is.</p>
                </header>

                <div className="tabs" role="tablist" aria-label="BHV Ritme keuze">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === "ritme2"}
                        className={`tab ${tab === "ritme2" ? "tab--active" : ""}`}
                        onClick={() => setTab("ritme2")}
                    >
                        Ritme 2
                        <span className="tab__sub">2 momenten</span>
                    </button>

                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === "ritme3"}
                        className={`tab ${tab === "ritme3" ? "tab--active" : ""}`}
                        onClick={() => setTab("ritme3")}
                    >
                        Ritme 3
                        <span className="tab__sub">3 momenten</span>
                    </button>
                </div>

                <article className="card card--soft panel" role="tabpanel" aria-label={`${active.title} details`}>
                    <header className="panel__header">
                        <div>
                            <h3 className="panel__title">{active.title}</h3>
                            <p className="muted">{active.subtitle}</p>
                        </div>
                        <div className="panel__tag">3,5 uur per moment</div>
                    </header>

                    <p className="panel__summary">{active.summary}</p>

                    <div className="grid grid--2">
                        <div className="timeline">
                            {active.timeline.map((t) => (
                                <div className="timeline__item" key={t.when}>
                                    <div className="timeline__dot" />
                                    <div className="timeline__content">
                                        <div className="timeline__when">{t.when}</div>
                                        <div className="timeline__heading">{t.heading}</div>
                                        <div className="timeline__text muted">{t.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="who">
                            <h4>Voor wie is dit ideaal?</h4>
                            <ul className="list">
                                {active.bestFor.map((x) => (
                                    <li key={x}>✅ {x}</li>
                                ))}
                            </ul>

                            <div className="who__chips">
                                <span className="chip">Max 10 deelnemers</span>
                                <span className="chip">Op locatie</span>
                                <span className="chip">Scenario’s op maat</span>
                            </div>
                        </aside>
                    </div>
                </article>
            </section>

            {/* WAAROM */}
            <section className="section">
                <header className="section__header">
                    <h2>Waarom dit beter werkt dan één lange dag</h2>
                    <p>Dit is waarom BHV Ritme in de praktijk beter blijft hangen.</p>
                </header>

                <div className="grid grid--2">
                    <article className="card">
                        <h3>Meer oefentijd per persoon</h3>
                        <p className="muted">
                            Kleine groepen (max 10) betekent: niet toekijken, maar doen. Daardoor corrigeer je sneller en leer je beter.
                        </p>
                    </article>

                    <article className="card">
                        <h3>Scenario’s maken het realistisch</h3>
                        <p className="muted">
                            BHV is teamwork. Scenario’s dwingen tot taakverdeling, communicatie en beslissingen zoals het écht gaat.
                        </p>
                    </article>

                    <article className="card">
                        <h3>BHV blijft leven in het bedrijf</h3>
                        <p className="muted">
                            Door meerdere contactmomenten in het jaar voorkom je kennisverlies en blijft veiligheid top-of-mind.
                        </p>
                    </article>

                    <article className="card">
                        <h3>Afgestemd op jullie werkvloer</h3>
                        <p className="muted">
                            We sluiten aan op jullie risico’s, gebouw en processen. Daardoor is het direct toepasbaar.
                        </p>
                    </article>
                </div>
            </section>

            {/* WERKGEBIED */}
            <section id="werkgebied" className="section">
                <header className="section__header">
                    <h2>Werkgebied</h2>
                    <p>Zo houden we het praktisch, planbaar en realistisch qua reistijd.</p>
                </header>

                <div className="grid grid--2">
                    <article className="card">
                        <h3>Primair</h3>
                        <p className="muted">West- en Midden-Zuid-Holland (regio Rotterdam – Den Haag en omgeving).</p>
                        <ul className="list">
                            <li>✅ Voorne aan Zee / Nissewaard</li>
                            <li>✅ Rotterdam-Rijnmond</li>
                            <li>✅ Haaglanden / Westland</li>
                        </ul>
                    </article>

                    <article className="card">
                        <h3>Dordrecht & zuidoost</h3>
                        <p className="muted">Alleen op aanvraag. Niet zeker? Stuur je postcode mee, dan check ik het direct.</p>
                        <div className="callout">
                            <strong>Praktisch:</strong> “Postcode doorgeven = snel duidelijk.”
                        </div>
                    </article>
                </div>
            </section>

            {/* CTA */}
            <section className="section" id="contact">
                <div className="cta">
                    <div>
                        <h2>Wil je BHV Ritme inzetten bij jullie?</h2>
                        <p className="muted">
                            Ik stem de scenario’s af op jullie werkvloer en plan het ritme door het jaar. Geen gedoe, wél resultaat.
                        </p>
                    </div>

                    <div className="cta__actions">
                        <a className="btn btn--primary" href="/offerte">Offerte</a>
                        <a className="btn btn--ghost" href="/contact">Contact</a>
                    </div>
                </div>
            </section>
        </main>
    );
}