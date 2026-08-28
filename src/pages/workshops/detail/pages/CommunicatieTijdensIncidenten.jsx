import WorkshopDetailLayout from "../WorkshopDetailLayout.jsx";

import generalImage from "@/assets/image/trainingen/cardImage/workshop.webp?w=1400&format=webp&quality=82";


const facts = [
    {
        type: "audience",
        label: "Voor wie",
        value: "BHV- en veiligheidsteams",
    },
    {
        type: "duration",
        label: "Duur",
        value: "Circa 2 uur",
    },
    {
        type: "format",
        label: "Vorm",
        value: "Praktische oefeningen",
    },
    {
        type: "location",
        label: "Locatie",
        value: "Incompany",
    },
];


const faqs = [
    {
        question: "Gaat deze workshop alleen over portofoongebruik?",
        answer:
            "Nee. Portofoongebruik is één onderdeel. De workshop gaat vooral over het verzamelen, formuleren, doorgeven en terugkoppelen van informatie tijdens incidenten.",
    },
    {
        question: "Kunnen we onze eigen portofoons gebruiken?",
        answer:
            "Ja. Dat heeft de voorkeur, omdat deelnemers dan direct oefenen met de apparatuur, kanalen en instellingen die binnen de organisatie worden gebruikt.",
    },
    {
        question: "Hebben deelnemers portofoonervaring nodig?",
        answer:
            "Nee. De oefeningen kunnen worden aangepast aan zowel beginnende als ervaren gebruikers.",
    },
    {
        question: "Kunnen onze eigen roepnamen worden gebruikt?",
        answer:
            "Ja. Wanneer binnen de organisatie vaste roepnamen en communicatieafspraken bestaan, kunnen deze in de oefeningen worden verwerkt.",
    },
    {
        question: "Kunnen we de oefeningen moeilijker maken voor ervaren BHV'ers?",
        answer:
            "Ja. De moeilijkheid kan worden opgebouwd door meer deelnemers, gelijktijdige informatie en incidentgerichte opdrachten toe te voegen.",
    },
];


