import './ServiceArea.css';
import serviceAreaMap from '@/assets/image/regio/werkgebied.png';

function ServiceArea() {
    const areas = [
        "Voorne aan Zee",
        "Rotterdam",
        "Spijkenisse",
        "Hellevoetsluis",
        "Brielle",
        "Schiedam",
    ];

    return (
        <section className="service-area">
            <div className="container">
                <h2 className="service-area__title">Onze Werkgebieden</h2>
                <p className="service-area__intro">
                    Wij verzorgen trainingen en ondersteuning op locatie in de volgende regio’s:
                </p>
                <div className="service-area__content">
                    <ul className="service-area__list">
                        {areas.map((area, index) => (
                            <li key={index} className="service-area__item">
                                {area}
                            </li>
                        ))}
                    </ul>
                    <div className="service-area__map">
                        <img src={serviceAreaMap} alt="Werkgebied kaart" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServiceArea;
