import React, { useMemo } from "react";
import "./MaatwerkPagina.css";
import { Link } from "react-router-dom";

import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import MaatwerkBlock from "@/features/maatwerk/components/maatwerkblock/MaatwerkBlock.jsx"
import maatwerkBranches from "@/shared/data/maatwerkBranches";

// Header afbeelding
import maatwerkHeader from "@/assets/image/maatwerk/maatwerk-standaard.png";

export default function MaatwerkPagina() {
    // 🔁 Data voorbereiden (zelfde patroon als BhvPage)
    const branches = useMemo(() => maatwerkBranches, []);

    return (
        <>
            {/* 🔶 Header */}
            <HeaderSection
                mainTitle="Maatwerk trainingen"
                backgroundImage={maatwerkHeader}
            />

            <main className="maatwerk-page">

                {/* 📘 Intro */}
                <section className="maatwerk-intro">
                    <h2>Maatwerk trainingen afgestemd op jouw organisatie</h2>
                    <p>
                        Geen enkele organisatie is hetzelfde. Iedere werkomgeving kent zijn eigen risico’s, processen en mensen.
                        Daarom verzorgen wij maatwerk <strong><Link to="/bhv">BHV-trainingen</Link>,
                        <Link to="/ehbo"> EHBO-trainingen</Link> en <Link to="/ontruiming">Ontruimingsoefeningen</Link>
                        </strong>, volledig afgestemd op jouw organisatie, branche en dagelijkse praktijk.
                    </p>
                    <p>
                        Onze maatwerk trainingen sluiten aan op de specifieke risico’s binnen jouw bedrijf, zoals
                        brandgevaar, bedrijfsongevallen, publieksveiligheid of de aanwezigheid van niet-zelfredzame
                        personen. Zo weten medewerkers precies wat zij moeten doen in een noodsituatie op hun eigen
                        locatie en in hun eigen werkomgeving.
                    </p>
                    <p>
                        Of het nu gaat om een kantooromgeving, productiebedrijf, school, zorginstelling, winkel,
                        recreatieomgeving of camping: wij trainen realistisch, praktijkgericht en altijd op locatie.
                        Tijdens de training werken we met herkenbare scenario’s, bestaande procedures en de aanwezige
                        veiligheidsvoorzieningen binnen jouw organisatie.
                    </p>
                    <p>
                        Door deze aanpak zijn onze BHV- en EHBO-trainingen op maat niet alleen effectiever, maar ook
                        beter toepasbaar in de praktijk. Medewerkers krijgen meer vertrouwen, handelen sneller en
                        weten exact hoe zij moeten optreden bij een incident, brand of ontruiming.
                    </p>
                </section>

                {/* 🧩 Brancheblokken */}
                <section className="maatwerk-blocks">
                    {branches.map((branch) => (
                        <MaatwerkBlock
                            key={branch.id}
                            image={branch.image}
                            title={branch.title}
                            items={branch.items}
                            description={branch.description}
                        />
                    ))}
                </section>

                {/* ℹ️ Afsluitende toelichting */}
                <section className="maatwerk-extra-text">
                    <p>
                        Staat jouw branche er <strong>(nog)</strong> niet tussen? Geen probleem.
                        Wij ontwikkelen trainingen altijd op maat. Neem gerust contact met ons op om
                        de mogelijkheden voor jouw organisatie te bespreken.
                    </p>
                    <p>
                        Neem gerust contact met ons op, dan kijken we samen wat
                        voor jouw organisatie nodig is.
                    </p>
                </section>

                {/* 📞 CTA */}
                <section className="maatwerk-cta">
                    <h2>Klaar voor een training op maat?</h2>
                    <p>
                        Wij stellen graag een training samen die past bij jouw organisatie, locatie en risico’s.
                        Op basis van jouw werkomgeving, branche en dagelijkse praktijk ontwikkelen wij een
                        realistische training die direct toepasbaar is in noodsituaties.
                    </p>

                    <div className="maatwerk-cta-buttons">
                        <a href="/offerte" className="btn-primary">
                            Vraag offerte aan
                        </a>
                        <a href="/contact" className="btn-secondary">
                            Neem contact op
                        </a>
                    </div>
                </section>

            </main>
        </>
    );
}
