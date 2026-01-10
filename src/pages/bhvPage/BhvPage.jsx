import React, { useMemo } from "react";
import "./BhvPage.css";
import {
    FirstAidKit,
    FireExtinguisher,
    Fire,
    CheckCircle,
} from "@phosphor-icons/react";

import data from "../../data/training.json";
import TrainingCardSection from "../../components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";

// ✅ Afbeeldingen met SEO-vriendelijke namen
import VoorneAanZeeHeader from "@/assets/image/bhvPaginaFotos/bhv-voorne-aan-zee-header.png";

import fallback from "../../assets/image/fallbackAfbeelding.png";
import ServiceRegionsSection from "@/components/sections/ServiceAreaSection/ServiceRegionsSection.jsx";

export default function BhvPage() {
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
                    buttonTo: `/offerte`,               //${training.type}
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

    const articleThreeTasks = [
        "Risico’s inventariseren en evalueren (RI&E) om een plan van aanpak op te stellen.",
        "Werknemers informeren over risico’s en preventiemaatregelen.",
        "Een goed georganiseerde BHV-structuur opzetten binnen de organisatie.",
        "Zorgen voor een veilige en gezonde werkomgeving.",
    ];

    const articleFifteenTasks = [
        "Voldoende BHV’ers aanwijzen op basis van risico’s.",
        "Zorgen voor opleiding en herhalingstrainingen voor BHV’ers.",
        "Zorgen dat er altijd een BHV’er aanwezig is.",
        "BHV-organisatie periodiek toetsen en verbeteren.",
    ];

    const maatgevendeFactoren = [
        "De grootte en ligging van de organisatie.",
        "Aanwezige risico’s of brandscenario’s.",
        "Aantal aanwezige werknemers of bezoekers.",
        "Tijdstip waarop mensen aanwezig zijn.",
        "Aantal niet-zelfredzame personen.",
        "Opkomsttijd hulpdiensten.",
        "Deskundigheid en BHV-samenwerking.",
    ];

    return (
        <>
            {/* 🌆 Header */}
            <HeaderSection
                mainTitle="Incompany BHV Training in omgeving van gemeente Voorne aan Zee – Praktijkgericht & Erkend"
                backgroundImage={VoorneAanZeeHeader}
            />

            <main className="bhv-info-grid">

                {/* 📘 Introductie */}
                <section className="bhv-intro-grid">
                    <article className="bhv-info">
                        <h2>Incompany BHV-training in gemeente Voorne aan Zee</h2>
                    <p>
                        <strong>BHV Voorne aan Zee</strong> verzorgt erkende
                        <strong> incompany BHV-trainingen</strong> bij bedrijven in de
                        <strong> gemeente Voorne aan Zee</strong>, waaronder
                        <strong> Brielle</strong>, <strong>Hellevoetsluis</strong>,
                         <strong> Oostvoorne</strong> en <strong>Rockanje</strong>.
                        Wij komen rechtstreeks naar jouw locatie om jouw medewerkers
                        praktijkgericht te trainen in bedrijfshulpverlening:
                        levensreddend handelen, brandbestrijding en ontruiming.
                    </p>

                    <p>
                        Iedere <strong>BHV-training in Voorne aan Zee</strong> wordt
                        volledig afgestemd op jouw organisatie, werkomgeving en risico’s.
                        Zo trainen medewerkers in hun eigen praktijkomgeving – wat zorgt voor
                        een realistische, veilige en effectieve leerervaring.
                        Of het nu gaat om een kantoor, school, zorginstelling of productiebedrijf,
                        wij passen de lesinhoud aan op jouw situatie.
                    </p>

                    <p>
                        Onze instructeurs zijn actief in de volledige gemeente
                        <strong> Voorne aan Zee</strong> en omliggende gebieden zoals
                        <a href="/rotterdam"> Rotterdam-Rijnmond</a>,
                        <a href="/zeeland"> Zeeland</a>,
                        <a href="/westland&Haaglanden"> het Westland & omg. Den Haag</a>.
                        Zo profiteer je van een <strong> regionale BHV-partner</strong>
                        die snel op locatie aanwezig kan zijn en bekend is met lokale
                        bedrijfsrisico’s.
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

                {/* ⚖️ Arbowet artikelen */}
                <section className="section rie-layout">
                    <article className="rie-article">
                        <h2>Artikel 3 Arbowet: Algemene zorgplicht</h2>
                        <ul>
                            {articleThreeTasks.map((task, index) => (
                                <li key={index}>
                                    <CheckCircle size={20} color="#ff8000" weight="bold" /> {task}
                                </li>
                            ))}
                        </ul>
                        <a
                            href="https://wetten.overheid.nl/jci1.3:c:BWBR0010346&hoofdstuk=2&artikel=3"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Bekijk artikel 3 op overheid.nl
                        </a>
                    </article>

                    <article className="rie-article">
                        <h2>Artikel 15 Arbowet: BHV-verplichting</h2>
                        <ul>
                            {articleFifteenTasks.map((task, index) => (
                                <li key={index}>
                                    <CheckCircle size={20} color="#ff8000" weight="bold" /> {task}
                                </li>
                            ))}
                        </ul>
                        <a
                            href="https://wetten.overheid.nl/jci1.3:c:BWBR0010346&hoofdstuk=3&artikel=15"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Bekijk artikel 15 op overheid.nl
                        </a>
                    </article>
                </section>

                {/* ⚙️ Maatgevende factoren */}
                <section className="section">
                    <h2>Maatgevende factoren voor jouw BHV-organisatie</h2>
                    <ul>
                        {maatgevendeFactoren.map((factor, index) => (
                            <li key={index}>
                                <CheckCircle size={18} color="#444" weight="regular" /> {factor}
                            </li>
                        ))}
                    </ul>
                    <p>
                        Meer informatie over het opstellen van een RI&E vind je op{" "}
                        <a
                            href="https://www.rie.nl/over-rie/een-rie-maken#hoe-kies-je-het-juiste-hulpmiddel"
                            target="_blank"
                            rel="noreferrer"
                        >
                            rie.nl
                        </a>
                    </p>
                </section>

                {/* 🧩 BHV Trainingskaarten */}
                <TrainingCardSection
                    title="Incompany BHV-trainingen"
                    subtitle="Volledig afgestemd op jouw organisatie en werkvloer."
                    cards={bhvCards}
                />

                {/* 🌍 Regionale sectie met SEO + branding */}
                <ServiceRegionsSection />

                {/* 📞 CTA */}
                <a href="/contact" className="btn-primary">Offerte aanvragen</a>
            </main>
        </>
    );
}
