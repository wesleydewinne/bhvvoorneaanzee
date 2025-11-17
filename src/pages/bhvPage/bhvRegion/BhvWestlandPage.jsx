import React, { useMemo } from "react";
import "./BhvRegionPage.css";

import HeaderSection from "@/components/sections/headerSection/HeaderSection.jsx";
import TrainingCardSection from "@/components/sections/trainingSection/TrainingCardSection.jsx";

import data from "@/data/training.json";
import fallback from "@/assets/image/fallbackAfbeelding.png";
import westlandHeader from "@/assets/image/bhvPaginaFotos/bhv-westland-den-haag-header.png";

export default function BhvWestlandPage() {
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
            {/* 🏙️ Header */}
            <HeaderSection
                mainTitle="BHV-training Westland & Haaglanden – Incompany & Praktijkgericht"
                backgroundImage={westlandHeader}
            />

            {/* 📍 Regionale introductie */}
            <section
                className="bhv-region-intro"
                aria-label="BHV-trainingen in regio Westland en Haaglanden"
            >
                <h1>BHV-trainingen in regio Westland & Haaglanden</h1>

                <img
                    src={westlandHeader}
                    alt="Skyline van Den Haag met kassen uit het Westland – BHV training Westland en Haaglanden"
                    className="region-hero"
                    loading="lazy"
                />

                <div className="region-text">
                    <p>
                        <strong>BHV Voorne aan Zee</strong> verzorgt{" "}
                        <strong>incompany BHV-trainingen</strong> in het{" "}
                        <strong>Westland en Haaglanden</strong>. Wij zijn actief in{" "}
                        <strong>Naaldwijk</strong>, <strong>Monster</strong>,{" "}
                        <strong>’s-Gravenzande</strong> en de{" "}
                        <strong>omgeving van Den Haag</strong>.
                    </p>

                    <p>
                        Onze praktijkgerichte trainingen worden gegeven bij jouw bedrijf op
                        locatie. We richten ons op realistische situaties die passen bij jouw{" "}
                        <strong>werkvloer en risico’s</strong>, of het nu gaat om kantoorgebouwen,
                        glastuinbouw, onderwijs of zorginstellingen.
                    </p>

                    <p>
                        Tijdens de training leren deelnemers hoe ze adequaat kunnen handelen
                        bij <strong>brand, ontruiming en eerste hulp</strong>, met oefeningen
                        die passen bij de dagelijkse praktijk. De opleiding voldoet aan de
                        actuele eisen volgens de <strong>Arbowet</strong> en NIBHV-richtlijnen.
                    </p>

                    <p>
                        Naast Haaglanden zijn wij ook actief in{" "}
                        <a href="/bhv-training-rotterdam" className="internal-link">
                            Rotterdam-Rijnmond
                        </a>{" "}
                        en{" "}
                        <a href="/bhv-training-zeeland" className="internal-link">
                            Zeeland
                        </a>
                        . Zo kun je in de volledige regio Zuidwest-Nederland rekenen op
                        één ervaren <strong>BHV-partner</strong>.
                    </p>
                </div>
            </section>

            {/* 🎓 Trainingskaarten */}
            <TrainingCardSection
                title="BHV-trainingen in Westland & Haaglanden"
                subtitle="Erkende, praktijkgerichte incompany trainingen voor bedrijven in de regio."
                cards={bhvCards}
            />

            {/* 🌍 Regionale blokken */}
            <RegionSection />
        </main>
    );
}
