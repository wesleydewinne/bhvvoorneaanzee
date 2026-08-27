import { createElement } from "react";
import { ClipboardText, FireExtinguisher, UsersThree } from "@phosphor-icons/react";
import data from "../../shared/data/training.json";
import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import ServiceRegionsSection from "@/shared/components/sections/ServiceAreaSection/ServiceRegionsSection.jsx";
import "./WorkshopsPage.css";

const benefits = [
  { icon: UsersThree, title: "Samenwerken", items: ["Duidelijke rolverdeling", "Communiceren onder druk", "Samen een scenario oplossen"] },
  { icon: FireExtinguisher, title: "Zelf doen", items: ["Oefenen met materialen", "Realistische situaties", "Directe feedback"] },
  { icon: ClipboardText, title: "Gericht resultaat", items: ["Eén helder veiligheidsthema", "Afgestemd op de werkplek", "Direct toepasbare afspraken"] },
];

export default function Workshops() {
  const category = data.categories.find(({ id }) => id === "workshops");
  const cards = (category?.trainings ?? []).map((training) => ({
    id: training.type,
    title: training.title,
    description: training.description,
    image: training.cardImage || category?.image,
    alt: training.cardAlt || training.title,
    buttonTo: training.slug,
    buttonText: "Bekijk workshop",
  }));

  return (
    <main className="workshops">
      <HeaderSection mainTitle="Workshops Veiligheid & BHV" subTitle="Kort, praktijkgericht en afgestemd op jouw organisatie" />
      <div className="workshops__container">
        <section className="workshops__intro">
          <p className="workshops__eyebrow">Gericht leren</p>
          <h2>Eén veiligheidsonderwerp. Volle aandacht.</h2>
          <p>Onze workshops zijn compacte praktijksessies rond één concreet onderwerp. Ideaal als opfrismoment, verdieping van de BHV-training of actief onderdeel van een teamdag.</p>
          <p>Deelnemers luisteren niet alleen: ze beoordelen situaties, werken met materialen en oefenen handelingen die aansluiten op hun eigen werkplek.</p>
        </section>

        <section className="workshops__grid" aria-label="Kenmerken van onze workshops">
          {benefits.map(({ icon, title, items }) => <article className="workshops__card" key={title}><h3 className="workshops__card-title"><span className="workshops__icon">{createElement(icon, { size: 24, weight: "bold" })}</span>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
        </section>

        <section className="workshops__difference"><p className="workshops__eyebrow">Flexibel inzetbaar</p><h2>Geen standaardverhaal, maar oefenen wat ertoe doet</h2><p>We stemmen inhoud, scenario’s en materialen af op de deelnemers en risico’s van de organisatie. Zo benut je de beschikbare tijd gericht en gaat het team naar huis met duidelijke, bruikbare afspraken.</p></section>

        <section className="workshops__offer" id="aanbod"><p className="workshops__eyebrow">Workshopaanbod</p><h2>Kies het onderwerp dat bij jullie situatie past</h2><TrainingCardSection cards={cards} /></section>
      </div>
      <ServiceRegionsSection />
    </main>
  );
}
