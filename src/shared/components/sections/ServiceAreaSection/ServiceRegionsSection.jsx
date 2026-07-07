import { Link } from "react-router-dom";

import rotterdamHeader from "@/assets/image/regio/bhv-rotterdam-rijnmond-header.png?w=640&format=webp&quality=70";
import zeelandHeader from "@/assets/image/regio/bhv-zeeland-header.png?w=640&format=webp&quality=70";
import westlandHeader from "@/assets/image/regio/bhv-westland-den-haag-header.png?w=640&format=webp&quality=70";

import "./ServiceRegionsSection.css";

function ServiceRegionsSection() {
    return (
        <section
            className="service-regions bhv-regions"
            aria-label="BHV trainingen in Zuid-Holland en Zeeland"
            itemScope
            itemType="https://schema.org/Service"
        >
            <h2 className="service-regions__title">Ook actief in omliggende regio's</h2>

            <div className="service-regions__grid">
                <Link
                    to="/rotterdam-rijnmond"
                    className="service-regions__link"
                    aria-label="BHV training regio Rotterdam-Rijnmond"
                >
                    <article
                        className="service-regions__card bhv-region"
                        itemProp="areaServed"
                        itemScope
                        itemType="https://schema.org/Place"
                        data-region="Rotterdam-Rijnmond"
                    >
                        <meta itemProp="name" content="Rotterdam-Rijnmond" />

                        <div className="service-regions__image">
                            <img
                                src={rotterdamHeader}
                                alt="Skyline van Rotterdam met Erasmusbrug - BHV training regio Rijnmond"
                                loading="lazy"
                            />
                            <div className="service-regions__image-overlay" />
                        </div>

                        <div className="service-regions__content">
                            <h3 className="service-regions__heading">
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

                <Link
                    to="/zeeland"
                    className="service-regions__link"
                    aria-label="BHV training regio Zeeland"
                >
                    <article
                        className="service-regions__card bhv-region"
                        itemProp="areaServed"
                        itemScope
                        itemType="https://schema.org/Place"
                        data-region="Zeeland"
                    >
                        <meta itemProp="name" content="Zeeland" />

                        <div className="service-regions__image">
                            <img
                                src={zeelandHeader}
                                alt="Illustratie van Zeeland met molen en kustlijn - BHV training Zeeland"
                                loading="lazy"
                            />
                            <div className="service-regions__image-overlay" />
                        </div>

                        <div className="service-regions__content">
                            <h3 className="service-regions__heading">
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

                <Link
                    to="/den-haag-westland"
                    className="service-regions__link"
                    aria-label="BHV training regio Den Haag en Westland"
                >
                    <article
                        className="service-regions__card bhv-region"
                        itemProp="areaServed"
                        itemScope
                        itemType="https://schema.org/Place"
                        data-region="DenHaag-Westland"
                    >
                        <meta itemProp="name" content="Den Haag en Westland" />

                        <div className="service-regions__image">
                            <img
                                src={westlandHeader}
                                alt="Skyline van Den Haag met kassen uit het Westland - BHV training Den Haag en Westland"
                                loading="lazy"
                            />
                            <div className="service-regions__image-overlay" />
                        </div>

                        <div className="service-regions__content">
                            <h3 className="service-regions__heading">
                                BHV training Regio Den Haag en Westland
                            </h3>
                            <p>
                                We geven trainingen in het <strong>Westland</strong> -{" "}
                                <strong>Monster</strong>, <strong>Naaldwijk</strong>,{" "}
                                <strong>'s-Gravenzande</strong> - en de{" "}
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
