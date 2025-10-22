import React from "react";
import { FileText, Building2, Flame, ClipboardList, Wrench, CheckCircle, Info } from "lucide-react";
import "./Ontruimingsverslag.css";

export default function Verslag() {
    return (
        <div className="ontruiming-page">
            <h1>Verslag van de ontruimingsoefening</h1>

            <div className="section-block intro">
                <p>
                    Na afloop van de oefening wordt een verslag opgesteld. Dit document helpt
                    om leerpunten vast te leggen en verbeteracties te plannen. Bij <strong>BHV Voorne aan Zee</strong> ontvang je
                    automatisch een uitgebreid verslag na deelname aan een oefening.
                </p>
            </div>

            {/* GRATIS DOCUMENT */}
            <div className="section-block highlight">
                <div className="icon-title">
                    <FileText size={26} />
                    <h2>Gratis basisdocument</h2>
                </div>
                <p>
                    Dit basisdocument blijft gratis downloadbaar en beschikbaar voor
                    hergebruik. Gebruik het om je eigen ontruimingsoefening te evalueren.
                </p>
                <a
                    className="download-link"
                    href="/documenten/Ontruimingsverslag_BHVVoorneaanZee.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    📥 Download basisdocument (PDF invulformulier)
                </a>
            </div>

            {/* 1. ORGANISATIE */}
            <div className="section-block">
                <div className="icon-title">
                    <Building2 size={24} />
                    <h2>1. Organisatie</h2>
                </div>
                <p>
                    Beschrijf de basisinformatie van de organisatie waar de oefening plaatsvond.
                </p>
                <ul>
                    <li><strong>Bedrijfsnaam:</strong> Vul de volledige naam van de organisatie of locatie in.</li>
                    <li><strong>Adres, postcode en plaats:</strong> Geef het exacte adres van de oefenlocatie.</li>
                    <li><strong>Datum van de oefening:</strong> Vermeld de dag waarop de oefening plaatsvond.</li>
                    <li>
                        <strong>Fase van de oefening:</strong> Noteer of het om een <em>voorbereidende</em> (fase 1),
                        <em> uitvoerende</em> (fase 2) of <em>evaluerende</em> (fase 3/4) oefening gaat.
                        <a href="/ontruimingsoefening/fases"> Lees meer over de fasen.</a>
                    </li>
                </ul>
            </div>

            {/* 2. SCENARIO'S */}
            <div className="section-block">
                <div className="icon-title">
                    <Flame size={24} />
                    <h2>2. Scenario(’s)</h2>
                </div>
                <p>
                    Beschrijf het scenario waarop de oefening gebaseerd is. Gebruik duidelijke, meetbare doelen.
                </p>
                <ul>
                    <li><strong>Scenario 1:</strong> Bijvoorbeeld “brand in de keuken” of “medewerker onwel”.</li>
                    <li><strong>Scenario 2 (optioneel):</strong> Gebruik bij meerdere situaties, zoals brand én medische nood.</li>
                    <li>
                        Gebruik concrete doelen (bijv. “evacuatie binnen 3 minuten”). Zie ook
                        <a href="/ontruimingsoefening/scenarios"> onze voorbeeldscenario’s</a>.
                    </li>
                </ul>
            </div>

            {/* 3. VERLOOP */}
            <div className="section-block">
                <div className="icon-title">
                    <ClipboardList size={24} />
                    <h2>3. Verloop van de oefening</h2>
                </div>
                <p>Beschrijf stap voor stap hoe de oefening verliep.</p>
                <ul>
                    <li><strong>Alarmering:</strong> Hoe werd het alarm geactiveerd en hoe snel reageerden medewerkers?</li>
                    <li><strong>Aansturing van de BHV’ers:</strong> Wie nam de leiding en hoe verliep de communicatie?</li>
                    <li><strong>Handelen van de BHV’ers:</strong> Wat ging goed en wat kan beter?</li>
                    <li><strong>Bijzonderheden:</strong> Vermeld obstakels, bezoekers of technische problemen.</li>
                </ul>
            </div>

            {/* 4. MIDDELEN */}
            <div className="section-block">
                <div className="icon-title">
                    <Wrench size={24} />
                    <h2>4. Gebruik van middelen</h2>
                </div>
                <ul>
                    <li>Noteer welke middelen zijn gebruikt: brandblussers, portofoons, nooddeuren, verzamelplaats, etc.</li>
                    <li>Vermeld defecten of ontbrekende middelen (bijv. lege blusser of defecte portofoon).</li>
                </ul>
            </div>

            {/* 5. CONCLUSIE */}
            <div className="section-block">
                <div className="icon-title">
                    <CheckCircle size={24} />
                    <h2>5. Conclusie en actiepunten</h2>
                </div>
                <ul>
                    <li><strong>Aantal minuten:</strong> Hoeveel tijd zat er tussen alarmering en volledige ontruiming?</li>
                    <li><strong>Belangrijkste leerpunt:</strong> Wat is het belangrijkste verbeterpunt?</li>
                    <li><strong>Actieplan:</strong> Welke verbeteringen worden opgepakt, door wie en binnen welke termijn?</li>
                </ul>
            </div>

            {/* EXTRA TIPS */}
            <div className="section-block info">
                <div className="icon-title">
                    <Info size={24} />
                    <h2>Extra tips bij het invullen</h2>
                </div>
                <ul>
                    <li>Schrijf concreet en benoem namen of functies.</li>
                    <li>Plan een korte nabespreking direct na de oefening.</li>
                    <li>Bewaar alle verslagen samen als bewijs van actieve BHV-training.</li>
                </ul>
            </div>

            <div className="link-list">
                <p>Meer informatie over de voorbereiding en uitvoering van oefeningen:</p>
                <ul>
                    <li><a href="/ontruimingsoefening/scenarios">Voorbeeldscenario’s</a></li>
                    <li><a href="/ontruimingsoefening/fases">Fasen van de oefening</a></li>
                </ul>
            </div>
        </div>
    );
}
