import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    ShieldCheck,
} from "@phosphor-icons/react";

export default function WorkshopHero({
    title,
    headline,
    lead,
    eyebrow = "Praktijkworkshop",
    image,
    imageAlt,

    backTo = "/workshops#aanbod",
    backLabel = "Alle workshops",

    primaryCtaLabel = "Offerte aanvragen",
    primaryCtaTo = "/offerte",

    secondaryCtaLabel = "Bekijk de workshop",
    secondaryCtaHref = "#inhoud",

    titleId = "workshop-page-title",
}) {
    return (
        <section
            className="wd-hero"
            aria-labelledby={titleId}
        >
            <img
                className="wd-hero__image"
                src={image}
                alt={imageAlt || title}
            />

            <div
                className="wd-hero__overlay"
                aria-hidden="true"
            />

            <div className="wd-shell wd-hero__content">
                <Link
                    className="wd-breadcrumb"
                    to={backTo}
                >
                    <ArrowLeft
                        weight="bold"
                        aria-hidden="true"
                    />

                    <span>{backLabel}</span>
                </Link>

                {eyebrow && (
                    <p className="wd-eyebrow">
                        <ShieldCheck
                            weight="fill"
                            aria-hidden="true"
                        />

                        <span>{eyebrow}</span>
                    </p>
                )}

                <h1 id={titleId}>
                    {headline || title}
                </h1>

                {lead && (
                    <p className="wd-hero__lead">
                        {lead}
                    </p>
                )}

                <div className="wd-actions">
                    {primaryCtaLabel && primaryCtaTo && (
                        <Link
                            className="
                                wd-button
                                wd-button--primary
                            "
                            to={primaryCtaTo}
                        >
                            <span>{primaryCtaLabel}</span>

                            <ArrowRight
                                weight="bold"
                                aria-hidden="true"
                            />
                        </Link>
                    )}

                    {secondaryCtaLabel &&
                        secondaryCtaHref && (
                            <a
                                className="
                                    wd-button
                                    wd-button--secondary
                                "
                                href={secondaryCtaHref}
                            >
                                {secondaryCtaLabel}
                            </a>
                        )}
                </div>
            </div>
        </section>
    );
}