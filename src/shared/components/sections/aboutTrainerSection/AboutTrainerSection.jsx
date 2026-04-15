import "./AboutTrainerSection.css";

import WesleyDeWinne from "@/assets/image/homepageFotos/Wesley De Winne Instructie vlam in de pan.webp";
import instructieBlusdeken from "@/assets/image/homepageFotos/Wesley De Winne met blusdeken en brandpop.webp";

const highlights = [
    {
        title: "15 jaar ervaring",
        text: "Al vijftien jaar verzorg ik diverse trainingen waarbij duidelijkheid, rust en toepasbaarheid centraal staan.",
    },
    {
        title: "Praktijkgericht lesgeven",
        text: "Mijn trainingen draaien om doen. Deelnemers oefenen actief, leren situaties herkennen en bouwen vertrouwen op in hun handelen.",
    },
    {
        title: "Kleine groepen en maatwerk",
        text: "Ik werk graag met kleine groepen tot maximaal 10 deelnemers, zodat er ruimte is voor persoonlijke aandacht en gerichte begeleiding.",
    },
    {
        title: "Incompany en afgestemd op de praktijk",
        text: "Trainingen kunnen op locatie worden verzorgd en worden afgestemd op de werksituatie, risico’s en leerbehoefte van de organisatie.",
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

function AboutTrainerSection() {
    return (
        <section className="about-trainer">
            <div className="container">
                <div className="about-trainer__top">
                    <div className="about-trainer__media">
                        <div className="about-trainer__image about-trainer__image--primary">
                            <img
                                src={WesleyDeWinne}
                                alt="Wesley tijdens een praktijktraining"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="about-trainer__header">
                        <span className="about-trainer__eyebrow">Over Wesley / de trainer</span>

                        <h2 className="about-trainer__title">
                            Deskundige en toegankelijke trainingen, met de praktijk altijd centraal
                        </h2>
                    </div>

                    <div className="about-trainer__text">
                        <p className="about-trainer__intro">
                            Mijn naam is Wesley en ik ben trainer en eigenaar van BHV Voorne aan Zee.
                            Al 15 jaar verzorg ik diverse trainingen waarin niet alleen kennis, maar
                            vooral het kunnen handelen centraal staat. Ik geloof dat deelnemers het
                            meeste leren door te doen, te oefenen en actief mee te denken.
                        </p>

                        <p className="about-trainer__intro">
                            Daarom geef ik het liefst interactieve trainingen waarin de cursist centraal
                            staat. Bij basiscursisten is uitleg van vaardigheden en de theorie daarachter
                            belangrijk om een goede basis te leggen. Bij herhalingscursisten werkt dat
                            anders: daar ligt de nadruk veel meer op zelf aan de slag gaan, praktisch
                            oefenen en waar nodig verdiepen op situaties uit de eigen werkomgeving.
                        </p>

                        <p className="about-trainer__intro">
                            Die combinatie van praktijkgericht werken, deskundigheid en persoonlijke
                            aandacht zorgt voor trainingen die professioneel aanvoelen, toegankelijk
                            blijven en direct toepasbaar zijn op de werkvloer.
                        </p>
                    </div>
                </div>

                <div className="about-trainer__highlights">
                    {highlights.map((item) => (
                        <article className="about-trainer__card" key={item.title}>
                            <h3 className="about-trainer__card-title">{item.title}</h3>
                            <p className="about-trainer__card-text">{item.text}</p>
                        </article>
                    ))}
                </div>

                <div className="about-trainer__bottom">
                    <aside className="about-trainer__certifications">
                        <h3 className="about-trainer__certifications-title">
                            Certificeringen en expertise
                        </h3>

                        <div className="about-trainer__tags">
                            {certifications.map((item) => (
                                <span className="about-trainer__tag" key={item}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </aside>

                    <div className="about-trainer__bottom-image">
                        <img
                            src={instructieBlusdeken}
                            alt="Wesley tijdens een praktijkgerichte training"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutTrainerSection;