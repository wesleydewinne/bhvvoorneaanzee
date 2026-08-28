import {
    Buildings,
    Clock,
    ShieldCheck,
    Users,
} from "@phosphor-icons/react";

const FACT_ICONS = {
    audience: Users,
    group: Users,
    duration: Clock,
    format: ShieldCheck,
    location: Buildings,
};

export default function WorkshopFacts({
    facts = [],
}) {
    if (!facts.length) {
        return null;
    }

    return (
        <section
            className="wd-facts"
            aria-label="Praktische informatie over de workshop"
        >
            <div className="wd-shell">
                <div className="wd-facts__grid">
                    {facts.map((fact) => {
                        const Icon =
                            FACT_ICONS[fact.type] ||
                            ShieldCheck;

                        return (
                            <article
                                className="wd-fact"
                                key={`${fact.label}-${fact.value}`}
                            >
                                <Icon
                                    className="wd-fact__icon"
                                    weight="duotone"
                                    aria-hidden="true"
                                />

                                <div className="wd-fact__content">
                                    <span className="wd-fact__label">
                                        {fact.label}
                                    </span>

                                    <strong className="wd-fact__value">
                                        {fact.value}
                                    </strong>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}