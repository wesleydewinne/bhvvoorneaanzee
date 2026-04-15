import "./WhyChooseSection.css";

import instructieBlusmiddelen from "@/assets/image/homepageFotos/Wesley De Winne instructie brandblusser.webp";
import instructieReanimatieBuiten from "@/assets/image/homepageFotos/Wesley De Winne instructie Reanimatie buiten.webp";
import instructieReanimatieBaby from "@/assets/image/homepageFotos/Wesley De Winne Reanimatie instructie Baby reanimatie.webp";
import geografischePlek from "@/assets/image/homepageFotos/Geografisch plek.webp";

const reasons = [
    {
        id: 1,
        title: "Praktijkgerichte trainingen",
        text: "Geen droge theorie, maar realistische oefeningen waarmee medewerkers leren herkennen, communiceren en direct handelen in noodsituaties.",
        image: instructieReanimatieBuiten,
        alt: "Praktijkgerichte BHV-training met oefensituatie",
    },
    {
        id: 2,
        title: "Kleine groepen, meer aandacht",
        text: "Door te werken met kleine groepen is er meer ruimte voor vragen, persoonlijke begeleiding en oefenen in een tempo dat past bij de deelnemers.",
        image: instructieBlusmiddelen,
        alt: "Kleine groep deelnemers tijdens BHV-training",
    },
    {
        id: 3,
        title: "Incompany en maatwerk mogelijk",
        text: "Trainingen en ontruimingsoefeningen kunnen worden afgestemd op jullie locatie, werksituatie en risico’s, zodat de inhoud direct toepasbaar is in de praktijk.",
        image: instructieReanimatieBaby,
        alt: "Incompany BHV-training op locatie",
    },
    {
        id: 4,
        title: "Regionaal en snel inzetbaar",
        text: "Actief in Voorne aan Zee, Rotterdam, Rijnmond, Westland, Den Haag en Zuidwest-Nederland. Dichtbij, flexibel en praktisch georganiseerd.",
        image: geografischePlek,
        alt: "BHV Voorne aan Zee actief in de regio",
    },
];

function WhyChooseSection() {
    return (
        <section className="why-choose">
            <div className="container">
                <div className="why-choose__header">
          <span className="why-choose__eyebrow">
            Waarom kiezen voor BHV Voorne aan Zee
          </span>

                    <h2 className="why-choose__title">
                        Trainingen die niet alleen informeren, maar medewerkers echt laten
                        handelen
                    </h2>

                    <p className="why-choose__intro">
                        Veiligheid op de werkvloer vraagt om meer dan alleen theorie.
                        Daarom staan bij BHV Voorne aan Zee herkenbare praktijksituaties,
                        duidelijke uitleg en direct toepasbare vaardigheden centraal. Zo
                        bereiden we medewerkers voor op situaties waarin snel en verantwoord
                        handelen het verschil maakt.
                    </p>
                </div>

                <div className="why-choose__grid">
                    {reasons.map((reason) => (
                        <article className="why-choose__card" key={reason.id}>
                            <div className="why-choose__image-wrapper">
                                <img
                                    className="why-choose__image"
                                    src={reason.image}
                                    alt={reason.alt}
                                    loading="lazy"
                                />
                            </div>

                            <div className="why-choose__content">
                                <h3 className="why-choose__card-title">{reason.title}</h3>
                                <p className="why-choose__card-text">{reason.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseSection;