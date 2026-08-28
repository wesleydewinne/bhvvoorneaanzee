import WorkshopDetailLayout from "../WorkshopDetailLayout.jsx";

import bleedingImage from "@/assets/image/homepageFotos/Wesley De Winne Instructie TQ.webp?w=1400&format=webp&quality=82";


const facts = [
    {
        type: "audience",
        label: "Voor wie",
        value: "BHV'ers en risicoteams",
    },
    {
        type: "duration",
        label: "Duur",
        value: "Circa 2–3 uur",
    },
    {
        type: "format",
        label: "Vorm",
        value: "Praktische vaardigheden",
    },
    {
        type: "location",
        label: "Locatie",
        value: "Incompany",
    },
];


const faqs = [
    {
        question: "Is deze workshop alleen voor BHV'ers?",
        answer:
            "Nee. Ook andere medewerkers die door hun werk of omgeving met ernstig letsel te maken kunnen krijgen, kunnen deelnemen.",
    },
    {
        question: "Wordt er met een tourniquet geoefend?",
        answer:
            "Ja. Deelnemers oefenen met trainingsmaterialen zodat zij bekend raken met het gebruik en de plaats binnen de hulpverlening.",
    },
    {
        question: "Komt wondtamponnade aan bod?",
        answer:
            "Ja. De workshop besteedt aandacht aan verschillende manieren waarop ernstig bloedverlies kan worden aangepakt.",
    },
    {
        question: "Is de workshop geschikt voor bouw of industrie?",
        answer:
            "Ja. Juist in omgevingen waar ernstig mechanisch letsel een relevant risico vormt, kan gerichte voorbereiding waardevol zijn.",
    },
];


export default function StopDeBloedingRedEenLeven() {
    return (
        <WorkshopDetailLayout
            theme="medical"
            title="Workshop Stop de Bloeding – Red een Leven"

            hero={{
                eyebrow:
                    "Ernstig bloedverlies · praktijkworkshop",

                headline:
                    "Ernstig bloedverlies vraagt om direct handelen.",

                lead:
                    "Deelnemers leren levensbedreigend bloedverlies herkennen en oefenen met verschillende middelen en technieken waarmee ernstige bloedingen kunnen worden beperkt totdat professionele hulp beschikbaar is.",

                image:
                    bleedingImage,

                imageAlt:
                    "Praktijkinstructie Stop de Bloeding met trainingstourniquet",
            }}

            facts={facts}

            faqs={faqs}

            cta={{
                eyebrow:
                    "Gerichte voorbereiding",

                title:
                    "Train medewerkers voor situaties waarin minuten verschil maken",

                text:
                    "De workshop kan worden afgestemd op de risico's, werkzaamheden en beschikbare materialen binnen de organisatie.",
            }}
        >

            <section
                className="wd-section"
                id="inhoud"
            >
                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Eerst herkennen
                        </p>

                        <h2>
                            Wanneer wordt bloedverlies levensbedreigend?
                        </h2>
                    </div>


                    <div className="wd-copy">

                        <p className="wd-lead">
                            Niet iedere wond vraagt om dezelfde
                            hulpverlening. Daarom begint deze workshop
                            met het herkennen van ernstig bloedverlies.
                        </p>

                        <p>
                            Deelnemers leren kijken naar de ernst en
                            locatie van de verwonding en begrijpen
                            waarom bij bepaalde bloedingen snel handelen
                            noodzakelijk is.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Verschillende mogelijkheden
                        </p>

                        <h2>
                            Niet iedere bloeding vraagt om dezelfde aanpak
                        </h2>
                    </div>


                    <div className="wd-card-grid">

                        <article className="wd-card">
                            <span className="wd-card__number">
                                01
                            </span>

                            <h3>
                                Directe druk
                            </h3>

                            <p>
                                Deelnemers oefenen hoe snel effectieve
                                druk kan worden toegepast bij een
                                ernstige bloeding.
                            </p>
                        </article>


                        <article className="wd-card">
                            <span className="wd-card__number">
                                02
                            </span>

                            <h3>
                                Wondtamponnade
                            </h3>

                            <p>
                                We bespreken wanneer wondtamponnade een
                                passende techniek kan zijn en oefenen
                                dit met geschikt trainingsmateriaal.
                            </p>
                        </article>


                        <article className="wd-card">
                            <span className="wd-card__number">
                                03
                            </span>

                            <h3>
                                Tourniquet
                            </h3>

                            <p>
                                Deelnemers maken kennis met de plaats
                                van een tourniquet binnen de hulpverlening
                                en oefenen met trainingsmateriaal.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Beslissen
                        </p>

                        <h2>
                            Een techniek kennen is niet genoeg
                        </h2>
                    </div>


                    <div className="wd-copy">

                        <p>
                            Tijdens een echte situatie staat niet
                            aangegeven welke handeling gekozen moet
                            worden.
                        </p>

                        <p>
                            Daarom oefenen deelnemers ook met het
                            beoordelen van verschillende situaties en
                            het maken van een passende keuze.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Samenhang
                        </p>

                        <h2>
                            Van veiligheid tot overdracht
                        </h2>
                    </div>


                    <div className="wd-process">

                        <article className="wd-process__item">
                            <span>01</span>

                            <h3>
                                Veilig beoordelen
                            </h3>

                            <p>
                                Eerst kijken of hulp veilig kan worden
                                verleend.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>02</span>

                            <h3>
                                Hulp inschakelen
                            </h3>

                            <p>
                                Professionele hulp inschakelen en
                                aanwezige personen gericht inzetten.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>03</span>

                            <h3>
                                Bloedverlies beperken
                            </h3>

                            <p>
                                Een passende eerste maatregel kiezen
                                en uitvoeren.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>04</span>

                            <h3>
                                Overdracht
                            </h3>

                            <p>
                                Duidelijk kunnen vertellen wat is
                                aangetroffen en welke hulp al is
                                verleend.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-callout wd-callout--orange">

                        <p className="wd-kicker">
                            Praktijk
                        </p>

                        <h2>
                            Deelnemers voeren de vaardigheden zelf uit
                        </h2>

                        <p>
                            Bij ernstig bloedverlies is het belangrijk
                            dat hulpmiddelen niet pas tijdens een echt
                            incident voor het eerst worden vastgepakt.
                        </p>

                        <p>
                            Daarom krijgen deelnemers tijdens de workshop
                            veel gelegenheid om met trainingsmaterialen
                            te oefenen.
                        </p>

                    </div>

                </div>
            </section>

        </WorkshopDetailLayout>
    );
}
