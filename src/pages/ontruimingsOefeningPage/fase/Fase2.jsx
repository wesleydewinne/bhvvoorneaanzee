// src/pages/ontruimingsOefeningPage/fase/Fase2.jsx
import React from "react";
import NavigationSection from "@/shared/components/sections/navigationSection/NavigationSection.jsx";
import fase2Image from "@/assets/image/trainingen/ontruimingsoefening/ontruiming.png";
import "./Fase.css";
import reactLogo from "@/assets/image/react.svg";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import TileSection from "@/shared/components/sections/tileSection/TileSection.jsx";
import ChecklistSection from "@/shared/components/sections/ChecklistSection/ChecklistSection.jsx";

function Fase2() {
    const checklist = [
        "Voer de oefening uit volgens het draaiboek",
        "Zorg voor duidelijke communicatie",
        "Observeer het handelen van de BHV’ers",
        "Observeer het gedrag van medewerkers",
        "Controleer het gebruik van vluchtroutes",
        "Noteer knelpunten en bijzonderheden",
    ];

    const tileSet1 = [
        {
            title: "Fase 2",
            subtitle1: "Scenario oefening",
            subtitle2: "",
            description: "Een fase 2-oefening is een aangekondigde ontruimingsoefening op een vooraf afgesproken tijdstip en datum. De BHV’ers weten dat er geoefend wordt, maar het scenario zelf is onbekend. Zo trainen we onder realistische omstandigheden. Niet-BHV-medewerkers worden vooraf niet geïnformeerd over het moment van de oefening. Op deze manier zien we hoe zij reageren op een melding, of ze de juiste vluchtroutes volgen en of de communicatie duidelijk is."
        },
        {
            imageUrl: fase2Image,
            altTitle: "Uitvoering ontruimingsoefening"
        }
    ];

    const tileSet2 = [
        {
            title: "Waarom Fase 2?",
            description: "Een fase 2-oefening is bedoeld om zowel het BHV-team als de rest van de organisatie te observeren tijdens een onverwachte situatie. We willen zien hoe snel en effectief de BHV’ers reageren zodra de melding binnenkomt, en hoe de interne communicatie verloopt wanneer de druk toeneemt. Ook de reacties van niet-BHV-medewerkers zijn hierbij van belang. Omdat zij niet weten dat het om een oefening gaat, krijgen we een eerlijk beeld van hun gedrag bij een echte calamiteit. Na afloop nemen we uitgebreid de tijd om met het BHV-team te reflecteren. Samen bespreken we wat er goed ging en welke punten voor verbetering vatbaar zijn. Op basis daarvan geven we concrete tips en handvatten mee, zodat iedereen nog beter voorbereid is wanneer het er echt toe doet.",
        },
        {
            imageUrl: fase2Image,
            altTitle: "Observatie en uitvoering"
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
                mainTitle="Fase 2: Uitvoering van de Ontruimingsoefening"
                backgroundImage={reactLogo}
            />

            <TileSection direction="row" tiles={tileSet1} />
            <TileSection direction="row-reverse" tiles={tileSet2} />

            <ChecklistSection title="Checklist Fase 2" items={checklist} />

            <NavigationSection
                items={navigatieKnoppen}
                title="Ga direct naar een andere fase:"
            />
        </>
    );
}

export default Fase2;
