import { createElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  ShieldCheck,
  Strategy,
  UsersThree,
} from "@phosphor-icons/react";
import api from "@/api/api.js";
import NIBHV from "@/assets/icons/certificeringlogo/badgeNIBHV.png?w=360&format=webp&quality=80";
import "./PloegleiderDetailPage.css";

const factIcons = [UsersThree, Clock, Strategy, ShieldCheck];
const SITE_URL = "https://bhvvoorneaanzee.nl";

export default function PloegleiderTrainingDetail({ training }) {
  const [price, setPrice] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    if (!training.priceEndpoint) return undefined;
    let active = true;
    api
      .get(training.priceEndpoint)
      .then(({ data }) => {
        if (active) setPrice(data.basePrice);
      })
      .catch(() => {
        if (active) setPrice(null);
      });
    return () => {
      active = false;
    };
  }, [training.priceEndpoint]);

  useEffect(() => {
    const id = "ploegleider-training-structured-data";
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
              name: "Ploegleider BHV-trainingen",
              item: `${SITE_URL}/ploegleider`,
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
    price === null
      ? "Prijs op aanvraag"
      : `${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(price)} per cursist`;

  return (
    <main className="leader-course">
      <section className="leader-hero">
        <img src={training.image} alt={`${training.title} praktijktraining`} />
        <div className="leader-hero__shade" />
        <div className="leader-shell leader-hero__content">
          <Link className="leader-back" to="/ploegleider#trainingen">
            <ArrowLeft /> Alle ploegleidertrainingen
          </Link>
          <p className="leader-kicker">
            <ShieldCheck weight="bold" /> {training.label}
          </p>
          <h1>{training.headline}</h1>
          <p className="leader-hero__lead">{training.lead}</p>
          <div className="leader-actions">
            <a className="leader-button leader-button--orange" href="#opbouw">
              {training.heroPrimaryText ?? "Bekijk de opleiding"} <ArrowRight />
            </a>
            <Link className="leader-button leader-button--ghost" to="/offerte">
              {training.heroSecondaryText ?? "Vraag een voorstel aan"}
            </Link>
          </div>
        </div>
      </section>

      <section className="leader-facts">
        <div className="leader-shell leader-facts__grid">
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

      <section className="leader-answer">
        <div className="leader-shell leader-answer__panel">
          <div>
            <p className="leader-kicker">Direct antwoord</p>
            <h2>{training.answerTitle}</h2>
            <p>{training.answer}</p>
            {training.answerParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href="https://www.nibhv.nl/"
            target="_blank"
            rel="noreferrer"
            aria-label="Meer informatie over NIBHV"
          >
            <img src={NIBHV} alt="NIBHV erkend opleider voor ploegleider BHV" />
          </a>
        </div>
      </section>

      <section className="leader-learn">
        <div className="leader-shell leader-two-col">
          <div>
            <p className="leader-kicker">Leidinggeven aan de inzet</p>
            <h2>{training.learnTitle ?? "Wat leert een ploegleider BHV?"}</h2>
            <p>
              {training.learnIntro ??
                "Tijdens de opleiding leert de deelnemer een BHV-inzet gestructureerd, doelgericht en veilig aansturen. De ploegleider voert niet zelf alle BHV-taken uit, maar beoordeelt informatie, stelt prioriteiten, verdeelt opdrachten en bewaakt de voortgang en veiligheid van het BHV-team."}
            </p>
          </div>
          <ul>
            {training.learn.map((item) => (
              <li key={item}>
                <CheckCircle weight="bold" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="leader-modules" id="opbouw">
        <div className="leader-shell">
          <div className="leader-heading">
            <div>
              <p className="leader-kicker">
                {training.modulesKicker ?? "Opleidingsopbouw"}
              </p>
                <h2>
                  {training.modulesTitle ?? "Van informatie naar een veilige inzet"}
                </h2>
              </div>
              <p>
                {training.modulesIntro ??
                  "De deelnemer oefent steeds dezelfde regiecyclus: controleren, analyseren, plannen, opdracht geven, bewaken en bijsturen."}
              </p>
          </div>
            <div className="leader-module-grid">
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

      {training.practice ? (
        <section className="leader-course-practice">
          <div className="leader-shell leader-course-practice__grid">
            <div className="leader-course-practice__image">
              <img src={training.image} alt={`${training.title} praktijkinzet`} />
              <span>{training.practice.caption}</span>
            </div>
            <div>
              <p className="leader-kicker">{training.practice.kicker}</p>
              <h2>{training.practice.title}</h2>
              <p>{training.practice.text}</p>
              <p>{training.practice.secondText}</p>
              <ul>
                {training.practice.items.map((item) => (
                  <li key={item}>
                    <CheckCircle weight="bold" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section className="leader-result">
        <div className="leader-shell leader-result__panel">
          <div>
            <p className="leader-kicker">Resultaat</p>
            <h2>{training.resultTitle}</h2>
          </div>
          <div className="leader-result__copy">
            {(Array.isArray(training.result)
              ? training.result
              : [training.result]
            ).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="leader-faq">
        <div className="leader-shell leader-two-col">
          <div>
            <p className="leader-kicker">Direct antwoord</p>
            <h2>{training.faqTitle ?? `Veelgestelde vragen over ${training.title}`}</h2>
            <p>
              {training.faqIntro ??
                "Heldere antwoorden over toelating, inhoud, beoordeling en incompany trainen."}
            </p>
          </div>
          <div>
            {training.faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              const answerId = `leader-faq-${index}`;
              return (
                <article
                  className={`leader-faq__item${isOpen ? " is-open" : ""}`}
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
                  <div className="leader-faq__answer" id={answerId}>
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

      {training.regionTitle ? (
        <section className="leader-course-region">
          <div className="leader-shell leader-course-region__panel">
            <div>
              <p className="leader-kicker">Incompany in de regio</p>
              <h2>{training.regionTitle}</h2>
            </div>
            <p>{training.regionText}</p>
          </div>
        </section>
      ) : null}

      {training.ctaTitle ? (
        <section className="leader-route-cta">
          <div className="leader-shell leader-route-cta__panel">
            <div>
              <p className="leader-kicker">{training.ctaKicker}</p>
              <h2>{training.ctaTitle}</h2>
              <p>{training.ctaText}</p>
            </div>
            <div className="leader-actions">
              <Link className="leader-button leader-button--light" to="/offerte">
                Offerte aanvragen <ArrowRight />
              </Link>
              <Link className="leader-button leader-button--outline" to="/contact">
                Eerst overleggen
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="leader-cta">
        <div className="leader-shell leader-cta__panel">
          <div>
            <p className="leader-kicker">Investering</p>
            <h2>{priceText}</h2>
            <p>
              {price === null
                ? "De definitieve prijs hangt af van de gekozen leerroute, locatie en groepsgrootte."
                : "Deze prijs geldt voor één cursist. Voor twee of meer deelnemers ontvang je een lagere prijs per persoon via een offerte."}
            </p>
          </div>
          <div className="leader-actions">
            <Link className="leader-button leader-button--light" to="/offerte">
              Offerte aanvragen <ArrowRight />
            </Link>
            <Link
              className="leader-button leader-button--outline"
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
