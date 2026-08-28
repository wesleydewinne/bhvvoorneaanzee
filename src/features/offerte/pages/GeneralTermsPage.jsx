import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import generalTermsService from "../services/generalTermsService.js";
import "../styles/Offerte.css";

function formatDate(value) {
  if (!value) return null;
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" })
    .format(new Date(`${value}T12:00:00`));
}

function renderSectionContent(section) {
  const content = [];
  let bulletItems = [];

  const flushBulletList = () => {
    if (bulletItems.length === 0) return;
    const listNumber = content.length;
    content.push(
      <ul key={`list-${listNumber}`} className="quote-terms-list">
        {bulletItems.map((item, index) => <li key={`${listNumber}-${index}`}>{item}</li>)}
      </ul>,
    );
    bulletItems = [];
  };

  section.paragraphs.forEach((paragraph, index) => {
    const trimmed = paragraph.trim();
    if (/^[•·]\s*/u.test(trimmed)) {
      bulletItems.push(trimmed.replace(/^[•·]\s*/u, ""));
      return;
    }

    flushBulletList();
    content.push(<p key={`paragraph-${index}`}>{paragraph}</p>);
  });

  if (section.items.length > 0) {
    bulletItems.push(...section.items);
  }
  flushBulletList();
  return content;
}

export default function GeneralTermsPage() {
  const [terms, setTerms] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    generalTermsService.getTerms()
      .then(setTerms)
      .catch(() => setError("De algemene voorwaarden konden niet worden geladen."));
  }, []);

  const effectiveDate = formatDate(terms?.effectiveDate);

  return (
    <main className="quote-public-page">
      <article className="quote-public-card quote-terms-page">
        <header>
          <div className="quote-public-card__icon" aria-hidden="true"><FileText /></div>
          <p className="quote-eyebrow">{terms?.organizationName || "W & S Adviesgroep B.V."}</p>
          <h1>{terms?.title || "Algemene voorwaarden"}</h1>
          <p>{terms?.tradeName ? `Handelend onder de naam ${terms.tradeName}` : "Handelend onder de naam BHV Voorne aan Zee"}</p>
        </header>

        {error && <p className="quote-alert quote-alert--error">{error}</p>}
        {!terms && !error && <p>Algemene voorwaarden laden...</p>}

        {terms?.published ? (
          <>
            <section className="quote-terms-introduction">
              <h2>{terms.subtitle}</h2>
              <p className="quote-terms-version">
                Versie {terms.version}{effectiveDate && ` · Geldig vanaf ${effectiveDate}`}
              </p>
              {terms.introduction.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </section>

            <div className="quote-terms-articles">
              {terms.sections.map((section) => (
                <section key={`${section.number}-${section.title}`} className="quote-terms-article">
                  <h2>{section.number ? `Artikel ${section.number} – ${section.title}` : section.title}</h2>
                  <div className="quote-terms-article__content">
                    {renderSectionContent(section)}
                  </div>
                </section>
              ))}
            </div>
          </>
        ) : terms && (
          <section className="quote-acceptance-section">
            <h2>Document in voorbereiding</h2>
            <p>
              De definitieve algemene voorwaarden worden momenteel voorbereid.
              Zodra de tekst is vastgesteld, wordt op deze pagina altijd de actuele versie gepubliceerd.
            </p>
            <p>Heeft u vragen? Neem dan vóór het geven van akkoord contact met ons op.</p>
          </section>
        )}

        {terms && (
          <section id="download" className="quote-acceptance-section quote-terms-download">
            <Download aria-hidden="true" />
            <div>
              <h2>PDF downloaden</h2>
              <p>
                {terms.downloadAvailable
                  ? `Download de algemene voorwaarden${terms.version ? `, versie ${terms.version}` : ""}.`
                  : "De PDF wordt beschikbaar zodra de definitieve versie is gepubliceerd."}
              </p>
            </div>
            <a
              className="quote-secondary-button"
              href={terms.downloadAvailable ? generalTermsService.getPdfDownloadUrl() : undefined}
              aria-disabled={!terms.downloadAvailable}
              onClick={(event) => {
                if (!terms.downloadAvailable) event.preventDefault();
              }}
            >
              {terms.downloadAvailable ? "PDF downloaden" : "PDF binnenkort beschikbaar"}
            </a>
          </section>
        )}

        <Link className="quote-primary-button" to="/contact">Contact opnemen</Link>
      </article>
    </main>
  );
}
