// src/pages/BhvPage.jsx
import React from 'react';
import './BhvPage.css';

import { FirstAidKit, FireExtinguisher, Fire, CheckCircle } from "@phosphor-icons/react";

import data from "../../data/training.json";

import TrainingCardSection from '../../components/sections/trainingSection/TrainingCardSection.jsx';
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";

import fallback from "../../assets/image/fallbackAfbeelding.png";
import groepImage from "../../assets/image/algemeneAfbeeldingen/groep.png";

function BhvPage() {
    const bhvCategory = data.categories.find(category => category.id === "bhv");
    const bhvTrainings = bhvCategory ? bhvCategory.trainings : [];

    const bhvCards = bhvTrainings.map(training => {
        const resolvedImage = training.cardImage?.trim()
            ? training.cardImage
            : (bhvCategory?.image || fallback);

        return {
            title: training.title,
            description: `BHV training - ${training.type}`,
            cardImage: resolvedImage,
            cardAlt: training.cardAlt || training.title,
            pricing: {
                individualPrice: training.pricing?.[0]?.individualPrice || null,
                groupPrice: training.pricing?.[0]?.groupPrice || null
            },
            showPrice: true,
            buttonTo: `/training/${training.type}`,
            buttonText: 'Meer informatie',
            buttonStyle: 'primary',
            buttonIcon: '📘'
        };
    });

    const bhvTasks = [
        { icon: <FirstAidKit size={25} color="#ff8000" weight="bold" />, task: "Het verlenen van eerste hulp bij ongevallen" },
        { icon: <FireExtinguisher size={25} color="#ff6f61" weight="regular" />, task: "Het beperken en bestrijden van brand en het beperken van de gevolgen van ongevallen" },
        { icon: <Fire size={25} color="#ff8000" weight="bold" />, task: "Het in noodsituaties alarmeren en evacueren van alle aanwezigen" },
    ];

    const articleThreeTasks = [
        "Risico’s inventariseren en evalueren (RI&E) om een plan van aanpak op te stellen.",
        "Werknemers informeren over risico’s en genomen preventiemaatregelen.",
        "De benodigde organisatie voor BHV inrichten.",
        "Zorgen voor een veilige en gezonde werkomgeving."
    ];

    const articleFifteenTasks = [
        "Bepalen hoeveel BHV’ers nodig zijn op basis van risico’s.",
        "Zorgen voor goede opleiding en training van BHV’ers.",
        "Er moet altijd een BHV’er aanwezig zijn.",
        "De BHV-voorzieningen regelmatig evalueren en bijstellen."
    ];

    const maatgevendeFactoren = [
        "De grootte en ligging van de organisatie",
        "Aanwezige gevaren of brandscenario’s",
        "Aantal aanwezige werknemers of bezoekers",
        "Tijdstip waarop mensen aanwezig zijn",
        "Aantal niet-zelfredzame personen",
        "Opkomsttijd hulpdiensten",
        "Deskundigheid en BHV-samenwerking",
    ];

    return (
        <>
            <HeaderSection
                mainTitle="Training bedrijfshulpverlening (BHV)"
                backgroundImage={groepImage}
            />

            <main className="bhv-info-grid">

                {/* Wat is BHV */}
                <section className="section full-width-section">
                    <article className="content-block">
                        <header>
                            <h2>Wat is BHV?</h2>
                        </header>
                        <p>
                            Bedrijfshulpverlening (BHV) zorgt ervoor dat een bedrijf snel en effectief kan reageren
                            in noodsituaties. Denk hierbij aan het verlenen van eerste hulp bij ongevallen, het
                            beperken en bestrijden van brand, en het veilig evacueren van medewerkers en bezoekers.
                            In Nederland is het verplicht dat bedrijven BHV goed regelen, zodat er altijd voldoende
                            opgeleide BHV’ers aanwezig zijn en de juiste materialen en procedures beschikbaar zijn.
                            Goed georganiseerde BHV helpt ernstige schade en letsel te voorkomen en geeft medewerkers
                            en bezoekers de zekerheid dat er in noodsituaties adequaat wordt gehandeld.
                        </p>
                    </article>
                </section>

                {/* Taken van een BHV'er */}
                <div className="section icon-tasks">
                    <h2>Wat doet een BHV’er?</h2>
                    <ul className="icon-list">
                        {bhvTasks.map((item, index) => (
                            <li key={index}>
                                {item.icon}
                                <span>{item.task}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Artikelen Arbowet + afbeelding */}
                <section className="section rie-layout">

                    <article className="rie-article article-top">
                        <h2>Artikel 3 Arbowet: Algemene zorgplicht</h2>
                        <ul>
                            {articleThreeTasks.map((task, index) => (
                                <li key={index}>
                                    <CheckCircle size={20} color="#ff8000" weight="bold" /> {task}
                                </li>
                            ))}
                        </ul>
                        <a href="https://wetten.overheid.nl/jci1.3:c:BWBR0010346&hoofdstuk=2&artikel=3" target="_blank" rel="noreferrer">
                            Bekijk artikel 3 op overheid.nl
                        </a>
                    </article>

                    <article className="rie-article article-bottom">
                        <h2>Artikel 15 Arbowet: BHV-verplichting</h2>
                        <ul>
                            {articleFifteenTasks.map((task, index) => (
                                <li key={index}>
                                    <CheckCircle size={20} color="#ff8000" weight="bold" /> {task}
                                </li>
                            ))}
                        </ul>
                        <a href="https://wetten.overheid.nl/jci1.3:c:BWBR0010346&hoofdstuk=3&artikel=15" target="_blank" rel="noreferrer">
                            Bekijk artikel 15 op overheid.nl
                        </a>
                    </article>

                    <aside className="rie-right">
                        <img src={groepImage} alt="BHV training"/>
                    </aside>

                </section>

                {/* Maatgevende factoren */}
                <section className="section">
                    <h2>Maatgevende factoren voor BHV</h2>
                    <ul>
                        {maatgevendeFactoren.map((factor, index) => (
                            <li key={index}>
                                <CheckCircle size={18} color="#444" weight="regular"/> {factor}
                            </li>
                        ))}
                    </ul>
                    <p>
                        Meer informatie over het maken van een RI&E vind je op&nbsp;
                        <a href="https://www.rie.nl/over-rie/een-rie-maken#hoe-kies-je-het-juiste-hulpmiddel" target="_blank" rel="noreferrer">
                            rie.nl
                        </a>
                    </p>
                </section>

                {/* Trainingskaarten */}
                <TrainingCardSection
                    title="Kies jouw BHV Training"
                    cards={bhvCards}
                />

            </main>
        </>
    );
}

export default BhvPage;
