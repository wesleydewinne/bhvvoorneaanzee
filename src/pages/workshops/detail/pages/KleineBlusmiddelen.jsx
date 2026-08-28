import WorkshopDetailLayout from "./../WorkshopDetailLayout.jsx";
import { Flame, Wind } from "lucide-react";
import fireClassA from "@/assets/icons/brandklassen/brandklasse-a.svg";
import fireClassB from "@/assets/icons/brandklassen/brandklasse-b.svg";
import portableExtinguisherPictogram from "@/assets/icons/blusmiddelen/iso-7010-f001-brandblusser.svg";
import fireHoseReelPictogram from "@/assets/icons/blusmiddelen/iso-7010-f002-brandslanghaspel.svg";
import fireBlanketPictogram from "@/assets/icons/blusmiddelen/iso-7010-f016-blusdeken.svg";

import fireImage from "@/assets/image/homepageFotos/Wesley De Winne instructie brandblusser.webp?w=1400&format=webp&quality=82";


/* =========================================================
   PRAKTISCHE GEGEVENS
========================================================= */

const facts = [
    {
        type: "audience",
        label: "Voor wie",
        value: "BHV'ers en medewerkers",
    },
    {
        type: "duration",
        label: "Duur",
        value: "Circa 3 uur",
    },
    {
        type: "format",
        label: "Vorm",
        value: "Uitleg en praktijk",
    },
    {
        type: "location",
        label: "Locatie",
        value: "Incompany",
    },
];


/* =========================================================
   BRANDKLASSEN
========================================================= */

const fireClasses = [
    {
        className: "A",
        pictogram: fireClassA,
        title: "Vaste stoffen",
        text: "Brandklasse A omvat branden van vaste stoffen zoals hout, papier, karton, textiel en veel kunststoffen.",
    },
    {
        className: "B",
        pictogram: fireClassB,
        title: "Vloeistoffen",
        text: "Brandklasse B heeft betrekking op brandbare vloeistoffen en stoffen die bij verhitting vloeibaar worden.",
    },
    {
        className: "C",
        pictogram: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Fire_Class_C.svg",
        title: "Gassen",
        text: "Brandklasse C betreft brandbare gassen. Daarbij is het veilig stoppen van de gastoevoer een belangrijk onderdeel van de aanpak.",
    },
    {
        className: "D",
        pictogram: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Fire_Class_D.svg",
        title: "Metalen",
        text: "Brandklasse D bestaat uit metaalbranden. Hiervoor zijn specifieke blusmiddelen en een aangepaste werkwijze nodig.",
    },
    {
        className: "F",
        pictogram: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Fire_Class_F.svg",
        title: "Vetten en oliën",
        text: "Brandklasse F betreft grote hoeveelheden bak- en frituurvetten en oliën, bijvoorbeeld in professionele keukens.",
    },
];


/* =========================================================
   BLUSMIDDELEN
========================================================= */

const extinguishingAgents = [
    {
        title: "Schuimblusser",
        pictogram: portableExtinguisherPictogram,
        mediumLabel: "Schuim",
        text: "Een veelgebruikt blusmiddel binnen bedrijven. Deelnemers leren waarvoor schuim geschikt is, hoe het middel wordt ingezet en welke beperkingen er zijn.",
    },
    {
        title: "CO₂-blusser",
        pictogram: portableExtinguisherPictogram,
        mediumLabel: "CO₂",
        text: "CO₂ wordt onder andere toegepast bij bepaalde vloeistofbranden en elektrische apparatuur. We besteden aandacht aan de werking, inzetafstand en risico's van het middel.",
    },
    {
        title: "Sprayblusser",
        pictogram: portableExtinguisherPictogram,
        mediumLabel: "Spray",
        text: "Sprayblussers zijn compact en eenvoudig inzetbaar, maar de toepassingsmogelijkheden verschillen per type. Daarom leren deelnemers altijd naar de classificatie van het blusmiddel te kijken.",
    },
    {
        title: "Poederblusser",
        pictogram: portableExtinguisherPictogram,
        mediumLabel: "Poeder",
        text: "Poeder heeft een krachtige bluswerking en een brede inzetbaarheid. Tegelijkertijd kan het grote gevolgen hebben voor zicht, apparatuur en de omgeving.",
    },
    {
        title: "Brandslanghaspel",
        pictogram: fireHoseReelPictogram,
        mediumLabel: "Water",
        text: "Een brandslanghaspel beschikt over een continue watertoevoer. Deelnemers leren wanneer water geschikt is en wanneer een brandslanghaspel juist niet de juiste keuze is.",
    },
    {
        title: "Blusdeken",
        pictogram: fireBlanketPictogram,
        mediumLabel: "Blusdeken",
        text: "De blusdeken heeft een beperkt toepassingsgebied. We bespreken waarvoor deze bedoeld is en waarom het belangrijk is om niet automatisch voor een blusdeken te kiezen.",
    },
];


