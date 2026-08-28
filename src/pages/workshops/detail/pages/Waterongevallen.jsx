import WorkshopDetailLayout from "../WorkshopDetailLayout.jsx";

import generalImage from "@/assets/image/trainingen/cardImage/workshop.webp?w=1400&format=webp&quality=82";


const facts = [
    {
        type: "audience",
        label: "Voor wie",
        value: "Teams werkzaam nabij water",
    },
    {
        type: "duration",
        label: "Duur",
        value: "Circa 2–3 uur",
    },
    {
        type: "format",
        label: "Vorm",
        value: "Uitleg en praktijk",
    },
    {
        type: "location",
        label: "Locatie",
        value: "Bij voorkeur nabij water",
    },
];


const faqs = [
    {
        question: "Moeten deelnemers kunnen zwemmen?",
        answer:
            "Nee. Het uitgangspunt van de workshop is juist om hulp vanaf een zo veilig mogelijke positie te organiseren zonder jezelf onnodig in gevaar te brengen.",
    },
    {
        question: "Kan de workshop op onze eigen locatie plaatsvinden?",
        answer:
            "Ja. Wanneer de organisatie bij een haven, kade, bassin of ander water is gevestigd, kan de eigen omgeving veel waarde toevoegen.",
    },
    {
        question: "Kunnen onze eigen reddingsmiddelen worden gebruikt?",
        answer:
            "Wanneer deze geschikt zijn om veilig mee te oefenen, kunnen aanwezige reddingsmiddelen bij de workshop worden betrokken.",
    },
    {
        question: "Komt onderkoeling ook aan bod?",
        answer:
            "Ja. We bespreken aandachtspunten nadat een slachtoffer uit het water is en waarom koude ook daarna relevant kan blijven.",
    },
];


