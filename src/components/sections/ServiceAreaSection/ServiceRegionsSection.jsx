import { Link } from "react-router-dom";

import rotterdamHeader from "@/assets/image/bhvPaginaFotos/bhv-rotterdam-rijnmond-header.png";
import zeelandHeader from "@/assets/image/bhvPaginaFotos/bhv-zeeland-header.png";
import westlandHeader from "@/assets/image/bhvPaginaFotos/bhv-westland-den-haag-header.png";

import "./ServiceRegionsSection.css";

function ServiceRegionsSection() {
    return (
        <section
            className="region-section bhv-regions"
            aria-label="BHV trainingen in Zuid-Holland en Zeeland"
            itemScope
            itemType="https://schema.org/Service"
        >
            <h2 className="region-title">Ook actief in omliggende regio’s</h2>

            <div className="region-grid">
                {/* ROTTERDAM */}
                <Link
                    to="/rotterdam-rijnmond"
                    className="region-link"
                    aria-label="BHV training regio Rotterdam-Rijnmond"
                >
                    <article
                        className="region-card bhv-region"
                        itemProp="areaServed"
                        itemScope
                        itemType="https://schema.org/Place"
                        data-region="Rotterdam-Rijnmond"
                    >
                        <meta itemProp="name" content="Rotterdam-Rijnmond" />

                        <div className="region-image">
                            <img
                                src={rotterdamHeader}
                                alt="Skyline van Rotterdam met Erasmusbrug – BHV training regio Rijnmond"
                                loading="lazy"
                            />
                            <div className="image-overlay" />
                        </div>

                        <div className="region-content">
                            <h3 className="region-heading">
                                BHV training Regio Rotterdam-Rijnmond
                            </h3>
                            <p>
                                Trainingen bij bedrijven in <strong>Spijkenisse</strong>,{" "}
                                <strong>Hoogvliet</strong>, <strong>Maassluis</strong> en{" "}
                                <strong>Vlaardingen</strong>. Goed bereikbaar vanuit Voorne aan Zee.
                            </p>
                        </div>
                    </article>
                </Link>

                {/* ZEELAND */}
                <Link
                    to="/zeeland"
                    className="region-link"
                    aria-label="BHV training regio Zeeland"
                >
                    <article
                        className="region-card bhv-region"
                        itemProp="areaServed"
                        itemScope
                        itemType="https://schema.org/Place"
                        data-region="Zeeland"
                    >
                        <meta itemProp="name" content="Zeeland" />

                        <div className="region-image">
                            <img
                                src={zeelandHeader}
                                alt="Illustratie van Zeeland met molen en kustlijn – BHV training Zeeland"
                                loading="lazy"
                            />
                            <div className="image-overlay" />
                        </div>

                        <div className="region-content">
                            <h3 className="region-heading">
                                BHV training Regio Zeeland (bovenste gedeelte)
                            </h3>
                            <p>
                                Ook actief in het noordelijke deel van <strong>Zeeland</strong>{" "}
                                zoals <strong>Ouddorp</strong>, <strong>Goedereede</strong>,{" "}
                                <strong>Stellendam</strong>, <strong>Dirksland</strong> en{" "}
                                <strong>Middelharnis</strong>.
                            </p>
                        </div>
                    </article>
                </Link>

                {/* WESTLAND / DEN HAAG */}
                <Link
                    to="/den_haag-westland"
                    className="region-link"
                    aria-label="BHV training regio Den Haag en Westland"
                >
                    <article
                        className="region-card bhv-region"
                        itemProp="areaServed"
                        itemScope
                        itemType="https://schema.org/Place"
                        data-region="DenHaag-Westland"
                    >
                        <meta itemProp="name" content="Den Haag en Westland" />

                        <div className="region-image">
                            <img
                                src={westlandHeader}
                                alt="Skyline van Den Haag met kassen uit het Westland – BHV training Den Haag en Westland"
                                loading="lazy"
                            />
                            <div className="image-overlay" />
                        </div>

                        <div className="region-content">
                            <h3 className="region-heading">
                                BHV training Regio Den Haag en Westland
                            </h3>
                            <p>
                                We geven trainingen in het <strong>Westland</strong> –{" "}
                                <strong>Monster</strong>, <strong>Naaldwijk</strong>,{" "}
                                <strong>’s-Gravenzande</strong> – en de{" "}
                                <strong>omgeving van Den Haag</strong>. Binnen 30 minuten
                                bereikbaar vanaf Voorne aan Zee.
                            </p>
                        </div>
                    </article>
                </Link>
            </div>
        </section>
    );
}

export default ServiceRegionsSection;
