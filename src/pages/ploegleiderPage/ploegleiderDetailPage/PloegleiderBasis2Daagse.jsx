import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection";
import api from "@/api/api";
import "./PloegleiderDetailPage.css";

import {
    Users,
    Clock,
    Buildings,
    Ladder,
    Crosshair,
    ChatCircleText,
    ArrowsOutCardinal,
    ClipboardText,
    ShieldCheck,
} from "@phosphor-icons/react";

// ✅ Pas dit aan naar jouw echte code (zoals bij BHV_BASIC_2_DAYS)
const TRAINING_CODE = "PLOEGLEIDER_BHV_2_DAYS";

export default function PloegleiderBasis2Daagse() {
    const [priceFrom, setPriceFrom] = useState(null);
    const [pricingLoading, setPricingLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        setPricingLoading(true);

        api
            .get(`/trainings/BHV_PLOEGLEIDER_BASIC_2_DAYS/pricing`)
            .then((res) => {
                if (!mounted) return;
                setPriceFrom(res?.data?.basePrice ?? null);
            })
            .catch((err) => {
                console.error("Pricing ophalen mislukt", err);
                if (!mounted) return;
                setPriceFrom(null);
            })
            .finally(() => {
                if (!mounted) return;
                setPricingLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    const priceText = useMemo(() => {
        if (pricingLoading) return "laden…";
        if (priceFrom === null) return "op aanvraag";

        return `vanaf ${new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        }).format(priceFrom)} per persoon`;
    }, [priceFrom, pricingLoading]);

    const overviewCards = useMemo(
        () => [
            {
                icon: Users,
                title: "Voor wie",
                lines: [
                    "Ervaren BHV’ers",
                    "Aangewezen ploegleiders",
                    "BHV’ers met coördinerende rol op de werkvloer",
                ],
            },
            {
                icon: Clock,
                title: "Duur",
                lines: ["2 dagen", "Veel praktijk & scenario’s", "Focus op regie onder druk"],
            },
            {
                icon: Buildings,
                title: "Vorm",
                lines: ["Incompany", "Afgestemd op jouw locatie", "Scenario’s uit jouw werkomgeving"],
            },
            {
                icon: ShieldCheck,
                title: "Niveau",
                lines: [
                    "Leidinggeven binnen BHV-context",
                    "Tactisch / werkvloer-regie",
                    "Geen crisismanagement (stap hoger)",
                ],
            },
        ],
        []
    );

    const learningPoints = useMemo(
        () => [
            {
                icon: Crosshair,
                title: "Situatiebeeld",
                text: "Snel overzicht krijgen, aannames checken en informatie blijven actualiseren.",
            },
            {
                icon: ClipboardText,
                title: "Taakverdeling",
                text: "BHV’ers gericht inzetten, prioriteiten stellen en bijsturen als de situatie verandert.",
            },
            {
                icon: ChatCircleText,
                title: "Communicatie",
                text: "Kort, duidelijk en rustig communiceren — ook met spanning, ruis en tijdsdruk.",
            },
            {
                icon: Ladder,
                title: "Opschaling herkennen",
                text: "Weten wanneer je door moet pakken en wanneer je opschaalt richting coördinator of hulpdiensten.",
            },
            {
                icon: ArrowsOutCardinal,
                title: "Overdracht",
                text: "Kerninformatie helder overdragen (wat / waar / wie / risico / actie / verwachting).",
            },
        ],
        []
    );

    return (
        <>
            <HeaderSection
                mainTitle="Ploegleider BHV – 2-daagse training"
                subTitle="Regie op de werkvloer: taakverdeling, communicatie en opschalen onder druk"
            />

            <main className="pl-detail-page">
                {/* KERNOVERZICHT */}
                <section className="pl-section pl-section--surface" aria-labelledby="pl-overview-title">
                    <div className="pl-container">
                        <header className="pl-section-head">
                            <h2 id="pl-overview-title">In één oogopslag</h2>
                            <p className="pl-lead">
                                Deze training is voor BHV’ers die tijdens een incident de regie pakken op de werkvloer.
                                Je traint leiderschap in realistische scenario’s — zonder “crisismanagement-niveau”.
                            </p>
                        </header>

                        <ul className="pl-overview-grid" role="list">
                            {overviewCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <li key={card.title} className="pl-overview-card">
                                        <div className="pl-overview-icon" aria-hidden="true">
                                            <Icon size={26} weight="regular" />
                                        </div>
                                        <h3 className="pl-overview-title">{card.title}</h3>
                                        <p className="pl-overview-lines">
                                            {card.lines.map((line, idx) => (
                                                <span key={`${card.title}-${idx}`} className="pl-overview-line">
                          {line}
                        </span>
                                            ))}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* WAT JE LEERT */}
                <section className="pl-section pl-section--muted" aria-labelledby="pl-learn-title">
                    <div className="pl-container">
                        <header className="pl-section-head pl-section-head--center">
                            <h2 id="pl-learn-title">Wat leer je als ploegleider BHV?</h2>
                            <p className="pl-lead">
                                Leidinggeven binnen BHV gaat vooral om gedrag: rustig blijven, helder sturen en veilig kiezen.
                                Je oefent dit in scenario’s met tijdsdruk en beperkte informatie.
                            </p>
                        </header>

                        <div className="pl-card-grid">
                            {learningPoints.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <article key={item.title} className="pl-card pl-card--feature">
                                        <div className="pl-card-head">
                      <span className="pl-card-icon" aria-hidden="true">
                        <Icon size={26} weight="regular" />
                      </span>
                                            <h3 className="pl-card-title">{item.title}</h3>
                                        </div>
                                        <p className="pl-card-text">{item.text}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* TRAININGSOPBOUW (DIT MISSE JE) */}
                <section className="pl-section pl-section--surface" aria-labelledby="pl-setup-title">
                    <div className="pl-container">
                        <header className="pl-section-head">
                            <h2 id="pl-setup-title">Zo is de training opgebouwd</h2>
                            <p className="pl-lead">
                                Je krijgt korte stukken theorie die meteen worden toegepast. We werken met scenario’s,
                                rollen en duidelijke communicatiestructuur. Alles is gericht op regie op de werkvloer.
                            </p>
                        </header>

                        <div className="pl-split-grid">
                            <article className="pl-block">
                                <h3 className="pl-block-title">Dag 1 – Regie & communicatie</h3>
                                <p className="pl-block-text">
                                    Fundament: jouw rol als ploegleider, leiderschap onder druk en het bouwen van een
                                    betrouwbaar situatiebeeld. Veel oefenen met sturen en taakverdeling.
                                </p>
                                <ul className="pl-list" role="list">
                                    <li>Rol, verantwoordelijkheid en positionering op de werkvloer</li>
                                    <li>Communicatie: kort, duidelijk, herhaalbaar (wat/waar/wie/actie)</li>
                                    <li>Taakverdeling en prioriteiten stellen</li>
                                    <li>Scenario’s: brand & ontruiming (basis + regie)</li>
                                    <li>Overdracht: kerninformatie aan coördinator / hulpdiensten</li>
                                </ul>
                            </article>

                            <article className="pl-block">
                                <h3 className="pl-block-title">Dag 2 – Complexiteit & opschaling</h3>
                                <p className="pl-block-text">
                                    Verdieping: meerdere inzetten tegelijk, omgaan met ruis en opschalen wanneer nodig.
                                    Extra nadruk op besluitvorming en samenwerking met andere disciplines.
                                </p>
                                <ul className="pl-list" role="list">
                                    <li>Meerdere incidenten / gelijktijdige inzetten aansturen</li>
                                    <li>Besluitvorming met beperkte of tegenstrijdige info</li>
                                    <li>Opschaling herkennen en uitvoeren</li>
                                    <li>Scenario’s: complex ontruimen / medische inzet</li>
                                    <li>Evaluatie en borging: verbeteren en opnieuw oefenen</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </section>

                {/* USP / ACCENT */}
                <section className="pl-section pl-section--accent" aria-label="USP">
                    <div className="pl-container">
                        <p className="pl-usp-text">
                            Volledig <strong>incompany</strong> en afgestemd op jouw organisatie: risico’s, gebouw,
                            scenario’s en communicatieafspraken.
                        </p>
                    </div>
                </section>

                {/* PRIJS */}
                <section className="pl-section pl-section--muted" aria-labelledby="pl-price-title">
                    <div className="pl-container pl-price-grid">
                        <aside className="pl-sidebar" aria-label="Prijsindicatie details">
                            <h3 className="pl-sidebar-title">Prijsindicatie</h3>
                            <ul className="pl-keypoints" role="list">
                                <li>Incompany groepstraining</li>
                                <li>Kleine groepen, veel praktijk</li>
                                <li>Staffelkorting mogelijk</li>
                                <li>Afgestemd op jouw organisatie</li>
                            </ul>
                        </aside>

                        <div className="pl-price-content">
                            <h2 id="pl-price-title">Wat kost deze ploegleidertraining?</h2>

                            <p>
                                De kosten voor deze 2-daagse ploegleidertraining zijn{" "}
                                <strong>{priceText}</strong>, gebaseerd op een{" "}
                                <strong>incompany groepstraining</strong>.
                            </p>

                            <p>
                                We werken met <strong>staffelkortingen</strong>: hoe groter de groep, hoe lager de prijs per deelnemer.
                            </p>

                            <p>
                                Omdat iedere organisatie anders is, ontvang je altijd een{" "}
                                <Link to="/offerte" className="pl-inline-link">
                                    offerte op maat
                                </Link>
                                , afgestemd op jouw situatie, risico’s en leerdoelen.
                            </p>

                            <p className="pl-hint">
                                Twijfel je wat past? Bekijk onze{" "}
                                <Link to="/veelgestelde-vragen" className="pl-inline-link">
                                    veelgestelde vragen
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="pl-section pl-section--surface" aria-labelledby="pl-cta-title">
                    <div className="pl-container">
                        <div className="pl-cta-card">
                            <h2 id="pl-cta-title">Wil je deze ploegleidertraining inzetten?</h2>
                            <p>
                                We stemmen de scenario’s en communicatieafspraken af op jouw locatie. Je krijgt een voorstel dat past bij
                                groepsgrootte, risico’s en doelstellingen.
                            </p>

                            <div className="pl-cta-actions">
                                <Link to="/offerte" className="pl-cta-button">
                                    Offerte aanvragen
                                </Link>

                                <Link to="/contact" className="pl-cta-button pl-cta-button--ghost">
                                    Direct contact
                                </Link>
                            </div>

                            <p className="pl-cta-note">
                                Liever eerst sparren? Dat kan — kort afstemmen is vaak al genoeg om de juiste vorm te kiezen.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
