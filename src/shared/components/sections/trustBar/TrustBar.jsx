import "./TrustBar.css";

const trustItems = [
    {
        title: "Praktijkgericht",
        text: "Trainingen gericht op echte situaties",
    },
    {
        title: "Incompany mogelijk",
        text: "Op locatie of op trainingslocatie",
    },
    {
        title: "Kleine groepen",
        text: "Meer aandacht en duidelijke begeleiding",
    },
    {
        title: "Regionaal inzetbaar",
        text: "Voorne aan Zee en omgeving",
    },
];

function TrustBar() {
    return (
        <section className="trustbar-section" aria-label="Sterke punten">
            <div className="container">
                <div className="trustbar">
                    {trustItems.map((item) => (
                        <article className="trustbar-card" key={item.title}>
                            <h3 className="trustbar-card__title">{item.title}</h3>
                            <p className="trustbar-card__text">{item.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TrustBar;