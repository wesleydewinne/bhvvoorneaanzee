import { useState } from "react";
import "./FaqSection.css";

const faqItems = [
    {
        question: "Is een training op locatie mogelijk?",
        answer:
            "Ja, trainingen en ontruimingsoefeningen kunnen incompany worden verzorgd. Hierdoor sluiten inhoud, oefensituaties en werkwijze beter aan op de praktijk van jullie organisatie.",
    },
    {
        question: "Voor hoeveel deelnemers zijn de trainingen geschikt?",
        answer:
            "Wij werken bij voorkeur met kleine groepen tot maximaal 10 deelnemers. Dat zorgt voor meer persoonlijke aandacht, betere begeleiding en meer ruimte om praktisch te oefenen.",
    },
    {
        question: "Kunnen trainingen worden afgestemd op onze organisatie?",
        answer:
            "Ja, maatwerk is mogelijk. Trainingen kunnen worden afgestemd op de locatie, risico’s, werkzaamheden en leerbehoefte van de deelnemers.",
    },
    {
        question: "In welke regio geven jullie training?",
        answer:
            "BHV Voorne aan Zee is actief in Voorne aan Zee, Rotterdam, Rijnmond, Westland, Den Haag en breder in Zuidwest-Nederland.",
    },
    {
        question: "Wat is het verschil tussen basis en herhaling?",
        answer:
            "Bij een basisopleiding is er meer aandacht voor uitleg van vaardigheden en de theorie daarachter. Bij herhaling ligt de nadruk juist meer op actief oefenen, toepassen in praktijksituaties en waar nodig verdieping.",
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