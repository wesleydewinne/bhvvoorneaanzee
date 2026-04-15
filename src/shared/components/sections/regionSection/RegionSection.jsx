import "./RegionSection.css";

const regions = [
    "Voorne aan Zee",
    "Rotterdam",
    "Rijnmond",
    "Westland",
    "Den Haag",
    "Zuidwest-Nederland",
];

const features = [
    "Incompany mogelijk",
    "Praktijkgericht maatwerk",
    "Kleine groepen",
    "Snel inzetbaar",
];

function RegionSection() {
    return (
        <section className="region-section">
            <div className="container">
                <div className="region-section__grid">
                    <div className="region-section__content">
                        <span className="region-section__eyebrow">Werkgebied / regio</span>

                        <h2 className="region-section__title">
                            Praktijkgerichte trainingen in Voorne aan Zee en omliggende regio’s
                        </h2>

                        <p className="region-section__text">
                            BHV Voorne aan Zee verzorgt BHV-, EHBO- en
                            ontruimingstrainingen voor organisaties in Voorne aan Zee,
                            Rotterdam, Rijnmond, Westland, Den Haag en breder in
                            Zuidwest-Nederland. Trainingen worden praktisch ingericht,
                            kunnen incompany plaatsvinden en sluiten aan op de situatie van de
                            organisatie.
                        </p>

                        <p className="region-section__text">
                            Door regionaal te werken blijven lijnen kort en is er ruimte voor
                            persoonlijke afstemming, kleine groepen en maatwerk in de
                            uitvoering.
                        </p>
                    </div>

                    <div className="region-section__visual">
                        <div className="region-section__map-card">
                            <div className="region-section__map-bg">
                                <span className="region-badge region-badge--1">Voorne aan Zee</span>
                                <span className="region-badge region-badge--2">Rotterdam</span>
                                <span className="region-badge region-badge--3">Rijnmond</span>
                                <span className="region-badge region-badge--4">Westland</span>
                                <span className="region-badge region-badge--5">Den Haag</span>
                                <span className="region-badge region-badge--6">Zuidwest-Nederland</span>

                                <div className="region-section__center-pin">
                                    <span className="region-section__pin-dot" />
                                    <div className="region-section__pin-card">
                                        <strong>BHV Voorne aan Zee</strong>
                                        <span>Regionaal en flexibel inzetbaar</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="region-section__info-card">
                            <h3 className="region-section__info-title">
                                Wat opdrachtgevers mogen verwachten
                            </h3>

                            <ul className="region-section__feature-list">
                                {features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>

                            <div className="region-section__chips">
                                {regions.map((region) => (
                                    <span className="region-section__chip" key={region}>
                    {region}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegionSection;