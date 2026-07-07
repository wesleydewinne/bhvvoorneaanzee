import "./ActionSection.css";

const actionPoints = [
    {
        number: "01",
        label: "Herkennen",
        title: "Risico's en noodsituaties herkennen",
        text: "Deelnemers leren signalen bij brand, letsel, reanimatie en ontruiming herkennen. Daardoor kunnen zij sneller bepalen welke eerste actie nodig is.",
    },
    {
        number: "02",
        label: "Afstemmen",
        title: "Duidelijk communiceren onder druk",
        text: "Een BHV'er moet overzicht houden, alarmeren en afstemmen met collega's, bezoekers en hulpdiensten. Daarom oefenen we communicatie als vast onderdeel van de training.",
    },
    {
        number: "03",
        label: "Handelen",
        title: "Direct en verantwoord optreden",
        text: "Van eerste hulp tot veilig ontruimen: deelnemers oefenen de handelingen die zij in hun eigen organisatie nodig kunnen hebben.",
    },
];

function ActionSection() {
    return (
        <section className="action-section" aria-labelledby="action-section-title">
            <div className="container action-section__inner">
                <div className="action-section__content">
                    <span className="action-section__eyebrow">
                        Veiligheid begint met kunnen handelen
                    </span>

                    <h2 className="action-section__title" id="action-section-title">
                        Herkennen, communiceren en handelen tijdens een noodsituatie
                    </h2>

                    <p className="action-section__text">
                        In een noodsituatie moet duidelijk zijn wie alarmeert, wie eerste hulp
                        verleent, wie begeleidt en wanneer er wordt ontruimd. Onze trainingen
                        maken die stappen concreet en oefenbaar.
                    </p>

                    <p className="action-section__text">
                        Deelnemers bouwen zo niet alleen kennis op, maar ook rust, overzicht en
                        vertrouwen om verantwoord op te treden binnen de eigen werkomgeving.
                    </p>

                    <div className="action-section__summary" aria-label="Praktische trainingsaanpak">
                        <span>Praktijkgericht</span>
                        <span>Rustig oefenen</span>
                        <span>Direct toepasbaar</span>
                    </div>
                </div>

                <div className="action-section__stage" aria-label="Drie stappen in veiligheidstraining">
                    <div className="action-section__orb" aria-hidden="true">
                        <span />
                    </div>

                    <div className="action-section__points">
                        {actionPoints.map((point) => (
                            <article className="action-section__card" key={point.number}>
                                <span className="action-section__number">{point.number}</span>
                                <span className="action-section__label">{point.label}</span>
                                <h3 className="action-section__card-title">{point.title}</h3>
                                <p className="action-section__card-text">{point.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ActionSection;
