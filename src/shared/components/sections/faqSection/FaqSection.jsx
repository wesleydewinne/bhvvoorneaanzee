import { useState } from "react";
import "./FaqSection.css";

const faqItems = [
    {
        question: "Geven jullie trainingen op locatie of hebben jullie een eigen trainingslocatie?",
        answer:
            "Wij verzorgen trainingen en ontruimingsoefeningen incompany bij de klant. BHV Voorne aan Zee heeft geen vaste trainingslocatie. Het voordeel is dat deelnemers oefenen in hun eigen werkomgeving, met herkenbare risico's, routes, middelen en praktijksituaties.",
    },
    {
        question: "Voor hoeveel deelnemers zijn de trainingen geschikt?",
        answer:
            "Voor BHV-trainingen, EHBO-cursussen, workshops en ontruimingsoefeningen fase 0 en 1 werken wij meestal met kleine groepen van maximaal 10 deelnemers. Dit geeft ruimte voor begeleiding, persoonlijke aandacht en praktisch oefenen.\n\nVoor ontruimingsoefeningen fase 2, 3 en 4 geldt geen vast maximum. Daarbij wordt geoefend met de daadwerkelijke bezetting van het pand of de omgeving.",
    },
    {
        question: "Kunnen trainingen worden afgestemd op onze organisatie?",
        answer:
            "Ja, trainingen worden afgestemd op de locatie, werkzaamheden en risico's binnen jullie organisatie.\n\nBij herhalingstrainingen ligt de nadruk sterker op situaties uit de eigen werkomgeving. Bij basistrainingen ligt de focus eerst op basiskennis en vaardigheden. Waar mogelijk worden locatie en risico's direct meegenomen.",
    },
    {
        question: "In welke regio geven jullie trainingen?",
        answer:
            "BHV Voorne aan Zee verzorgt trainingen in onder andere Voorne aan Zee, Rozenburg, Brielle, Hellevoetsluis, Oostvoorne, Spijkenisse, Hoogvliet, Pernis, Vlaardingen, Schiedam, Maassluis, Rotterdam, Westland en Den Haag. Ook opdrachten in Zuidwest-Nederland, waaronder Zeeland, zijn bespreekbaar.",
    },
    {
        question: "Wat is het verschil tussen een basisopleiding en een herhalingstraining?",
        answer:
            "Bij een basisopleiding ligt de nadruk op basiskennis, uitleg en het stap voor stap aanleren van vaardigheden zoals reanimatie, brandbestrijding en ontruiming.\n\nBij een herhalingstraining ligt de focus op opfrissen, verdiepen en actief oefenen met situaties uit de eigen werkomgeving.",
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
                    {isOpen ? "-" : "+"}
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
                        Antwoorden over incompany trainen, groepen en regio
                    </h2>
                    <p className="faq-section__intro">
                        Korte antwoorden op vragen die organisaties vaak stellen voordat zij
                        een BHV-training, EHBO-cursus of ontruimingsoefening plannen.
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
