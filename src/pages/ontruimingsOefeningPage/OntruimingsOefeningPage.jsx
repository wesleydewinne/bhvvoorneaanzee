import { createElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Flame,
  MapPin,
  Radio,
  Route,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";
import "./OntruimingsOefeningPage.css";
import heroImage from "@/assets/image/trainingen/ontruimingsoefening/ontruiming.png?w=1600&format=webp&quality=82";
import tabletopImage from "@/assets/image/trainingen/ontruimingsoefening/Ontruimingsoefening tabletop.png?w=1000&format=webp&quality=78";
import smokeImage from "@/assets/image/scenarios/Rookontwikkeling_technische_ruimte.png?w=900&format=webp&quality=78";
import fireImage from "@/assets/image/scenarios/Containerbrand_tegen_pand.png?w=900&format=webp&quality=78";

const phases = [
  [
    "0",
    "Tabletop-ontruimingsoefening",
    "Ontruimingsplan en BHV-organisatie doorlichten",
    "Tijdens deze begeleide tabletop-ontruimingsoefening bespreken we het ontruimingsplan, de taken van de BHV-organisatie en realistische noodscenario’s. Geschikt als nulmeting, na een verhuizing of verbouwing, bij gewijzigde risico’s of wanneer het ontruimingsplan is aangepast.",
    ClipboardCheck,
  ],
  [
    "1",
    "Aangekondigde ontruimingsoefening",
    "Veilig de ontruimingsprocedure oefenen",
    "De datum en starttijd zijn vooraf bekend. Medewerkers en BHV’ers oefenen stap voor stap de alarmering, taakverdeling, vluchtroutes, controle van ruimten, verzamelplaats en overdracht. Ideaal om procedures aan te leren en samen ervaring op te doen.",
    Users,
  ],
  [
    "2",
    "Ontruimingsoefening met onbekend tijdstip",
    "Testen of de routine werkt",
    "De oefendag of oefenweek is bekend, maar het exacte startmoment niet. Hierdoor ontstaat een realistischere praktijktest, terwijl medewerkers en BHV’ers gecontroleerd oefenen met alarmering, communicatie en het veilig ontruimen van het gebouw.",
    Clock3,
  ],
  [
    "3",
    "Onaangekondigde ontruimingsoefening",
    "Paraatheid testen onder tijdsdruk",
    "Het moment en het scenario worden vooraf niet bekendgemaakt aan de deelnemers. We observeren hoe medewerkers en de BHV-organisatie zelfstandig alarmeren, communiceren, besluiten nemen en het gebouw ontruimen.",
    Siren,
  ],
  [
    "4",
    "Ketenoefening ontruiming",
    "Samenwerking tijdens een complex incident",
    "Een uitgebreide ontruimingsoefening met meerdere interne disciplines en, wanneer passend, externe hulpdiensten of een LOTUS-slachtoffer. De focus ligt op samenwerking, opschaling, communicatie, commandovoering en overdracht tijdens een complex noodscenario.",
    Radio,
  ],
];

const steps = [
  [
    "01",
    "Ontruimingsplan aanleveren",
    "Vooraf ontvangen we graag het actuele ontruimingsplan, zodat we de organisatie, procedures en aandachtspunten kunnen beoordelen.",
  ],
  [
    "02",
    "Oefendoel en scenario bepalen",
    "De klant geeft aan wat hij wil oefenen. Met behulp van onze scenariokaarten kan een passend en realistisch scenario worden gekozen.",
  ],
  [
    "03",
    "Voorbespreking op locatie",
    "We zijn meestal een half uur voor de start aanwezig om de oefening, veiligheidsafspraken en laatste aandachtspunten gezamenlijk door te nemen.",
  ],
  [
    "04",
    "Evalueren en verbeteren",
    "We vertalen bevindingen naar concrete en haalbare acties.",
  ],
];

const faqs = [
  [
    "Hoe vaak moet je een ontruimingsoefening houden?",
    "De wet noemt geen vaste frequentie voor iedere organisatie. De Nederlandse Arbeidsinspectie adviseert jaarlijks te oefenen. Stem de frequentie ook af op risico’s, bezetting, gebouw en eerdere bevindingen.",
  ],
  [
    "Is aangekondigd of onaangekondigd oefenen beter?",
    "Een aangekondigde oefening leert procedures veilig aan. Een onaangekondigde oefening geeft daarna een eerlijker beeld van de paraatheid.",
  ],
  [
    "Wat wordt tijdens de oefening beoordeeld?",
    "Onder meer alarmering, taakverdeling, communicatie, vluchtroutes, controle van ruimten, verzamelplaats, registratie en overdracht.",
  ],
  [
    "Krijgen we een verslag?",
    "Ja, de evaluatie kan worden vastgelegd in een praktisch verslag met observaties, sterke punten en verbeteracties.",
  ],
  [
    "In welke regio voeren jullie ontruimingsoefeningen uit?",
    "Wij verzorgen ontruimingsoefeningen op locatie in Voorne aan Zee, Brielle, Hellevoetsluis, Rockanje, Oostvoorne, Rozenburg, Spijkenisse, Nissewaard, Hoogvliet, Rotterdam, de Botlek, Vlaardingen, Maassluis, Schiedam, Barendrecht, Rhoon, de Hoeksche Waard, het Westland, Den Haag en delen van Zeeland. Staat jouw plaats er niet tussen? Neem dan contact op om de mogelijkheden te bespreken.",
  ],
];

export default function OntruimingsOefeningPage() {
  const [openFaq, setOpenFaq] = useState(0);
  useEffect(() => {
    document.querySelector("script[data-ontruiming-schema]")?.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.ontruimingSchema = "true";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Ontruimingsoefening op locatie",
          provider: {
            "@type": "Organization",
            name: "BHV Voorne aan Zee",
            url: "https://bhvvoorneaanzee.nl",
          },
          areaServed: [
            "Voorne aan Zee",
            "Rotterdam-Rijnmond",
            "Westland",
            "Den Haag",
            "Zeeland",
          ],
          description:
            "Realistische ontruimingsoefeningen van tabletop tot onaangekondigde ketenoefening, inclusief observatie en evaluatie.",
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map(([name, text]) => ({
            "@type": "Question",
            name,
            acceptedAnswer: {
              "@type": "Answer",
              text,
            },
          })),
        },
      ],
    });

    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <main className="evac-page">
      <section className="evac-hero" aria-labelledby="evac-title">
        <img
          className="evac-hero__image"
          src={heroImage}
          alt="BHV'ers voeren een realistische ontruimingsoefening uit"
        />
        <div className="evac-hero__shade" />

        <div className="evac-shell evac-hero__content">
          <p className="evac-eyebrow">
            <Siren />
            Ontruimingsoefening op jouw locatie
          </p>
          <h1 id="evac-title">
            Weet jouw organisatie wat er gebeurt als het alarm <em>echt</em>{" "}
            gaat?
          </h1>
          <p className="evac-hero__lead">
            Geen oefening voor de vorm, maar een realistische test van mensen,
            procedures en gebouw. Veilig opgebouwd, scherp geobserveerd en
            direct vertaald naar verbetering.
          </p>

          <div className="evac-actions">
            <Link className="evac-button primary" to="/offerte">
              Plan jouw oefening <ArrowRight />
            </Link>
            <a className="evac-button ghost" href="#fases">
              Bekijk de 5 fases
            </a>
          </div>

          <ul className="evac-checks">
            <li>
              <CheckCircle2 /> Scenario op maat
            </li>
            <li>
              <CheckCircle2 /> Op eigen locatie
            </li>
            <li>
              <CheckCircle2 /> Heldere evaluatie
            </li>
          </ul>
        </div>
      </section>

      <section className="evac-proof">
        <div className="evac-shell evac-proof__grid">
          <div>
            <MapPin />
            <span>
              <strong>Regionaal betrokken</strong>Voorne aan Zee &amp; Rijnmond
            </span>
          </div>
          <div>
            <Building2 />
            <span>
              <strong>Incompany</strong>Afgestemd op jouw gebouw
            </span>
          </div>
          <div>
            <ShieldCheck />
            <span>
              <strong>Praktijkgericht</strong>Van plan naar aantoonbare actie
            </span>
          </div>
        </div>
      </section>

      <section className="evac-intro evac-slant">
        <div className="evac-shell two-col">
          <div>
            <p className="evac-kicker">
              Van papieren plan naar werkende praktijk
            </p>
            <h2>Een goede ontruiming begint vóór de sirene</h2>
          </div>
          <div>
            <p>
              Een ontruimingsplan zegt wat er moet gebeuren. Een oefening laat
              zien of mensen het ook kunnen uitvoeren. Bereikt de melding
              iedereen? Zijn rollen duidelijk? Worden ruimten gecontroleerd?
            </p>
            <p>
              Wij bouwen iedere oefening op rond jouw risico’s, organisatie en
              ervaringsniveau. Zo train je precies wat nodig is, met maximaal
              leerrendement.
            </p>
          </div>
        </div>
      </section>

      <section className="evac-phases" id="fases">
        <div className="evac-shell">
          <p className="evac-kicker">Stapsgewijs realistischer</p>
          <div className="evac-heading">
            <h2>Welke oefenfase past bij jouw organisatie?</h2>
            <p>Start waar jouw team staat en bouw gecontroleerd verder.</p>
          </div>

          <div className="evac-phase-grid">
            {phases.map(([number, title, label, text, Icon]) => (
              <article className="evac-phase" key={number}>
                <div className="evac-phase__top">
                  <span>FASE {number}</span>
                  {createElement(Icon)}
                </div>
                <small>{label}</small>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link to={`/ontruimingsoefening-fase${number}`}>
                  Bekijk fase {number} <ArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="evac-scenarios evac-slant">
        <div className="evac-shell two-col">
          <div>
            <p className="evac-kicker">
              Geen toneelstukje. Wel een geloofwaardige prikkel.
            </p>
            <h2>Een scenario dat past bij jouw locatie</h2>
            <p>
              Rookontwikkeling vraagt iets anders dan brand bij een laadperron,
              een geblokkeerde route of een vermist persoon. Het scenario
              ondersteunt het leerdoel.
            </p>
            <ul className="evac-icon-list">
              <li>
                <Flame /> Realistische incidentontwikkeling
              </li>
              <li>
                <Route /> Vluchtroutes en verzamelplaats getest
              </li>
              <li>
                <Users /> Optioneel met LOTUS-slachtoffer
              </li>
              <li>
                <Radio /> Communicatie onder druk
              </li>
            </ul>
            <Link className="evac-link" to="/ontruimingsoefening-scenarios">
              Bekijk scenario’s <ArrowRight />
            </Link>
          </div>

          <div className="evac-images">
            <figure>
              <img
                src={smokeImage}
                alt="Scenario met rookontwikkeling in een technische ruimte"
                loading="lazy"
              />
              <figcaption>Rookontwikkeling</figcaption>
            </figure>
            <figure>
              <img
                src={fireImage}
                alt="Oefenscenario met brand nabij een bedrijfspand"
                loading="lazy"
              />
              <figcaption>Brand nabij het pand</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="evac-process">
        <div className="evac-shell">
          <p className="evac-kicker">Zo pakken we het aan</p>
          <h2>Van intake tot concrete verbeteractie</h2>
          <div className="evac-process__grid">
            {steps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="evac-tabletop">
        <div className="evac-shell two-col">
          <div className="evac-photo">
            <img
              src={tabletopImage}
              alt="Tabletop ontruimingsoefening met plattegrond en scenario"
              loading="lazy"
            />
            <span>Een sterke start</span>
          </div>
          <div>
            <p className="evac-kicker">
              Nog niet klaar voor een volledige ontruiming?
            </p>
            <h2>Begin aan tafel. Ontdek knelpunten vóórdat ze tellen.</h2>
            <p>
              Tijdens een tabletop doorloopt de BHV-organisatie een incident
              stap voor stap. Rollen, routes, communicatie en beslismomenten
              worden zichtbaar zonder de bedrijfsvoering stil te leggen.
            </p>
            <Link className="evac-button dark" to="/ontruimingsoefening-fase0">
              Meer over tabletop <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="evac-region evac-slant">
        <div className="evac-shell two-col">
          <div>
            <MapPin className="evac-big-icon" />
            <p className="evac-kicker">Dichtbij, praktisch en persoonlijk</p>
            <h2>De regionale specialist in realistisch oefenen</h2>
          </div>
          <div>
            <p>
              Vanuit Voorne aan Zee ondersteunen we organisaties in
              Rotterdam-Rijnmond, Spijkenisse, Hoogvliet, Westland, Den Haag,
              Zeeland en omgeving. Korte lijnen, kennis van de regio en een
              oefening die past bij jouw werkvloer.
            </p>
            <Link className="evac-link dark-link" to="/regio">
              Bekijk ons werkgebied <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="evac-faq">
        <div className="evac-shell two-col">
          <div>
            <p className="evac-kicker">Direct antwoord</p>
            <h2>Veelgestelde vragen</h2>
            <p>Staat jouw vraag er niet tussen? We denken graag mee.</p>
          </div>
          <div>
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              const answerId = `evac-faq-answer-${index}`;

              return (
                <article
                  className={`evac-faq__item${isOpen ? " is-open" : ""}`}
                  key={question}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    {question}
                    <span aria-hidden="true" />
                  </button>
                  <div className="evac-faq__answer" id={answerId}>
                    <div>
                      <p>{answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="evac-cta">
        <div className="evac-shell evac-cta__box">
          <div>
            <p className="evac-kicker">Klaar om te weten waar je écht staat?</p>
            <h2>Maak van veiligheid zichtbaar gedrag.</h2>
            <p>
              Vertel ons kort over je locatie. Dan adviseren we welke oefenfase
              het meeste oplevert.
            </p>
          </div>
          <div className="evac-actions">
            <Link className="evac-button light" to="/offerte">
              Vraag een voorstel aan <ArrowRight />
            </Link>
            <Link className="evac-button outline" to="/contact">
              Eerst overleggen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
