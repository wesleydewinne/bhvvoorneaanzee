import "./TrustBar.css";

const trustItems = [
    {
        title: "Praktijkgericht",
        text: "Oefenen met herkenbare noodsituaties",
    },
    {
        title: "Incompany op locatie",
        text: "Training bij jullie organisatie",
    },
    {
        title: "Kleine groepen",
        text: "Ruimte voor vragen en begeleiding",
    },
    {
        title: "Regionaal inzetbaar",
        text: "Voorne aan Zee, Rijnmond en Westland",
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
