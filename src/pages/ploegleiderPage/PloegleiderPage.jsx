import { createElement, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Buildings,
  CheckCircle,
  ClipboardText,
  Headset,
  Radio,
  ShieldCheck,
  Strategy,
  UsersThree,
  WarningCircle,
} from "@phosphor-icons/react";
import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import data from "@/shared/data/training.json";
import heroImage from "@/assets/image/trainingen/cardImage/Ploegleider.webp?w=1600&format=webp&quality=82";
import practiceImage from "@/assets/image/trainingen/cardImage/ploegleider/ploegleiderbasis2daags.webp?w=1100&format=webp&quality=80";
import "./PloegleiderPage.css";

const responsibilities = [
  {
    Icon: ClipboardText,
    title: "Informatie controleren",
    text: "Doorvragen, meldingen verifiëren en relevante risico’s herkennen.",
  },
  {
    Icon: Strategy,
    title: "Een inzetplan maken",
    text: "Prioriteiten bepalen en mensen en middelen doelgericht inzetten.",
  },
  {
    Icon: UsersThree,
    title: "De ploeg aansturen",
    text: "Duidelijke opdrachten geven, voortgang bewaken en tijdig bijsturen.",
  },
  {
    Icon: Radio,
    title: "Communiceren en overdragen",
    text: "Rustig afstemmen met BHV’ers, meldkamer en professionele hulpdiensten.",
  },
];

const factors = [
  [
    Buildings,
    "Meerdere BHV’ers tegelijk",
    "Wanneer meerdere BHV’ers gelijktijdig verschillende taken uitvoeren, zorgt de ploegleider voor een duidelijke taakverdeling, één centraal aanspreekpunt en overzicht over de totale BHV-inzet.",
  ],
  [
    WarningCircle,
    "Complexe risico’s of gebouwindeling",
    "Meerdere verdiepingen, gescheiden locaties, specifieke bedrijfsrisico’s of aanwezigen die niet zelfstandig kunnen vluchten, vragen om duidelijke prioriteiten, goede afstemming en centrale coördinatie.",
  ],
  [
    Headset,
    "Veel communicatielijnen",
    "De ploegleider verzamelt en ordent informatie van BHV’ers, receptie, meldkamer, management en hulpdiensten. Zo wordt voorkomen dat opdrachten, terugmeldingen en belangrijke informatie langs elkaar heen lopen.",
  ],
  [
    ShieldCheck,
    "Veilige en beheerste BHV-inzet",
    "De ploegleider bewaakt de voortgang en veiligheid van het BHV-team, stuurt bij wanneer de situatie verandert en zorgt voor een duidelijke overdracht aan de professionele hulpdiensten.",
  ],
];

