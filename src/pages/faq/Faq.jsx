// Faq.jsx
import React, { useState, useEffect } from "react";
import "./Faq.css";
import faqData from "../../data/faqData.json"; // je JSON-LD bestand

function Faq() {
    const [openCategory, setOpenCategory] = useState(null);

    // Alle categorieën verzamelen
    const categories = Array.from(
        new Set(faqData.mainEntity.map(item => item.category))
    );

    // Vragen per categorie groeperen + sorteren op priority
    const faqByCategory = categories.reduce((acc, category) => {
        acc[category] = faqData.mainEntity
            .filter(item => item.category === category)
            .sort((a, b) => (a.priority || 999) - (b.priority || 999));
        return acc;
    }, {});

    useEffect(() => {
        // JSON-LD script in de head plaatsen
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(faqData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const toggleCategory = (category) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    return (
        <section className="faq-section">
            <h1>Veelgestelde vragen</h1>
            {categories.map((category) => (
                <div key={category} className="faq-category">
                    <div className="faq-header" onClick={() => toggleCategory(category)}>
                        <span className="faq-title">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                        <span className={`faq-icon ${openCategory === category ? "open" : ""}`}>
                            {openCategory === category ? "x" : "+"}
                        </span>
                    </div>

                    {openCategory === category && (
                        <ul className="faq-list">
                            {faqByCategory[category].map((item, index) => (
                                <li key={index} className="faq-item">
                                    <p className="faq-question">{item.name}</p>
                                    <p className="faq-answer">{item.acceptedAnswer.text}</p>

                                    {/* Link tonen indien aanwezig */}
                                    {item.link && item.linkName && (
                                        <a
                                            href={item.link}
                                            className="faq-link-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.linkName}
                                        </a>
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
