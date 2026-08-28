import WorkshopDetailLayout from "../WorkshopDetailLayout.jsx";

import generalImage from "@/assets/image/trainingen/cardImage/workshop.webp?w=1400&format=webp&quality=82";


const facts = [
    {
        type: "audience",
        label: "Voor wie",
        value: "BMC-bedienaars en BHV",
    },
    {
        type: "duration",
        label: "Duur",
        value: "Circa 2 uur",
    },
    {
        type: "format",
        label: "Vorm",
        value: "Uitleg en praktijk",
    },
    {
        type: "location",
        label: "Locatie",
        value: "Eigen brandmeldcentrale",
    },
];


const faqs = [
    {
        question: "Is technische voorkennis nodig?",
        answer:
            "Nee. De workshop is bedoeld voor medewerkers die de brandmeldcentrale moeten kunnen bedienen en meldingen correct moeten kunnen interpreteren. De werking wordt praktisch en begrijpelijk uitgelegd.",
    },
    {
        question: "Kunnen we oefenen op onze eigen brandmeldcentrale?",
        answer:
            "Ja. Dat heeft zelfs de voorkeur. Hierdoor oefenen deelnemers met de centrale, meldingen en zones die zij tijdens een echte situatie ook tegenkomen.",
    },
    {
        question: "Worden storingen ook behandeld?",
        answer:
            "Ja. We bespreken het verschil tussen onder andere brandmeldingen, storingen en uitschakelingen en wat dit betekent voor de opvolging binnen de organisatie.",
    },
    {
        question: "Komt resetten van de centrale ook aan bod?",
        answer:
            "De bediening van de centrale komt aan bod, maar eerst moet duidelijk zijn waarom een melding is ontstaan en welke procedure gevolgd moet worden. Alleen een melding resetten is geen oplossing voor een onbekende oorzaak.",
    },
    {
        question: "Kunnen onze eigen procedures worden meegenomen?",
        answer:
            "Ja. Wanneer interne procedures, plattegronden en taakafspraken beschikbaar zijn, kunnen deze waar mogelijk in de workshop worden verwerkt.",
    },
];

const AlarmVisual = ({ type }) => {
    const visuals = {
        detector: (
            <svg viewBox="0 0 160 100" aria-hidden="true">
                <path className="wd-alarm-visual__detector" d="M44 22h72l-7 18H51Z" />
                <circle className="wd-alarm-visual__led" cx="80" cy="28" r="4" />
                <path className="wd-alarm-visual__smoke wd-alarm-visual__smoke--one" d="M57 82c-13-12 11-18-1-31" />
                <path className="wd-alarm-visual__smoke wd-alarm-visual__smoke--two" d="M80 83c-14-13 12-19-1-33" />
                <path className="wd-alarm-visual__smoke wd-alarm-visual__smoke--three" d="M103 82c-13-12 11-18-1-31" />
            </svg>
        ),
        building: (
            <svg viewBox="0 0 160 100" aria-hidden="true">
                <path className="wd-alarm-visual__building" d="M35 88V24h62v17h28v47Z" />
                <path className="wd-alarm-visual__building-lines" d="M51 40h12v12H51zm27 0h12v12H78zM51 62h12v12H51zm27 0h12v12H78zm31-6h8v8h-8zm0 17h8v8h-8z" />
                <circle className="wd-alarm-visual__zone" cx="57" cy="46" r="10" />
            </svg>
        ),
        panel: (
            <svg viewBox="0 0 160 100" aria-hidden="true">
                <rect className="wd-alarm-visual__panel" x="30" y="18" width="100" height="70" rx="5" />
                <rect className="wd-alarm-visual__screen" x="43" y="31" width="56" height="19" rx="2" />
                <circle className="wd-alarm-visual__led" cx="113" cy="36" r="5" />
                <circle className="wd-alarm-visual__button" cx="51" cy="68" r="6" />
                <circle className="wd-alarm-visual__button" cx="72" cy="68" r="6" />
                <path className="wd-alarm-visual__panel-lines" d="M91 64h25M91 72h25" />
            </svg>
        ),
        alert: (
            <svg viewBox="0 0 160 100" aria-hidden="true">
                <circle className="wd-alarm-visual__alert-ring" cx="80" cy="53" r="31" />
                <path className="wd-alarm-visual__flame" d="M80 76c-15 0-23-10-21-23 1-8 7-13 12-19 1 8 5 11 8 14 5-9 6-18 4-27 13 10 22 23 19 38-2 10-10 17-22 17Z" />
                <path className="wd-alarm-visual__signal wd-alarm-visual__signal--left" d="M36 35c-8 10-8 26 0 36" />
                <path className="wd-alarm-visual__signal wd-alarm-visual__signal--right" d="M124 35c8 10 8 26 0 36" />
            </svg>
        ),
    };

    return <span className={`wd-alarm-visual wd-alarm-visual--${type}`}>{visuals[type]}</span>;
};


