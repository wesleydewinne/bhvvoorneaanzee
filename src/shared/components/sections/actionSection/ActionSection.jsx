import "./ActionSection.css";

const actionPoints = [
    {
        number: "01",
        title: "Herkennen van risico’s",
        text: "Medewerkers leren signalen sneller herkennen en begrijpen wat er in een noodsituatie van hen verwacht wordt.",
    },
    {
        number: "02",
        title: "Duidelijk communiceren",
        text: "Goede communicatie maakt het verschil. Daarom trainen we ook op alarmeren, afstemmen en overzicht houden.",
    },
    {
        number: "03",
        title: "Direct kunnen handelen",
        text: "Van eerste hulp tot ontruimen: deelnemers oefenen praktisch zodat zij in echte situaties sneller en zekerder kunnen optreden.",
    },
];

function ActionSection() {
    return (
        <section className="action-section">
            <div className="container action-section__inner">
                <div className="action-section__content">
          <span className="action-section__eyebrow">
            Veiligheid begint met kunnen handelen
          </span>

                    <h2 className="action-section__title">
                        Een incident vraagt geen lange uitleg, maar direct en verantwoord
                        optreden
                    </h2>

                    <p className="action-section__text">
                        In een noodsituatie is er geen tijd om eerst rustig na te denken
                        over theorie. Daarom richten onze trainingen zich niet alleen op
                        kennis, maar vooral op herkennen, communiceren en doen. Praktisch,
                        duidelijk en afgestemd op de situatie waarin medewerkers echt
                        terecht kunnen komen.
                    </p>

                    <p className="action-section__text">
                        Zo bouwen deelnemers niet alleen kennis op, maar ook vertrouwen en
                        overzicht. En juist dat maakt het verschil op het moment dat snel
                        handelen nodig is.
                    </p>
                </div>

                <div className="action-section__points">
                    {actionPoints.map((point) => (
                        <article className="action-section__card" key={point.number}>
                            <span className="action-section__number">{point.number}</span>
                            <h3 className="action-section__card-title">{point.title}</h3>
                            <p className="action-section__card-text">{point.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ActionSection;