import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../BhvPage.css";

import {
    FirstAidKit,
    FireExtinguisher,
    Fire,
} from "@phosphor-icons/react";

import data from "@/data/training.json";
import HeaderSection from "@/components/sections/headerSection/HeaderSection.jsx";
import TrainingCardSection from "@/components/sections/trainingSection/TrainingCardSection.jsx";

import VoorneAanZeeHeader from "@/assets/image/bhvPaginaFotos/bhv-voorne-aan-zee-header2.png";
import rotterdamHeader from "@/assets/image/bhvPaginaFotos/bhv-rotterdam-rijnmond-header.png";
import zeelandHeader from "@/assets/image/bhvPaginaFotos/bhv-zeeland-header.png";
import westlandHeader from "@/assets/image/bhvPaginaFotos/bhv-westland-den-haag-header.png";
import fallback from "@/assets/image/fallbackAfbeelding.png";

export default function BhvRotterdamPage() {
    const bhvCategory = data.categories.find((category) => category.id === "bhv");
    const bhvTrainings = bhvCategory?.trainings || [];

    const bhvCards = useMemo(
        () =>
            bhvTrainings.map((training) => {
                const resolvedImage = training.cardImage?.trim()
                    ? training.cardImage
                    : bhvCategory?.image || fallback;

                return {
                    title: training.title,
                    description: `BHV incompany training - ${training.type}`,
                    cardImage: resolvedImage,
                    cardAlt: training.cardAlt || training.title,
                    pricing: {
                        individualPrice: training.pricing?.[0]?.individualPrice || null,
                        groupPrice: training.pricing?.[0]?.groupPrice || null,
                    },
                    showPrice: true,
                    buttonTo: `/training/${training.type}`,
                    buttonText: "Vraag offerte aan",
                    buttonStyle: "primary",
                    buttonIcon: "📘",
                };
            }),
        [bhvTrainings, bhvCategory]
    );

    const bhvTasks = [
        {
            icon: <FirstAidKit size={35} color="#ff8000" weight="bold" />,
            task: "Eerste hulp verlenen bij ongevallen op de werkvloer.",
        },
        {
            icon: <FireExtinguisher size={35} color="#ff6f61" weight="regular" />,
            task: "Beginnende brand bestrijden en gevolgschade beperken.",
        },
        {
            icon: <Fire size={35} color="#ff8000" weight="bold" />,
            task: "Medewerkers veilig evacueren bij noodsituaties.",
        },
    ];

    return (
        <main className="bhv-info-grid">
            {/* 🏙️ Header */}
            <HeaderSection
                mainTitle="BHV Training Rotterdam-Rijnmond – Incompany & Praktijkgericht"
                backgroundImage={rotterdamHeader}
            />

            {/* 📍 Introductie */}
            <section className="bhv-intro-grid">
                <article className="bhv-info">
                    <h2>BHV-trainingen in regio Rotterdam-Rijnmond</h2>
                    <p>
                        <strong>BHV Voorne aan Zee</strong> verzorgt erkende{" "}
                        <strong>incompany BHV-trainingen</strong> bij bedrijven in de{" "}
                        <strong>regio Rotterdam-Rijnmond</strong>. We geven trainingen in{" "}
                        <strong>Spijkenisse</strong>, <strong>Hoogvliet</strong>,{" "}
                        <strong>Maassluis</strong> en <strong>Vlaardingen</strong>.
                    </p>
                    <p>
                        Iedere <strong>BHV-training</strong> wordt afgestemd op jouw{" "}
                        <strong>organisatie, werkvloer en risico’s</strong>. Hierdoor trainen
                        medewerkers in hun eigen omgeving – dat zorgt voor een{" "}
                        <strong>realistische en effectieve leerervaring</strong>.
                    </p>
                    <p>
                        Of het nu gaat om een kantoor, school, zorginstelling of
                        productiebedrijf – onze instructeurs leren jouw team{" "}
                        <strong>levensreddend handelen, brand bestrijden en ontruimen</strong>{" "}
                        volgens actuele NIBHV-richtlijnen.
                    </p>
                    <p>
                        Ook actief in{" "}
                        <a href="/bhv-training-zeeland">Zeeland</a> en{" "}
                        <a href="/bhv-training-westland">het Westland & Haaglanden</a>.
                    </p>
                </article>

                <aside className="bhv-tasks">
                    <h2>Wat leert een BHV’er tijdens de training?</h2>
                    <ul className="bhv-task-list">
                        {bhvTasks.map((item, index) => (
                            <li key={index}>
                                {item.icon}
                                <span>{item.task}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </section>

            {/* 🎓 Trainingskaarten */}
            <TrainingCardSection
                title="BHV-trainingen in Rotterdam-Rijnmond"
                subtitle="Praktijkgerichte incompany trainingen voor bedrijven in Spijkenisse, Hoogvliet, Maassluis en Vlaardingen."
                cards={bhvCards}
            />

            {/* 🌍 Andere regio’s */}
            <section
                className="region-section bhv-regions"
                aria-label="BHV trainingsregio's in Zuidwest-Nederland"
            >
                <h2 className="region-title">Ook actief in omliggende regio’s</h2>

                <div className="region-grid">
                    <Link to="/bhv" className="region-link">
                        <article className="region-card bhv-region" data-region="Zeeland">
                            <div className="region-image">
                                <img
                                    src={zeelandHeader}
                                    alt="Illustratie van Zeeland met kustlijn, molen en brug – BHV training Zeeland"
                                    loading="lazy"
                                />
                                <div className="image-overlay" />
                            </div>
                            <div className="region-content">
                                <h2 className="region-heading">
                                    BHV training Regio Zeeland (bovenste gedeelte)
                                </h2>
                                <p>
                                    Actief in <strong>Ouddorp</strong>, <strong>Goedereede</strong>,{" "}
                                    <strong>Stellendam</strong>, <strong>Dirksland</strong> en{" "}
                                    <strong>Middelharnis</strong>.
                                </p>
                            </div>
                        </article>
                    </Link>

                    <Link to="/bhv" className="region-link">
                        <article className="region-card bhv-region" data-region="Westland">
                            <div className="region-image">
                                <img
                                    src={westlandHeader}
                                    alt="Skyline van Den Haag met kassen uit het Westland – BHV training Den Haag en Westland"
                                    loading="lazy"
                                />
                                <div className="image-overlay" />
                            </div>
                            <div className="region-content">
                                <h2 className="region-heading">
                                    BHV training Regio Westland & Haaglanden
                                </h2>
                                <p>
                                    Trainingen in <strong>Monster</strong>, <strong>Naaldwijk</strong>,{" "}
                                    <strong>’s-Gravenzande</strong> en omgeving{" "}
                                    <strong>Den Haag</strong>.
                                </p>
                            </div>
                        </article>
                    </Link>

                    <Link to="/bhv" className="region-link">
                        <article className="region-card bhv-region" data-region="VoorneAanZee">
                            <div className="region-image">
                                <img
                                    src={VoorneAanZeeHeader}
                                    alt="Illustratie van Voorne aan Zee met duinen en vuurtoren – BHV training Voorne aan Zee"
                                    loading="lazy"
                                />
                                <div className="image-overlay" />
                            </div>
                            <div className="region-content">
                                <h2 className="region-heading">BHV training Voorne aan Zee</h2>
                                <p>
                                    Actief in <strong>Brielle</strong>, <strong>Hellevoetsluis</strong>,
                                    <strong> Oostvoorne</strong> en <strong>Rockanje</strong>.
                                </p>
                            </div>
                        </article>
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <a href="/contact" className="btn-primary">
                Offerte aanvragen
            </a>
        </main>
    );
}