export default function BedienaarBrandmeldcentrale() {
    return (
        <WorkshopDetailLayout
            theme="alarm"
            title="Workshop Bedienaar Brandmeldcentrale"

            hero={{
                eyebrow:
                    "Brandmeldinstallatie · praktijkworkshop",

                headline:
                    "Een melding op de brandmeldcentrale is het begin van een proces.",

                lead:
                    "Tijdens deze workshop leren deelnemers begrijpen wat de brandmeldcentrale aangeeft, waar een melding vandaan komt en welke vervolgstappen binnen de eigen organisatie nodig zijn.",

                image:
                    generalImage,

                imageAlt:
                    "Workshop bedienaar brandmeldcentrale",
            }}

            facts={facts}

            faqs={faqs}

            faq={{
                eyebrow: "Veelgestelde vragen",
                title: "Praktische vragen over de brandmeldcentrale",
                introduction:
                    "Brandmeldinstallaties en interne procedures verschillen per locatie. Daarom stemmen we de workshop waar mogelijk af op de eigen installatie en organisatie.",
            }}

            cta={{
                eyebrow: "Workshop op de eigen locatie",

                title:
                    "Oefen met de brandmeldcentrale die medewerkers daadwerkelijk gebruiken",

                text:
                    "Door te trainen op de eigen locatie worden meldingen, zones, procedures en verantwoordelijkheden direct herkenbaar.",

                primaryLabel:
                    "Offerte aanvragen",

                primaryTo:
                    "/offerte",

                secondaryLabel:
                    "Eerst overleggen",

                secondaryTo:
                    "/contact",
            }}
        >

            <section
                className="wd-section"
                id="inhoud"
            >
                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Meer dan bediening
                        </p>

                        <h2>
                            Begrijpen wat de brandmeldcentrale vertelt
                        </h2>
                    </div>

                    <div className="wd-copy">

                        <p className="wd-lead">
                            Een brandmeldcentrale verzamelt informatie
                            vanuit de brandmeldinstallatie. De centrale
                            geeft vervolgens aan waar een melding,
                            storing of andere situatie is ontstaan.
                        </p>

                        <p>
                            Maar daarmee is nog niet automatisch duidelijk
                            wat er in het gebouw aan de hand is.
                        </p>

                        <p>
                            De bedienaar moet de informatie op de centrale
                            kunnen lezen, de locatie van de melding kunnen
                            bepalen en weten welke vervolgstappen binnen
                            de organisatie nodig zijn.
                        </p>

                        <p>
                            Daarom gaat deze workshop niet alleen over
                            knoppen en menu's, maar vooral over
                            <strong>
                                {" "}informatie beoordelen en daarna
                                gestructureerd handelen.
                            </strong>
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            De installatie begrijpen
                        </p>

                        <h2>
                            Van detector naar melding op de centrale
                        </h2>

                        <p>
                            Deelnemers krijgen inzicht in de samenhang
                            tussen de verschillende onderdelen van de
                            brandmeldinstallatie en de informatie die
                            uiteindelijk op de centrale zichtbaar wordt.
                        </p>
                    </div>


                    <div className="wd-card-grid wd-card-grid--4">

                        <article className="wd-card">
                            <AlarmVisual type="detector" />
                            <span className="wd-card__number">
                                01
                            </span>

                            <h3>
                                Detectie
                            </h3>

                            <p>
                                Welke voorzieningen kunnen een melding
                                veroorzaken en hoe komt die informatie
                                bij de centrale terecht?
                            </p>
                        </article>


                        <article className="wd-card">
                            <AlarmVisual type="building" />
                            <span className="wd-card__number">
                                02
                            </span>

                            <h3>
                                Zones en groepen
                            </h3>

                            <p>
                                Deelnemers leren hoe meldingen binnen
                                het gebouw zijn ingedeeld en hoe een
                                locatie kan worden teruggevonden.
                            </p>
                        </article>


                        <article className="wd-card">
                            <AlarmVisual type="panel" />
                            <span className="wd-card__number">
                                03
                            </span>

                            <h3>
                                Centrale
                            </h3>

                            <p>
                                Welke informatie geeft het display en
                                welke signalen vragen om verdere actie?
                            </p>
                        </article>


                        <article className="wd-card">
                            <AlarmVisual type="alert" />
                            <span className="wd-card__number">
                                04
                            </span>

                            <h3>
                                Opvolging
                            </h3>

                            <p>
                                De centrale levert informatie. De
                                organisatie moet vervolgens bepalen
                                wat daarmee gebeurt.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Meldingen herkennen
                        </p>

                        <h2>
                            Niet ieder signaal betekent hetzelfde
                        </h2>
                    </div>


                    <div className="wd-card-grid">

                        <article className="wd-card">
                            <span className="wd-card__label">
                                Melding
                            </span>

                            <h3>
                                Brandmelding
                            </h3>

                            <p>
                                Waar komt de melding vandaan en welke
                                interne acties moeten direct worden
                                gestart?
                            </p>
                        </article>


                        <article className="wd-card">
                            <span className="wd-card__label">
                                Techniek
                            </span>

                            <h3>
                                Storingsmelding
                            </h3>

                            <p>
                                Een storing hoeft geen brand te betekenen,
                                maar kan wel invloed hebben op de werking
                                of beschikbaarheid van de installatie.
                            </p>
                        </article>


                        <article className="wd-card">
                            <span className="wd-card__label">
                                Beschikbaarheid
                            </span>

                            <h3>
                                Uitschakeling
                            </h3>

                            <p>
                                Wanneer een onderdeel is uitgeschakeld,
                                moet duidelijk zijn welk deel van het
                                gebouw daardoor mogelijk minder of niet
                                wordt bewaakt.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Een belangrijke regel
                        </p>

                        <h2>
                            Eerst de oorzaak begrijpen, daarna pas bedienen
                        </h2>
                    </div>

                    <div className="wd-copy">

                        <p className="wd-lead">
                            Een melding wegdrukken of de centrale
                            resetten maakt de oorzaak van een melding
                            niet automatisch ongedaan.
                        </p>

                        <p>
                            Daarom leren deelnemers eerst informatie
                            verzamelen. Welke melding staat op de
                            centrale? Welke locatie hoort daarbij?
                            Is er al een controle uitgevoerd en wat is
                            daarbij aangetroffen?
                        </p>

                        <p>
                            Pas wanneer voldoende duidelijkheid bestaat,
                            kan worden bepaald welke verdere bediening
                            volgens de procedure verantwoord is.
                        </p>

                    </div>
                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading">
                        <p className="wd-kicker">
                            Praktische opvolging
                        </p>

                        <h2>
                            Van melding naar actie
                        </h2>
                    </div>


                    <div className="wd-process">

                        <article className="wd-process__item">
                            <span>01</span>

                            <h3>
                                Melding lezen
                            </h3>

                            <p>
                                Eerst bepalen welk soort melding op
                                de centrale wordt weergegeven.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>02</span>

                            <h3>
                                Locatie bepalen
                            </h3>

                            <p>
                                De zone, groep, detector of ruimte
                                achterhalen die bij de melding hoort.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>03</span>

                            <h3>
                                Controle organiseren
                            </h3>

                            <p>
                                Volgens de eigen procedure zorgen dat
                                de melding veilig wordt onderzocht.
                            </p>
                        </article>


                        <article className="wd-process__item">
                            <span>04</span>

                            <h3>
                                Terugkoppeling
                            </h3>

                            <p>
                                De bevindingen terug ontvangen en op
                                basis daarvan de juiste vervolgstap
                                bepalen.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            <section className="wd-section wd-section--soft">

                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Communicatie
                        </p>

                        <h2>
                            De brandmeldcentrale staat nooit op zichzelf
                        </h2>

                        <p>
                            Tijdens een incident vormt de bedienaar
                            vaak een belangrijke schakel tussen de
                            installatie en de mensen die daadwerkelijk
                            actie moeten ondernemen.
                        </p>
                    </div>


                    <ul className="wd-checklist">

                        <li>
                            Een melding duidelijk kunnen doorgeven.
                        </li>

                        <li>
                            De juiste locatie vermelden.
                        </li>

                        <li>
                            Een controle gericht laten uitvoeren.
                        </li>

                        <li>
                            Terugkoppeling ontvangen en begrijpen.
                        </li>

                        <li>
                            Informatie binnen de eigen organisatie op
                            de juiste plaats krijgen.
                        </li>

                        <li>
                            De situatie duidelijk kunnen overdragen
                            wanneer verdere hulp nodig is.
                        </li>

                    </ul>

                </div>
            </section>


            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-callout wd-callout--orange">

                        <p className="wd-kicker">
                            Eigen centrale
                        </p>

                        <h2>
                            De meeste waarde ontstaat wanneer we trainen op jullie eigen installatie
                        </h2>

                        <p>
                            Brandmeldcentrales en de inrichting van
                            installaties verschillen per gebouw.
                            Daarom heeft oefenen op de eigen locatie
                            de voorkeur.
                        </p>

                        <p>
                            Deelnemers herkennen dan direct hun eigen
                            display, zones, plattegronden, interne
                            afspraken en communicatielijnen.
                        </p>

                    </div>

                </div>
            </section>

        </WorkshopDetailLayout>
    );
}
