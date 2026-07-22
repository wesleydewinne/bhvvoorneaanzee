import { createElement, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Ambulance,
  ArrowRight,
  Buildings,
  CheckCircle,
  Clock,
  Fire,
  FireExtinguisher,
  FirstAidKit,
  MapPin,
  Megaphone,
  PersonSimple,
  ShieldCheck,
  Users,
  UsersThree,
  WarningCircle,
} from "@phosphor-icons/react";

import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import data from "@/shared/data/training.json";
import heroImage from "@/assets/image/regio/bhv-voorne-aan-zee-header.png?w=1600&format=webp&quality=82";
import practiceImage from "@/assets/image/homepageFotos/Wesley De Winne instructie brandblusser.webp?w=1100&format=webp&quality=80";
import "./BhvPage.css";

const bhvTasks = [
  {
    Icon: FirstAidKit,
    title: "Eerste hulp",
    text: "Herkennen wat er aan de hand is en direct levensreddend handelen.",
  },
  {
    Icon: FireExtinguisher,
    title: "Brandbestrijding",
    text: "Een beginnende brand veilig beoordelen en uitbreiding beperken.",
  },
  {
    Icon: Fire,
    title: "Ontruiming",
    text: "Alarmeren, communiceren en aanwezigen naar een veilige plaats begeleiden.",
  },
];

const determiningFactors = [
  {
    Icon: Buildings,
    title: "Gebouw en indeling",
    text: "Oppervlakte, verdiepingen, compartimenten en loopafstanden.",
  },
  {
    Icon: WarningCircle,
    title: "Risico’s en werkzaamheden",
    text: "Machines, brandgevaar, gevaarlijke stoffen en bedrijfsprocessen.",
  },
  {
    Icon: Clock,
    title: "Aanwezigheidstijden",
    text: "Dag-, avond- en nachtdiensten vragen om passende bezetting.",
  },
  {
    Icon: Ambulance,
    title: "Opkomst hulpdiensten",
    text: "De locatie en verwachte aanrijtijd beïnvloeden de eerste inzet.",
  },
  {
    Icon: Megaphone,
    title: "Alarmering en communicatie",
    text: "Middelen, taakverdeling en informatielijnen moeten betrouwbaar werken.",
  },
  {
    Icon: UsersThree,
    title: "Bezetting en bezoekers",
    text: "Medewerkers, klanten, leerlingen of patiënten vragen om maatwerk.",
  },
  {
    Icon: PersonSimple,
    title: "Zelfredzaamheid",
    text: "Houd rekening met mensen die niet zelfstandig kunnen vluchten.",
  },
  {
    Icon: ShieldCheck,
    title: "Ervaring van het BHV-team",
    text: "Opleiding, herhaling en samenwerking bepalen de slagkracht.",
  },
];

const articleThreeTasks = [
  "Risico’s inventariseren en evalueren met een RI&E en plan van aanpak.",
  "Medewerkers informeren over risico’s en preventieve maatregelen.",
  "De arbeid zo organiseren dat veiligheid en gezondheid worden beschermd.",
];

const articleFifteenTasks = [
  "Eerste hulp verlenen bij ongevallen.",
  "Brand beperken en bestrijden en de gevolgen van ongevallen beperken.",
  "In noodsituaties alarmeren en alle aanwezigen evacueren.",
  "De BHV-organisatie afstemmen op de aanwezige risico’s.",
];

const faqs = [
  [
    "Is BHV verplicht voor ieder bedrijf?",
    "Een werkgever moet doeltreffende bedrijfshulpverlening organiseren. Hoeveel BHV’ers en welke deskundigheid nodig zijn, volgt uit de risico’s, bezetting en inrichting van de organisatie.",
  ],
  [
    "Hoeveel BHV’ers heeft mijn organisatie nodig?",
    "De wet noemt geen vast aantal. De RI&E, aanwezige personen, werktijden, gebouwindeling, zelfredzaamheid en bedrijfsrisico’s bepalen welke bezetting passend is.",
  ],
  [
    "Kan een BHV-training op onze eigen locatie plaatsvinden?",
    "Ja. Wij verzorgen BHV-trainingen incompany, zodat deelnemers oefenen met herkenbare risico’s, vluchtroutes en middelen uit hun eigen werkomgeving.",
  ],
  [
    "Welke BHV-training past bij nieuwe medewerkers?",
    "Voor nieuwe BHV’ers is een basistraining geschikt. Afhankelijk van de gewenste leerroute kan dat een volledige praktijkopleiding zijn of een combinatie van e-learning en praktijk.",
  ],
];

