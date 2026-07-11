import "./WhyChooseSection.css";

import instructieBlusmiddelen from "@/assets/image/homepageFotos/Wesley De Winne instructie brandblusser.webp?w=720&format=webp&quality=70";
import instructieBlusmiddelenSrcSet from "@/assets/image/homepageFotos/Wesley De Winne instructie brandblusser.webp?w=360;520;720&format=webp&quality=70&as=srcset";
import instructieReanimatieBuiten from "@/assets/image/homepageFotos/Wesley De Winne instructie Reanimatie buiten.webp?w=520&format=webp&quality=70";
import instructieReanimatieBuitenSrcSet from "@/assets/image/homepageFotos/Wesley De Winne instructie Reanimatie buiten.webp?w=320;520&format=webp&quality=70&as=srcset";
import instructieReanimatieBaby from "@/assets/image/homepageFotos/Wesley De Winne Reanimatie instructie Baby reanimatie.webp?w=520&format=webp&quality=70";
import instructieReanimatieBabySrcSet from "@/assets/image/homepageFotos/Wesley De Winne Reanimatie instructie Baby reanimatie.webp?w=320;520&format=webp&quality=70&as=srcset";
import geografischePlek from "@/assets/image/homepageFotos/Geografisch plek.webp?w=520&format=webp&quality=70";
import geografischePlekSrcSet from "@/assets/image/homepageFotos/Geografisch plek.webp?w=320;520&format=webp&quality=70&as=srcset";

const proofPoints = [
    "BHV-trainingen",
    "EHBO-cursussen",
    "Ontruimingsoefeningen",
    "Incompany maatwerk",
];

const outcomePoints = [
    "Medewerkers herkennen sneller wat er aan de hand is.",
    "BHV-taken en communicatie worden duidelijker verdeeld.",
    "Oefenen gebeurt met situaties uit de eigen werkomgeving.",
];

const reasons = [
    {
        id: 1,
        kicker: "Doen staat centraal",
        title: "Praktijkgerichte BHV-trainingen",
        text: "Medewerkers oefenen stap voor stap wat zij moeten doen bij brand, letsel, reanimatie, alarmeren en ontruimen. De theorie wordt direct gekoppeld aan handelen, zodat deelnemers begrijpen waarom een handeling nodig is en wanneer zij die toepassen.",
        points: ["Oefenen met herkenbare noodsituaties", "Vaardigheden toepassen in de eigen werkomgeving"],
        image: instructieReanimatieBuiten,
        srcSet: instructieReanimatieBuitenSrcSet,
        alt: "Praktijkgerichte BHV-training met reanimatie oefensituatie",
    },
    {
        id: 2,
        kicker: "Persoonlijke begeleiding",
        title: "Kleine groepen met persoonlijke aandacht",
        text: "Deelnemers trainen in overzichtelijke groepen. Daardoor is er tijd om vragen te stellen, handelingen opnieuw te proberen en vertrouwen op te bouwen bij eerste hulp, brandbestrijding en communicatie.",
        points: ["Meer begeleiding bij BHV- en EHBO-vaardigheden", "Oefenen in een tempo dat past bij de deelnemers"],
        image: instructieBlusmiddelen,
        srcSet: instructieBlusmiddelenSrcSet,
        alt: "Kleine groep deelnemers tijdens een BHV-training",
    },
    {
        id: 3,
        kicker: "Afgestemd op jullie locatie",
        title: "Incompany training en maatwerk",
        text: "Incompany trainingen worden voorbereid op basis van jullie gebouw, werkzaamheden, aanwezige risico's en teamgrootte. Daardoor sluiten scenario's beter aan op wat medewerkers tijdens een incident echt kunnen tegenkomen.",
        points: ["Scenario's passend bij gebouw, team en risico's", "BHV, EHBO en ontruiming afgestemd op de organisatie"],
        image: instructieReanimatieBaby,
        srcSet: instructieReanimatieBabySrcSet,
        alt: "Incompany BHV en EHBO training op locatie",
    },
    {
        id: 4,
        kicker: "Praktisch georganiseerd",
        title: "Planning in gezamenlijke afstemming",
        text: "Planning, groepsgrootte en voorbereiding worden vooraf samen afgestemd. Zo past de training binnen de agenda van de organisatie en blijft er voldoende ruimte voor oefenen, evalueren en bijsturen.",
        points: ["Samen passende trainingsdata en tijden bepalen", "Afstemming op team, locatie, agenda en leerdoel"],
        image: geografischePlek,
        srcSet: geografischePlekSrcSet,
        alt: "Gezamenlijke planning en afstemming voor BHV-training",
    },
];

