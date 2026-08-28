import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

export default function WorkshopCta({
    eyebrow = "Workshop op locatie",

    title = "Gericht oefenen binnen jouw organisatie",

    text = "Vertel ons wat medewerkers moeten kunnen en waar jullie in de praktijk tegenaan lopen. We denken mee over een workshop die daarbij past.",

    primaryLabel = "Offerte aanvragen",
    primaryTo = "/offerte",

    secondaryLabel = "Eerst overleggen",
    secondaryTo = "/contact",
}) {
    return (
        <section
            className="wd-final-cta"
            aria-label="Workshop aanvragen"
        >
            <div className="wd-shell">
                <div className="wd-final-cta__panel">
                    <div className="wd-final-cta__content">
                        {eyebrow && (
                            <p className="wd-kicker">
                                {eyebrow}
                            </p>
                        )}

                        <h2>{title}</h2>

                        {text && (
                            <p>{text}</p>
                        )}
                    </div>

                    <div className="
                        wd-actions
                        wd-final-cta__actions
                    ">
                        {primaryLabel &&
                            primaryTo && (
                                <Link
                                    className="
                                        wd-button
                                        wd-button--light
                                    "
                                    to={primaryTo}
                                >
                                    <span>
                                        {primaryLabel}
                                    </span>

                                    <ArrowRight
                                        weight="bold"
                                        aria-hidden="true"
                                    />
                                </Link>
                            )}

                        {secondaryLabel &&
                            secondaryTo && (
                                <Link
                                    className="
                                        wd-button
                                        wd-button--outline
                                    "
                                    to={secondaryTo}
                                >
                                    {secondaryLabel}
                                </Link>
                            )}
                    </div>
                </div>
            </div>
        </section>
    );
}