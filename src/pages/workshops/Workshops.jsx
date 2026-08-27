import { createElement } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Buildings, CheckCircle, ClipboardText, FireExtinguisher, Target, UsersThree } from "@phosphor-icons/react";
import data from "../../shared/data/training.json";
import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import workshopHeaderImage from "@/assets/image/homepageFotos/Wesley De Winne Instructie vlam in de pan.webp";
import "./WorkshopsPage.css";

const benefits = [
  { icon: UsersThree, title: "Samenwerken", items: ["Duidelijke rolverdeling", "Communiceren onder druk", "Samen een scenario oplossen"] },
  { icon: FireExtinguisher, title: "Zelf doen", items: ["Oefenen met materialen", "Realistische situaties", "Directe feedback"] },
  { icon: ClipboardText, title: "Gericht resultaat", items: ["Eén helder veiligheidsthema", "Afgestemd op de werkplek", "Direct toepasbare afspraken"] },
];

const reasons = [
  { icon: Target, title: "Eén onderwerp centraal", text: "De beschikbare tijd gaat niet op aan een breed programma. We verdiepen precies het veiligheidsonderwerp dat binnen jullie organisatie aandacht nodig heeft." },
  { icon: FireExtinguisher, title: "Veel ruimte om te oefenen", text: "Deelnemers kijken niet alleen naar een demonstratie, maar beoordelen situaties, maken keuzes en voeren handelingen zoveel mogelijk zelf uit." },
  { icon: Buildings, title: "Herkenbaar op de werkvloer", text: "Op locatie verbinden we de workshop waar mogelijk aan aanwezige middelen, interne afspraken, risico’s en de dagelijkse werkomgeving." },
  { icon: CheckCircle, title: "Van weten naar handelen", text: "Het resultaat is niet alleen meer kennis. Deelnemers begrijpen beter welke keuze nodig is en wanneer zij juist wel of niet zelf moeten optreden." },
];

const steps = ["Begrijpen", "Herkennen", "Beslissen", "Doen", "Evalueren"];
const learningForms = [
  { label: "Workshop", title: "Gericht verdiepen", text: "Geschikt wanneer één concreet onderwerp centraal staat en medewerkers daar praktisch mee moeten oefenen.", active: true },
  { label: "Training", title: "Breed opleiden", text: "Passend wanneer deelnemers een volledig programma volgen of wanneer opleiding en certificering nodig zijn." },
  { label: "Oefening", title: "Samenwerking toetsen", text: "Bedoeld om te ervaren hoe mensen, procedures en voorzieningen tijdens een realistisch incident samenwerken." },
];

export default function Workshops() {
  const category = data.categories.find(({ id }) => id === "workshops");
  const cards = (category?.trainings ?? []).map((training) => ({
    id: training.type, title: training.title, description: training.description,
    image: training.cardImage || category?.image, alt: training.cardAlt || training.title,
    buttonTo: training.slug, buttonText: "Bekijk workshop",
  }));

  return (
    <main className="workshops">
      <HeaderSection mainTitle="Veiligheidsworkshops" subTitle="Kort, praktijkgericht en afgestemd op jouw organisatie" image={workshopHeaderImage} />
      <div className="workshops__container">
        <section className="workshops__intro">
          <div className="workshops__intro-copy">
            <p className="workshops__eyebrow">Gericht leren</p>
            <h2><span className="workshops__intro-title-line">Eén veiligheidsonderwerp.</span><br />Volle aandacht.</h2>
            <p>Niet iedere veiligheidsvraag vraagt om een volledige opleiding. Soms wil je medewerkers juist gericht laten oefenen met één specifiek onderdeel.</p>
            <p>Deelnemers luisteren niet alleen: ze beoordelen situaties, werken met materialen en oefenen handelingen die aansluiten op hun eigen werkplek.</p>
          </div>
          <p className="workshops__intro-quote">Kort van opzet.<br /><strong>Groot in praktisch resultaat.</strong></p>
        </section>

        <section className="workshops__grid" aria-label="Kenmerken van onze workshops">
          {benefits.map(({ icon, title, items }, index) => (
            <article className="workshops__card" key={title}>
              <span className="workshops__card-number">0{index + 1}</span>
              <h3 className="workshops__card-title"><span className="workshops__icon">{createElement(icon, { size: 28, weight: "bold" })}</span>{title}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </section>

        <section className="workshops__why">
          <div className="workshops__section-heading">
            <div><p className="workshops__eyebrow">Waarom een workshop?</p><h2>Veilig handelen vraagt meer dan een procedure kennen.</h2></div>
            <p>Als er werkelijk iets gebeurt, moeten medewerkers informatie kunnen beoordelen en weten welke actie verantwoord is. Een workshop maakt precies die vertaalslag van uitleg naar de eigen praktijk.</p>
          </div>
          <div className="workshops__reasons">
            {reasons.map(({ icon, title, text }, index) => (
              <article className="workshops__reason" key={title}>
                <span className="workshops__reason-number">0{index + 1}</span>
                <span className="workshops__reason-icon">{createElement(icon, { size: 30, weight: "bold" })}</span>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="workshops__difference">
          <div className="workshops__difference-inner">
            <p className="workshops__eyebrow">Van uitleg naar handelen</p>
            <h2>Niet alleen horen hoe het moet.<br />Ervaren wat je moet doen.</h2>
            <p>De theorie blijft doelgericht. Daarna ontstaat ruimte om fouten te maken, keuzes te bespreken en opnieuw te proberen. Juist tijdens het oefenen worden vragen zichtbaar die op papier verborgen blijven.</p>
            <ol className="workshops__steps">{steps.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>
          </div>
        </section>

        <section className="workshops__choice">
          <div className="workshops__choice-copy"><p className="workshops__eyebrow">Welke vorm past?</p><h2>Begin bij wat deelnemers na afloop beter moeten kunnen.</h2><p>Niet iedere veiligheidsvraag vraagt om dezelfde oplossing. Daarom kijken we eerst naar het doel en kiezen we daarna pas de passende vorm.</p></div>
          <div className="workshops__choice-grid">
            {learningForms.map(({ label, title, text, active }) => <article className={`workshops__choice-card${active ? " workshops__choice-card--active" : ""}`} key={label}><span>{label}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="workshops__offer" id="aanbod">
          <div className="workshops__offer-heading"><p className="workshops__eyebrow">Workshopaanbod</p><h2>Kies het onderwerp dat bij jullie situatie past</h2><p>Van eerste hulp en reanimatie tot brandbestrijding en communicatie: kies gericht of combineer meerdere onderwerpen.</p></div>
          <TrainingCardSection cards={cards} />
        </section>

        <section className="workshops__cta">
          <div><p className="workshops__eyebrow">Gericht oefenen</p><h2>Welke workshop past bij jullie organisatie?</h2><p>Vertel ons wat medewerkers moeten kunnen, waar zij tegenaan lopen en welke risico’s of voorzieningen aanwezig zijn. Dan bepalen we samen welke workshop of combinatie daarbij past.</p></div>
          <div className="workshops__cta-actions"><Link className="workshops__button workshops__button--primary" to="/offerte">Vraag een offerte aan <ArrowRight size={20} weight="bold" /></Link><Link className="workshops__button workshops__button--secondary" to="/contact">Bespreek de mogelijkheden</Link></div>
        </section>
      </div>
    </main>
  );
}