function WhyChooseSection() {
    return (
        <section className="why-choose" aria-labelledby="why-choose-title">
            <div className="container">
                <div className="why-choose__hero">
                    <div className="why-choose__header">
                        <span className="why-choose__eyebrow">
                            Waarom kiezen voor BHV Voorne aan Zee
                        </span>

                        <h2 className="why-choose__title" id="why-choose-title">
                            Veiligheidstrainingen waarmee medewerkers weten wat zij moeten doen
                        </h2>

                        <p className="why-choose__intro">
                            Een goede veiligheidstraining maakt rollen, risico's en handelingen
                            duidelijk. Daarom combineren we uitleg met oefenen, zodat medewerkers
                            niet alleen informatie krijgen maar ook ervaren hoe zij moeten reageren
                            bij brand, letsel, alarmering of ontruiming.
                        </p>

                        <div className="why-choose__outcome">
                            <h3>Wat deelnemers meenemen uit de training</h3>
                            <p>
                                Na afloop weten deelnemers beter wat hun rol is, welke eerste stap
                                zij nemen en hoe zij afstemmen met collega's, bezoekers en
                                hulpdiensten. Dat geeft meer rust en duidelijkheid op de werkvloer.
                            </p>
                            <ul>
                                {outcomePoints.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="why-choose__proof-strip" aria-label="Trainingen en werkwijze">
                            {proofPoints.map((point) => (
                                <span className="why-choose__proof-item" key={point}>
                                    {point}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="why-choose__spotlight" aria-label="Praktijkgerichte aanpak">
                        <img
                            className="why-choose__spotlight-image"
                            src={instructieBlusmiddelen}
                            srcSet={instructieBlusmiddelenSrcSet}
                            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 92vw, 42vw"
                            alt="Praktische uitleg tijdens een veiligheidstraining"
                            loading="lazy"
                            decoding="async"
                            width={720}
                            height={1080}
                        />
                        <div className="why-choose__spotlight-content">
                            <span className="why-choose__spotlight-label">Praktijk boven papier</span>
                            <strong>
                                Deelnemers oefenen voordat een echte situatie spannend wordt.
                            </strong>
                            <p>
                                Met duidelijke stappen, realistische scenario's en aandacht voor
                                de werkomgeving van de organisatie.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="why-choose__grid">
                    {reasons.map((reason) => (
                        <article className="why-choose__card" key={reason.id}>
                            <div className="why-choose__image-wrapper">
                                <img
                                    className="why-choose__image"
                                    src={reason.image}
                                    srcSet={reason.srcSet}
                                    sizes="(max-width: 640px) 92vw, (max-width: 1100px) 44vw, 22vw"
                                    alt={reason.alt}
                                    loading="lazy"
                                    decoding="async"
                                    width={520}
                                    height={325}
                                />
                            </div>

                            <div className="why-choose__content">
                                <span className="why-choose__card-kicker">{reason.kicker}</span>
                                <h3 className="why-choose__card-title">{reason.title}</h3>
                                <p className="why-choose__card-text">{reason.text}</p>
                                <ul className="why-choose__point-list">
                                    {reason.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseSection;
