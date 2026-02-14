// src/pages/ontruimingsOefeningPage/fase/Fase4.jsx
import React from "react";
import NavigationSection from "@/shared/components/sections/navigationSection/NavigationSection.jsx";
import fase4Image from "@/assets/image/trainingen/ontruimingsoefening/ontruiming.png";
import "./Fase.css";
import reactLogo from "@/assets/image/react.svg";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import TileSection from "@/shared/components/sections/tileSection/TileSection.jsx";
import ChecklistSection from "@/shared/components/sections/ChecklistSection/ChecklistSection.jsx";

function Fase4() {
    const checklist = [
        "Implementeer de verbeteringen en pas het BHV-plan aan",
        "Plan vervolgtrainingen en oefenmomenten",
        "Informeer medewerkers over aanpassingen en nieuwe procedures",
        "Blijf regelmatig oefenen en evalueren",
        "Zorg voor voortdurende bewustwording en betrokkenheid",
    ];

    const tileSet1 = [
        {
            title: "Fase 4",
            subtitle1: "Scenario oefening",
            subtitle2: "Zorgen voor continuïteit en veiligheid",
            description: "In deze laatste fase zorg je ervoor dat de verbeteringen die uit eerdere evaluaties zijn voortgekomen, daadwerkelijk worden doorgevoerd. Het BHV-plan wordt aangepast waar nodig, en vervolgtrainingen worden gepland om de kennis en vaardigheden up-to-date te houden. Medewerkers worden geïnformeerd over nieuwe procedures en veranderingen, zodat iedereen betrokken blijft. Regelmatig oefenen en evalueren zorgen voor een blijvende bewustwording en een sterke BHV-organisatie."
        },
        {
            imageUrl: fase4Image,
            altTitle: "Verbetering ontruimingsoefening"
        }
    ];

    const tileSet2 = [
        {
            title: "Waarom Fase 4?",
            description: "Deze fase is essentieel om de veiligheid duurzaam te waarborgen. Door continu te verbeteren en de betrokkenheid van medewerkers te stimuleren, wordt het ontruimingsproces robuust en betrouwbaar. Zo is de organisatie beter voorbereid op toekomstige noodsituaties."
        },
        {
            imageUrl: fase4Image,
            altTitle: "Continu verbeteren"
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
                mainTitle="Fase 4: Verbeteren en Borging"
                backgroundImage={reactLogo}
            />

            <TileSection direction="row" tiles={tileSet1} />
            <TileSection direction="row-reverse" tiles={tileSet2} />

            <ChecklistSection title="Checklist Fase 4" items={checklist} />

            <NavigationSection
                items={navigatieKnoppen}
                title="Ga direct naar een andere fase:"
            />
        </>
    );
}

export default Fase4;
