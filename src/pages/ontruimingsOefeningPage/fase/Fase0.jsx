// src/pages/ontruimingsOefeningPage/fase/Fase0.jsx
import React from "react";
import NavigationSection from "../../../components/sections/navigationSection/NavigationSection.jsx";
import fase0Image from "../../../assets/image/ontruimingsoefening/ontruiming.png";
import "./Fase.css";
import reactLogo from "../../../assets/image/react.svg";
import HeaderSection from "../../../components/sections/headerSection/HeaderSection.jsx";
import Tile from "../../../components/sections/tileSection/TileSection.jsx";
import tabletop from "../../../assets/image/ontruimingsoefening/Ontruimingsoefening tabletop.png";
import TileSection from "../../../components/sections/tileSection/TileSection.jsx";
import ChecklistSection from "../../../components/sections/ChecklistSection/ChecklistSection.jsx";

function Fase0() {
    const checklist = [
        "Bepaal het doel van de oefening",
        "Inventariseer risico’s in het gebouw",
        "Stel een realistisch scenario op",
        "Betrek BHV’ers en leidinggevenden",
        "Zorg voor duidelijke ontruimingsroutes",
        "Informeer medewerkers zonder details te verklappen",
    ];

    const tileSet1 = [
        {
            title: "Fase 0",
            subtitle1: "Tabletop oefening",
            subtitle2: "Doornemen ontruimingsplan met de BHV-organisatie",
            description: "Een tabletop oefening is een effectieve manier om een ontruimingsplan te testen en te verbeteren. Door de oefening op de locatie van de klant uit te voeren,kunnen we verschillende scenario's doornemen, zoals brand of gaslekken, en direct de praktische toepasbaarheid van het plan evalueren. Tijdens de oefening worden zowel het plan als de reacties van de medewerkers stap voor stap besproken Dit biedt een gelegenheid om vragen te beantwoorden en onduidelijkheden op te lossen Meerdere scenario's worden geoefend om ervoor te zorgen dat het personeel flexibel kan reageren op onverwachte situaties. Door de locatie te gebruiken, kunnen we tevens eventuele tekortkomingen in de fysieke omgeving identificeren, zoals ontoegankelijke nooduitgangen of onduidelijke noodverlichting. Na elke oefening evalueren we de resultaten en maken we verbeterpunten kenbaar. Het doel is om het personeel goed voorbereid te laten zijn, zodat ze weten wat te doen in geval van een noodsituatie, wat de veiligheid van iedereen ten goede komt."
        },
        {
            imageUrl: tabletop,
            altTitle: "Plattegrond tijdens tabletop oefening"
        }
    ];

    const tileSet2 = [
        {
            title: "Waarom Fase 0?",
            // subtitle1: "Risicoanalyse per ruimte",
            // subtitle2: "Rekening houden met activiteiten",
            description: "Een table-top oefening is een praktische en overzichtelijke manier om mogelijke ontruimingssituaties te bespreken zonder fysiek te oefenen. Hierbij wordt een grote plattegrond van het gebouw op tafel gelegd, waarop verschillende scenario’s worden doorgenomen. Samen met de BHV-organisatie beoordeel je mogelijke knelpunten en obstakel die zich tijdens een daadwerkelijke ontruiming kunnen voordoen. Dit ‘droge’ oefenen biedt een veilige omgeving om situaties te analyseren en plannen bij te stellen voordat er een fysieke oefening plaatsvindt."
        },
        {
            imageUrl: fase0Image,
            altTitle: "Locatie en risico’s"
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
                mainTitle="Fase 0: Table-top ontruimingsoefening"
                backgroundImage={reactLogo}
            />

            <TileSection direction="row" tiles={tileSet1} />
            <TileSection direction="row-reverse" tiles={tileSet2} />


            <ChecklistSection title="Checklist Fase 0" items={checklist} />

            <NavigationSection
                items={navigatieKnoppen}
                title="Ga direct naar een andere fase:"
            />
        </>
    );
}

export default Fase0;
