import { useEffect, useState } from "react";
import faqData from "@/shared/data/faqs.json";
import "./Faq.css";

function Faq() {
    const [openSection, setOpenSection] = useState(null);
    const [openQuestion, setOpenQuestion] = useState(null);

    /* ===== Intro uit JSON halen ===== */
    const introSection = faqData.sections.find(section => section.id === "intro");
    const introText = introSection?.items[0]?.answer;

    /* ===== Alleen echte FAQ secties ===== */
    const visibleSections = faqData.sections.filter(section => section.id !== "intro");

    /* ---------- SEO: title + meta description ---------- */
    useEffect(() => {
        document.title =
            "Veelgestelde vragen over BHV, EHBO en ontruiming | Voorne aan Zee";

        const description =
            "Antwoorden op veelgestelde vragen over BHV-, EHBO- en ontruimingstrainingen in Voorne aan Zee, Rotterdam en omgeving.";

        let meta = document.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }
        meta.content = description;
    }, []);

    /* ---------- FAQPage JSON-LD ---------- */
    useEffect(() => {
        const faqEntities = visibleSections.flatMap(section =>
            section.items
                .filter(item => item.question && item.answer)
                .map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }))
        );

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqEntities
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(jsonLd);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [visibleSections]);

    const toggleSection = (id) => {
        setOpenSection(openSection === id ? null : id);
        setOpenQuestion(null); // sluit open vraag bij wisselen van hoofdstuk
    };

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <section className="faq-section">
            <h1 className="faq-page-title">Veelgestelde vragen</h1>

            {/* ===== INTRO (uit JSON, vast blok) ===== */}
            {introText && (
                <div className="faq-intro">
                    <p>{introText}</p>
                </div>
            )}

            {/* ===== FAQ ACCORDION ===== */}
            {visibleSections.map(section => (
                <div key={section.id} className="faq-category">

                    <div
                        className="faq-header"
                        onClick={() => toggleSection(section.id)}
                    >
                        <span className="faq-title">{section.title}</span>
                        <span className="faq-icon">
                            {openSection === section.id ? "×" : "+"}
                        </span>
                    </div>

                    {openSection === section.id && (
                        <ul className="faq-list">
                            {section.items.map(item => (
                                <li key={item.id} className="faq-item">

                                    <div
                                        className="faq-question-header"
                                        onClick={() => toggleQuestion(item.id)}
                                    >
                                        <span className="faq-question">
                                            {item.question}
                                        </span>

                                        <span
                                            className={`faq-question-icon ${
                                                openQuestion === item.id ? "open" : ""
                                            }`}
                                        >
                                            {openQuestion === item.id ? "▲" : "▼"}
                                        </span>
                                    </div>

                                    {openQuestion === item.id && (
                                        <p className="faq-answer">
                                            {item.answer}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </section>
    );
}

export default Faq;
