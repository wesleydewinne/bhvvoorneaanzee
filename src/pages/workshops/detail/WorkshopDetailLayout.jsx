import WorkshopHero from "./components/WorkshopHero.jsx";
import WorkshopFacts from "./components/WorkshopFacts.jsx";
import WorkshopFaq from "./components/WorkshopFaq.jsx";
import WorkshopCta from "./components/WorkshopCta.jsx";

import "./WorkshopDetailPage.css";

export default function WorkshopDetailLayout({
    title,
    hero = {},
    facts = [],
    faqs = [],
    faq = {},
    cta = {},
    children,
    showCta = true,
    className = "",
    theme = "safety",
}) {
    const mainClassName = [
        "workshop-detail-page",
        `workshop-detail-page--${theme}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <main className={mainClassName}>
            <WorkshopHero
                {...hero}
                title={title}
            />

            <WorkshopFacts
                facts={facts}
            />

            <div className="wd-content">
                {children}
            </div>

            <WorkshopFaq
                {...faq}
                faqs={faqs}
            />

            {showCta && (
                <WorkshopCta
                    {...cta}
                />
            )}
        </main>
    );
}
