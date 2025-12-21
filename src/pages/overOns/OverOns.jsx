import './OverOns.css';

function OverOns() {
    return (
        <div className="overons">

            {/* CONTENT */}
            <div className="overons-inner">

                {/* INTRO */}
                <section className="overons-intro">
                    <h1>Over BHV Voorne aan Zee</h1>
                    <p>
                        BHV Voorne aan Zee is gespecialiseerd in het verzorgen van
                        praktijkgerichte BHV- en EHBO-trainingen voor organisaties in
                        Voorne aan Zee, Rotterdam en omliggende regio’s.
                    </p>
                    <p>
                        Wij geloven dat bedrijfshulpverlening pas echt werkt wanneer
                        medewerkers weten wat ze moeten doen én dit met vertrouwen
                        durven uit te voeren. Daarom ligt de focus in onze trainingen
                        op doen, ervaren en handelen.
                    </p>
                </section>

                {/* AANPAK */}
                <section className="overons-section">
                    <h2>Onze aanpak</h2>
                    <p>
                        Iedere organisatie is anders. Daarom stemmen wij onze trainingen
                        af op de risico’s, het gebouw en de dagelijkse werksituatie.
                        Geen standaardprogramma, maar maatwerk dat aansluit bij de praktijk.
                    </p>

                    <ul>
                        <li>Praktijkgerichte trainingen met actieve deelname</li>
                        <li>Kleine groepen met veel persoonlijke aandacht</li>
                        <li>Realistische scenario’s gebaseerd op echte situaties</li>
                        <li>Trainingen afgestemd op jouw organisatie en gebouw</li>
                        <li>Opleidingen volgens de richtlijnen van het NIBHV</li>
                    </ul>
                </section>

                {/* WAAROM */}
                <section className="overons-section overons-highlight">
                    <h2>Waarom BHV Voorne aan Zee?</h2>
                    <ul>
                        <li>Ruime praktijkervaring in BHV, EHBO en ontruimingsoefeningen</li>
                        <li>Duidelijke uitleg, rust en overzicht tijdens trainingen</li>
                        <li>Focus op handelingsvermogen in noodsituaties</li>
                        <li>Trainingen op locatie in de eigen werkomgeving</li>
                        <li>Actief in de regio Voorne aan Zee en Rotterdam</li>
                    </ul>
                </section>

                {/* VISIE */}
                <section className="overons-section">
                    <h2>Onze visie op veiligheid</h2>
                    <p>
                        Veiligheid is meer dan een verplichting of een certificaat.
                        Het gaat om weten wat je moet doen op het moment dat het ertoe doet.
                        Door realistisch te trainen vergroten we het vertrouwen en de
                        effectiviteit van medewerkers in noodsituaties.
                    </p>
                </section>

                {/* DIENSTEN */}
                <section className="overons-section">
                    <h2>Wat wij doen</h2>
                    <p>
                        Wij verzorgen BHV- en EHBO-trainingen voor bedrijven en organisaties,
                        waaronder basistrainingen en herhalingen. Tijdens de trainingen
                        oefenen deelnemers onder andere met reanimatie en het gebruik
                        van een AED, eerste hulp, Stop de Bloeding en het bestrijden van
                        beginnende branden.
                    </p>
                    <p>
                        Daarnaast begeleiden wij ontruimingsoefeningen en trainen wij
                        medewerkers in het veilig en gestructureerd ontruimen van een gebouw.
                        Trainingen vinden voornamelijk plaats op locatie.
                    </p>
                </section>

                {/* DOELGROEP */}
                <section className="overons-section">
                    <h2>Voor wie wij werken</h2>
                    <ul>
                        <li>MKB-bedrijven</li>
                        <li>Zorginstellingen</li>
                        <li>Scholen en kinderopvang</li>
                        <li>Kantoren en bedrijfsverzamelgebouwen</li>
                        <li>Organisaties met verhoogde veiligheidsrisico’s</li>
                    </ul>
                </section>

                {/* REGIO */}
                <section className="overons-section">
                    <h2>Werkgebied</h2>
                    <p>
                        BHV Voorne aan Zee is actief in Voorne aan Zee, Rotterdam en
                        omliggende regio’s. Door trainingen op locatie aan te bieden,
                        sluiten deze direct aan bij de praktijk en bestaande procedures.
                    </p>
                </section>

            </div>

            {/* FULL WIDTH CTA */}
            <section className="overons-cta">
                <div className="overons-cta-inner">
                    <p>
                        Wil je weten wat BHV Voorne aan Zee voor jouw organisatie kan
                        betekenen of heb je vragen over onze trainingen?
                    </p>
                    <a href="/contact" className="cta-button">
                        Neem contact op
                    </a>
                </div>
            </section>

        </div>
    );
}

export default OverOns;