export default function BhvPage() {
  const [openFaq, setOpenFaq] = useState(0);
    const bhvCategory = data.categories.find((category) => category.id === "bhv");

    const bhvCards = useMemo(
        () =>
            (bhvCategory?.trainings || []).map((training) => ({
        title: training.title,
        description: training.description,
        image: training.cardImage?.trim()
          ? training.cardImage
          : bhvCategory?.image,
        alt: training.cardAlt || training.title,
        buttonTo: training.slug,
        buttonText: "Bekijk training",
        buttonStyle: "primary",
      })),
        [bhvCategory],
  );

  useEffect(() => {
    const id = "bhv-page-structured-data";
    document.getElementById(id)?.remove();

    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Incompany BHV-training",
          description:
            "Praktijkgerichte BHV-training op de eigen werklocatie, afgestemd op risico’s, organisatie en deelnemers.",
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
    <main className="bhv-page">
      <section className="bhv-hero" aria-labelledby="bhv-title">
        <img
          className="bhv-hero__image"
          src={heroImage}
          alt="Praktijkgerichte BHV-training op locatie"
        />
        <div className="bhv-hero__shade" />

        <div className="bhv-shell bhv-hero__content">
          <p className="bhv-eyebrow">
            <ShieldCheck size={20} weight="bold" />
            Incompany BHV-training
          </p>
          <h1 id="bhv-title">
            Weten wat je moet doen als <em>elke seconde telt.</em>
          </h1>
          <p className="bhv-hero__lead">
            Praktijkgerichte BHV-training op jouw eigen werkvloer. Herkenbaar,
            realistisch en afgestemd op de risico’s binnen je organisatie.
          </p>

          <div className="bhv-actions">
            <a className="bhv-button bhv-button--primary" href="#trainingen">
              Bekijk BHV-trainingen <ArrowRight size={19} weight="bold" />
            </a>
            <Link className="bhv-button bhv-button--ghost" to="/offerte">
              Vraag een voorstel aan
            </Link>
          </div>

          <ul className="bhv-hero__checks">
            <li>
              <CheckCircle weight="fill" /> Incompany op locatie
            </li>
            <li>
              <CheckCircle weight="fill" /> Veel praktijk
            </li>
            <li>
              <CheckCircle weight="fill" /> Afgestemd op de RI&amp;E
            </li>
          </ul>
        </div>
      </section>

      <section
        className="bhv-proof"
        aria-label="Kenmerken van onze BHV-trainingen"
      >
        <div className="bhv-shell bhv-proof__grid">
          <div>
            <MapPin size={30} weight="bold" />
            <span>
              <strong>Op jouw locatie</strong>Oefenen in de eigen werkomgeving
            </span>
          </div>
          <div>
            <Users size={30} weight="bold" />
            <span>
              <strong>Voor jouw team</strong>Passend bij ervaring en
              groepsgrootte
            </span>
          </div>
          <div>
            <ShieldCheck size={30} weight="bold" />
            <span>
              <strong>Direct toepasbaar</strong>Gericht op herkenbare
              noodsituaties
            </span>
          </div>
        </div>
      </section>

      <section className="bhv-intro">
        <div className="bhv-shell bhv-intro__grid">
          <div>
            <p className="bhv-kicker">
              Bedrijfshulpverlening die blijft hangen
            </p>
            <h2>
              Geen les voor het certificaat. Training voor het moment dat telt.
            </h2>
            <p className="bhv-copy">
              Een BHV’er moet onder druk kunnen herkennen, beslissen en
              handelen. Daarom koppelen we de basisvaardigheden aan de risico’s,
              ruimtes en middelen van jouw organisatie.
            </p>
            <p className="bhv-copy">
              We trainen organisaties in Voorne aan Zee, Rotterdam-Rijnmond,
              Westland, Den Haag, Zeeland en omliggende regio’s.
            </p>
          </div>

          <div className="bhv-task-grid">
            {bhvTasks.map(({ Icon, title, text }) => (
              <article className="bhv-task" key={title}>
                                {createElement(Icon, { size: 30, weight: "bold" })}
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bhv-training-showcase" id="trainingen">
        <TrainingCardSection
          title="Incompany BHV-trainingen"
          subtitle="Volledig afgestemd op jouw organisatie en werkvloer."
          cards={bhvCards}
        />
      </section>

      <section className="bhv-practice">
        <div className="bhv-shell bhv-practice__grid">
          <figure className="bhv-practice__photo">
            <img
              src={practiceImage}
              alt="Deelnemer oefent het gebruik van een brandblusser tijdens een BHV-training"
              loading="lazy"
            />
            <figcaption>Oefenen met echte handelingen</figcaption>
          </figure>
          <div>
            <p className="bhv-kicker">Waarom incompany?</p>
            <h2>De eigen werkvloer maakt de training herkenbaar.</h2>
            <p className="bhv-copy">
              Op locatie zien deelnemers waar de middelen hangen, welke route
              logisch lijkt en waar tijdens een incident juist twijfel kan
              ontstaan. Die herkenning maakt de stap van leren naar handelen
              kleiner.
            </p>
            <ul className="bhv-checklist">
              <li>
                <CheckCircle weight="fill" /> Scenario’s passend bij de
                werkzaamheden
              </li>
              <li>
                <CheckCircle weight="fill" /> Aandacht voor aanwezige middelen
                en vluchtroutes
              </li>
              <li>
                <CheckCircle weight="fill" /> Minder reistijd voor de deelnemers
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bhv-factors">
        <div className="bhv-shell">
          <div className="bhv-heading">
            <div>
              <p className="bhv-kicker">Geen standaard aantal</p>
              <h2>Wat bepaalt jouw BHV-organisatie?</h2>
            </div>
            <p>
              De RI&amp;E en de dagelijkse praktijk bepalen hoeveel mensen,
              middelen en deskundigheid nodig zijn.
            </p>
          </div>

          <div className="bhv-factor-grid">
            {determiningFactors.map(({ Icon, title, text }, index) => (
              <article className="bhv-factor" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                                {createElement(Icon, { size: 29, weight: "bold" })}
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <p className="bhv-source-note">
            Meer over een risico-inventarisatie lees je bij{" "}
            <a
              href="https://www.rie.nl/over-rie/een-rie-maken#hoe-kies-je-het-juiste-hulpmiddel"
              target="_blank"
              rel="noreferrer"
            >
              het Steunpunt RI&amp;E
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bhv-law">
        <div className="bhv-shell">
          <div className="bhv-heading bhv-heading--light">
            <div>
              <p className="bhv-kicker">BHV en de Arbowet</p>
              <h2>De verplichting is helder. De invulling vraagt maatwerk.</h2>
            </div>
            <p>
              Artikel 3 beschrijft de algemene zorgplicht. Artikel 15 benoemt de
              taken van de bedrijfshulpverlening.
            </p>
          </div>

          <div className="bhv-law__grid">
            <article>
              <small>Artikel 3 Arbowet</small>
              <h3>Veilig en gezond werken organiseren</h3>
              <ul>
                {articleThreeTasks.map((task) => (
                  <li key={task}>
                    <CheckCircle weight="fill" />
                    {task}
                  </li>
                ))}
              </ul>
              <a
                href="https://wetten.overheid.nl/jci1.3:c:BWBR0010346&hoofdstuk=2&artikel=3"
                target="_blank"
                rel="noreferrer"
              >
                Lees artikel 3 op overheid.nl <ArrowRight />
              </a>
            </article>
            <article>
              <small>Artikel 15 Arbowet</small>
              <h3>Doeltreffende bedrijfshulpverlening</h3>
              <ul>
                {articleFifteenTasks.map((task) => (
                  <li key={task}>
                    <CheckCircle weight="fill" />
                    {task}
                  </li>
                ))}
              </ul>
              <a
                href="https://wetten.overheid.nl/jci1.3:c:BWBR0010346&hoofdstuk=3&artikel=15"
                target="_blank"
                rel="noreferrer"
              >
                Lees artikel 15 op overheid.nl <ArrowRight />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="bhv-faq">
        <div className="bhv-shell bhv-faq__grid">
          <div>
            <p className="bhv-kicker">Direct antwoord</p>
            <h2>Veelgestelde vragen over BHV-training</h2>
            <p className="bhv-copy">
              Staat jouw situatie er niet tussen? We denken graag praktisch met
              je mee.
            </p>
          </div>
          <div>
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              const answerId = `bhv-faq-answer-${index}`;

              return (
                <article
                  className={`bhv-faq__item${isOpen ? " is-open" : ""}`}
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
                  <div className="bhv-faq__answer" id={answerId}>
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

      <section className="bhv-region">
        <div className="bhv-shell bhv-region__panel">
          <div>
            <MapPin size={40} weight="bold" />
            <p className="bhv-kicker">Regionaal en op locatie</p>
            <h2>
              Incompany BHV-training in Voorne aan Zee en Rotterdam-Rijnmond
            </h2>
          </div>
          <div>
            <p>
              Wij verzorgen incompany BHV-trainingen in Hellevoetsluis,
              Brielle, Rockanje, Oostvoorne, Rozenburg, Spijkenisse en
              Nissewaard. Binnen Rotterdam-Rijnmond trainen we ook in
              Hoogvliet, de Botlek, Vlaardingen, Maassluis en Schiedam.
              Daarnaast zijn we actief in Barendrecht, Rhoon, de Hoeksche
              Waard, het Westland, Den Haag en Zeeland.
            </p>
            <Link to="/regio">
              Bekijk ons volledige werkgebied <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="bhv-cta">
        <div className="bhv-shell bhv-cta__panel">
          <div>
            <p className="bhv-kicker">Klaar voor een training die past?</p>
            <h2>Vertel ons over je team en werkomgeving.</h2>
            <p>
              Dan adviseren we welke BHV-training en opzet het beste aansluit.
            </p>
          </div>
          <div className="bhv-actions">
            <Link className="bhv-button bhv-button--light" to="/offerte">
              Vraag een voorstel aan <ArrowRight />
            </Link>
            <Link className="bhv-button bhv-button--outline" to="/contact">
              Eerst overleggen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
