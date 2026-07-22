import { createElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Buildings,
  CheckCircle,
  Clock,
  ShieldCheck,
  Users,
} from "@phosphor-icons/react";
import api from "@/api/api.js";
import NIBHV from "@/assets/icons/certificeringlogo/badgeNIBHV.png?w=360&format=webp&quality=80";
import "./BhvTrainingPage.css";

const factIcons = [Users, Clock, Buildings, ShieldCheck];
const SITE_URL = "https://bhvvoorneaanzee.nl";

export default function BhvTrainingDetailPage({ training }) {
  const [priceFrom, setPriceFrom] = useState(
    training.fallbackPrice ?? null,
  );
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    if (!training.priceEndpoint) return undefined;
    let active = true;
    api
      .get(training.priceEndpoint)
      .then(({ data }) => {
        if (active) setPriceFrom(data.basePrice);
      })
      .catch(() => {
        if (active) setPriceFrom(training.fallbackPrice ?? null);
      });
    return () => {
      active = false;
    };
  }, [training.fallbackPrice, training.priceEndpoint]);

  useEffect(() => {
    const id = "bhv-training-structured-data";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          name: training.title,
          description: training.lead,
          provider: {
            "@type": "Organization",
            name: "BHV Voorne aan Zee",
            url: SITE_URL,
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "incompany",
            location: {
              "@type": "Place",
              name: "Op locatie bij de organisatie",
            },
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: training.faqs.map(([name, text]) => ({
            "@type": "Question",
            name,
            acceptedAnswer: { "@type": "Answer", text },
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "BHV-trainingen",
              item: `${SITE_URL}/bhv`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: training.title,
              item: `${SITE_URL}${training.slug}`,
            },
          ],
        },
      ],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [training]);

  const priceText =
    priceFrom === null
      ? "Prijs op aanvraag"
      : `${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(priceFrom)} per cursist`;

  return (
    <main className="course-page">
      <section className="course-hero">
        <img
          className="course-hero__image"
          src={training.image}
          alt={`${training.title} praktijktraining op locatie`}
        />
        <div className="course-hero__shade" />
        <div className="course-shell course-hero__content">
          <Link className="course-breadcrumb" to="/bhv#trainingen">
            <ArrowLeft /> Alle BHV-trainingen
          </Link>
          <p className="course-eyebrow">
            <ShieldCheck weight="bold" /> {training.label}
          </p>
          <h1>{training.headline}</h1>
          <p className="course-hero__lead">{training.lead}</p>
          <div className="course-actions">
            <Link
              className="course-button course-button--primary"
              to="/offerte"
            >
              Vraag een voorstel aan <ArrowRight />
            </Link>
            <a className="course-button course-button--ghost" href="#opbouw">
              Bekijk de opbouw
            </a>
          </div>
        </div>
      </section>

      <section className="course-facts">
        <div className="course-shell course-facts__grid">
          {training.facts.map(([label, value], index) => {
            const Icon = factIcons[index];
            return (
              <article key={label}>
                {createElement(Icon, { weight: "duotone" })}
                <span>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="course-answer">
        <div className="course-shell course-answer__panel">
          <div>
            <p className="course-kicker">Kort antwoord</p>
            <h2>Wat is {training.title}?</h2>
            <p>{training.answer}</p>
            {training.answerParagraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href="https://www.nibhv.nl/"
            target="_blank"
            rel="noreferrer"
            aria-label="Bekijk informatie over NIBHV"
          >
            <img src={NIBHV} alt="NIBHV keurmerk voor BHV-opleidingen" />
          </a>
        </div>
      </section>

      {training.why && (
        <section className="course-explanation">
          <div className="course-shell course-explanation__panel">
            <div>
              <p className="course-kicker">Vaker oefenen, beter voorbereid</p>
              <h2>{training.why.title}</h2>
            </div>
            <div>
              {training.why.paragraphs.map((paragraph, index) => (
                <p
                  className={
                    index === training.why.paragraphs.length - 1
                      ? "course-explanation__result"
                      : undefined
                  }
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="course-learn">
        <div className="course-shell course-learn__grid">
          <div>
            <p className="course-kicker">Praktische leerdoelen</p>
            <h2>Wat leert de deelnemer?</h2>
            <p>
              De nadruk ligt op herkennen, veilig beslissen en daadwerkelijk
              uitvoeren.
            </p>
          </div>
          <ul>
            {training.learn.map((item) => (
              <li key={item}>
                <CheckCircle weight="bold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="course-modules" id="opbouw">
        <div className="course-shell">
          <div className="course-heading">
            <div>
              <p className="course-kicker">Trainingsopbouw</p>
              <h2>Zo ziet de leerroute eruit</h2>
            </div>
            <p>
              Heldere onderdelen, veel oefentijd en directe feedback van de
              instructeur.
            </p>
          </div>
          <div className="course-module-grid">
            {training.modules.map((module, index) => (
              <article key={module.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
                <ul>
                  {module.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {training.steps && (
        <section className="course-steps">
          <div className="course-shell">
            <div className="course-heading">
              <div>
                <p className="course-kicker">
                  Van inventarisatie tot evaluatie
                </p>
                <h2>Zo werkt BHV Ritme</h2>
              </div>
              <p>
                Een vaste jaarcyclus die aansluit op de risico’s, bezetting en
                leerdoelen van jouw organisatie.
              </p>
            </div>
            <div className="course-steps__grid">
              {training.steps.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="course-result">
        <div className="course-shell course-result__panel">
          <div>
            <p className="course-kicker">Resultaat</p>
            <h2>{training.resultTitle ?? "Wat levert deze training op?"}</h2>
          </div>
          <div className="course-result__copy">
            {(training.resultParagraphs ?? [training.result]).map(
              (paragraph) => paragraph && <p key={paragraph}>{paragraph}</p>,
            )}
          </div>
        </div>
      </section>

      {training.audience && (
        <section className="course-context">
          <div className="course-shell">
            <article className="course-context__audience">
              <p className="course-kicker">Voor wie</p>
              <h2>{training.audience.title}</h2>
              {(training.audience.paragraphs ?? [training.audience.text]).map(
                (paragraph) => <p key={paragraph}>{paragraph}</p>,
              )}
              {training.audience.note && (
                <strong>{training.audience.note}</strong>
              )}
            </article>
          </div>
        </section>
      )}

      <section className="course-faq">
        <div className="course-shell course-faq__grid">
          <div>
            <p className="course-kicker">Direct antwoord</p>
            <h2>Veelgestelde vragen over {training.title}</h2>
            <p>Unieke antwoorden voor deze specifieke leerroute.</p>
          </div>
          <div>
            {training.faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              const answerId = `course-faq-answer-${index}`;

              return (
                <article
                  className={`course-faq__item${isOpen ? " is-open" : ""}`}
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
                  <div className="course-faq__answer" id={answerId}>
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

      {training.region && (
        <section className="course-region">
          <div className="course-shell course-region__panel">
            <div>
              <p className="course-kicker">Training op de eigen werkplek</p>
              <h2>{training.region.title}</h2>
            </div>
            <div>
              {(training.region.paragraphs ?? [training.region.text]).map(
                (paragraph) => <p key={paragraph}>{paragraph}</p>,
              )}
            </div>
          </div>
        </section>
      )}

      <section className="course-cta">
        <div className="course-shell course-cta__panel">
          <div>
            <p className="course-kicker">Investering</p>
            <h2>{priceText}</h2>
            {priceFrom === null ? (
              <p>
                De definitieve prijs hangt af van groepsgrootte, locatie en
                gewenste invulling. Je ontvangt altijd een transparant voorstel
                op maat.
              </p>
            ) : (
              <p>
                Deze prijs geldt voor één cursist. Wil je twee of meer cursisten
                aanmelden? Vraag dan een offerte aan. Bij iedere extra cursist
                daalt de prijs per persoon en ontvang je een passende groepsprijs.
              </p>
            )}
          </div>
          <div className="course-actions">
            <Link className="course-button course-button--light" to="/offerte">
              Offerte aanvragen <ArrowRight />
            </Link>
            <Link
              className="course-button course-button--outline"
              to="/contact"
            >
              Eerst overleggen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
