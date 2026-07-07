import { useEffect, useState } from "react";
import faqData from "@/shared/data/faqs.json";
import "./Faq.css";

const introSection = faqData.sections.find((section) => section.id === "intro");
const introText = introSection?.items[0]?.answer;
const visibleSections = faqData.sections.filter((section) => section.id !== "intro");

function Faq() {
    const [openSection, setOpenSection] = useState(null);
    const [openQuestion, setOpenQuestion] = useState(null);

    useEffect(() => {
        const faqEntities = visibleSections.flatMap((section) =>
            section.items
                .filter((item) => item.question && item.answer)
                .map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: item.answer
                    }
                }))
        );

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqEntities
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.source = "faq-page";
        script.text = JSON.stringify(jsonLd);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const toggleSection = (id) => {
        setOpenSection(openSection === id ? null : id);
        setOpenQuestion(null);
    };

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <section className="faq-section">
            <h1 className="faq-page-title">Veelgestelde vragen</h1>

            {introText && (
                <div className="faq-intro">
                    <p>{introText}</p>
                </div>
            )}

            {visibleSections.map((section) => (
                <div key={section.id} className="faq-category">
                    <button
                        type="button"
                        className="faq-header"
                        onClick={() => toggleSection(section.id)}
                        aria-expanded={openSection === section.id}
                        aria-controls={`faq-section-${section.id}`}
                    >
                        <span className="faq-title">{section.title}</span>
                        <span className="faq-icon" aria-hidden="true">
                            {openSection === section.id ? "-" : "+"}
                        </span>
                    </button>

                    {openSection === section.id && (
                        <div id={`faq-section-${section.id}`}>
                            {section.intro && (
                                <p className="faq-category-intro">
                                    {section.intro}
                                </p>
                            )}

                            <ul className="faq-list">
                                {section.items.map((item) => (
                                    <li key={item.id} className="faq-item">
                                        <button
                                            type="button"
                                            className="faq-question-header"
                                            onClick={() => toggleQuestion(item.id)}
                                            aria-expanded={openQuestion === item.id}
                                            aria-controls={`faq-answer-${item.id}`}
                                        >
                                            <span className="faq-question">
                                                {item.question}
                                            </span>

                                            <span
                                                className={`faq-question-icon ${
                                                    openQuestion === item.id ? "open" : ""
                                                }`}
                                                aria-hidden="true"
                                            >
                                                {openQuestion === item.id ? "-" : "+"}
                                            </span>
                                        </button>

                                        {openQuestion === item.id && (
                                            <p
                                                className="faq-answer"
                                                id={`faq-answer-${item.id}`}
                                            >
                                                {item.answer}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}

export default Faq;
