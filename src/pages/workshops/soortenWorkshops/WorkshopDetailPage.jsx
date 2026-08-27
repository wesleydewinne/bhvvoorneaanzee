import { createElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Buildings, CheckCircle, Clock, ShieldCheck, Users } from "@phosphor-icons/react";
import "@/pages/bhvPage/bhvPages/BhvTrainingPage.css";
import "./WorkshopPage.css";

const factIcons = [Users, Clock, Buildings, ShieldCheck];
const SITE_URL = "https://bhvvoorneaanzee.nl";

export default function WorkshopDetailPage({ workshop }) {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const id = "workshop-structured-data";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Course", name: workshop.title, description: workshop.lead, provider: { "@type": "Organization", name: "BHV Voorne aan Zee", url: SITE_URL }, hasCourseInstance: { "@type": "CourseInstance", courseMode: "incompany", location: { "@type": "Place", name: "Op locatie bij de opdrachtgever" } } },
        { "@type": "FAQPage", mainEntity: workshop.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Workshops", item: `${SITE_URL}/workshops` }, { "@type": "ListItem", position: 2, name: workshop.title, item: `${SITE_URL}${workshop.slug}` }] },
      ],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [workshop]);

  return (
    <main className="course-page workshop-detail">
      <section className="course-hero"><img className="course-hero__image" src={workshop.image} alt={`${workshop.title} praktijktraining`} /><div className="course-hero__shade" /><div className="course-shell course-hero__content"><Link className="course-breadcrumb" to="/workshops#aanbod"><ArrowLeft /> Alle workshops</Link><p className="course-eyebrow"><ShieldCheck weight="bold" /> {workshop.label}</p><h1>{workshop.headline}</h1><p className="course-hero__lead">{workshop.lead}</p><div className="course-actions"><Link className="course-button course-button--primary" to="/offerte">Vraag een voorstel aan <ArrowRight /></Link><a className="course-button course-button--ghost" href="#opbouw">Bekijk de inhoud</a></div></div></section>
      <section className="course-facts"><div className="course-shell course-facts__grid">{workshop.facts.map(([label, value], index) => { const Icon = factIcons[index]; return <article key={label}>{createElement(Icon, { weight: "duotone" })}<span><small>{label}</small><strong>{value}</strong></span></article>; })}</div></section>
      <section className="course-answer"><div className="course-shell course-answer__panel workshop-detail__answer"><div><p className="course-kicker">Kort antwoord</p><h2>Wat is {workshop.title}?</h2><p>{workshop.answer}</p></div><div className="workshop-detail__marker" aria-hidden="true"><ShieldCheck weight="duotone" /></div></div></section>
      <section className="course-learn"><div className="course-shell course-learn__grid"><div><p className="course-kicker">Praktische leerdoelen</p><h2>Wat leert de deelnemer?</h2><p>Compacte uitleg, veel oefentijd en directe feedback van de instructeur.</p></div><ul>{workshop.learn.map((item) => <li key={item}><CheckCircle weight="bold" />{item}</li>)}</ul></div></section>
      <section className="course-modules" id="opbouw"><div className="course-shell"><div className="course-heading"><div><p className="course-kicker">Workshopopbouw</p><h2>Van uitleg naar zelf doen</h2></div><p>De inhoud wordt afgestemd op de werkomgeving, deelnemers en aanwezige middelen.</p></div><div className="course-module-grid">{workshop.modules.map((module, index) => <article key={module.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{module.title}</h3><p>{module.text}</p><ul>{module.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
      <section className="course-result"><div className="course-shell course-result__panel"><div><p className="course-kicker">Resultaat</p><h2>Direct toepasbaar na de workshop</h2></div><div className="course-result__copy"><p>{workshop.result}</p></div></div></section>
      {workshop.audience && <section className="course-context"><div className="course-shell"><article className="course-context__audience"><p className="course-kicker">Voor wie</p><h2>{workshop.audience.title}</h2><p>{workshop.audience.text}</p></article></div></section>}
      <section className="course-faq"><div className="course-shell course-faq__grid"><div><p className="course-kicker">Direct antwoord</p><h2>Veelgestelde vragen over deze workshop</h2><p>Staat jouw situatie er niet bij? We denken graag mee over een passende invulling.</p></div><div>{workshop.faqs.map(([question, answer], index) => { const isOpen = openFaq === index; const answerId = `workshop-faq-${index}`; return <article className={`course-faq__item${isOpen ? " is-open" : ""}`} key={question}><button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenFaq(isOpen ? null : index)}>{question}<span aria-hidden="true" /></button><div className="course-faq__answer" id={answerId}><div><p>{answer}</p></div></div></article>; })}</div></div></section>
      <section className="course-region"><div className="course-shell course-region__panel"><div><p className="course-kicker">Op de eigen werkplek</p><h2>{workshop.region.title}</h2></div><div>{workshop.region.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>
      <section className="course-cta"><div className="course-shell course-cta__panel"><div><p className="course-kicker">Workshop op maat</p><h2>Maak veiligheid concreet</h2><p>Vertel ons over de groep, locatie en leerdoelen. Je ontvangt een helder voorstel zonder verrassingen.</p></div><div className="course-actions"><Link className="course-button course-button--light" to="/offerte">Offerte aanvragen <ArrowRight /></Link><Link className="course-button course-button--outline" to="/contact">Eerst overleggen</Link></div></div></section>
    </main>
  );
}
