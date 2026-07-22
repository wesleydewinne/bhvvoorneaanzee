import React from "react";
import { ArrowLeft, ArrowRight, Flame, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Keukenbrand from "@/assets/image/scenarios/Keukenbrand.png?w=900&format=webp&quality=72";
import BrandServiceRuimte from "@/assets/image/scenarios/Brand_serverruimte.png?w=900&format=webp&quality=72";
import RookTechnischeRuimte from "@/assets/image/scenarios/Rookontwikkeling_technische_ruimte.png?w=900&format=webp&quality=72";
import OnwelPersoon from "@/assets/image/scenarios/Bewusteloze_slachtoffer.png?w=900&format=webp&quality=72";
import StroomUitval from "@/assets/image/scenarios/Stroomuitval.png?w=900&format=webp&quality=72";
import Gaslek from "@/assets/image/scenarios/Gaslek.png?w=900&format=webp&quality=72";
import BrandContainer from "@/assets/image/scenarios/Containerbrand_tegen_pand.png?w=900&format=webp&quality=72";
import KortsluitingPrinter from "@/assets/image/scenarios/Kopieerappartaat_kortsluiting.png?w=900&format=webp&quality=72";
import VerdachtPakketje from "@/assets/image/scenarios/VerdachtPakketje.png?w=900&format=webp&quality=72";
import "./Ontruimingsverslag.css";
import "./Scenarios.css";

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
    <main className="scenarios-page">
      <header className="scenarios-hero">
        <div className="scenarios-hero__glow" aria-hidden="true" />
        <div className="scenarios-shell scenarios-hero__content">
          <p className="scenarios-eyebrow">
            <ShieldCheck size={18} /> Realistisch oefenen begint hier
          </p>
          <h1>
            Een scenario dat je team <em>bijblijft.</em>
          </h1>
          <p className="scenarios-hero__lead">
            Geen standaard rondje door het pand, maar een geloofwaardige
            situatie die samenwerking, communicatie en besluitvorming echt op de
            proef stelt.
          </p>
        </div>
      </header>

      <section className="scenarios-catalogue">
        <div className="scenarios-shell">
          <div className="scenarios-intro">
            <div>
              <p className="scenarios-kicker">Kies de juiste prikkel</p>
              <h2>Negen situaties. Iedere locatie vraagt iets anders.</h2>
            </div>
            <p>
              Gebruik deze voorbeelden als inspiratie. We stemmen ieder scenario
              af op de risico’s, ruimtes en leerdoelen van jouw organisatie.
            </p>
          </div>
          <div className="scenarios-grid">
            {scenarios.map((s, index) => (
              <article className="scenarios-card" key={s.title}>
                <img src={s.img} alt={s.title} className="scenario-image" />
                <div className="scenarios-card__shade" aria-hidden="true" />
                <span className="scenarios-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="scenarios-card__content">
                  <Flame className="scenarios-card__icon" size={22} />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scenarios-next">
        <div className="scenarios-shell scenarios-next__panel">
          <div>
            <p className="scenarios-kicker">Van inspiratie naar oefening</p>
            <h2>Welk scenario past bij jouw locatie?</h2>
            <p>
              We maken de oefening realistisch, veilig en passend bij het
              ervaringsniveau van je BHV-organisatie.
            </p>
          </div>
          <div className="scenarios-next__actions">
            <Link className="scenarios-button" to="/contact">
              Bespreek een scenario <ArrowRight size={19} />
            </Link>
            <Link
              className="scenarios-button scenarios-button--back"
              to="/ontruimingsoefening"
            >
              <ArrowLeft size={19} /> Terug naar ontruiming
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
