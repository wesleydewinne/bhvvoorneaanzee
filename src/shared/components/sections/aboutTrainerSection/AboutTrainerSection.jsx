import "./AboutTrainerSection.css";

import WesleyDeWinne from "@/assets/image/homepageFotos/Wesley De Winne Instructie vlam in de pan.webp";
import instructieBlusdeken from "@/assets/image/homepageFotos/Wesley De Winne met blusdeken en brandpop.webp";

const highlights = [
    {
        number: "15+",
        label: "jaar ervaring",
        title: "Praktijkervaring in BHV, EHBO en ontruiming",
        text: "De uitleg komt voort uit jarenlange ervaring met veiligheidstrainingen, oefeningen en begeleiding van deelnemers op verschillende werklocaties.",
    },
    {
        number: "10",
        label: "deelnemers max.",
        title: "Kleine groepen met persoonlijke begeleiding",
        text: "Bij basis- en herhalingstrainingen is er bewust ruimte voor vragen, herhaling en persoonlijke correctie tijdens het oefenen.",
    },
    {
        number: "1",
        label: "locatiegericht plan",
        title: "Incompany training afgestemd op jullie organisatie",
        text: "De inhoud wordt vertaald naar jullie gebouw, werkzaamheden en BHV-organisatie, zodat deelnemers oefenen met herkenbare keuzes.",
    },
];

const certifications = [
    "NIBHV BHV",
    "NIBHV Ploegleider",
    "Het Oranje Kruis",
    "NRR",
    "SDBREL",
    "Beheerder brandmeldinstallaties",
];

const proofPoints = [
    "BHV-trainingen",
    "BHV Ploegleider",
    "EHBO-cursussen",
    "Ontruimingsoefeningen",
    "Incompany maatwerk",
    "Voorne aan Zee & Rijnmond",
];

function AboutTrainerSection() {
    return (
        <section className="about-trainer" aria-labelledby="about-trainer-title">
            <div className="container">
                <div className="about-trainer__shell">
                    <div className="about-trainer__content">
                        <span className="about-trainer__eyebrow">
                            Trainer achter BHV Voorne aan Zee
                        </span>

                        <h2 className="about-trainer__title" id="about-trainer-title">
                            <span>Praktijkgerichte veiligheidstrainingen</span>
                            <span>van Wesley</span>
                        </h2>
                    </div>

                    <div className="about-trainer__body">
                        <div className="about-trainer__text-panel">
                            <p className="about-trainer__lead">
                                Wesley is trainer en eigenaar van BHV Voorne aan Zee. Met praktijkervaring bij de brandweer, kennis vanuit de ambulancezorg en een brede achtergrond in bedrijfshulpverlening verzorgt hij BHV-trainingen, BHV Ploegleider-trainingen en ontruimingsoefeningen voor bedrijven.
                            </p>

                            <p className="about-trainer__text">
                                De trainingen zijn praktisch, duidelijk en gericht op doen. Deelnemers leren niet alleen wat ze moeten doen, maar vooral hoe ze moeten handelen wanneer er echt iets gebeurt. Basisdeelnemers bouwen stap voor stap vertrouwen op. Herhalingsdeelnemers gaan sneller aan de slag met herkenbare scenario’s, keuzes maken onder druk en vaardigheden die passen bij hun eigen werkomgeving.
                            </p>

                            <p className="about-trainer__text">
                                Door deze praktijkervaring is goed duidelijk hoe belangrijk de eerste minuten zijn voordat professionele hulpdiensten aanwezig zijn. Juist in die fase maken rust, overzicht en de juiste eerste handelingen het verschil. Die ervaring wordt meegenomen in de trainingen, zodat deelnemers niet alleen kennis opdoen, maar ook meer vertrouwen krijgen om daadwerkelijk in actie te komen.
                            </p>

                            <div className="about-trainer__proof-list" aria-label="Trainingsaanbod en werkgebied">
                                {proofPoints.map((item) => (
                                    <span className="about-trainer__proof-pill" key={item}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="about-trainer__media" aria-label="Wesley de Winne tijdens praktijktraining">
                            <div className="about-trainer__image about-trainer__image--primary">
                                <img
                                    src={WesleyDeWinne}
                                    alt="Wesley de Winne geeft een praktijkgerichte BHV-training"
                                    loading="lazy"
                                />
                            </div>

                            <div className="about-trainer__floating-card">
                                <strong>Duidelijk trainen</strong>
                                <span>Rustig uitleggen, voordoen en samen oefenen.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-trainer__highlights" aria-label="Waarom kiezen voor deze trainer">
                    {highlights.map((item) => (
                        <article className="about-trainer__card" key={item.title}>
                            <div className="about-trainer__card-stat">
                                <strong>{item.number}</strong>
                                <span>{item.label}</span>
                            </div>
                            <h3 className="about-trainer__card-title">{item.title}</h3>
                            <p className="about-trainer__card-text">{item.text}</p>
                        </article>
                    ))}
                </div>

                <div className="about-trainer__bottom">
                    <div className="about-trainer__bottom-image">
                        <img
                            src={instructieBlusdeken}
                            alt="BHV praktijkoefening met blusdeken tijdens veiligheidstraining"
                            loading="lazy"
                        />
                    </div>

                    <aside className="about-trainer__certifications">
                        <span className="about-trainer__certifications-kicker">
                            Certificeringen en expertise
                        </span>
                        <h3 className="about-trainer__certifications-title">
                            Opleidingen met aantoonbare vakkennis
                        </h3>
                        <p className="about-trainer__certifications-text">
                            De trainingen sluiten aan op erkende richtlijnen en worden
                            vertaald naar begrijpelijke stappen voor deelnemers op de werkvloer.
                        </p>

                        <div className="about-trainer__tags">
                            {certifications.map((item) => (
                                <span className="about-trainer__tag" key={item}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}

export default AboutTrainerSection;
