// src/pages/ontruimingsOefeningPage/fase/Fase3.jsx
import React from "react";
import NavigationSection from "@/shared/components/sections/navigationSection/NavigationSection.jsx";
import fase3Image from "@/assets/image/trainingen/ontruimingsoefening/ontruiming.png";
import "./Fase.css";
import reactLogo from "@/assets/image/react.svg";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import TileSection from "@/shared/components/sections/tileSection/TileSection.jsx";
import ChecklistSection from "@/shared/components/sections/ChecklistSection/ChecklistSection.jsx";

function Fase3() {
    const checklist = [
        "Analyseer de uitgevoerde oefening en verzamel feedback",
        "Bespreek verbeterpunten met BHV’ers en medewerkers",
        "Identificeer knelpunten en oorzaken van vertragingen",
        "Werk samen aan een verbeterplan",
        "Documenteer alle bevindingen en acties",
    ];

    const tileSet1 = [
        {
            title: "Fase 3",
            subtitle1: "Scenario oefening",
            subtitle2: "Leren en verbeteren",
            description: "Na de oefening volgt de evaluatiefase. Hier beoordeel je wat goed ging en wat beter kan, zodat de volgende oefening effectiever wordt. Feedback van BHV’ers en medewerkers is essentieel om knelpunten en oorzaken van vertragingen in kaart te brengen. Samen stel je een verbeterplan op om de veiligheid continu te verhogen. Door alles goed te documenteren ontstaat een duidelijke basis voor toekomstige oefeningen en verbeteringen."
        },
        {
            imageUrl: fase3Image,
            altTitle: "Evaluatie ontruimingsoefening"
        }
    ];

    const tileSet2 = [
        {
            title: "Waarom Fase 3?",
            description: "Evaluatie is cruciaal om het ontruimingsplan en de uitvoering te verbeteren. Het is het moment om te reflecteren, te leren van fouten en successen te vieren. Door samen te werken aan verbeteringen versterk je de BHV-organisatie en verhoog je de veiligheid binnen het gebouw."
        },
        {
            imageUrl: fase3Image,
            altTitle: "Feedback en verbeteringen"
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
                mainTitle="Fase 3: Evaluatie van de Oefening"
                backgroundImage={reactLogo}
            />

            <TileSection direction="row" tiles={tileSet1} />
            <TileSection direction="row-reverse" tiles={tileSet2} />

            <ChecklistSection title="Checklist Fase 3" items={checklist} />

            <NavigationSection
                items={navigatieKnoppen}
                title="Ga direct naar een andere fase:"
            />
        </>
    );
}

export default Fase3;
