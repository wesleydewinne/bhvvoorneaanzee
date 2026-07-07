import "./RegionSection.css";

const regions = [
    {
        name: "Voorne aan Zee",
        href: "/bhv",
        badgeClass: "region-badge--1",
    },
    {
        name: "Rotterdam",
        href: "/rotterdam-rijnmond",
        badgeClass: "region-badge--2",
    },
    {
        name: "Rijnmond",
        href: "/rotterdam-rijnmond",
        badgeClass: "region-badge--3",
    },
    {
        name: "Westland",
        href: "/den-haag-westland",
        badgeClass: "region-badge--4",
    },
    {
        name: "Den Haag",
        href: "/den-haag-westland",
        badgeClass: "region-badge--5",
    },
    {
        name: "Zuidwest-Nederland",
        href: "/zeeland",
        badgeClass: "region-badge--6",
    },
];

const features = [
    {
        label: "Incompany mogelijk",
        href: "/maatwerk",
    },
    {
        label: "Praktijkgericht maatwerk",
        href: "/maatwerk",
    },
    {
        label: "Kleine groepen",
        href: "/maatwerk",
    },
    {
        label: "Snel inzetbaar",
        href: "/contact",
    },
];

const servicePlaces = [
    { name: "Rozenburg", href: "/regio" },
    { name: "Brielle", href: "/regio" },
    { name: "Hellevoetsluis", href: "/regio" },
    { name: "Oostvoorne", href: "/regio" },
    { name: "Spijkenisse", href: "/rotterdam-rijnmond" },
    { name: "Hoogvliet", href: "/rotterdam-rijnmond" },
    { name: "Pernis", href: "/rotterdam-rijnmond" },
    { name: "Vlaardingen", href: "/rotterdam-rijnmond" },
    { name: "Schiedam", href: "/rotterdam-rijnmond" },
    { name: "Maassluis", href: "/den-haag-westland" },
    { name: "Rotterdam", href: "/rotterdam-rijnmond" },
    { name: "Westland", href: "/den-haag-westland" },
];

function AbbrTooltip({ abbr, meaning }) {
    return (
        <abbr
            className="abbr-tooltip"
            title={meaning}
            data-tooltip={meaning}
        >
            {abbr}
        </abbr>
    );
}

function RegionSection() {
    return (
        <section
            className="region-section"
            aria-labelledby="region-section-title"
        >
            <div className="container">
                <div className="region-section__grid">
                    <article className="region-section__content">
                        <header className="region-section__header">
                            <span className="region-section__eyebrow">
                                Werkgebied / regio
                            </span>

                            <h2
                                className="region-section__title"
                                id="region-section-title"
                            >
                                Werkgebied voor BHV, EHBO en ontruimingstrainingen
                            </h2>
                        </header>

                        <p className="region-section__text">
                            <b><em>BHV Voorne aan Zee</em></b> verzorgt incompany{" "}
                            <a href="/bhv" className="region-section__link">
                                <AbbrTooltip
                                    abbr="BHV"
                                    meaning="Bedrijfshulpverlening"
                                />
                                -trainingen
                            </a>
                            ,{" "}
                            <a href="/ehbo" className="region-section__link">
                                <AbbrTooltip
                                    abbr="EHBO"
                                    meaning="Eerste Hulp Bij Ongelukken"
                                />
                                -cursussen
                            </a>{" "}
                            en{" "}
                            <a
                                href="/ontruimingsoefening"
                                className="region-section__link"
                            >
                                ontruimingstrainingen
                            </a>{" "}
                            voor bedrijven, scholen, zorginstellingen, winkels en andere
                            organisaties in onder andere{" "}
                            <a
                                href="/bhv"
                                className="region-section__link"
                            >
                                Voorne aan Zee
                            </a>
                            ,{" "}
                            <a
                                href="/rotterdam-rijnmond"
                                className="region-section__link"
                            >
                                Rotterdam-Rijnmond
                            </a>
                            ,{" "}
                            <a
                                href="/den-haag-westland"
                                className="region-section__link"
                            >
                                Westland
                            </a>
                            {" "}en{" "}
                            <a
                                href="/den-haag-westland"
                                className="region-section__link"
                            >
                                Den Haag
                            </a>
                            . De lessen worden afgestemd op de locatie, het team en de
                            aanwezige risico's.
                        </p>

                        <section
                            className="region-section__places"
                            aria-labelledby="region-places-title"
                        >
                            <h3
                                className="region-section__places-title"
                                id="region-places-title"
                            >
                                Plaatsen waar wij trainingen verzorgen
                            </h3>

                            <ul className="region-section__place-list">
                                {servicePlaces.map((place) => (
                                    <li key={place.name}>
                                        <a href={place.href}>
                                            {place.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <p className="region-section__text">
                            Door regionaal te werken blijven lijnen kort en is er ruimte voor{" "}
                            <a href="/contact" className="region-section__link">
                                persoonlijke afstemming
                            </a>
                            , gezamenlijke planning en{" "}
                            <a href="/maatwerk" className="region-section__link">
                                maatwerk per organisatie
                            </a>
                            .
                        </p>

                        <div className="region-section__actions">
                            <a
                                href="/regio"
                                className="region-section__button region-section__button--primary"
                            >
                                Bekijk het volledige werkgebied
                            </a>
                            <a
                                href="/offerte"
                                className="region-section__button region-section__button--secondary"
                            >
                                Offerte aanvragen
                            </a>
                        </div>

                    </article>

                    <aside
                        className="region-section__visual"
                        aria-labelledby="region-info-title"
                    >
                        <nav
                            className="region-section__map-card"
                            aria-label="Werkgebieden"
                        >
                            <ul className="region-section__map-bg">
                                {regions.map((region) => (
                                    <li
                                        className={`region-badge ${region.badgeClass}`}
                                        key={region.name}
                                    >
                                        <a href={region.href}>
                                            {region.name}
                                        </a>
                                    </li>
                                ))}

                                <li className="region-section__center-pin">
                                    <span
                                        className="region-section__pin-dot"
                                        aria-hidden="true"
                                    />

                                    <article className="region-section__pin-card">
                                        <strong>BHV Voorne aan Zee</strong>
                                        <span>Regionaal en flexibel inzetbaar</span>
                                    </article>
                                </li>
                            </ul>
                        </nav>

                        <section
                            className="region-section__info-card"
                            aria-labelledby="region-info-title"
                        >
                            <h3
                                className="region-section__info-title"
                                id="region-info-title"
                            >
                                Wat opdrachtgevers mogen verwachten
                            </h3>

                            <ul className="region-section__feature-list">
                                {features.map((feature) => (
                                    <li key={feature.label}>
                                        <a href={feature.href}>
                                            {feature.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <nav
                                className="region-section__chips"
                                aria-label="Regiopagina's"
                            >
                                {regions.map((region) => (
                                    <a
                                        className="region-section__chip"
                                        href={region.href}
                                        key={region.name}
                                    >
                                        {region.name}
                                    </a>
                                ))}
                            </nav>

                            <nav
                                className="region-section__chips region-section__chips--places"
                                aria-label="Plaatsen waar trainingen mogelijk zijn"
                            >
                                {servicePlaces.slice(0, 10).map((place) => (
                                    <a
                                        className="region-section__chip"
                                        href={place.href}
                                        key={place.name}
                                    >
                                        {place.name}
                                    </a>
                                ))}
                            </nav>
                        </section>
                    </aside>
                </div>
            </div>
        </section>
    );
}

export default RegionSection;
