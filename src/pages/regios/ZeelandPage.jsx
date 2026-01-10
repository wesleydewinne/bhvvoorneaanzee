import React, { useMemo } from "react";
import "./RegioPage.css";

import HeaderSection from "@/components/sections/headerSection/HeaderSection.jsx";
import TrainingCardSection from "@/components/sections/trainingSection/TrainingCardSection.jsx";


import data from "@/data/training.json";
import fallback from "@/assets/image/fallbackAfbeelding.png";
import zeelandHeader from "@/assets/image/bhvPaginaFotos/bhv-zeeland-header.png";

export default function ZeelandPage() {
    const bhvCategory = data.categories.find((c) => c.id === "bhv");
    const bhvTrainings = bhvCategory?.trainings || [];

    const bhvCards = useMemo(
        () =>
            bhvTrainings.map((training) => ({
                title: training.title,
                description: `BHV incompany training - ${training.type}`,
                cardImage: training.cardImage?.trim() || fallback,
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
            })),
        [bhvTrainings]
    );

    return (
        <main className="bhv-region-page">
            {/* 🌊 Header */}
            <HeaderSection
                mainTitle="BHV-training Zeeland – Incompany & Praktijkgericht"
                backgroundImage={zeelandHeader}
            />

            {/* 📍 Regionale introductie */}
            <section
                className="bhv-region-intro"
                aria-label="BHV-trainingen in regio Zeeland"
            >
                <h1>BHV-trainingen in Zeeland (noordelijk deel)</h1>

                <img
                    src={zeelandHeader}
                    alt="Illustratie van Zeeland met kustlijn, molen en brug – BHV training Zeeland"
                    className="region-hero"
                    loading="lazy"
                />

                <div className="region-text">
                    <p>
                        <strong>BHV Voorne aan Zee</strong> verzorgt erkende{" "}
                        <strong>incompany BHV-trainingen</strong> in het noordelijke deel
                        van <strong>Zeeland</strong>. Wij zijn actief in plaatsen als{" "}
                        <strong>Ouddorp</strong>, <strong>Goedereede</strong>,{" "}
                        <strong>Stellendam</strong>, <strong>Dirksland</strong> en{" "}
                        <strong>Middelharnis</strong>.
                    </p>

                    <p>
                        Onze instructeurs trainen medewerkers rechtstreeks op de eigen
                        locatie – van zorginstellingen en scholen tot productiebedrijven en
                        kantoren. Zo kunnen deelnemers in hun{" "}
                        <strong>eigen werkomgeving</strong> oefenen met levensreddend
                        handelen, brandbestrijding en ontruiming.
                    </p>

                    <p>
                        De trainingen zijn volledig afgestemd op jouw{" "}
                        <strong>organisatie en risico’s</strong> en voldoen aan de laatste
                        richtlijnen van NIBHV. Wij combineren realistische praktijkscenario’s
                        met duidelijke uitleg en een veilige leeromgeving.
                    </p>

                    <p>
                        Naast Zeeland zijn we ook actief in{" "}
                        <a href="/bhv-training-rotterdam" className="internal-link">
                            Rotterdam-Rijnmond
                        </a>{" "}
                        en{" "}
                        <a href="/bhv-training-westland" className="internal-link">
                            het Westland & Haaglanden
                        </a>
                        . Zo profiteer je van één betrouwbare{" "}
                        <strong>regionale BHV-partner</strong> voor Zuidwest-Nederland.
                    </p>
                </div>
            </section>

            {/* 🎓 Trainingskaarten */}
            <TrainingCardSection
                title="BHV-trainingen in Zeeland"
                subtitle="Erkende, praktijkgerichte trainingen op locatie bij jouw organisatie."
                cards={bhvCards}
            />

            {/* 🌍 Regionale blokken */}
            <RegionSection />
        </main>
    );
}