const faqs = [
  [
    "Wat doet een ploegleider BHV?",
    "Een ploegleider BHV geeft tijdens een incident of oefening direct leiding aan een ploeg bedrijfshulpverleners. De ploegleider verdeelt taken, geeft opdrachten, bewaakt de veiligheid en houdt overzicht over de voortgang van de inzet.",
  ],
  [
    "Is een ploegleider BHV wettelijk verplicht?",
    "De Arbowet noemt geen vaste verplichting om vanaf een bepaald aantal medewerkers of BHV’ers een ploegleider aan te stellen. De werkgever stemt de bedrijfshulpverlening af op de omvang van de organisatie, de risico’s uit de RI&E en de inrichting van de BHV-organisatie. Bij meerdere BHV’ers, complexe risico’s of meerdere communicatielijnen kan een ploegleider nodig zijn om de inzet veilig en overzichtelijk te coördineren.",
  ],
  [
    "Wat is het verschil tussen een ploegleider BHV en een hoofd BHV?",
    "Een ploegleider BHV stuurt de BHV’ers tijdens een inzet rechtstreeks aan. Een operationeel hoofd BHV bewaakt de totale incidentbestrijding en kan meerdere ploegleiders coördineren. Een coördinerend hoofd BHV richt zich vooral op de organisatie, het beleid, de opleidingen en de voorbereiding van de BHV-organisatie.",
  ],
  [
    "Heb je een geldig BHV-diploma nodig voor de opleiding Ploegleider BHV?",
    "Ja. Voor deelname aan de basisopleiding Ploegleider BHV moet de deelnemer beschikken over een geldig BHV-diploma en voldoende kennis en ervaring hebben met de taken van een BHV’er.",
  ],
  [
    "Wat leer je tijdens de opleiding Ploegleider BHV?",
    "De deelnemer leert een melding beoordelen, informatie verzamelen, een inzetplan maken, taken verdelen en een BHV-ploeg veilig en doelgericht aansturen. Ook wordt geoefend met communicatie, besluitvorming en overdracht aan andere functionarissen of hulpdiensten.",
  ],
  [
    "Wordt de opleiding afgestemd op onze eigen organisatie?",
    "Ja. Werkopdrachten en praktijkscenario’s kunnen worden afgestemd op het gebouw, de aanwezige risico’s, de BHV-organisatie, het ontruimingsplan en de interne noodprocedures.",
  ],
  [
    "Is de opleiding Ploegleider BHV een incompany training?",
    "Ja. De opleiding kan op de eigen locatie worden verzorgd. Hierdoor kunnen deelnemers oefenen met herkenbare situaties, procedures en risico’s uit hun eigen werkomgeving.",
  ],
  [
    "Hoe wordt de deelnemer beoordeeld?",
    "De deelnemer wordt beoordeeld op theoretische kennis en het praktisch leidinggeven tijdens een BHV-inzet. Daarbij wordt onder andere gekeken naar overzicht, communicatie, taakverdeling, besluitvorming en veiligheid.",
  ],
  [
    "Ontvangt de deelnemer een NIBHV-diploma?",
    "Na het doorlopen van de opleiding en een voldoende beoordeling ontvangt de deelnemer een erkend NIBHV-diploma Ploegleider BHV.",
  ],
];

