import { useEffect, useMemo, useRef, useState } from "react";
import "./ClientExperiencesSection.css";

import logoprocentrum from "@/assets/image/logosBedrijven/PROCentrum.png";
import logorailwagonservice from "@/assets/image/logosBedrijven/logorailwagonservice.jpg";

const clientExperiences = [
    {
        id: 1,
        company: "Rail Wagon Service",
        logo: logorailwagonservice,
        quote:
            "Niet alleen een leerzame BHV training, maar ook nog eens ontzettend leuk gebracht door de enthousiaste en deskundige instructeur (Wesley).\nDe cursus was praktijkgericht, interactief en sloot goed aan op onze verwachtingen.",
    },
    {
        id: 2,
        company: "PRO Centrum",
        logo: logoprocentrum,
        quote:
            "Wij nemen volgen al jaren de BHV en herhalingstrainingen bij Wesley. Wesley heeft kennis van zaken en zijn manier van lesgeven is interactief, helder en met voldoende plek voor wat humor!",
    },
    {
        id: 3,
        company: "Bedrijf 3",
        logo: "/logos/bedrijf-3.png",
        quote:
            "Wij huren Wesley regelmatig in voor onze BHV-cursussen en zijn zeer tevreden over zijn aanpak. Hij is duidelijk in zijn uitleg, werkt doelgericht en weet de stof op een prettige en begrijpelijke manier over te brengen.",
    },
    // {
    //     id: 4,
    //     company: "Bedrijf 4",
    //     logo: "/logos/bedrijf-4.png",
    //     quote:
    //         "De training sloot goed aan op onze werksituatie en risico’s.",
    // },
];

function getRelativeOffset(index, activeIndex, total) {
    let offset = index - activeIndex;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    return offset;
}

export default function ClientExperiencesSection({
                                                     photoSrc,
                                                     photoAlt = "BHV training in de praktijk",
                                                     photoPosition = "center center",
                                                     title = "Wat klanten over de training zeggen",
                                                     subtitle = "Praktijkgericht, duidelijk en professioneel. Precies zoals een goede BHV-training moet voelen.",
                                                     items = clientExperiences,
                                                     autoRotateMs = 10000,
                                                     transitionMs = 1000,
                                                 }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const globeRef = useRef(null);
    const [globeWidth, setGlobeWidth] = useState(760);

    useEffect(() => {
        const node = globeRef.current;
        if (!node) return;

        const updateWidth = () => {
            setGlobeWidth(node.offsetWidth || 760);
        };

        updateWidth();

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            setGlobeWidth(entry.contentRect.width);
        });

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isPaused || items.length <= 1) return;

        const intervalId = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, autoRotateMs);

        return () => window.clearInterval(intervalId);
    }, [isPaused, items.length, autoRotateMs]);

    const radiusX = Math.max(110, Math.min(250, globeWidth * 0.27));
    const radiusY = Math.max(10, Math.min(34, globeWidth * 0.032));

    const positionedCards = useMemo(() => {
        return items.map((item, index) => {
            const offset = getRelativeOffset(index, activeIndex, items.length);
            const step = (2 * Math.PI) / items.length;
            const angle = offset * step;

            const depth = (Math.cos(angle) + 1) / 2;

            const x = Math.sin(angle) * radiusX;
            const y = Math.cos(angle) * radiusY;
            const scale = 0.7 + depth * 0.3;
            const opacity = 0.2 + depth * 0.8;
            const rotateY = -Math.sin(angle) * 18;
            const blur = (1 - depth) * 2.8;

            return {
                ...item,
                isActive: offset === 0,
                style: {
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex: Math.round(depth * 100),
                    filter: `blur(${blur}px)`,
                },
            };
        });
    }, [items, activeIndex, radiusX, radiusY]);

    return (
        <section className="client-experiences-section">
            <div className="client-experiences-section__media">
                {photoSrc && (
                    <div className="client-experiences-section__image-wrap">
                        <img
                            src={photoSrc}
                            alt={photoAlt}
                            className="client-experiences-section__image"
                            style={{ objectPosition: photoPosition }}
                        />
                    </div>
                )}
            </div>

            <div className="client-experiences-section__right">
                <div className="client-experiences-section__text">
          <span className="client-experiences-section__eyebrow">
            Klantervaringen
          </span>

                    <h2 className="client-experiences-section__title">{title}</h2>

                    <p className="client-experiences-section__subtitle">{subtitle}</p>
                </div>

                <div
                    ref={globeRef}
                    className="client-experiences-section__globe"
                    style={{ "--card-transition-duration": `${transitionMs}ms` }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    aria-label="Ervaringen van klanten"
                >
                    <div className="client-experiences-section__core" />
                    <div className="client-experiences-section__ring client-experiences-section__ring--one" />
                    <div className="client-experiences-section__ring client-experiences-section__ring--two" />
                    <div className="client-experiences-section__glow client-experiences-section__glow--left" />
                    <div className="client-experiences-section__glow client-experiences-section__glow--right" />

                    <div className="client-experiences-section__orbit">
                        {positionedCards.map((item) => (
                            <article
                                key={item.id}
                                className={`client-experiences-section__card ${
                                    item.isActive ? "is-active" : ""
                                }`}
                                style={item.style}
                            >
                                <div className="client-experiences-section__logo-wrapper">
                                    <img
                                        className="client-experiences-section__logo"
                                        src={item.logo}
                                        alt=""
                                    />
                                </div>

                                <p className="client-experiences-section__quote">
                                    “{item.quote}”
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}