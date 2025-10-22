import React from "react";
import { GraduationCap, AlarmCheck, EyeOff, Activity, Info } from "lucide-react";
import "./Ontruimingsverslag.css";

export default function Fases() {
    const fases = [
        {
            icon: <GraduationCap size={22} />,
            title: "Fase 1 – Scenario training",
            desc: "In fase 1 draait alles om het aanleren van de basisvaardigheden van de BHV’er.\n" +
                "De nadruk ligt op veilig handelen en het correct uitvoeren van vaste procedures.\n" +
                "BHV’ers leren werken met de BMC (brandmeldcentrale) en oefenen onder begeleiding de juiste deurprocedure.\n" +
                "\n" +
                "Tijdens deze fase worden kleine inzetoefeningen uitgevoerd, zoals het veilig betreden en ontruimen van een ruimte, het gebruik van communicatiemiddelen (indien van toepassing) en het begeleiden van aanwezigen naar de verzamelplaats.\n" +
                "De focus ligt op structuur, samenwerking en het opbouwen van zelfvertrouwen, voordat wordt overgegaan naar complexere oefeningen in de volgende fasen.",
        },
        {
            icon: <AlarmCheck size={22} />,
            title: "Fase 2 – Aangekondigde oefening",
            desc: "In fase 2 staat het praktisch toepassen van de basiskennis centraal.\n" +
                "De BHV’ers en ploegleiders weten dat er een oefening zal plaatsvinden, maar het overige personeel niet. Hierdoor ontstaat een realistische, maar gecontroleerde oefensituatie.\n" +
                "\n" +
                "Het doel van deze fase is dat de BHV’ers leren observeren, handelen en samenwerken tijdens een daadwerkelijke ontruiming. Ze ervaren hoe mensen reageren op een alarmmelding, welke knelpunten kunnen ontstaan en hoe belangrijk communicatie en overzicht zijn.\n" +
                "\n" +
                "De oefenleider begeleidt het proces, maar laat de uitvoering grotendeels aan het team over.\n" +
                "Na afloop kunnen de BHV’ers hun bevindingen vastleggen in het ontruimingsverslagformulier, zodat zij zelf reflecteren op hun handelen en verbeterpunten kunnen benoemen.\n" +
                "\n" +
                "Deze fase vormt de overgang van begeleide training naar zelfstandige uitvoering: de nadruk verschuift van leren naar toepassen in de praktijk.", },
        {
            icon: <EyeOff size={22} />,
            title: "Fase 3 – Onaangekondigde oefening",
            desc: "In fase 3 wordt de organisatie zonder voorafgaande waarschuwing getest: de oefening is onaangekondigd voor (bijna) iedereen, inclusief medewerkers en vaak ook ploegleiders — zodat het natuurlijke, onvoorbereide gedrag zichtbaar wordt.\n" +
                "\n" +
                "Het doel is te onderzoeken hoe BHV’ers en betrokkenen werkelijk reageren wanneer er onverwacht een ontruimingssituatie ontstaat. Deze fase legt de nadruk op snelheid, besluitvorming en heldere communicatie onder realistische omstandigheden.\n" +
                "\n" +
                "De oefenleider en observatoren volgen de uitvoering op afstand en noteren knelpunten zoals onduidelijke leiding, blokkades in ontsluitingsroutes of vertraagde alarmering. Na afloop is er een gerichte nabespreking waarin concrete verbeterpunten worden geformuleerd.\n" +
                "\n" +
                "Gebruik het gratis ontruimingsverslagformulier om bevindingen direct vast te leggen: dit helpt bij zelfreflectie, maakt verbeteracties traceerbaar en zorgt dat vervolgtrainingen doelgericht kunnen worden gepland.",},
        {
            icon: <Activity size={22} />,
            title: "Fase 4 – Onaangekondigde oefening met LOTUS-slachtoffers",
            desc: "In fase 4 wordt de realiteit maximaal benaderd: de oefening is onaangekondigd en er worden gespeelde slachtoffers (LOTUS/acteurs) ingezet om verwondingen en panieksituaties na te bootsen.\n" +
                "\n" +
                "Het doel is om onder authentieke druk te testen hoe BHV’ers handelen bij complexe, onverwachte incidenten: prioriteren van slachtoffers, triage, samenwerken met hulpverleners en het behouden van overzicht. De inzet van LOTUS-slachtoffers verhoogt het realisme en maakt het mogelijk specifieke aandachtspunten zoals slachtofferzorg en ketencommunicatie te toetsen.\n" +
                "\n" +
                "De oefenleider en observatoren volgen op afstand en registreren zowel succesvolle interventies als kritische knelpunten (zoals triagebeslissingen, logistieke beperkingen of communicatieproblemen). Na afloop vindt een uitgebreide nabespreking plaats, met nadruk op veiligheid, leermomenten en concrete vervolgacties.\n" +
                "\n" +
                "Noteer alle bevindingen in het gratis ontruimingsverslagformulier; dit ondersteunt een transparante evaluatie en maakt het eenvoudiger om trainings- en verbeterplannen te prioriteren.",
        },
    ];

    return (
        <div className="ontruiming-page">
            <h1>De fasen van een ontruimingsoefening</h1>
            <p>
                Elke ontruimingsoefening bij <strong>BHV Voorne aan Zee</strong> wordt
                opgebouwd in vier opeenvolgende fasen. Elke fase verhoogt de moeilijkheidsgraad
                en realiteit van de oefening.
            </p>

            <div className="fase-grid">
                {fases.map((fase, i) => (
                    <div key={i} className="fase-card">
                        <div className="fase-icon">{fase.icon}</div>
                        <h3>{fase.title}</h3>
                        <p>{fase.desc}</p>
                    </div>
                ))}
            </div>

            <div className="section-block info">
                <div className="icon-title">
                    <Info size={24} />
                    <h2>Waarom werken met fasen?</h2>
                </div>
                <p>
                    Door te trainen in meerdere fasen bouwen BHV’ers en medewerkers stap voor stap hun kennis, zelfvertrouwen en handelingsvaardigheden op.
                    In de eerste fasen ligt de nadruk vooral op leren en bewustwording. Het begrijpen van procedures en het oefenen van basisvaardigheden in een veilige omgeving.
                    Naarmate de organisatie doorgroeit naar fase 3 en 4, verschuift de focus steeds meer naar realisme en het testen van gedrag onder druk.

                    Deze opbouw zorgt ervoor dat iedere deelnemer weet wat er van hem of haar verwacht wordt in een noodsituatie, maar ook dat de samenwerking binnen teams steeds beter wordt.
                    Zo ontstaat een goed getrainde, zelfverzekerde BHV-organisatie die niet alleen reageert op incidenten, maar ze ook met rust, structuur en doeltreffendheid aanpakt.
                </p>
            </div>

            <div className="link-list">
                <p>Bekijk ook onze aanvullende informatie:</p>
                <ul>
                    <li><a href="/ontruimingsoefening/scenarios">Voorbeeldscenario’s</a></li>
                    <li><a href="/ontruimingsoefening/verslag">Ontruimingsverslag</a></li>
                </ul>
            </div>
        </div>
    );
}
