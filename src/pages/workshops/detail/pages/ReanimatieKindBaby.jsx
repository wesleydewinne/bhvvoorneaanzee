import WorkshopDetailLayout from "../WorkshopDetailLayout.jsx";

import babyImage from "@/assets/image/homepageFotos/Wesley De Winne Reanimatie instructie Baby reanimatie.webp?w=1400&format=webp&quality=82";


const facts = [
    {
        type: "audience",
        label: "Voor wie",
        value: "Ouders en professionals",
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
        question: "Is reanimatie bij een kind anders dan bij een volwassene?",
        answer:
            "Ja. Er zijn belangrijke verschillen in beoordeling en uitvoering. Deze verschillen worden tijdens de workshop uitgelegd en actief geoefend.",
    },
    {
        question: "Komt verslikking ook aan bod?",
        answer:
            "Ja. Het herkennen en handelen bij een ernstige luchtwegbelemmering bij baby's en kinderen is een belangrijk onderdeel.",
    },
    {
        question: "Wordt met baby- en kinderpoppen geoefend?",
        answer:
            "Ja. Hierdoor ervaren deelnemers daadwerkelijk de verschillen tussen hulpverlening aan baby's en kinderen.",
    },
    {
        question: "Is de workshop geschikt voor kinderopvang of scholen?",
        answer:
            "Ja. De workshop kan worden afgestemd op organisaties waar medewerkers verantwoordelijkheid dragen voor baby's of kinderen.",
    },
];


export default function ReanimatieKindBaby() {
    return (
        <WorkshopDetailLayout
            theme="pulse"
            title="Workshop Reanimatie Kind en Baby"

            hero={{
                eyebrow:
                    "Kinderreanimatie · praktijkworkshop",

                headline:
                    "Een baby of kind vraagt om een andere aanpak.",

                lead:
                    "Deelnemers oefenen hoe zij levensbedreigende situaties bij baby's en kinderen herkennen en hoe zij handelen bij verslikking, bewusteloosheid en een circulatiestilstand.",

                image:
                    babyImage,

                imageAlt:
                    "Praktijkinstructie baby- en kinderreanimatie",
            }}

            facts={facts}

            faqs={faqs}

            cta={{
                eyebrow:
                    "Praktisch oefenen",

                title:
                    "Leer handelen wanneer een baby of kind direct hulp nodig heeft",

                text:
                    "Met baby- en kinderpoppen krijgen deelnemers veel ruimte om de verschillende vaardigheden daadwerkelijk zelf te oefenen.",
            }}
        >

            <section
                className="wd-section"
                id="inhoud"
            >
                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Verschillen herkennen
                        </p>

                        <h2>
                            Een kind is geen kleine volwassene
                        </h2>

                        <div className="wd-cardiogram wd-cardiogram--child" aria-hidden="true">
                            <svg viewBox="0 0 640 82" preserveAspectRatio="none">
                                <path className="wd-cardiogram__base" d="M0 43H640" />
                                <path pathLength="1" className="wd-cardiogram__pulse" d="M0 43H30L40 41L49 43H62L70 31L79 56L90 10L103 68L115 35L127 43H180L190 41L199 43H212L220 31L229 56L240 10L253 68L265 35L277 43H330L340 41L349 43H362L370 31L379 56L390 10L403 68L415 35L427 43H480L490 41L499 43H512L520 31L529 56L540 10L553 68L565 35L577 43H640" />
                            </svg>
                        </div>
                    </div>


                    <div className="wd-copy">

                        <p className="wd-lead">
                            De hulpverlening aan baby's en kinderen
                            kent op verschillende momenten andere
                            aandachtspunten dan bij volwassenen.
                        </p>

                        <p>
                            Tijdens de workshop maken we deze
                            verschillen praktisch zichtbaar.
                        </p>

                        <p>
                            Deelnemers leren niet alleen welke
                            handelingen nodig kunnen zijn, maar oefenen
                            deze ook op passende oefenpoppen.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Verslikking
                        </p>

                        <h2>
                            Herkennen wanneer de luchtweg ernstig bedreigd is
                        </h2>

                        <p>
                            Een baby of kind dat zich verslikt kan nog
                            reageren en geluid maken, maar de situatie
                            kan ook snel ernstiger worden.
                        </p>
                    </div>


                    <div className="wd-card-grid">

                        <article className="wd-card">
                            <h3>
                                Baby
                            </h3>

                            <p>
                                Deelnemers oefenen de aangepaste
                                handelingen voor een baby met een
                                ernstige luchtwegbelemmering.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Kind
                            </h3>

                            <p>
                                We bespreken hoe de aanpak verandert
                                naarmate het slachtoffer groter wordt.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Bewusteloos
                            </h3>

                            <p>
                                Deelnemers leren herkennen wanneer de
                                situatie overgaat naar een toestand
                                waarin verdere levensreddende
                                handelingen noodzakelijk zijn.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Reanimatie
                        </p>

                        <h2>
                            De volledige situatie zelf oefenen
                        </h2>
                    </div>


                    <div className="wd-process">

                        <article className="wd-process__item">
                            <span>01</span>

                            <h3>
                                Beoordelen
                            </h3>

                            <p>
                                Veiligheid, bewustzijn en ademhaling
                                beoordelen.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>02</span>

                            <h3>
                                Hulp inschakelen
                            </h3>

                            <p>
                                Professionele hulp inschakelen en
                                aanwezige personen effectief gebruiken.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>03</span>

                            <h3>
                                Reanimatie
                            </h3>

                            <p>
                                De aangepaste reanimatievaardigheden
                                actief oefenen.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>04</span>

                            <h3>
                                AED
                            </h3>

                            <p>
                                Begrijpen hoe een AED onderdeel kan
                                worden van de hulpverlening aan een kind.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Zekerheid door oefenen
                        </p>

                        <h2>
                            Juist bij een kind kan twijfel groot zijn
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
                            Mensen kunnen terughoudend worden wanneer
                            een baby of kind dringend hulp nodig heeft,
                            omdat zij bang zijn iets verkeerd te doen.
                        </p>

                        <p>
                            Door de verschillende situaties zelf te
                            oefenen ontstaat meer duidelijkheid over
                            wat deelnemers daadwerkelijk kunnen doen.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Na afloop
                        </p>

                        <h2>
                            Wat heeft de deelnemer geoefend?
                        </h2>
                    </div>


                    <ul className="wd-checklist">

                        <li>
                            Bewustzijn en ademhaling beoordelen.
                        </li>

                        <li>
                            Een ernstige verslikking herkennen.
                        </li>

                        <li>
                            Passend handelen bij verslikking.
                        </li>

                        <li>
                            Babyreanimatie oefenen.
                        </li>

                        <li>
                            Kinderreanimatie oefenen.
                        </li>

                        <li>
                            De AED in de hulpverlening betrekken.
                        </li>

                        <li>
                            Professionele hulp inschakelen en
                            informatie overdragen.
                        </li>

                    </ul>

                </div>
            </section>

        </WorkshopDetailLayout>
    );
}
