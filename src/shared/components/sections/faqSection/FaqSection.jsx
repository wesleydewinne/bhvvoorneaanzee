import { useState } from "react";
import "./FaqSection.css";

const faqItems = [
    {
        question: "Geven jullie trainingen op locatie of hebben jullie een eigen trainingslocatie?",
        answer:
            "Wij verzorgen alle trainingen en ontruimingsoefeningen op locatie (incompany) bij de klant. Wij beschikken niet over een vaste trainingslocatie. Het voordeel hiervan is dat de training volledig aansluit op de werkomgeving, risico’s en praktijksituaties binnen jullie organisatie.",
    },
    {
        question: "Voor hoeveel deelnemers zijn de trainingen geschikt?",
        answer:
            "Voor trainingen, workshops en ontruimingsoefeningen (fase 0 en 1) werken wij met kleine groepen van maximaal 10 deelnemers. Dit zorgt voor optimale begeleiding, persoonlijke aandacht en voldoende ruimte om praktisch te oefenen.\n\nVoor ontruimingsoefeningen (fase 2, 3 en 4) geldt geen maximum. Hierbij wordt geoefend met de daadwerkelijke bezetting van het pand of de omgeving, zodat de situatie zo realistisch mogelijk aansluit op een mogelijke noodsituatie.",
    },
    {
        question: "Kunnen trainingen worden afgestemd op onze organisatie?",
        answer:
            "Ja, trainingen worden altijd afgestemd op de locatie en de specifieke risico’s binnen jullie organisatie.\n\nBij herhalingstrainingen ligt de nadruk sterk op praktijksituaties uit de eigen werkomgeving. Bij basistrainingen ligt de focus vooral op het aanleren van de juiste vaardigheden en basiskennis. Afstemming op de locatie en risico’s wordt hierbij waar mogelijk meegenomen, afhankelijk van de beschikbare tijd.",
    },
    {
        question: "In welke regio geven jullie trainingen?",
        answer:
            "BHV Voorne aan Zee is actief in de regio’s Voorne aan Zee, Nissewaard, Goeree-Overflakkee, Rotterdam, Barendrecht, Westland, Maassluis, Vlaardingen, Schiedam en Den Haag. Daarnaast verzorgen wij trainingen in een breder gebied binnen Zuidwest-Nederland, waaronder Zeeland en delen van West-Brabant.",
    },
    {
        question: "Wat is het verschil tussen een basisopleiding en een herhalingstraining?",
        answer:
            "Bij een basisopleiding ligt de nadruk op het aanleren van de juiste vaardigheden en het begrijpen van de theorie daarachter. Deelnemers maken voor het eerst kennis met onderwerpen zoals reanimatie, brandbestrijding en ontruiming, waarbij stap voor stap wordt geoefend om een goede basis te leggen.\n\nBij een herhalingstraining ligt de focus juist op het opfrissen en verdiepen van bestaande kennis en vaardigheden. Er wordt minder tijd besteed aan uitleg en juist meer aan actief oefenen en realistische praktijksituaties, afgestemd op de werkomgeving en risico’s binnen de organisatie.",
    },
];

function FaqItem({ question, answer, isOpen, onToggle }) {
    return (
        <article className={`faq-section__item ${isOpen ? "is-open" : ""}`}>
            <button
                className="faq-section__question"
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <span className="faq-section__icon" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
            </button>

            <div className="faq-section__answer-wrapper" hidden={!isOpen}>
                <div className="faq-section__answer">
                    <p>{answer}</p>
                </div>
            </div>
        </article>
    );
}

function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
    };

    return (
        <section className="faq-section">
            <div className="container">
                <div className="faq-section__header">
                    <span className="faq-section__eyebrow">Veelgestelde vragen</span>
                    <h2 className="faq-section__title">
                        Duidelijke antwoorden op veelgestelde vragen
                    </h2>
                    <p className="faq-section__intro">
                        Hieronder vind je antwoorden op een aantal vragen over onze
                        trainingen, werkwijze en mogelijkheden. Staat jouw vraag er niet
                        tussen, dan denken we graag met je mee.
                    </p>
                </div>

                <div className="faq-section__list">
                    {faqItems.map((item, index) => (
                        <FaqItem
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FaqSection;