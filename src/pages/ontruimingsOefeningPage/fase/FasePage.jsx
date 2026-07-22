import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { phaseData } from "./phaseData";
import "./Fase.css";

const SITE_URL = "https://bhvvoorneaanzee.nl";

export default function FasePage({ phase }) {
  const data = phaseData[phase];

  useEffect(() => {
    const id = "phase-structured-data";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: data.title,
          description: data.lead,
          provider: {
            "@type": "Organization",
            name: "BHV Voorne aan Zee",
            url: SITE_URL,
          },
          areaServed: [
            "Voorne aan Zee",
            "Rotterdam-Rijnmond",
            "Westland",
            "Den Haag",
            "Zeeland",
          ],
          serviceType: data.label,
        },
        {
          "@type": "FAQPage",
          mainEntity: data.faqs.map(([name, text]) => ({
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
              name: "Ontruimingsoefening",
              item: `${SITE_URL}/ontruimingsoefening`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: `Fase ${data.number}: ${data.label}`,
              item: `${SITE_URL}/ontruimingsoefening-fase${data.number}`,
            },
          ],
        },
      ],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [data]);

  return (
    <main className="phase-page">
      <section className="phase-hero">
        <img
          className="phase-hero__image"
          src={data.image}
          alt={`${data.label} bij een organisatie op locatie`}
        />
        <div className="phase-hero__shade" />
        <div className="phase-shell phase-hero__content">
          <nav className="phase-breadcrumb" aria-label="Broodkruimel">
            <Link to="/ontruimingsoefening">Ontruimingsoefening</Link>
            <ChevronRight />
            <span>Fase {data.number}</span>
          </nav>
          <p className="phase-eyebrow">
            <ShieldCheck /> Fase {data.number} · {data.label}
          </p>
          <h1>{data.headline}</h1>
          <p className="phase-hero__lead">{data.lead}</p>
          <div className="phase-actions">
            <Link className="phase-button phase-button--primary" to="/contact">
              Bespreek deze oefening <ArrowRight />
            </Link>
            <Link
              className="phase-button phase-button--ghost"
              to="/ontruimingsoefening#fases"
            >
              <ArrowLeft /> Alle oefenfasen
            </Link>
          </div>
        </div>
      </section>

      <section className="phase-answer">
        <div className="phase-shell phase-answer__panel">
          <span>
            <ClipboardCheck />
          </span>
          <div>
            <p className="phase-kicker">Kort antwoord</p>
            <h2>Wat is fase {data.number}?</h2>
            <p>{data.answer}</p>
          </div>
        </div>
      </section>

      <section className="phase-section">
        <div className="phase-shell phase-two-col">
          <div>
            <p className="phase-kicker">Wanneer past deze fase?</p>
            <h2>{data.title}</h2>
            <p className="phase-copy">
              De oefenvorm wordt altijd afgestemd op het gebouw, de bezetting,
              aanwezige risico’s en de ervaring van de BHV-organisatie.
            </p>
            <ul className="phase-ideal">
              {data.ideal.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <figure className="phase-photo">
            <img
              src={data.image}
              alt={`${data.label}: voorbereiding en uitvoering op de eigen werklocatie`}
            />
            <figcaption>
              <MapPin /> Incompany op de eigen locatie
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="phase-process">
        <div className="phase-shell">
          <div className="phase-heading">
            <div>
              <p className="phase-kicker">Praktische aanpak</p>
              <h2>Zo verloopt fase {data.number}</h2>
            </div>
            <p>
              Van een veilige voorbereiding naar concrete verbeterpunten voor
              jouw BHV-organisatie.
            </p>
          </div>
          <ol>
            {data.steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="phase-result">
        <div className="phase-shell phase-result__panel">
          <div>
            <p className="phase-kicker">Resultaat</p>
            <h2>Wat levert deze oefening op?</h2>
          </div>
          <p>{data.result}</p>
        </div>
      </section>

      <section className="phase-faq">
        <div className="phase-shell phase-two-col">
          <div>
            <p className="phase-kicker">Direct antwoord</p>
            <h2>Veelgestelde vragen over fase {data.number}</h2>
            <p className="phase-copy">
              Deze antwoorden horen specifiek bij {data.label.toLowerCase()}.
            </p>
          </div>
          <div>
            {data.faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  {question}
                  <span>+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <nav className="phase-navigation" aria-label="Vervolgstappen">
        <div className="phase-shell">
          <p className="phase-kicker">Verder met ontruimingsoefenen</p>
          <div className="phase-navigation__grid">
            <Link to="/ontruimingsoefening#fases">
              <ArrowLeft />
              <span>
                <small>Terug naar</small>Overzicht ontruimingsoefeningen
              </span>
            </Link>
            <Link className="phase-navigation__next" to="/contact">
              <span>
                <small>Klaar voor de volgende stap?</small>Bespreek een
                oefenprogramma
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </nav>
    </main>
  );
}