export default function CommunicatieTijdensIncidenten() {
    return (
        <WorkshopDetailLayout
            theme="signal"
            title="Workshop Communicatie tijdens Incidenten"

            hero={{
                eyebrow:
                    "Communicatie · praktijkworkshop",

                headline:
                    "Goede communicatie is niet méér praten. Het is de juiste informatie overbrengen.",

                lead:
                    "Tijdens incidenten moet informatie snel, duidelijk en bruikbaar worden gedeeld. Deelnemers oefenen met waarnemen, melden, luisteren, terugkoppelen en communiceren via portofoons.",

                image:
                    generalImage,

                imageAlt:
                    "Workshop communicatie en portofoongebruik tijdens incidenten",
            }}

            facts={facts}

            faqs={faqs}

            faq={{
                title:
                    "Praktische vragen",
            }}

            cta={{
                eyebrow:
                    "Communicatie op locatie",

                title:
                    "Maak van communicatie een geoefende vaardigheid",

                text:
                    "We kunnen de oefeningen afstemmen op jullie eigen portofoons, roepnamen, locatie, procedures en BHV-organisatie.",
            }}
        >

            <section
                className="wd-section"
                id="inhoud"
            >
                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Waarom oefenen?
                        </p>

                        <h2>
                            Tijdens een incident ontstaat gemakkelijk ruis
                        </h2>
                    </div>


                    <div className="wd-copy">

                        <p className="wd-lead">
                            Een boodschap die voor de zender duidelijk
                            klinkt, hoeft voor de ontvanger nog niet
                            dezelfde betekenis te hebben.
                        </p>

                        <p>
                            Tijdens een incident komt daar tijdsdruk bij.
                            Mensen willen snel informatie delen, meerdere
                            personen proberen tegelijk te communiceren
                            en belangrijke details kunnen verloren gaan.
                        </p>

                        <p>
                            Daarom draait deze workshop niet alleen om
                            het bedienen van een portofoon. Deelnemers
                            oefenen vooral met
                            <strong>
                                {" "}duidelijke en bruikbare communicatie.
                            </strong>
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Van waarneming naar melding
                        </p>

                        <h2>
                            Eerst bepalen wat de ander werkelijk moet weten
                        </h2>
                    </div>


                    <div className="wd-process">

                        <article className="wd-process__item">
                            <span>01</span>

                            <h3>
                                Waarnemen
                            </h3>

                            <p>
                                Wat zie, hoor of weet je daadwerkelijk
                                over de situatie?
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>02</span>

                            <h3>
                                Selecteren
                            </h3>

                            <p>
                                Welke informatie is belangrijk voor
                                degene die jouw melding ontvangt?
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>03</span>

                            <h3>
                                Melden
                            </h3>

                            <p>
                                De informatie kort, rustig en begrijpelijk
                                overbrengen.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>04</span>

                            <h3>
                                Bevestigen
                            </h3>

                            <p>
                                Controleren of de boodschap daadwerkelijk
                                goed is ontvangen en begrepen.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Berichtopbouw
                        </p>

                        <h2>
                            Kort betekent niet onvolledig
                        </h2>

                        <p>
                            Een goed bericht bevat voldoende informatie
                            om de ontvanger te laten begrijpen wat er
                            speelt en welke actie eventueel nodig is.
                        </p>
                    </div>


                    <ul className="wd-checklist">

                        <li>
                            Wie geeft de melding?
                        </li>

                        <li>
                            Waar speelt de situatie zich af?
                        </li>

                        <li>
                            Wat is er daadwerkelijk waargenomen?
                        </li>

                        <li>
                            Welke hulp of actie is nodig?
                        </li>

                        <li>
                            Welke informatie heeft prioriteit?
                        </li>

                        <li>
                            Is de melding goed ontvangen?
                        </li>

                    </ul>

                </div>
            </section>


            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Portofoongebruik
                        </p>

                        <h2>
                            De techniek mag de communicatie niet in de weg zitten
                        </h2>
                    </div>


                    <div className="wd-copy">

                        <p>
                            Een portofoon is een hulpmiddel. Wanneer
                            medewerkers tijdens een incident nog moeten
                            zoeken naar het juiste kanaal of niet weten
                            hoe zij het toestel moeten gebruiken, gaat
                            kostbare aandacht verloren.
                        </p>

                        <p>
                            Daarom oefenen we met de basisbediening,
                            spreekafstand, zenddiscipline, luisteren
                            voordat wordt gezonden en het omgaan met
                            bereik en storingen.
                        </p>

                    </div>

                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Gespreksdiscipline
                        </p>

                        <h2>
                            Eén kanaal kan niet iedereen tegelijk gebruiken
                        </h2>
                    </div>


                    <div className="wd-card-grid wd-card-grid--discipline">

                        <article className="wd-card">
                            <h3>
                                Eerst luisteren
                            </h3>

                            <p>
                                Voordat een bericht wordt verzonden,
                                moet duidelijk zijn of het kanaal vrij
                                is.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Kort communiceren
                            </h3>

                            <p>
                                Lange gesprekken blokkeren het kanaal
                                voor andere deelnemers die mogelijk
                                urgente informatie hebben.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Terugkoppelen
                            </h3>

                            <p>
                                Een opdracht of melding is pas bruikbaar
                                wanneer duidelijk is dat deze correct
                                is ontvangen.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Stap voor stap
                        </p>

                        <h2>
                            Van eenvoudige opdracht naar incidentcommunicatie
                        </h2>
                    </div>


                    <div className="wd-card-grid wd-card-grid--communication-steps">

                        <article className="wd-card">
                            <span className="wd-card__number">
                                01
                            </span>

                            <h3>
                                Basisoefeningen
                            </h3>

                            <p>
                                Deelnemers oefenen eerst met eenvoudige
                                berichten zodat techniek en berichtopbouw
                                vertrouwd worden.
                            </p>
                        </article>


                        <article className="wd-card">
                            <span className="wd-card__number">
                                02
                            </span>

                            <h3>
                                Informatie overdragen
                            </h3>

                            <p>
                                We onderzoeken welke informatie behouden
                                blijft wanneer een melding via meerdere
                                personen wordt doorgegeven.
                            </p>
                        </article>


                        <article className="wd-card">
                            <span className="wd-card__number">
                                03
                            </span>

                            <h3>
                                Meerdere gebruikers
                            </h3>

                            <p>
                                Meer deelnemers gebruiken hetzelfde
                                netwerk, waardoor luisteren en prioriteiten
                                herkennen belangrijker worden.
                            </p>
                        </article>


                        <article className="wd-card">
                            <span className="wd-card__number">
                                04
                            </span>

                            <h3>
                                Incidentgerichte oefening
                            </h3>

                            <p>
                                Uiteindelijk worden communicatie,
                                taakverdeling en informatie-uitwisseling
                                gecombineerd in een praktijksituatie.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-callout wd-callout--orange">

                        <p className="wd-kicker">
                            Het resultaat
                        </p>

                        <h2>
                            Minder woorden. Duidelijkere informatie.
                        </h2>

                        <p>
                            Deelnemers leren niet alleen een portofoon
                            gebruiken. Zij leren vooral nadenken over
                            welke informatie een ander nodig heeft om
                            verder te kunnen handelen.
                        </p>

                        <p>
                            Daardoor wordt communicatie tijdens een
                            incident rustiger, korter en beter bruikbaar.
                        </p>

                    </div>

                </div>
            </section>

        </WorkshopDetailLayout>
    );
}