/* =========================================================
   FAQ
========================================================= */

const faqs = [
    {
        question: "Moeten deelnemers BHV'er zijn?",
        answer:
            "Nee. De workshop is geschikt voor BHV'ers én andere medewerkers die meer willen leren over brand, blusmiddelen en veilig handelen bij een beginnende brand.",
    },
    {
        question: "Oefenen deelnemers daadwerkelijk met blusmiddelen?",
        answer:
            "Ja. Praktijk vormt een belangrijk onderdeel van de workshop. Welke middelen en oefeningen worden gebruikt, stemmen we vooraf af op de locatie en de gewenste invulling.",
    },
    {
        question: "Kunnen onze eigen blusmiddelen worden meegenomen in de workshop?",
        answer:
            "Ja. We kijken waar mogelijk naar de blusmiddelen die binnen de organisatie aanwezig zijn. Daardoor leren deelnemers niet alleen algemene principes, maar herkennen zij ook de middelen op hun eigen werkplek.",
    },
    {
        question: "Worden alle brandklassen behandeld?",
        answer:
            "We behandelen de brandklassen A, B, C, D en F en leggen uit waarom de aard van de brand bepalend is voor de keuze van het blusmiddel.",
    },
    {
        question: "Komen lithium-ion accu's ook aan bod?",
        answer:
            "Wanneer lithium-ion accu's binnen de organisatie een relevant risico vormen, besteden we aandacht aan de bijzondere brandontwikkeling, herontsteking en de beperkingen van een eerste bluspoging.",
    },
    {
        question: "Kan de workshop worden afgestemd op onze organisatie?",
        answer:
            "Ja. Juist doordat de workshop incompany wordt verzorgd, kunnen we de aanwezige risico's, blusmiddelen, werkomgeving en praktische aandachtspunten meenemen.",
    },
];


/* =========================================================
   PAGE
========================================================= */

