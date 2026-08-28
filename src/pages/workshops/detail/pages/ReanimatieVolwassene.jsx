import WorkshopDetailLayout from "../WorkshopDetailLayout.jsx";

import reanimationImage from "@/assets/image/homepageFotos/Wesley De Winne instructie Reanimatie buiten.webp?w=1400&format=webp&quality=82";


const facts = [
    {
        type: "audience",
        label: "Voor wie",
        value: "Medewerkers en particulieren",
    },
    {
        type: "duration",
        label: "Duur",
        value: "Circa 2–3 uur",
    },
    {
        type: "format",
        label: "Vorm",
        value: "Intensieve praktijk",
    },
    {
        type: "location",
        label: "Locatie",
        value: "Incompany",
    },
];


const faqs = [
    {
        question: "Heb ik voorkennis nodig?",
        answer:
            "Nee. De verschillende onderdelen worden stap voor stap uitgelegd en geoefend.",
    },
    {
        question: "Oefent iedere deelnemer zelf?",
        answer:
            "Ja. Reanimatie is een praktische vaardigheid en daarom krijgt iedere deelnemer gelegenheid om de handelingen zelf te oefenen.",
    },
    {
        question: "Wordt het gebruik van een AED geoefend?",
        answer:
            "Ja. Deelnemers oefenen met een trainings-AED en leren hoe deze veilig onderdeel wordt van de reanimatie.",
    },
    {
        question: "Kan deze workshop als opfristraining worden gebruikt?",
        answer:
            "Ja. De workshop kan worden ingezet om eerder aangeleerde reanimatievaardigheden opnieuw actief te oefenen.",
    },
];


