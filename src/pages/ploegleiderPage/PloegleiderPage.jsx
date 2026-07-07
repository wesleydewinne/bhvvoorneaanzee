import React, { useMemo } from "react";
import "./PloegleiderPage.css";

import {
    UsersThree,
    ClipboardText,
    Fire,
    Headset,
    CheckCircle,
    Buildings,
    WarningCircle,
    Megaphone,
} from "@phosphor-icons/react";

import data from "../../shared/data/training.json";

import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";

import fallback from "@/assets/image/common/fallback/Card-Fallback.png?w=720&format=webp&quality=72";
import ServiceRegionsSection from "@/shared/components/sections/ServiceAreaSection/ServiceRegionsSection.jsx";

export default function PloegleiderPage() {

    /* 🔹 Categorie ophalen */
    const ploegleiderCategory = data.categories.find(
        (category) => category.id === "ploegleider"
    );

    const ploegleiderTrainings = ploegleiderCategory?.trainings || [];

    /* 🔹 Cards (zelfde architectuur als BHV) */
    const ploegleiderCards = useMemo(
        () =>
            ploegleiderTrainings.map((training) => ({
                title: training.title,
                description: training.description,
                image: training.cardImage?.trim()
                    ? training.cardImage
                    : ploegleiderCategory?.image || fallback,
                alt: training.cardAlt || training.title,
                buttonTo: training.slug,
                buttonText: "Bekijk training",
                buttonStyle: "primary",
            })),
        [ploegleiderTrainings, ploegleiderCategory]
    );

    /* 🔹 Taken ploegleider */
    const ploegleiderTasks = [
        {
            icon: <UsersThree size={32} color="#ff8000" weight="bold" />,
            task: "Aansturen en coördineren van BHV’ers tijdens incidenten.",
        },
        {
            icon: <ClipboardText size={32} color="#ff8000" weight="bold" />,
            task: "Verdelen van taken en bewaken van het overzicht.",
        },
        {
            icon: <Fire size={32} color="#ff8000" weight="bold" />,
            task: "Beslissingen nemen bij brand, ontruiming en calamiteiten.",
        },
        {
            icon: <Headset size={32} color="#ff8000" weight="bold" />,
            task: "Communiceren met hulpdiensten, management en BHV-team.",
        },
    ];

    /* 🔹 Wanneer is een ploegleider nodig */
    const maatgevendeFactoren = [
        {
            icon: <Buildings size={28} color="#ff8000" weight="bold" />,
            title: "Grote of complexe organisatie",
            description:
                "Meerdere afdelingen, verdiepingen of gebouwen vragen om centrale aansturing.",
        },
        {
            icon: <WarningCircle size={28} color="#ff8000" weight="bold" />,
            title: "Verhoogde risico’s",
            description:
                "Bij verhoogde brand- of ontruimingsrisico’s is duidelijke coördinatie essentieel.",
        },
        {
            icon: <Megaphone size={28} color="#ff8000" weight="bold" />,
            title: "Communicatie & besluitvorming",
            description:
                "Tijdens een incident is één aanspreekpunt nodig voor snelle en duidelijke beslissingen.",
        },
    ];

    return (
        <>
            <HeaderSection
                mainTitle="Ploegleider BHV Training – Leidinggeven tijdens noodsituaties"
            />

            <main className="ploegleider-info-grid">

                {/* Intro */}
                <section className="ploegleider-intro-grid">

                    <article className="ploegleider-info">
                        <h2>Wat is een Ploegleider BHV?</h2>

                        <p>
                            De <strong>Ploegleider BHV</strong> is verantwoordelijk voor de
                            aansturing van het BHV-team tijdens incidenten en ontruimingen.
                            Waar BHV’ers uitvoerend handelen, bewaakt de ploegleider het
                            overzicht, stelt prioriteiten en zorgt voor duidelijke communicatie.
                        </p>

                        <p>
                            Deze rol is onmisbaar binnen organisaties waar meerdere BHV’ers
                            tegelijk ingezet worden. De ploegleider vormt de schakel tussen
                            het BHV-team, het management en de hulpdiensten.
                        </p>

                        <p>
                            De <strong>Ploegleider BHV-training</strong> is bedoeld voor ervaren
                            BHV’ers die willen doorgroeien naar een coördinerende of
                            leidinggevende rol binnen de BHV-organisatie.
                        </p>
                    </article>

                    <aside className="ploegleider-kstas">
                        <h2>Wat doet een ploegleider?</h2>

                        <ul className="ploegleider-task-list">
                            {ploegleiderTasks.map((item, index) => (
                                <li key={index}>
                                    {item.icon}
                                    <span>{item.task}</span>
                                </li>
                            ))}
                        </ul>
                    </aside>

                </section>

                {/* Trainingen */}
                <TrainingCardSection
                        title="Ploegleider BHV-trainingen"
                        subtitle="Voor BHV’ers die verantwoordelijkheid nemen en overzicht houden."
                        cards={ploegleiderCards}
                />
                
                    {/* Wanneer nodig */}
                    <section className="factor-info-section">
                        <h2>Wanneer is een Ploegleider BHV noodzakelijk?</h2>

                        <div className="factor-info-grid">
                            {maatgevendeFactoren.map((factor, index) => (
                                <div key={index} className="factor-info-card">
                                    <div className="factor-info-icon">
                                        {factor.icon}
                                    </div>
                                    <h3 className="factor-info-title">{factor.title}</h3>
                                    <p className="factor-info-text">{factor.description}</p>
                                </div>
                            ))}
                        </div>

                        <p className="factor-footer">
                            Een goed georganiseerde BHV-structuur voorkomt chaos tijdens
                            incidenten en verhoogt de veiligheid binnen de organisatie.
                        </p>
                    </section>

                    {/* Regio */}
                    <ServiceRegionsSection/>

                    {/* CTA */}
                    <a href="/contact" className="btn-primary">
                        Offerte aanvragen
                    </a>

            </main>
        </>
);
}