export default function KleineBlusmiddelen() {
    return (
        <WorkshopDetailLayout
            theme="fire"
            title="Workshop Kleine Blusmiddelen"

            hero={{
                eyebrow:
                    "Brandveiligheid · praktijkworkshop",

                headline:
                    "Een beginnende brand. Weet waarmee je kunt blussen — en wanneer je beter niet kunt blussen.",

                lead:
                    "Tijdens deze praktijkgerichte workshop leren deelnemers hoe brand ontstaat, hoe verschillende brandklassen worden herkend en welk blusmiddel bij een situatie past. Daarna gaan zij zelf aan de slag met het beoordelen en bestrijden van een beginnende brand.",

                image:
                    fireImage,

                imageAlt:
                    "Praktijkinstructie met een brandblusser tijdens de workshop kleine blusmiddelen",
            }}

            facts={facts}

            faqs={faqs}

            faq={{
                eyebrow: "Veelgestelde vragen",
                title: "Praktische vragen over kleine blusmiddelen",
                introduction:
                    "De precieze uitvoering stemmen we af op de organisatie, deelnemers en beschikbare oefenruimte. Hieronder beantwoorden we alvast een aantal veelgestelde vragen.",
            }}

            cta={{
                eyebrow: "Workshop op locatie",

                title:
                    "Leer medewerkers bewust en veilig omgaan met blusmiddelen",

                text:
                    "We stemmen de workshop af op de deelnemers, de aanwezige brandrisico's en de blusmiddelen binnen jouw organisatie.",

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

            {/* =================================================
                INTRODUCTIE
            ================================================== */}

            <section
                className="wd-section"
                id="inhoud"
            >
                <div className="wd-shell wd-split">

                    <div>
                        <p className="wd-kicker">
                            Eerst beoordelen
                        </p>

                        <h2>
                            Een blusmiddel gebruiken begint niet bij de blusser
                        </h2>
                    </div>

                    <div className="wd-copy">

                        <p className="wd-lead">
                            Wanneer iemand een beginnende brand ontdekt,
                            moet in korte tijd worden bepaald wat er
                            brandt, hoe de situatie zich ontwikkelt en
                            of het nog verantwoord is om zelf op te
                            treden.
                        </p>

                        <p>
                            Het pakken van de dichtstbijzijnde
                            brandblusser is daarom niet automatisch de
                            juiste eerste stap.
                        </p>

                        <p>
                            Deelnemers leren tijdens deze workshop eerst
                            naar de situatie te kijken. Welke stof
                            brandt? Hoe groot is de brand? Wat doet de
                            rook? Is er nog een veilige vluchtroute en
                            welk blusmiddel is beschikbaar?
                        </p>

                        <p>
                            Pas wanneer die afweging is gemaakt, komt de
                            vraag:
                            <strong>
                                {" "}kan ik veilig een eerste
                                bluspoging doen en welk middel gebruik
                                ik daarvoor?
                            </strong>
                        </p>

                    </div>
                </div>
            </section>


            {/* =================================================
                BRAND ONTSTAAT
            ================================================== */}

            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">

                        <p className="wd-kicker">
                            Brand begrijpen
                        </p>

                        <h2>
                            Hoe ontstaat en ontwikkelt een brand?
                        </h2>

                        <p>
                            Om een beginnende brand goed te kunnen
                            beoordelen, moet je begrijpen wat er nodig
                            is om brand te laten ontstaan en waardoor
                            een situatie verder kan escaleren.
                        </p>

                    </div>


                    <div className="wd-card-grid wd-card-grid--4">

                        <article className="wd-card wd-card--fire-factor">

                            <div className="wd-fire-factor__top">
                                <span className="wd-card__number">01</span>
                                <span className="wd-fire-factor__icon-wrap wd-fire-factor__icon-wrap--wood" aria-hidden="true">
                                    <svg viewBox="0 0 48 48">
                                        <path className="wd-fire-factor__log" d="M7 30h25v9H7zM16 20h25v9H16z" />
                                        <path className="wd-fire-factor__wood-smoke wd-fire-factor__wood-smoke--one" d="M20 17c-5-5 5-7 0-12" />
                                        <path className="wd-fire-factor__wood-smoke wd-fire-factor__wood-smoke--two" d="M31 17c-5-5 5-7 0-12" />
                                    </svg>
                                </span>
                            </div>

                            <h3>
                                Brandbare stof
                            </h3>

                            <p>
                                Deelnemers leren kijken naar het
                                materiaal dat brandt en begrijpen dat
                                verschillende stoffen zich tijdens een
                                brand anders gedragen.
                            </p>

                        </article>


                        <article className="wd-card wd-card--fire-factor">

                            <div className="wd-fire-factor__top">
                                <span className="wd-card__number">02</span>
                                <span className="wd-fire-factor__icon-wrap wd-fire-factor__icon-wrap--oxygen" aria-hidden="true">
                                    <Wind className="wd-fire-factor__icon" />
                                </span>
                            </div>

                            <h3>
                                Zuurstof
                            </h3>

                            <p>
                                Brand heeft zuurstof nodig. We bespreken
                                welke rol zuurstoftoevoer speelt bij het
                                ontstaan en voortbestaan van een brand.
                            </p>

                        </article>


                        <article className="wd-card wd-card--fire-factor">

                            <div className="wd-fire-factor__top">
                                <span className="wd-card__number">03</span>
                                <span className="wd-fire-factor__icon-wrap wd-fire-factor__icon-wrap--temperature" aria-hidden="true">
                                    <svg className="wd-fire-factor__thermometer" viewBox="0 0 32 48">
                                        <defs>
                                            <linearGradient id="fire-factor-temperature-gradient" x1="0" y1="1" x2="0" y2="0">
                                                <stop offset="0%" stopColor="#1598e5" />
                                                <stop offset="48%" stopColor="#ffad0a" />
                                                <stop offset="100%" stopColor="#ef321d" />
                                            </linearGradient>
                                        </defs>
                                        <rect className="wd-fire-factor__thermometer-tube" x="12" y="3" width="8" height="32" rx="4" />
                                        <circle className="wd-fire-factor__thermometer-outline" cx="16" cy="38" r="7" />
                                        <g className="wd-fire-factor__thermometer-liquid">
                                            <rect x="14" y="7" width="4" height="31" rx="2" />
                                        </g>
                                        <circle className="wd-fire-factor__thermometer-bulb" cx="16" cy="38" r="4.5" />
                                        <path className="wd-fire-factor__thermometer-shine" d="M14.2 35.7a3.7 3.7 0 0 0-1.3 2.8" />
                                    </svg>
                                </span>
                            </div>

                            <h3>
                                Temperatuur
                            </h3>

                            <p>
                                Warmte kan ervoor zorgen dat andere
                                materialen gaan ontleden, ontbranden en
                                de brand zich verder uitbreidt.
                            </p>

                        </article>


                        <article className="wd-card wd-card--fire-factor">

                            <div className="wd-fire-factor__top">
                                <span className="wd-card__number">04</span>
                                <span className="wd-fire-factor__icon-wrap wd-fire-factor__icon-wrap--flame" aria-hidden="true">
                                    <Flame className="wd-fire-factor__icon" />
                                </span>
                            </div>

                            <h3>
                                Brandontwikkeling
                            </h3>

                            <p>
                                Een kleine brand kan snel veranderen.
                                Daarom leren deelnemers niet alleen naar
                                vlammen kijken, maar ook naar rook,
                                warmte en de omgeving.
                            </p>

                        </article>

                    </div>
                </div>
            </section>


            {/* =================================================
                BRANDKLASSEN
            ================================================== */}

            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading">

                        <p className="wd-kicker">
                            Brandklassen
                        </p>

                        <h2>
                            Wat brandt er?
                        </h2>

                        <p>
                            De keuze voor een blusmiddel begint met het
                            herkennen van de brandende stof. Daarom
                            besteden we aandacht aan de verschillende
                            brandklassen en de eigenschappen die daarbij
                            horen.
                        </p>

                    </div>


                    <div className="wd-card-grid wd-card-grid--fire-classes">

                        {fireClasses.map(
                            (fireClass) => (
                                <article
                                    className="wd-card"
                                    key={
                                        fireClass.className
                                    }
                                >

                                    <div className="wd-fire-class-heading">
                                        <span className="wd-card__label">
                                            Brandklasse{" "}
                                            {fireClass.className}
                                        </span>
                                        <img
                                            className="wd-fire-class-pictogram"
                                            src={fireClass.pictogram}
                                            alt={`Pictogram brandklasse ${fireClass.className}`}
                                            loading="lazy"
                                        />
                                    </div>

                                    <h3>
                                        {fireClass.title}
                                    </h3>

                                    <p>
                                        {fireClass.text}
                                    </p>

                                </article>
                            )
                        )}

                    </div>

                </div>
            </section>


            {/* =================================================
                VAN BRANDKLASSE NAAR BLUSMIDDEL
            ================================================== */}

            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>

                        <p className="wd-kicker">
                            De juiste keuze
                        </p>

                        <h2>
                            Niet ieder blusmiddel past bij iedere brand
                        </h2>

                    </div>


                    <div className="wd-copy">

                        <p className="wd-lead">
                            Het verkeerde blusmiddel kan onvoldoende
                            effect hebben of een situatie juist
                            gevaarlijker maken.
                        </p>

                        <p>
                            Daarom kijken deelnemers niet alleen naar
                            de kleur of vorm van een brandblusser, maar
                            naar de eigenschappen en classificatie van
                            het middel.
                        </p>

                        <p>
                            Daarbij bespreken we ook waarom een
                            blusmiddel dat bij de ene brand heel
                            effectief is, bij een andere situatie juist
                            ongeschikt kan zijn.
                        </p>

                    </div>

                </div>
            </section>


            {/* =================================================
                BLUSMIDDELEN
            ================================================== */}

            <section className="wd-section wd-section--soft">

                <div className="wd-shell">

                    <div className="wd-heading">

                        <p className="wd-kicker">
                            Blusmiddelen
                        </p>

                        <h2>
                            Herkennen wat je tot je beschikking hebt
                        </h2>

                        <p>
                            Tijdens de workshop bespreken we
                            verschillende blusmiddelen. Welke middelen
                            praktisch worden ingezet, hangt af van de
                            afgesproken workshop en de mogelijkheden op
                            locatie.
                        </p>

                    </div>


                    <div className="wd-card-grid wd-card-grid--extinguishers">

                        {extinguishingAgents.map(
                            (agent) => {
                                return (
                                <article
                                    className="wd-card"
                                    key={agent.title}
                                >

                                    <div className="wd-extinguisher-heading">
                                        <h3>
                                            {agent.title}
                                        </h3>
                                        <div className="wd-extinguisher-mark">
                                            <img
                                                src={agent.pictogram}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                            <span>{agent.mediumLabel}</span>
                                        </div>
                                    </div>

                                    <p>
                                        {agent.text}
                                    </p>

                                </article>
                                );
                            }
                        )}

                    </div>

                </div>
            </section>


            {/* =================================================
                VEILIG OPTREDEN
            ================================================== */}

            <section className="wd-section">

                <div className="wd-shell wd-split wd-split--center">

                    <div>

                        <p className="wd-kicker">
                            Grenzen herkennen
                        </p>

                        <h2>
                            Weten wanneer je niet moet blussen is óók een vaardigheid
                        </h2>

                        <p className="wd-lead">
                            Een eerste bluspoging mag nooit belangrijker
                            worden dan de veiligheid van de
                            hulpverlener en andere aanwezigen.
                        </p>

                        <p>
                            Daarom leren deelnemers voortdurend opnieuw
                            te beoordelen of optreden nog verantwoord
                            is.
                        </p>

                    </div>


                    <div className="wd-callout wd-callout--orange">

                        <p className="wd-kicker">
                            De veiligheidsafweging
                        </p>

                        <h2>
                            Houd altijd een veilige weg terug
                        </h2>

                        <p>
                            Deelnemers leren onder andere letten op
                            brandontwikkeling, rook, hitte, afstand en
                            hun beschikbare vluchtroute.
                        </p>

                        <p>
                            Wordt de situatie te groot, te heet, te
                            onoverzichtelijk of ontstaat er twijfel over
                            de eigen veiligheid? Dan is terugtrekken,
                            alarmeren en ontruimen belangrijker dan een
                            bluspoging voortzetten.
                        </p>

                    </div>

                </div>
            </section>


            {/* =================================================
                LITHIUM-ION
            ================================================== */}

            <section className="wd-section wd-section--dark">

                <div className="wd-shell wd-split">

                    <div>

                        <p className="wd-kicker">
                            Actuele risico's
                        </p>

                        <h2>
                            Lithium-ion accu's vragen extra aandacht
                        </h2>

                    </div>


                    <div className="wd-copy">

                        <p>
                            Steeds meer organisaties gebruiken
                            apparatuur, gereedschap, fietsen, voertuigen
                            en andere systemen met lithium-ion accu's.
                        </p>

                        <p>
                            Bij beschadiging, oververhitting of een
                            technisch defect kan een accu zeer snel
                            warmte ontwikkelen en kunnen brandbare en
                            schadelijke stoffen vrijkomen.
                        </p>

                        <p>
                            Wanneer dit risico binnen de organisatie
                            aanwezig is, bespreken we de bijzondere
                            kenmerken van een accubrand, het risico op
                            herontsteking en vooral de grenzen van wat
                            medewerkers zelf veilig kunnen doen.
                        </p>

                    </div>

                </div>
            </section>


            {/* =================================================
                PRAKTIJK
            ================================================== */}

            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-heading">

                        <p className="wd-kicker">
                            Zelf doen
                        </p>

                        <h2>
                            Van uitleg naar daadwerkelijk handelen
                        </h2>

                        <p>
                            De theorie vormt de basis, maar de workshop
                            draait uiteindelijk om het toepassen van die
                            kennis. Daarom gaan deelnemers zelf aan de
                            slag.
                        </p>

                    </div>


                    <div className="wd-process">

                        <article className="wd-process__item">

                            <span>
                                01
                            </span>

                            <h3>
                                Beoordelen
                            </h3>

                            <p>
                                Wat brandt er, hoe ontwikkelt de situatie
                                zich en is een eerste bluspoging nog
                                verantwoord?
                            </p>

                        </article>


                        <article className="wd-process__item">

                            <span>
                                02
                            </span>

                            <h3>
                                Kiezen
                            </h3>

                            <p>
                                De deelnemer bepaalt welk beschikbaar
                                blusmiddel bij de brand en de omgeving
                                past.
                            </p>

                        </article>


                        <article className="wd-process__item">

                            <span>
                                03
                            </span>

                            <h3>
                                Handelen
                            </h3>

                            <p>
                                Deelnemers oefenen met het veilig
                                gereedmaken, benaderen en inzetten van
                                het blusmiddel.
                            </p>

                        </article>


                        <article className="wd-process__item">

                            <span>
                                04
                            </span>

                            <h3>
                                Evalueren
                            </h3>

                            <p>
                                We bespreken de gemaakte keuze, het
                                effect van de handeling en het moment
                                waarop de inzet moet worden beëindigd.
                            </p>

                        </article>

                    </div>

                </div>
            </section>


            {/* =================================================
                LEERRESULTAAT
            ================================================== */}

            <section className="wd-section wd-section--soft">

                <div className="wd-shell wd-split">

                    <div>

                        <p className="wd-kicker">
                            Na de workshop
                        </p>

                        <h2>
                            Wat heeft de deelnemer geleerd?
                        </h2>

                        <p>
                            Het doel is niet dat deelnemers simpelweg
                            weten hoe een brandblusser wordt geactiveerd.
                            Zij moeten vooral begrijpen welke afwegingen
                            vóór en tijdens een eerste bluspoging nodig
                            zijn.
                        </p>

                    </div>


                    <ul className="wd-checklist">

                        <li>
                            Begrijpen welke factoren nodig zijn voor het
                            ontstaan en voortbestaan van brand.
                        </li>

                        <li>
                            De brandklassen A, B, C, D en F herkennen.
                        </li>

                        <li>
                            Verschillende soorten blusmiddelen van elkaar
                            onderscheiden.
                        </li>

                        <li>
                            De mogelijkheden en beperkingen van
                            blusmiddelen beter begrijpen.
                        </li>

                        <li>
                            Bewuster bepalen welk blusmiddel bij een
                            brand past.
                        </li>

                        <li>
                            Een eerste bluspoging op een veilige manier
                            uitvoeren.
                        </li>

                        <li>
                            Brandontwikkeling en veranderende risico's
                            blijven beoordelen.
                        </li>

                        <li>
                            Herkennen wanneer terugtrekken en ontruimen
                            veiliger is dan verder blussen.
                        </li>

                    </ul>

                </div>
            </section>


            {/* =================================================
                EIGEN LOCATIE
            ================================================== */}

            <section className="wd-section">

                <div className="wd-shell">

                    <div className="wd-callout">

                        <p className="wd-kicker">
                            Incompany
                        </p>

                        <h2>
                            Maak de koppeling met de eigen werkplek
                        </h2>

                        <p>
                            De workshop wordt op locatie bij de
                            opdrachtgever verzorgd. Daardoor kunnen we
                            waar mogelijk ook kijken naar de
                            brandrisico's en blusvoorzieningen die
                            medewerkers dagelijks om zich heen hebben.
                        </p>

                        <p>
                            Welke soorten brandblussers zijn aanwezig?
                            Waar bevinden zich brandslanghaspels? Welke
                            risico's komen binnen het bedrijf voor en
                            herkennen medewerkers de middelen die zij
                            bij een incident kunnen tegenkomen?
                        </p>

                        <p>
                            Door die vertaalslag te maken blijft de
                            workshop niet beperkt tot algemene theorie,
                            maar wordt duidelijk wat de behandelde
                            kennis betekent binnen de eigen organisatie.
                        </p>

                    </div>

                </div>
            </section>

        </WorkshopDetailLayout>
    );
}
