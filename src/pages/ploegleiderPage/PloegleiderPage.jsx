// src/pages/PloegleiderPage.jsx
import React from "react";
import "./PloegleiderPage.css";

import {
    UsersThree,
    ClipboardText,
    Fire,
    Headset,
    CheckCircle,
} from "@phosphor-icons/react";

import data from "../../data/training.json";

import TrainingCardSection from "../../components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";

import fallback from "../../assets/image/fallbackAfbeelding.png";
//import ploegleiderImage from "../../assets/images/algemeneAfbeeldingen/ploegleider.png";

function PloegleiderPage() {
    const ploegleiderCategory = data.categories.find(
        (category) => category.id === "ploegleider"
    );
    const ploegleiderTrainings = ploegleiderCategory
        ? ploegleiderCategory.trainings
        : [];

    const ploegleiderCards = ploegleiderTrainings.map((training) => {
        const resolvedImage = training.cardImage?.trim()
            ? training.cardImage
            : ploegleiderCategory?.image || fallback;

        return {
            title: training.title,
            description: `Ploegleidertraining - ${training.type}`,
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
            buttonIcon: "👷‍♂️",
        };
    });

    const taken = [
        {
            icon: <UsersThree size={25} color="#ff8000" weight="bold" />,
            task: "Aansturen van BHV-teams tijdens noodsituaties",
        },
        {
            icon: <ClipboardText size={25} color="#ff6f61" weight="regular" />,
            task: "Coördineren van taken en verantwoordelijkheden binnen de ploeg",
        },
        {
            icon: <Fire size={25} color="#ff8000" weight="bold" />,
            task: "Beslissingen nemen bij brand, ontruiming of incidenten",
        },
        {
            icon: <Headset size={25} color="#ff8000" weight="regular" />,
            task: "Communiceren met hulpdiensten en management",
        },
    ];

    const leerdoelen = [
        "Je kunt leidinggeven tijdens noodsituaties en effectief beslissingen nemen.",
        "Je leert de taken van ploegleiders en BHV’ers coördineren.",
        "Je herkent knelpunten in BHV-organisatie en lost deze op.",
        "Je kunt een inzet evalueren en verbeterpunten formuleren.",
    ];

    const onderwerpen = [
        "Leiderschapsvaardigheden en communicatie",
        "Risico-inschatting en besluitvorming",
        "Scenario-oefeningen met BHV-teams",
        "Evaluatie en rapportage van incidenten",
    ];

    return (
        <>
            <HeaderSection
                mainTitle="Ploegleider BHV Training"
                // backgroundImage={ploegleiderImage}
            />

            <main className="ploegleider-info-grid">
                {/* Intro */}
                <section className="section full-width-section">
                    <article className="content-block">
                        <header>
                            <h2>Wat is een Ploegleider BHV?</h2>
                        </header>
                        <p>
                            De Ploegleider BHV is verantwoordelijk voor het aansturen van
                            BHV-teams binnen een organisatie. Tijdens een incident of
                            ontruiming bewaakt de ploegleider het overzicht, verdeelt taken en
                            communiceert met hulpdiensten. De ploegleider zorgt dat alle
                            BHV’ers weten wat ze moeten doen en dat de inzet efficiënt verloopt.
                            Deze training is bedoeld voor ervaren BHV’ers die willen doorgroeien
                            naar een coördinerende of leidinggevende rol.
                        </p>
                    </article>
                </section>

                {/* Taken */}
                <section className="section icon-tasks">
                    <h2>Wat doet een ploegleider?</h2>
                    <ul className="icon-list">
                        {taken.map((item, index) => (
                            <li key={index}>
                                {item.icon}
                                <span>{item.task}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Leerdoelen */}
                <section className="section">
                    <h2>Leerdoelen van de training</h2>
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

                {/* Trainingen uit JSON */}
                <TrainingCardSection
                    title="Beschikbare Ploegleidertrainingen"
                    cards={ploegleiderCards}
                />
            </main>
        </>
    );
}

export default PloegleiderPage;
