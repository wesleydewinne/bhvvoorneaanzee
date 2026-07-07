import { Link } from "react-router-dom";
import "./RegioPage.css";

import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import werkgebiedHeader from "@/assets/image/regio/werkgebied.png?w=1400&format=webp&quality=72";

import {
    Fire,
    MapPin,
    Siren,
    Users,
} from "@phosphor-icons/react";

const localPlaces = [
    "Rozenburg",
    "Spijkenisse",
    "Hoogvliet",
    "Pernis",
    "Vlaardingen",
    "Schiedam",
    "Maassluis",
    "Brielle",
    "Hellevoetsluis",
    "Oostvoorne",
    "Rotterdam",
];

const regionCards = [
    {
        title: "Rotterdam-Rijnmond",
        text: "BHV, EHBO, ploegleider-trainingen en ontruimingsoefeningen in onder andere Rotterdam, Spijkenisse, Hoogvliet, Pernis, Vlaardingen en Schiedam.",
        to: "/rotterdam-rijnmond",
    },
    {
        title: "Voorne aan Zee",
        text: "Praktijkgerichte trainingen voor organisaties in Brielle, Hellevoetsluis, Oostvoorne, Rockanje en omliggende plaatsen.",
        to: "/bhv",
    },
    {
        title: "Den Haag en Westland",
        text: "Incompany veiligheidstrainingen voor bedrijven en teams in Den Haag, Westland en omliggende gemeenten.",
        to: "/den-haag-westland",
    },
    {
        title: "Zeeland",
        text: "Trainingen op locatie in Zeeland, met aandacht voor de specifieke werkomgeving en risico's van de organisatie.",
        to: "/zeeland",
    },
];

export default function RegioOverzichtPage() {
    return (
        <main className="region-page">
            <HeaderSection
                mainTitle="Werkgebied BHV Voorne aan Zee"
                subTitle="BHV, EHBO, ploegleider-trainingen en ontruimingsoefeningen in Voorne aan Zee, Rijnmond en Zuidwest-Nederland"
                image={werkgebiedHeader}
            />

            <section className="region-top-grid">
                <article className="region-intro">
                    <h2>Regionaal inzetbaar voor praktijkgerichte veiligheidstrainingen</h2>

                    <p>
                        <strong>BHV Voorne aan Zee</strong> verzorgt trainingen op locatie
                        voor organisaties in <strong>Voorne aan Zee</strong>,{" "}
                        <strong>Rotterdam-Rijnmond</strong>,{" "}
                        <strong>Den Haag en Westland</strong>,{" "}
                        <strong>Zeeland</strong> en omliggende plaatsen.
                    </p>

                    <p>
                        Door regionaal te werken blijven de lijnen kort. De training wordt
                        afgestemd op de werkvloer, het gebouw, de bezetting en de risico's
                        van jouw organisatie.
                    </p>
                </article>

                <aside className="region-coverage">
                    <h3>
                        <MapPin size={22} className="icon-accent" /> Belangrijke plaatsen
                    </h3>

                    <ul className="coverage-list">
                        {localPlaces.map((place) => (
                            <li key={place}>
                                <strong>{place}</strong>
                            </li>
                        ))}
                    </ul>

                    <p className="coverage-note">
                        Staat jouw plaats er niet tussen? Neem gerust contact op; trainingen
                        zijn vaak ook mogelijk in omliggende gemeenten.
                    </p>
                </aside>
            </section>

            <section className="region-services">
                <h2>Regio's waar wij actief zijn</h2>

                <div className="service-grid">
                    {regionCards.map((region) => (
                        <article className="service-card" key={region.title}>
                            <MapPin size={40} className="service-icon" />
                            <h3>{region.title}</h3>
                            <p>{region.text}</p>
                            <Link to={region.to}>Bekijk deze regio</Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="region-services">
                <h2>Trainingen op locatie</h2>

                <div className="service-grid">
                    <article className="service-card">
                        <Fire size={40} className="service-icon" />
                        <h3>BHV-trainingen</h3>
                        <p>
                            Basis, herhaling en e-learning gecombineerd met praktijktraining
                            op locatie.
                        </p>
                        <Link to="/bhv">Bekijk BHV-trainingen</Link>
                    </article>

                    <article className="service-card">
                        <Users size={40} className="service-icon" />
                        <h3>Ploegleider-trainingen</h3>
                        <p>
                            Voor medewerkers die tijdens incidenten overzicht houden,
                            communiceren en aansturen.
                        </p>
                        <Link to="/ploegleider">Bekijk ploegleider-trainingen</Link>
                    </article>

                    <article className="service-card">
                        <Siren size={40} className="service-icon" />
                        <h3>Ontruimingsoefeningen</h3>
                        <p>
                            Realistische oefeningen afgestemd op gebouw, procedures,
                            bezetting en risico's.
                        </p>
                        <Link to="/ontruimingsoefening">Bekijk ontruimingsoefeningen</Link>
                    </article>
                </div>
            </section>

            <section className="region-cta">
                <h2>Training nodig in jouw regio?</h2>
                <p>
                    Vraag vrijblijvend een offerte aan voor BHV, EHBO,
                    ploegleider-training of een ontruimingsoefening op locatie.
                </p>

                <Link to="/offerte" className="btn-primary">
                    Offerte aanvragen
                </Link>
            </section>
        </main>
    );
}
