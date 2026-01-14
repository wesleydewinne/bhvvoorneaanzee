import React, { useMemo } from "react";
import "./BhvPage.css";

import {
    FirstAidKit,
    FireExtinguisher,
    Fire,
    CheckCircle,
    Buildings,
    WarningCircle,
    Users,
    PersonSimple,
    Clock,
    Ambulance,
    ShieldCheck,
    UsersThree,
    Megaphone
} from "@phosphor-icons/react";

import data from "../../data/training.json";

import TrainingCardSection from "../../components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";
import ServiceRegionsSection from "@/components/sections/ServiceAreaSection/ServiceRegionsSection.jsx";

import VoorneAanZeeHeader from "@/assets/image/bhvPaginaFotos/bhv-voorne-aan-zee-header.png";

export default function BhvPage() {

    // 🔹 BHV categorie ophalen uit JSON
    const bhvCategory = data.categories.find(
        (category) => category.id === "bhv"
    );

    const bhvTrainings = bhvCategory?.trainings || [];

    // 🔹 Trainings → cards (identiek aan homepage architectuur)
    const bhvCards = useMemo(
        () =>
            bhvTrainings.map((training) => ({
                title: training.title,
                description: training.description,

                // Alleen bestandsnaam uit JSON (resolver doet de rest)
                image: training.cardImage?.trim()
                    ? training.cardImage
                    : bhvCategory?.image,

                alt: training.cardAlt || training.title,

                buttonTo: training.slug,
                buttonText: "Bekijk training",
                buttonStyle: "primary",
            })),
        [bhvTrainings, bhvCategory]
    );

    // 🔹 BHV taken
    const bhvTasks = [
        {
            icon: <FirstAidKit size={32} color="#ff8000" weight="bold" />,
            task: "Eerste hulp verlenen bij ongevallen op de werkvloer.",
        },
        {
            icon: (
                <FireExtinguisher
                    size={32}
                    color="#ff8000"
                    weight="bold"
                />
            ),
            task: "Beginnende brand bestrijden en gevolgschade beperken.",
        },
        {
            icon: <Fire size={32} color="#ff8000" weight="bold" />,
            task: "Medewerkers veilig evacueren bij noodsituaties.",
        },
    ];

    // 🔹 Arbowet artikel 3
    const articleThreeTasks = [
        "Risico’s inventariseren en evalueren (RI&E) en een plan van aanpak opstellen.",
        "Werknemers informeren over risico’s en preventiemaatregelen.",
        "Een goed georganiseerde BHV-structuur binnen de organisatie.",
        "Zorgen voor een veilige en gezonde werkomgeving.",
    ];

    // 🔹 Arbowet artikel 15
    const articleFifteenTasks = [
        "Voldoende BHV’ers aanwijzen op basis van de risico’s.",
        "Zorgen voor opleiding en herhalingstrainingen voor BHV’ers.",
        "Zorgen dat er altijd een BHV’er aanwezig is.",
        "De BHV-organisatie periodiek toetsen en verbeteren.",
    ];

    // 🔹 Maatgevende factoren
    const maatgevendeFactoren = [
        {
            icon: <Buildings size={28} color="#ff8000" weight="bold" />,
            title: "Gebouw en indeling",
            description:
                "De grootte, verdiepingen en loopafstanden binnen het pand bepalen hoeveel BHV’ers nodig zijn.",
        },
        {
            icon: <WarningCircle size={28} color="#ff8000" weight="bold" />,
            title: "Risico’s en werkzaamheden",
            description:
                "Brandgevaar, machines, gevaarlijke stoffen en andere specifieke bedrijfsrisico’s.",
        },
        {
            icon: <Clock size={28} color="#ff8000" weight="bold" />,
            title: "Aanwezigheidstijden",
            description:
                "Dag-, avond- en nachtdiensten vragen om verschillende BHV-bezetting.",
        },
        {
            icon: <Ambulance size={28} color="#ff8000" weight="bold" />,
            title: "Opkomsttijd hulpdiensten",
            description:
                "Hoe langer de aanrijtijd, hoe belangrijker de BHV-organisatie wordt.",
        },
        {
            icon: <ShieldCheck size={28} color="#ff8000" weight="bold" />,
            title: "BHV-deskundigheid",
            description:
                "Opleidingsniveau, taakverdeling en samenwerking binnen het BHV-team.",
        },
        {
            icon: <Megaphone size={28} color="#ff8000" weight="bold" />,
            title: "Interne organisatie en communicatie",
            description:
                "De interne communicatiemiddelen, alarmering en taakverdeling binnen de organisatie bepalen hoe snel en effectief wordt gehandeld."
        },
        {
            icon: <UsersThree size={28} color="#ff8000" weight="bold" />,
            title: "Bezoekersstromen en publieksfunctie",
            description:
                "Het aantal en type bezoekers, zoals klanten, patiënten of leerlingen, beïnvloedt de benodigde BHV-capaciteit en communicatiestructuur."
        },
        {
            icon: <Users size={28} color="#ff8000" weight="bold" />,
            title: "Aantal aanwezigen",
            description:
                "Het aantal medewerkers en bezoekers dat gelijktijdig aanwezig is.",
        },
        {
            icon: <PersonSimple size={28} color="#ff8000" weight="bold" />,
            title: "Niet-zelfredzame personen",
            description:
                "Personen die niet zelfstandig kunnen vluchten bij een calamiteit.",
        }
    ];

    return (
        <>
            <HeaderSection
                mainTitle="Incompany BHV Training in omgeving van gemeente Voorne aan Zee – Praktijkgericht & Erkend"
                backgroundImage={VoorneAanZeeHeader}
            />

            <main className="bhv-info-grid">

                {/* Intro */}
                <section className="bhv-intro-grid">

                    <article className="bhv-info">
                        <h2>Incompany BHV-training in gemeente Voorne aan Zee</h2>

                        <p>
                            <strong>BHV Voorne aan Zee</strong> verzorgt erkende
                            <strong> incompany BHV-trainingen</strong> bij bedrijven in de
                            <strong> gemeente Voorne aan Zee</strong>, waaronder
                            <strong> Brielle</strong>,
                            <strong> Hellevoetsluis</strong>,
                            <strong> Oostvoorne</strong> en
                            <strong> Rockanje</strong>.
                            Wij komen rechtstreeks naar jouw locatie om jouw medewerkers
                            praktijkgericht te trainen in bedrijfshulpverlening:
                            levensreddend handelen, brandbestrijding en ontruiming.
                        </p>

                        <p>
                            Iedere <strong>BHV-training in Voorne aan Zee</strong> wordt volledig
                            afgestemd op jouw organisatie, werkomgeving en risico’s.
                            Zo trainen medewerkers in hun eigen praktijkomgeving –
                            wat zorgt voor een realistische, veilige en effectieve leerervaring.
                        </p>

                        <p>
                            Onze instructeurs zijn actief in de volledige gemeente
                            <strong> Voorne aan Zee</strong> en omliggende gebieden zoals
                            <a href="/rotterdam"> Rotterdam-Rijnmond</a>,
                            <a href="/zeeland"> Zeeland</a> en
                            <a href="/westland&Haaglanden"> het Westland & omg. Den Haag</a>.
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

                {/* Cards */}
                <TrainingCardSection
                    title="Incompany BHV-trainingen"
                    subtitle="Volledig afgestemd op jouw organisatie en werkvloer."
                    cards={bhvCards}
                />

                {/* Maatgevende factoren */}
                <section className="factor-info-section">
                    <h2>Welke factoren bepalen jouw BHV-organisatie?</h2>

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
                        Het bepalen van de juiste BHV-organisatie begint bij een goede RI&E. <br/>
                        Meer informatie over het opstellen van een risico-inventarisatie vind je op{" "}
                        <a
                            href="https://www.rie.nl/over-rie/een-rie-maken#hoe-kies-je-het-juiste-hulpmiddel"
                            target="_blank"
                            rel="noreferrer"
                        >
                            rie.nl
                        </a>.
                    </p>
                </section>

                {/* Arbowet */}
                {/* ⚖️ Arbowet sectie */}
                <section className="arbowet-section">

                    <div className="arbowet-inner">

                        <div className="rie-layout">

                            <article className="rie-article">
                                <h2>Artikel 3 Arbowet – Algemene zorgplicht</h2>

                                <ul>
                                    {articleThreeTasks.map((task, index) => (
                                        <li key={index}>
                                            <CheckCircle size={22} color="#ff8000" weight="bold"/>
                                            {task}
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
                                <h2>Artikel 15 Arbowet – BHV-verplichting</h2>

                                <ul>
                                    {articleFifteenTasks.map((task, index) => (
                                        <li key={index}>
                                            <CheckCircle size={22} color="#ff8000" weight="bold"/>
                                            {task}
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

                        </div>

                    </div>

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
