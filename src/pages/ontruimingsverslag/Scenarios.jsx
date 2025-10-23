import React from "react";
import Keukenbrand from "../../assets/image/scenarios/Keukenbrand.png";
import BrandServiceRuimte from "../../assets/image/scenarios/Brand_serverruimte.png";
import RookTechnischeRuimte from "../../assets/image/scenarios/Rookontwikkeling_technische_ruimte.png"
import OnwelPersoon from "../../assets/image/scenarios/Bewusteloze_slachtoffer.png";
import StroomUitval from "../../assets/image/scenarios/Stroomuitval.png"
import Gaslek from "../../assets/image/scenarios/Gaslek.png"
import BrandContainer from "../../assets/image/scenarios/Containerbrand_tegen_pand.png"
import KortsluitingPrinter from "../../assets/image/scenarios/Kopieerappartaat_kortsluiting.png"
import VerdachtPakketje from "../../assets/image/scenarios/VerdachtPakketje.png"

export default function Scenarios() {
    const scenarios = [
        {
            title: "Brand in de keuken",
            desc: "Een medewerker ontdekt rookontwikkeling bij de magnetron. De BHV’ers moeten blussen en ontruimen.",
            img: Keukenbrand,
        },
        {
            title: "Rook in de technische ruimte",
            desc: "De rookmelder gaat af in een afgesloten ruimte. De BHV moet de locatie achterhalen en actie ondernemen.",
            img: RookTechnischeRuimte,
        },
        {
            title: "Medewerker onwel (met AED)",
            desc: "Tijdens de ontruiming raakt een collega onwel. De EHBO’ers moeten direct handelen.",
            img: OnwelPersoon,
        },
        {
            title: "Ontruiming bij stroomuitval",
            desc: "Verlichting en liften werken niet meer. De communicatie verloopt via portofoons.",
            img: StroomUitval,
        },
        {
            title: "Brand in serverruimte",
            desc: "Oververhitte apparatuur veroorzaakt rookontwikkeling. De BHV moet het gebied afsluiten en hulpdiensten waarschuwen.",
            img: BrandServiceRuimte,
        },
        {
            title: "Gaslucht in magazijn",
            desc: "Medewerkers ruiken gas bij het vulpunt. De BHV moet de gaskraan afsluiten en het pand ontruimen.",
            img: Gaslek,
        },
        {
            title: "Rookontwikkeling in afvalcontainer",
            desc: "Een container op het buitenterrein begint te smeulen. De BHV moet brandblussers gebruiken en brandweer alarmeren.",
            img: BrandContainer,
        },
        {
            title: "Kortsluiting in kopieerapparaat",
            desc: "Rook komt uit een apparaat in de gang. BHV’ers moeten schakelaars uitschakelen en ruimte ontruimen.",
            img: KortsluitingPrinter,
        },
        {
            title: "Evacuatie bij bommelding",
            desc: "Telefonische melding van een verdacht pakket. De BHV moet ontruimen volgens het noodplan.",
            img: VerdachtPakketje,
        },
        // {
        //     title: "Brand in laboratorium",
        //     desc: "Chemische stoffen vatten vlam tijdens een proef. De BHV moet blussen met geschikt middel en personeel evacueren.",
        //     img: "/images/scenarios/labbrand.jpg",
        // },
        // {
        //     title: "Brand in archiefruimte",
        //     desc: "Papier en karton vatten vlam. De BHV moet rookontwikkeling beperken en veilig blussen.",
        //     img: "/images/scenarios/archiefbrand.jpg",
        // },
        // {
        //     title: "Lift blijft steken",
        //     desc: "Een medewerker zit vast in de lift. De BHV moet contact houden en hulpdiensten inschakelen.",
        //     img: "/images/scenarios/liftvast.jpg",
        // },
        // {
        //     title: "Brand in kantine",
        //     desc: "Vet in een frituurpan vat vlam. De BHV moet correct blussen en keuken afsluiten.",
        //     img: "/images/scenarios/kantinebrand.jpg",
        // },
        // {
        //     title: "Ontruiming tijdens hevige storm",
        //     desc: "Door stormschade ontstaan gevaarlijke situaties bij de nooduitgangen. BHV moet alternatieve routes gebruiken.",
        //     img: "/images/scenarios/storm.jpg",
        // },
        // {
        //     title: "Brand door oplader",
        //     desc: "Een accu of telefoonoplader ontsteekt. BHV moet snel handelen om uitbreiding te voorkomen.",
        //     img: "/images/scenarios/opladerbrand.jpg",
        // },
        // {
        //     title: "Kind vermist tijdens ontruiming",
        //     desc: "Tijdens een oefening op school ontbreekt één leerling bij het verzamelpunt. De BHV moet zoeken volgens protocol.",
        //     img: "/images/scenarios/vermist-kind.jpg",
        // },
        // {
        //     title: "Persoon vast in draaideur",
        //     desc: "Een draaideur blokkeert bij ontruiming. BHV moet kalmte bewaren en assistentie verlenen.",
        //     img: "/images/scenarios/draaideur.jpg",
        // },
        // {
        //     title: "Brand in opslag chemicaliën",
        //     desc: "Een vat met brandbare vloeistof lekt en vat vlam. BHV moet afstand bewaren en brandweer begeleiden.",
        //     img: "/images/scenarios/chemische-brand.jpg",
        // },
        // {
        //     title: "Medewerker struikelt tijdens ontruiming",
        //     desc: "Een collega raakt gewond tijdens de evacuatie. De BHV moet EHBO verlenen en de rest van de groep veilig houden.",
        //     img: "/images/scenarios/struikeling.jpg",
        // },
    ];

    return (
        <div className="ontruiming-page">
            <h1>Voorbeeldscenario’s voor ontruimingsoefeningen</h1>
            <p>
                Een goede ontruimingsoefening begint met een realistisch scenario.
                Hieronder vind je aantal voorbeeld situaties die wij regelmatig gebruiken
                tijdens trainingen. Je kunt deze scenario’s ook gebruiken als inspiratie
                voor je eigen oefening.
            </p>

            <div className="scenario-grid">
                {scenarios.map((s, index) => (
                    <div className="scenario-card" key={index}>
                        <img src={s.img} alt={s.title} className="scenario-image"/>
                        <div className="scenario-content">
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="link-list">
                <p>Bekijk ook onze aanvullende informatie:</p>
                <ul>
                    <li><a href="/ontruimingsoefening/verslag">Ontruimingsverslag</a></li>
                    <li><a href="/ontruimingsoefening/fases">Fasen van de soort oefeningen</a></li>
                </ul>
            </div>
        </div>
    );
}
