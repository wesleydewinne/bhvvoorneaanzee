// src/pages/EhboPage.jsx
import React from "react";
import "./EhboPage.css";

import {
    FirstAidKit,
    Heartbeat,
    Bandaids,
    CheckCircle,
    HandHeart,
} from "@phosphor-icons/react";

import data from "../../data/training.json";

import TrainingCardSection from "../../components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";

import fallback from "../../assets/image/fallbackAfbeelding.png";
// import ehboImage from "../../assets/image/algemeneAfbeeldingen/ehbo.png";

function EhboPage() {
    const ehboCategory = data.categories.find(
        (category) => category.id === "ehbo"
    );
    const ehboTrainings = ehboCategory ? ehboCategory.trainings : [];

    const ehboCards = ehboTrainings.map((training) => {
        const resolvedImage = training.cardImage?.trim()
            ? training.cardImage
            : ehboCategory?.image || fallback;

        return {
            title: training.title,
            description: `EHBO training - ${training.type}`,
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
            buttonIcon: "💉",
        };
    });

    const ehboTaken = [
        {
            icon: <FirstAidKit size={25} color="#ff8000" weight="bold" />,
            task: "Eerste hulp verlenen bij ongevallen en verwondingen",
        },
        {
            icon: <Heartbeat size={25} color="#ff6f61" weight="regular" />,
            task: "Reanimeren en AED bedienen bij hartstilstand",
        },
        {
            icon: <Bandaids size={25} color="#ff8000" weight="bold" />,
            task: "Wondverzorging, verbinden en stabiele zijligging toepassen",
        },
        {
            icon: <HandHeart size={25} color="#ff6f61" weight="regular" />,
            task: "Omgaan met slachtoffers in shock of bewusteloosheid",
        },
    ];

    const leerdoelen = [
        "Je weet hoe je adequaat eerste hulp verleent bij verschillende letsels.",
        "Je kunt reanimeren en veilig gebruikmaken van een AED.",
        "Je leert het verschil tussen levensreddende en niet-levensreddende handelingen.",
        "Je weet hoe je rustig blijft en slachtoffers geruststelt.",
    ];

    const onderwerpen = [
        "Reanimatie en AED-gebruik",
        "Bloeding, wonden en botbreuken",
        "Brandwonden, vergiftiging en bewusteloosheid",
        "Oefeningen met realistische scenario’s",
    ];

    return (
        <>
            <HeaderSection
                mainTitle="EHBO Training"
                //backgroundImage={ehboImage}
            />

            <main className="ehbo-info-grid">
                {/* Intro */}
                <section className="section full-width-section">
                    <article className="content-block">
                        <header>
                            <h2>Wat is EHBO?</h2>
                        </header>
                        <p>
                            EHBO (Eerste Hulp Bij Ongevallen) is de directe hulp die wordt
                            verleend aan een slachtoffer van een ongeval of plotselinge
                            aandoening. Met de juiste kennis en handelingen kan je letsel
                            beperken en zelfs levens redden.
                            Tijdens de EHBO-training leer je om in noodsituaties snel en
                            effectief te handelen tot professionele hulp aanwezig is.
                        </p>
                    </article>
                </section>

                {/* Taken */}
                <section className="section icon-tasks">
                    <h2>Wat doet een EHBO’er?</h2>
                    <ul className="icon-list">
                        {ehboTaken.map((item, index) => (
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

                {/* Trainingen */}
                <TrainingCardSection
                    title="Beschikbare EHBO-training"
                    cards={ehboCards}
                />
            </main>
        </>
    );
}

export default EhboPage;