export default function PloegleiderPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const category = data.categories.find((item) => item.id === "ploegleider");
  const cards = useMemo(
    () =>
      (category?.trainings ?? []).map((training) => ({
        title: training.title,
        description: training.description,
        image: training.cardImage || category.image,
        alt: training.cardAlt || training.title,
        buttonTo: training.slug,
        buttonText: "Bekijk training",
      })),
    [category],
  );

  useEffect(() => {
    const id = "ploegleider-page-structured-data";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Incompany Ploegleider BHV-training",
          description:
            "Praktijkgerichte opleiding en herhaling voor medewerkers die leidinggeven aan een BHV-ploeg tijdens incidenten.",
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
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map(([name, text]) => ({
            "@type": "Question",
            name,
            acceptedAnswer: { "@type": "Answer", text },
          })),
        },
      ],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <main className="leader-page">
      <section className="leader-page-hero">
        <img src={heroImage} alt="Ploegleider BHV stuurt een BHV-team aan" />
        <div className="leader-page-hero__shade" />
        <div className="leader-page-shell leader-page-hero__content">
          <p className="leader-page-kicker">
            <ShieldCheck weight="bold" /> Incompany opleiding Ploegleider BHV
          </p>
          <h1>Ploegleider BHV-training: leer een BHV-ploeg veilig aansturen</h1>
          <p>
            De opleiding Ploegleider BHV is bedoeld voor BHV’ers die tijdens een
            incident leidinggeven aan de BHV-ploeg. Je leert informatie
            beoordelen, prioriteiten stellen, duidelijke opdrachten geven en de
            veiligheid van het team bewaken. De oefeningen sluiten aan op het
            gebouw, de risico’s, de noodprocedures en de werkwijze van de eigen
            organisatie.
          </p>
          <div className="leader-page-actions">
            <a className="leader-page-button primary" href="#trainingen">
              Bekijk opleidingen <ArrowRight />
            </a>
            <Link className="leader-page-button ghost" to="/offerte">
              Vraag een voorstel aan
            </Link>
          </div>
        </div>
      </section>

      <section className="leader-page-proof">
        <div className="leader-page-shell leader-page-proof__grid">
          <article>
            <strong>Geldig BHV-diploma</strong>
            <span>Vereist voor deelname aan de basisopleiding</span>
          </article>
          <article>
            <strong>NIBHV-opleiding</strong>
            <span>Theorie, werkopdrachten, tabletop en praktijkinzetten</span>
          </article>
          <article>
            <strong>Afgestemd op de organisatie</strong>
            <span>Werkopdrachten en scenario’s uit de eigen werkomgeving</span>
          </article>
          <article>
            <strong>Leidinggeven aan een BHV-inzet</strong>
            <span>Een BHV-ploeg veilig en doelgericht aansturen</span>
          </article>
        </div>
      </section>

      <section className="leader-page-intro">
        <div className="leader-page-shell leader-page-intro__grid">
          <div>
            <p className="leader-page-kicker">Direct antwoord</p>
            <h2>Wat doet een ploegleider BHV?</h2>
            <p>
              Een ploegleider BHV geeft tijdens een incident of oefening direct
              leiding aan een ploeg bedrijfshulpverleners. De ploegleider
              verdeelt de taken, geeft duidelijke opdrachten en bewaakt of de
              BHV’ers hun werkzaamheden veilig en correct uitvoeren.
            </p>
            <p>
              De ploegleider controleert de informatie uit de melding,
              analyseert de situatie en maakt op basis daarvan een inzetplan.
              Tijdens de inzet bewaakt de ploegleider de voortgang,
              communicatie en veiligheid van het BHV-team. Ook zorgt de
              ploegleider voor een duidelijke overdracht aan de professionele
              hulpdiensten.
            </p>
          </div>
          <aside>
            <strong>De kern van de rol</strong>
            <p>
              De ploegleider houdt overzicht, vertaalt informatie naar concrete
              opdrachten en blijft controleren of de inzet veilig verloopt. Zo
              weten BHV’ers wat zij moeten doen en blijft het team ook onder
              tijdsdruk doelgericht samenwerken.
            </p>
          </aside>
        </div>
      </section>

      <section className="leader-page-responsibilities">
        <div className="leader-page-shell">
          <div className="leader-page-heading">
            <div>
              <p className="leader-page-kicker">Van melding tot overdracht</p>
              <h2>De inzetcyclus van de ploegleider BHV</h2>
            </div>
            <p className="leader-page-cycle-note">
              Een vaste werkwijze helpt om onder druk informatie om te zetten in
              veilige, duidelijke acties.
            </p>
          </div>
          <div className="leader-page-responsibilities__grid">
            {responsibilities.map(({ Icon, title, text }, index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                {createElement(Icon, { weight: "duotone" })}
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="leader-page-training" id="trainingen">
        <TrainingCardSection title="Ploegleider BHV-trainingen" cards={cards} />
      </section>

      <section className="leader-page-practice">
        <div className="leader-page-shell leader-page-practice__grid">
          <div className="leader-page-practice__photo">
            <img
              src={practiceImage}
              alt="Praktijkoefening tijdens opleiding ploegleider BHV"
            />
            <span>
              Niet alleen weten wat er moet gebeuren, maar ervaren hoe je
              leidinggeeft wanneer de situatie verandert.
            </span>
          </div>
          <div>
            <p className="leader-page-kicker">Praktijkgericht leidinggeven</p>
            <h2>Ploegleider BHV: leidinggeven leer je door de regie te nemen</h2>
            <p>
              Tijdens tabletopoefeningen worden keuzes, prioriteiten en
              besluitvorming zichtbaar. In de praktijkinzetten blijkt
              vervolgens of opdrachten duidelijk worden gegeven, relevante
              informatie wordt teruggekoppeld en de veiligheid van de
              BHV-ploeg wordt bewaakt.
            </p>
            <p>
              De deelnemer oefent met veranderende situaties, ontvangt directe
              feedback en krijgt de mogelijkheid om na de evaluatie opnieuw
              leiding te geven.
            </p>
            <ul>
              <li>
                <CheckCircle weight="bold" /> Herkenbare scenario’s uit de eigen
                organisatie
              </li>
              <li>
                <CheckCircle weight="bold" /> Directe feedback op communicatie,
                keuzes en leiderschap
              </li>
              <li>
                <CheckCircle weight="bold" /> Opnieuw oefenen en verbeteren na
                iedere evaluatie
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="leader-page-factors">
        <div className="leader-page-shell">
          <div className="leader-page-heading">
            <div>
              <p className="leader-page-kicker">
                Geen standaard verplicht aantal
              </p>
              <h2>Wanneer is een ploegleider BHV nodig?</h2>
            </div>
            <p className="leader-page-factor-note">
              Er geldt geen vast aantal medewerkers of BHV’ers vanaf wanneer
              een ploegleider BHV nodig is. De RI&E, mogelijke
              incidentscenario’s, het gebouw, de aanwezige risico’s en de
              inrichting van de BHV-organisatie bepalen hoeveel operationele
              aansturing tijdens een incident nodig is.
            </p>
          </div>
          <div className="leader-page-factors__grid">
            {factors.map(([Icon, title, text], index) => (
              <article key={title}>
                {createElement(Icon, { weight: "duotone" })}
                <small>0{index + 1}</small>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="leader-page-faq">
        <div className="leader-page-shell leader-page-faq__grid">
          <div>
            <p className="leader-page-kicker">Direct antwoord</p>
            <h2>Veelgestelde vragen over Ploegleider BHV</h2>
            <p>
              Duidelijke antwoorden over de rol van de ploegleider, de noodzaak
              binnen een BHV-organisatie, de toelatingseisen en de incompany
              opleiding.
            </p>
          </div>
          <div>
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return (
                <article
                  className={`leader-page-faq__item${isOpen ? " is-open" : ""}`}
                  key={question}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    {question}
                    <span aria-hidden="true" />
                  </button>
                  <div className="leader-page-faq__answer">
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

      <section className="leader-page-region">
        <div className="leader-page-shell leader-page-region__panel">
          <div>
            <p className="leader-page-kicker">Incompany opleiding in de regio</p>
            <h2>
              Incompany opleiding Ploegleider BHV in Voorne aan Zee en
              Rotterdam-Rijnmond
            </h2>
          </div>
          <div className="leader-page-region__copy">
            <p>
              Wij verzorgen de opleiding Ploegleider BHV als incompany training
              op de eigen locatie van de organisatie. We trainen onder andere
              in Hellevoetsluis, Brielle, Rockanje, Oostvoorne, Rozenburg,
              Spijkenisse en andere plaatsen in Nissewaard, Hoogvliet,
              Rotterdam, de Botlek, Vlaardingen, Maassluis en Schiedam.
            </p>
            <p>
              Ook organisaties in Barendrecht, Rhoon, de Hoeksche Waard, het
              Westland, Den Haag en delen van Zeeland kunnen bij ons terecht.
            </p>
            <p>
              Door op de eigen werkplek te trainen, kunnen werkopdrachten,
              tabletopoefeningen en praktijkscenario’s worden afgestemd op het
              gebouw, de bedrijfsrisico’s, het ontruimingsplan en de inrichting
              van de BHV-organisatie.
            </p>
          </div>
        </div>
      </section>

      <section className="leader-page-cta">
        <div className="leader-page-shell leader-page-cta__panel">
          <div>
            <p className="leader-page-kicker">Persoonlijk advies</p>
            <h2>Welke leerroute past bij jullie organisatie?</h2>
            <p>
              Vertel ons hoe jullie BHV-organisatie is ingericht en wat de
              deelnemers moeten leren. Dan adviseren we welke basisopleiding,
              blended leerroute of praktijkgerichte herhaling het beste
              aansluit.
            </p>
          </div>
          <div className="leader-page-actions">
            <Link className="leader-page-button light" to="/offerte">
              Offerte aanvragen <ArrowRight />
            </Link>
            <Link className="leader-page-button outline" to="/contact">
              Eerst overleggen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
