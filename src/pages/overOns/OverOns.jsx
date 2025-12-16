import './OverOns.css';

function OverOns() {
    return (
        <div className="overons">
            <section className="overons-intro">
                <h1>Over BHV Voorne aan Zee</h1>
                <p>
                    BHV Voorne aan Zee is gespecialiseerd in het verzorgen van
                    praktijkgerichte BHV- en EHBO-trainingen voor organisaties in
                    Voorne aan Zee, Rotterdam en omliggende regio’s. Wij geloven dat
                    bedrijfshulpverlening pas echt werkt wanneer medewerkers weten
                    wat ze moeten doen én dit met vertrouwen durven uit te voeren.
                </p>
                <p>
                    Daarom richten onze trainingen zich niet alleen op kennis, maar
                    vooral op het oefenen van realistische situaties. Geen onnodige
                    theorie, maar doen wat in de praktijk nodig is bij een incident,
                    ongeval of ontruiming.
                </p>
            </section>

            <section className="overons-aanpak">
                <h2>Onze aanpak</h2>
                <p>
                    Iedere organisatie is anders. Daarom stemmen wij onze BHV- en
                    EHBO-trainingen af op de risico’s, het gebouw en de werksituatie
                    binnen jouw organisatie. Of het nu gaat om een kantooromgeving,
                    zorginstelling, school of productieomgeving: wij trainen op een
                    manier die aansluit bij de dagelijkse praktijk.
                </p>

                <ul>
                    <li>Praktijkgerichte trainingen met actieve deelname</li>
                    <li>Kleine groepen met veel persoonlijke aandacht</li>
                    <li>Realistische scenario’s gebaseerd op echte situaties</li>
                    <li>Trainingen afgestemd op de risico’s binnen jouw organisatie</li>
                    <li>Opleidingen volgens de richtlijnen van het NIBHV</li>
                </ul>
            </section>

            <section className="overons-diensten">
                <h2>Wat wij doen</h2>
                <p>
                    Wij verzorgen BHV- en EHBO-trainingen voor bedrijven en organisaties,
                    waaronder basistrainingen en herhalingen. Tijdens de trainingen
                    oefenen deelnemers onder andere met reanimatie en het gebruik van
                    een AED, het verlenen van eerste hulp, Stop de Bloeding en het
                    bestrijden van beginnende branden.
                </p>
                <p>
                    Daarnaast begeleiden wij ontruimingsoefeningen en trainen wij
                    medewerkers in het veilig en gestructureerd ontruimen van een
                    gebouw. Trainingen vinden voornamelijk plaats op locatie, zodat
                    deelnemers oefenen in hun eigen werkomgeving en met herkenbare
                    situaties.
                </p>
            </section>

            <section className="overons-regio">
                <h2>Werkgebied</h2>
                <p>
                    BHV Voorne aan Zee is actief in Voorne aan Zee, Rotterdam en
                    omliggende regio’s. Wij verzorgen trainingen op locatie bij
                    bedrijven en instellingen, waardoor de training direct aansluit
                    bij de praktijk en de geldende veiligheidsprocedures.
                </p>
            </section>

            <section className="overons-cta">
                <p>
                    Wil je weten wat BHV Voorne aan Zee voor jouw organisatie kan
                    betekenen of heb je vragen over onze trainingen?
                </p>
                <a href="/contact" className="cta-button">
                    Neem contact op
                </a>
            </section>
        </div>
    );
}

export default OverOns;