export default function ReanimatieVolwassene() {
    return (
        <WorkshopDetailLayout
            theme="pulse"
            title="Workshop Reanimatie en AED Volwassene"

            hero={{
                eyebrow:
                    "Reanimatie · praktijkworkshop",

                headline:
                    "Bij een circulatiestilstand telt vooral dat iemand begint.",

                lead:
                    "Deelnemers oefenen hoe zij een circulatiestilstand herkennen, hulp inschakelen, starten met reanimatie en een AED veilig in de hulpverlening gebruiken.",

                image:
                    reanimationImage,

                imageAlt:
                    "Praktijktraining reanimatie en AED bij volwassenen",
            }}

            facts={facts}

            faqs={faqs}

            faq={{
                title:
                    "Praktische vragen over reanimatie en AED",
            }}

            cta={{
                eyebrow:
                    "Reanimatieworkshop op locatie",

                title:
                    "Reanimatie leer je door het daadwerkelijk te oefenen",

                text:
                    "We verzorgen de workshop op locatie met veel persoonlijke oefentijd en directe feedback.",
            }}
        >

            <section
                className="wd-section"
                id="inhoud"
            >
                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            De eerste minuten
                        </p>

                        <h2>
                            Herkennen dat iemand onmiddellijk hulp nodig heeft
                        </h2>

                        <div className="wd-cardiogram" aria-hidden="true">
                            <svg viewBox="0 0 640 82" preserveAspectRatio="none">
                                <path className="wd-cardiogram__base" d="M0 43H640" />
                                <path pathLength="1" className="wd-cardiogram__pulse" d="M0 43H52L64 41L75 43H91L101 31L111 56L124 10L139 68L154 35L168 43H223L235 41L246 43H262L272 31L282 56L295 10L310 68L325 35L339 43H394L406 41L417 43H433L443 31L453 56L466 10L481 68L496 35L510 43H640" />
                            </svg>
                        </div>
                    </div>


                    <div className="wd-copy">

                        <p className="wd-lead">
                            Reanimatie begint niet bij het aansluiten
                            van een AED. De eerste stap is herkennen
                            dat iemand niet normaal reageert en dat
                            direct handelen nodig is.
                        </p>

                        <p>
                            Tijdens de workshop oefenen deelnemers hoe
                            zij een slachtoffer veilig benaderen,
                            bewustzijn en ademhaling beoordelen en
                            professionele hulp inschakelen.
                        </p>

                        <p>
                            Daarna worden de noodzakelijke
                            reanimatiehandelingen stap voor stap
                            opgebouwd.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            De hulpverleningsketen
                        </p>

                        <h2>
                            Van herkennen naar overdracht
                        </h2>
                    </div>


                    <div className="wd-process">

                        <article className="wd-process__item">
                            <span>01</span>

                            <h3>
                                Beoordelen
                            </h3>

                            <p>
                                Veiligheid, reactie en ademhaling
                                systematisch controleren.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>02</span>

                            <h3>
                                Hulp inschakelen
                            </h3>

                            <p>
                                Professionele hulp alarmeren en
                                aanwezige omstanders gericht inzetten.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>03</span>

                            <h3>
                                Reanimatie
                            </h3>

                            <p>
                                De noodzakelijke reanimatiehandelingen
                                actief en herhaald oefenen.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>04</span>

                            <h3>
                                AED
                            </h3>

                            <p>
                                De AED veilig aansluiten en de
                                aanwijzingen van het apparaat volgen.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Vaardigheid
                        </p>

                        <h2>
                            Weten wat je moet doen is iets anders dan het kunnen
                        </h2>

                        <p>
                            Daarom bestaat een groot deel van deze
                            workshop uit daadwerkelijk oefenen.
                        </p>
                    </div>


                    <ul className="wd-checklist">

                        <li>
                            Een slachtoffer veilig benaderen.
                        </li>

                        <li>
                            Bewustzijn beoordelen.
                        </li>

                        <li>
                            De ademhaling beoordelen.
                        </li>

                        <li>
                            Professionele hulp inschakelen.
                        </li>

                        <li>
                            Reanimatiehandelingen oefenen.
                        </li>

                        <li>
                            Een trainings-AED gebruiken.
                        </li>

                        <li>
                            Samenwerken wanneer meerdere hulpverleners
                            aanwezig zijn.
                        </li>

                    </ul>

                </div>
            </section>


            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            AED
                        </p>

                        <h2>
                            De AED ondersteunt de reanimatie
                        </h2>

                        <div className="wd-cardiogram wd-cardiogram--fibrillation" aria-hidden="true">
                            <svg viewBox="0 0 640 82" preserveAspectRatio="none">
                                <path className="wd-cardiogram__base" d="M0 43H640" />
                                <path pathLength="1" className="wd-cardiogram__fibrillation" d="M0 43 C7 20 15 67 24 38 S39 24 47 52 S61 68 70 31 S85 13 94 49 S108 61 119 27 S132 36 140 55 S155 18 166 35 S179 68 190 41 S201 19 211 47 S225 58 236 30 S249 14 259 53 S271 65 281 37 S297 27 306 56 S319 16 329 32 S342 62 354 45 S368 21 378 51 S391 58 403 28 S418 35 427 60 S439 18 451 39 S465 67 477 33 S491 25 501 54 S515 12 526 36 S540 63 551 44 S565 20 575 49 S590 59 601 30 S615 24 624 52 S634 46 640 43" />
                            </svg>
                        </div>
                    </div>


                    <div className="wd-copy">

                        <p>
                            Een AED analyseert het hartritme en geeft
                            duidelijke aanwijzingen aan de hulpverlener.
                        </p>

                        <p>
                            Tijdens de workshop oefenen deelnemers hoe
                            zij het apparaat veilig inzetten zonder de
                            overige hulpverlening onnodig te onderbreken.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-callout wd-callout--orange">

                        <p className="wd-kicker">
                            Het doel
                        </p>

                        <h2>
                            Niet alleen weten wat reanimatie is, maar durven starten
                        </h2>

                        <p>
                            Door de verschillende stappen zelf te
                            oefenen ontstaat meer vertrouwdheid met
                            de handelingen en de samenwerking die
                            tijdens een reanimatie nodig is.
                        </p>

                    </div>

                </div>
            </section>

        </WorkshopDetailLayout>
    );
}
