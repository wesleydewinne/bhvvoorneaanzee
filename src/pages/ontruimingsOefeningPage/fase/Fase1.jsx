// src/pages/ontruimingsOefeningPage/fase/Fase1.jsx
import React from "react";
import NavigationSection from "../../../components/sections/navigationSection/NavigationSection.jsx";
import fase1Image from "../../../assets/image/ontruimingsoefening/ontruiming.png";
import "./Fase.css";
import reactLogo from "../../../assets/image/react.svg";
import HeaderSection from "../../../components/sections/headerSection/HeaderSection.jsx";
import TileSection from "../../../components/sections/tileSection/TileSection.jsx";
import ChecklistSection from "../../../components/sections/ChecklistSection/ChecklistSection.jsx";

function Fase1() {
    const checklist = [
        "Stel een realistisch scenario op",
        "Lees de brandmeldinstallatie uit",
        "Bepaal de juiste ruimte op basis van de melding",
        "Doe de juiste deurprocedure",
        "Verkennen de ruimte en beoordeel de situatie",
        "Sluit de ruimte af indien nodig",
        "Communiceer met andere BHV’ers",
        "Mogelijke vervolgacties",
        "Evalueer direct na afloop",

    ];

    const tileSet1 = [
        {
            title: "Fase 1",
            subtitle1: "Scenario oefening",
            subtitle2: "",
            description: "Een fase 1-oefening is een kleinschalige BHV-inzetoefening waarbij alleen de BHV’ers deelnemen. In deze oefening worden realistische scenario’s geoefend, zonder dat de rest van het personeel betrokken is. De inzet start meestal bij de brandmeldcentrale, waar een melding binnenkomt. Vervolgens gaan de BHV’ers naar de ruimte toe om de situatie te beoordelen en passende handelingen uit te voeren. Denk aan: het inspecteren van de ruimte, het beoordelen van eventuele risico’s of het direct verlaten van de ruimte. Zo bootsen we een echte situatie na, maar houden we de oefening beheersbaar en leerzaam voor het BHV-team."
        },
        {
            imageUrl: fase1Image,
            altTitle: "Planning ontruimingsoefening"
        }
    ];

    const tileSet2 = [
        {
            title: "Waarom Fase 1?",
            description: "Deze aanpak zorgt ervoor dat de BHV’ers goed zijn voorbereid voordat een grotere ontruimingsoefening plaatsvindt. Door in een veilige setting te oefenen, versterken ze hun zelfvertrouwen en leren ze effectief samenwerken.\n" +
                "Iedere BHV’er weet na deze fase precies wat zijn of haar rol is — en dat maakt een wereld van verschil in een echte noodsituatie.\n" +
                "\n" +
                "Bovendien kunnen we tijdens deze oefening direct bijsturen, evalueren en zorgen dat iedereen scherp en paraat is."
        },
        {
            imageUrl: fase1Image,
            altTitle: "Oefenplan en communicatie"
        }
    ];

    const navigatieKnoppen = [
        { to: "/ontruimingsoefening/fase0", label: "Fase 0" },
        { to: "/ontruimingsoefening/fase1", label: "Fase 1" },
        { to: "/ontruimingsoefening/fase2", label: "Fase 2" },
        { to: "/ontruimingsoefening/fase3", label: "Fase 3" },
        { to: "/ontruimingsoefening/fase4", label: "Fase 4" },
    ];

    return (
        <>
            <HeaderSection
                mainTitle="Fase 1: Plannen en Voorbereiden"
                backgroundImage={reactLogo}
            />

            <TileSection direction="row" tiles={tileSet1} />
            <TileSection direction="row-reverse" tiles={tileSet2} />

            <ChecklistSection title="Checklist Fase 1" items={checklist} />

            <NavigationSection
                items={navigatieKnoppen}
                title="Ga direct naar een andere fase:"
            />
        </>
    );
}

export default Fase1;
