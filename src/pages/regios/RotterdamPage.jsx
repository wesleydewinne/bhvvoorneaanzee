import { Link } from "react-router-dom";
import "./RegioPage.css";

import HeaderSection from "@/components/sections/headerSection/HeaderSection.jsx";
import ServiceRegionsSection from "@/components/sections/ServiceAreaSection/ServiceRegionsSection.jsx";
import rotterdamHeader from "@/assets/image/bhvPaginaFotos/bhv-rotterdam-rijnmond-header.png";

import {
    Fire,
    Users,
    Siren,
    MapPin,
} from "@phosphor-icons/react";

export default function RotterdamPage() {
    return (
        <main className="region-page">

            {/* HEADER */}
            <HeaderSection
                mainTitle="BHV-trainingen in regio Rotterdam-Rijnmond"
                subTitle="Incompany BHV, ploegleider-trainingen en ontruimingsoefeningen op locatie"
                image={rotterdamHeader}
            />

            {/* INTRO + WERKGEBIED */}
            <section className="region-top-grid">
                <article className="region-intro">
                    <h2>Trainingen voor bedrijfsveiligheid in Rotterdam-Rijnmond</h2>

                    <p>
                        <strong>BHV Voorne aan Zee</strong> verzorgt
                        <strong> incompany BHV-trainingen</strong>,
                        <strong> BHV ploegleider-trainingen</strong> en
                        <strong> ontruimingsoefeningen</strong> bij organisaties
                        in de <strong>regio Rotterdam-Rijnmond</strong>.
                    </p>

                    <p>
                        Alle trainingen worden verzorgd <strong>op locatie</strong> en
                        afgestemd op jouw <strong>organisatie, werkvloer en risico’s</strong>.
                        Hierdoor trainen medewerkers in hun eigen omgeving, wat zorgt voor
                        een <strong>realistische en effectieve leerervaring</strong>.
                    </p>
                </article>

                <aside className="region-coverage">
                    <h3>
                        <MapPin size={22} className="icon-accent" /> Werkgebied Rotterdam-Rijnmond
                    </h3>

                    <ul className="coverage-list">
                        <li><strong>Rotterdam</strong></li>
                        <li><strong>Barendrecht</strong></li>
                        <li><strong>Rhoon</strong></li>
                        <li><strong>Spijkenisse</strong></li>
                        <li><strong>Hoogvliet</strong></li>
                        <li><strong>Vlaardingen</strong></li>
                        <li><strong>Maassluis</strong></li>
                    </ul>

                    <p className="coverage-note">
                        Alle trainingen worden verzorgd <strong>op locatie</strong> binnen
                        deze regio.
                    </p>
                </aside>
            </section>

            {/* DIENSTEN */}
            <section className="region-services">
                <h2>Trainingen die wij verzorgen in deze regio</h2>

                <div className="service-grid">
                    <article className="service-card">
                        <Fire size={40} className="service-icon" />
                        <h3>BHV-training</h3>
                        <p>
                            Basis- en herhalingstrainingen voor BHV’ers,
                            volledig praktijkgericht en incompany.
                        </p>
                        <Link to="/bhv">Bekijk BHV-trainingen</Link>
                    </article>

                    <article className="service-card">
                        <Users size={40} className="service-icon" />
                        <h3>BHV Ploegleider</h3>
                        <p>
                            Training voor medewerkers met een coördinerende rol
                            tijdens incidenten en ontruimingen.
                        </p>
                        <Link to="/ploegleider">Bekijk ploegleider training</Link>
                    </article>

                    <article className="service-card">
                        <Siren size={40} className="service-icon" />
                        <h3>Ontruimingsoefeningen</h3>
                        <p>
                            Realistische ontruimingsoefeningen afgestemd op
                            gebouw, bezetting en risico’s.
                        </p>
                        <Link to="/ontruimingsoefening">Bekijk ontruimingsoefeningen</Link>
                    </article>
                </div>
            </section>

            {/* ANDERE REGIO’S */}
            <ServiceRegionsSection />

            {/* CTA */}
            <section className="region-cta">
                <h2>BHV-trainingen op locatie in Rotterdam-Rijnmond?</h2>
                <p>Vraag vrijblijvend een offerte aan voor jouw organisatie.</p>

                <Link to="/offerte" className="btn-primary">
                    Offerte aanvragen
                </Link>
            </section>

        </main>
    );
}