export default function Waterongevallen() {
    return (
        <WorkshopDetailLayout
            theme="water"
            title="Workshop Waterongevallen"

            hero={{
                eyebrow:
                    "Veiligheid rond water · praktijkworkshop",

                headline:
                    "Help een ander zonder zelf het volgende slachtoffer te worden.",

                lead:
                    "Tijdens deze workshop leren deelnemers risico's bij waterincidenten beoordelen, professionele hulp inschakelen en beschikbare reddingsmiddelen vanuit een veilige positie inzetten.",

                image:
                    generalImage,

                imageAlt:
                    "Workshop veilig handelen bij waterongevallen",
            }}

            facts={facts}

            faqs={faqs}

            cta={{
                eyebrow:
                    "Workshop nabij water",

                title:
                    "Oefen op de plek waar het risico daadwerkelijk aanwezig is",

                text:
                    "Wanneer mogelijk stemmen we de workshop af op jullie eigen wateromgeving, reddingsmiddelen en praktische omstandigheden.",
            }}
        >

            <section
                className="wd-section"
                id="inhoud"
            >
                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Eigen veiligheid
                        </p>

                        <h2>
                            Een waterincident kan ook de hulpverlener in gevaar brengen
                        </h2>
                    </div>


                    <div className="wd-copy">

                        <p className="wd-lead">
                            Wanneer iemand in het water in moeilijkheden
                            raakt, kan de eerste reactie zijn om direct
                            naar het slachtoffer toe te gaan.
                        </p>

                        <p>
                            Juist daardoor kan een tweede slachtoffer
                            ontstaan.
                        </p>

                        <p>
                            Daarom begint de workshop bij het beoordelen
                            van risico's en het zoeken naar een manier
                            om vanuit een zo veilig mogelijke positie
                            hulp te bieden.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Risico's
                        </p>

                        <h2>
                            Water is niet overal hetzelfde
                        </h2>
                    </div>


                    <div className="wd-card-grid wd-card-grid--4">

                        <article className="wd-card">
                            <h3>
                                Stroming
                            </h3>

                            <p>
                                Bewegend water kan zowel het slachtoffer
                                als de hulpverlener snel verplaatsen.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Temperatuur
                            </h3>

                            <p>
                                Koud water kan grote invloed hebben op
                                de mogelijkheden en toestand van een
                                slachtoffer.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Diepte en zicht
                            </h3>

                            <p>
                                De bodem, diepte en aanwezige obstakels
                                zijn vanaf de kant niet altijd zichtbaar.
                            </p>
                        </article>


                        <article className="wd-card">
                            <h3>
                                Paniek
                            </h3>

                            <p>
                                Een persoon in nood kan onverwacht
                                reageren en daarmee ook een hulpverlener
                                in gevaar brengen.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Hulp vanaf de kant
                        </p>

                        <h2>
                            Gebruik eerst de middelen die al beschikbaar zijn
                        </h2>

                        <p>
                            Veel locaties nabij water beschikken over
                            reddingsmiddelen. Deze hebben alleen waarde
                            wanneer medewerkers weten waar ze liggen
                            en hoe zij ermee kunnen omgaan.
                        </p>
                    </div>


                    <ul className="wd-checklist">

                        <li>
                            Aanwezige reddingsmiddelen herkennen.
                        </li>

                        <li>
                            Weten waar deze middelen zijn geplaatst.
                        </li>

                        <li>
                            Een werplijn doelgericht kunnen gebruiken.
                        </li>

                        <li>
                            Een reddingsboei kunnen inzetten.
                        </li>

                        <li>
                            Geschikte geïmproviseerde hulpmiddelen
                            herkennen.
                        </li>

                        <li>
                            De eigen veilige positie behouden.
                        </li>

                    </ul>

                </div>
            </section>


            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Alarmeren
                        </p>

                        <h2>
                            Hulpdiensten moeten niet alleen weten wat er gebeurt, maar ook waar
                        </h2>
                    </div>


                    <div className="wd-copy">

                        <p>
                            Langs havens, kades, recreatiegebieden en
                            grote bedrijfsterreinen kan een exacte
                            locatieomschrijving bijzonder belangrijk
                            zijn.
                        </p>

                        <p>
                            Deelnemers oefenen daarom ook met het
                            doorgeven van bruikbare informatie over
                            de locatie, het slachtoffer en de situatie.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading wd-heading--water-rescue">
                        <p className="wd-kicker">
                            Nadat iemand uit het water is
                        </p>

                        <h2>
                            De hulpverlening stopt niet aan de waterkant

                            <span
                                className="wd-water-rescue-person"
                                aria-hidden="true"
                            >
                                <svg viewBox="0 0 120 110" focusable="false">
                                    <g className="wd-water-rescue-person__body">
                                        <path
                                            className="wd-water-rescue-person__arm wd-water-rescue-person__arm--left"
                                            d="M49 59 C37 51 28 37 22 18"
                                        />
                                        <path
                                            className="wd-water-rescue-person__arm wd-water-rescue-person__arm--right"
                                            d="M71 59 C83 50 91 34 96 14"
                                        />
                                        <path
                                            className="wd-water-rescue-person__torso"
                                            d="M43 103 C43 72 48 52 60 49 C72 52 77 72 77 103 Z"
                                        />
                                        <circle
                                            className="wd-water-rescue-person__head"
                                            cx="60"
                                            cy="35"
                                            r="12"
                                        />
                                    </g>
                                </svg>
                            </span>
                        </h2>

                        <p>
                            Zodra een slachtoffer veilig uit het water
                            is, moet opnieuw worden beoordeeld welke
                            hulp nodig is en welke informatie aan
                            professionele hulpverleners moet worden
                            overgedragen.
                        </p>
                    </div>

                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-callout wd-callout--orange">

                        <p className="wd-kicker">
                            Eigen locatie
                        </p>

                        <h2>
                            De omgeving maakt onderdeel uit van de oefening
                        </h2>

                        <p>
                            Wanneer een organisatie daadwerkelijk aan
                            of nabij water ligt, bekijken we waar
                            mogelijk de aanwezige situatie.
                        </p>

                        <p>
                            Daardoor wordt zichtbaar waar reddingsmiddelen
                            liggen, welke plekken goed bereikbaar zijn
                            en welke beperkingen de eigen omgeving
                            tijdens een incident kan opleveren.
                        </p>

                    </div>

                </div>
            </section>

        </WorkshopDetailLayout>
    );
}
