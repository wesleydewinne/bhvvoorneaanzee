import WorkshopDetailLayout from "../WorkshopDetailLayout.jsx";

import babyImage from "@/assets/image/homepageFotos/Wesley De Winne Reanimatie instructie Baby reanimatie.webp?w=1400&format=webp&quality=82";


const facts = [
    {
        type: "audience",
        label: "Voor wie",
        value: "Ouders en verzorgers",
    },
    {
        type: "duration",
        label: "Duur",
        value: "Circa 2,5–3 uur",
    },
    {
        type: "group",
        label: "Groep",
        value: "4–8 deelnemers",
    },
    {
        type: "location",
        label: "Locatie",
        value: "Bij iemand thuis",
    },
];


const faqs = [
    {
        question: "Heb ik voorkennis nodig?",
        answer:
            "Nee. De training begint bij de basis en is juist bedoeld voor ouders en verzorgers zonder medische achtergrond.",
    },
    {
        question: "Waar vindt de huiskamertraining plaats?",
        answer:
            "Bij één van de deelnemers thuis of op een andere geschikte kleinschalige locatie.",
    },
    {
        question: "Oefent iedere deelnemer actief mee?",
        answer:
            "Ja. De kleine groepsgrootte is juist gekozen zodat iedereen voldoende gelegenheid krijgt om vaardigheden zelf te oefenen.",
    },
    {
        question: "Komt baby- en kinderreanimatie aan bod?",
        answer:
            "Ja. Reanimatie en verslikking bij baby's en kinderen vormen belangrijke onderdelen van de training.",
    },
];


export default function KinderEhboHuiskamertraining() {
    return (
        <WorkshopDetailLayout
            theme="care"
            title="Kinder-EHBO Huiskamertraining"

            hero={{
                eyebrow:
                    "Kinder-EHBO · kleine groep",

                headline:
                    "Weet wat je kunt doen wanneer een kind direct hulp nodig heeft.",

                lead:
                    "Een praktische Kinder-EHBO training in een kleine en vertrouwde setting, met veel ruimte om zelf te oefenen en vragen te stellen.",

                image:
                    babyImage,

                imageAlt:
                    "Kinder-EHBO en babyreanimatie tijdens een kleinschalige training",
            }}

            facts={facts}

            faqs={faqs}

            cta={{
                eyebrow:
                    "Training in kleine groep",

                title:
                    "Organiseer een Kinder-EHBO training in je eigen huiskamer",

                text:
                    "Met een kleine groep ouders, grootouders of andere verzorgers maken we er een praktische bijeenkomst van waarin iedereen actief kan oefenen.",
            }}
        >

            <section
                className="wd-section"
                id="inhoud"
            >
                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Persoonlijk en praktisch
                        </p>

                        <h2>
                            Geen grote cursuszaal, maar oefenen in een kleine groep
                        </h2>
                    </div>


                    <div className="wd-copy">

                        <p className="wd-lead">
                            Wanneer er thuis iets met een baby of kind
                            gebeurt, zijn ouders of verzorgers vaak de
                            eerste personen die moeten handelen.
                        </p>

                        <p>
                            Tijdens de huiskamertraining bespreken en
                            oefenen we situaties die juist in en rond
                            het gezin kunnen voorkomen.
                        </p>

                        <p>
                            Door de kleine groep is er ruimte voor
                            persoonlijke vragen en krijgt iedere
                            deelnemer gelegenheid om de belangrijkste
                            vaardigheden zelf te oefenen.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Levensreddende situaties
                        </p>

                        <h2>
                            Verslikking en reanimatie
                        </h2>
                    </div>


                    <div className="wd-card-grid wd-card-grid--2">

                        <article className="wd-card">
                            <h3>
                                Verslikking
                            </h3>

                            <p>
                                Deelnemers leren herkennen wanneer een
                                luchtwegbelemmering ernstig wordt en
                                oefenen de bijbehorende vaardigheden
                                voor baby's en kinderen.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Reanimatie
                            </h3>

                            <p>
                                We oefenen hoe een niet reagerende baby
                                of een niet reagerend kind wordt
                                beoordeeld en welke hulpverlening
                                vervolgens nodig kan zijn.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Kinderongevallen
                        </p>

                        <h2>
                            Ook aandacht voor situaties die thuis kunnen voorkomen
                        </h2>
                    </div>


                    <div className="wd-card-grid">

                        <article className="wd-card">
                            <h3>
                                Brandwonden
                            </h3>

                            <p>
                                Welke eerste hulp is belangrijk en
                                wanneer moet aanvullende hulp worden
                                ingeschakeld?
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Vallen en hoofdletsel
                            </h3>

                            <p>
                                Welke signalen verdienen na een val
                                extra aandacht?
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Allergische reactie
                            </h3>

                            <p>
                                Signalen herkennen en weten wanneer
                                professionele hulp noodzakelijk is.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Koortsstuip
                            </h3>

                            <p>
                                Begrijpen wat er gebeurt en weten hoe
                                je tijdens zo'n situatie rustig kunt
                                handelen.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Wonden
                            </h3>

                            <p>
                                Praktische eerste hulp bij veelvoorkomende
                                verwondingen.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Hulp inschakelen
                            </h3>

                            <p>
                                Herkennen wanneer professionele hulp
                                nodig is en duidelijk informatie kunnen
                                doorgeven.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Kleine groep
                        </p>

                        <h2>
                            Meer tijd om daadwerkelijk zelf te oefenen
                        </h2>
                    </div>


                    <div className="wd-copy">

                        <p>
                            De huiskamertraining is bewust kleinschalig.
                            Daardoor hoeft niemand alleen naar een
                            demonstratie te kijken.
                        </p>

                        <p>
                            Deelnemers kunnen handelingen herhalen,
                            vragen stellen en situaties bespreken die
                            voor hun eigen gezin relevant zijn.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Na de training
                        </p>

                        <h2>
                            Praktische vaardigheden voor thuis
                        </h2>
                    </div>


                    <ul className="wd-checklist">

                        <li>
                            Verslikking bij baby's en kinderen beter
                            herkennen.
                        </li>

                        <li>
                            Handelingen bij een ernstige verslikking
                            oefenen.
                        </li>

                        <li>
                            Babyreanimatie oefenen.
                        </li>

                        <li>
                            Kinderreanimatie oefenen.
                        </li>

                        <li>
                            Veelvoorkomende kinderongevallen beter
                            beoordelen.
                        </li>

                        <li>
                            Herkennen wanneer professionele hulp nodig
                            is.
                        </li>

                        <li>
                            Rustiger en duidelijker informatie kunnen
                            overdragen.
                        </li>

                    </ul>

                </div>
            </section>

        </WorkshopDetailLayout>
    );
}
