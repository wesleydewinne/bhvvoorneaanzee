// src/pages/WorkshopsPage.jsx
import React from "react";
// import "./WorkshopsPage.css";

import {
    FireExtinguisher,
    UsersThree,
    ChatCircleDots,
    ClipboardText,
    CheckCircle,
} from "@phosphor-icons/react";

import data from "../../data/training.json";

import TrainingCardSection from "../../components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";

import fallback from "../../assets/image/fallbackAfbeelding.png";
// import workshopImage from "../../assets/image/algemeneAfbeeldingen/workshop.png";

function Workshops() {
    const workshopCategory = data.categories.find(
        (category) => category.id === "workshops"
    );
    const workshopTrainings = workshopCategory ? workshopCategory.trainings : [];

    const workshopCards = workshopTrainings.map((training) => {
        const resolvedImage = training.cardImage?.trim()
            ? training.cardImage
            : workshopCategory?.image || fallback;

        return {
            title: training.title,
            description: `Workshop - ${training.type}`,
            cardImage: resolvedImage,
            cardAlt: training.cardAlt || training.title,
            pricing: {
                individualPrice: training.pricing?.[0]?.individualPrice || null,
                groupPrice: training.pricing?.[0]?.groupPrice || null,
            },
            showPrice: true,
            buttonTo: `/training/${training.type}`,
            buttonText: "Meer informatie",
            buttonStyle: "primary",
            buttonIcon: "🎯",
        };
    });

    const workshopTaken = [
        {
            icon: <UsersThree size={25} color="#ff8000" weight="bold" />,
            task: "Samenwerken tijdens noodsituaties en crisissimulaties",
        },
        {
            icon: <ChatCircleDots size={25} color="#ff6f61" weight="regular" />,
            task: "Effectief communiceren binnen het BHV-team",
        },
        {
            icon: <FireExtinguisher size={25} color="#ff8000" weight="bold" />,
            task: "Brandveiligheid en ontruimingsprocedures oefenen",
        },
        {
            icon: <ClipboardText size={25} color="#ff6f61" weight="regular" />,
            task: "Reflecteren op eigen handelen en leren van scenario’s",
        },
    ];

    const leerdoelen = [
        "Verbeter je samenwerking binnen het BHV-team.",
        "Leer effectief handelen onder druk.",
        "Oefen realistische scenario’s uit de praktijk.",
        "Versterk de veiligheidscultuur binnen je organisatie.",
    ];

    const onderwerpen = [
        "Communicatie tijdens incidenten",
        "Leiderschap en samenwerking",
        "Omgaan met stress en beslissingen onder druk",
        "Praktische oefeningen en simulaties",
    ];

    return (
        <>
            <HeaderSection
                mainTitle="Workshops Veiligheid & BHV"
                // backgroundImage={workshopImage}
            />

            <main className="workshops-info-grid">
                {/* Intro */}
                <section className="section full-width-section">
                    <article className="content-block">
                        <header>
                            <h2>Wat zijn onze workshops?</h2>
                        </header>
                        <p>
                            Onze BHV-workshops zijn korte, praktijkgerichte sessies gericht op
                            specifieke veiligheidsthema’s. Ze zijn ideaal om kennis op te
                            frissen of om medewerkers te betrekken bij veiligheid op de
                            werkvloer.
                            De workshops zijn interactief, met veel aandacht voor samenwerken,
                            communicatie en handelen in noodsituaties.
                        </p>
                    </article>
                </section>

                {/* Taken */}
                <section className="section icon-tasks">
                    <h2>Wat leer je tijdens een workshop?</h2>
                    <ul className="icon-list">
                        {workshopTaken.map((item, index) => (
                            <li key={index}>
                                {item.icon}
                                <span>{item.task}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Leerdoelen */}
                <section className="section">
                    <h2>Leerdoelen</h2>
                    <ul>
                        {leerdoelen.map((doel, index) => (
                            <li key={index}>
                                <CheckCircle size={18} color="#ff8000" weight="bold" /> {doel}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Onderwerpen */}
                <section className="section">
                    <h2>Onderwerpen die aan bod komen</h2>
                    <ul>
                        {onderwerpen.map((item, index) => (
                            <li key={index}>
                                <CheckCircle size={18} color="#444" weight="regular" /> {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Workshops uit JSON */}
                <TrainingCardSection
                    title="Kies jouw Workshop"
                    cards={workshopCards}
                />
            </main>
        </>
    );
}

export default Workshops;
