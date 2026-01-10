import "./OverOns.css";
import HeaderSection from "@/components/sections/headerSection/HeaderSection.jsx";
import heroImage from "@/assets/image/headerPicture/overons.png";
import MotionSection from "@/components/sections/motionSection/MotionSection.jsx";
import { Link } from "react-router-dom";

import {
    Shield,
    CheckCircle,
    Eye,
    Users,
    MapPin
} from "lucide-react";

/* ------------------------------------------
   Content data
------------------------------------------ */

const aanpakList = [
    "Praktijkgerichte trainingen met actieve deelname",
    "Kleine groepen met veel persoonlijke aandacht",
    "Realistische scenario’s gebaseerd op echte situaties",
    "Trainingen afgestemd op jouw organisatie en gebouw",
    "Opleidingen volgens de richtlijnen van het NIBHV"
];

const waaromList = [
    "Ruime praktijkervaring in BHV, EHBO en ontruimingsoefeningen",
    "Duidelijke uitleg, rust en overzicht tijdens trainingen",
    "Focus op handelingsvermogen in noodsituaties",
    "Trainingen op locatie in de eigen werkomgeving",
    "Actief in de regio Voorne aan Zee, Rotterdam-Rijnmond en omliggende gemeenten"
];

const doelgroepList = [
    "MKB-bedrijven en zelfstandige ondernemingen",
    "Zorginstellingen, ziekenhuizen en woonzorglocaties",
    "Scholen, kinderopvang en onderwijsinstellingen",
    "Kantoren en bedrijfsverzamelgebouwen",
    "Industrie, productiebedrijven en logistieke organisaties",
    "Bouwbedrijven en technische dienstverleners",
    "Retail, horeca en recreatiebedrijven",
    "Overheidsinstellingen en maatschappelijke organisaties",
    "Organisaties met verhoogde veiligheidsrisico’s"
];

/* ------------------------------------------
   Reusable components
------------------------------------------ */

function List({ items }) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}

/* ------------------------------------------
   Page
------------------------------------------ */

function OverOns() {
    return (
        <div className="overons">

            {/* HERO HEADER */}
            <HeaderSection
                mainTitle="Over BHV Voorne aan Zee"
                subTitle="Meer dan 15 jaar ervaring in praktijkgerichte veiligheidstrainingen"
                image={heroImage}
            />

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
                <MotionSection title="Onze aanpak" icon={Shield}>
                    <p>
                        Iedere organisatie is anders. Daarom stemmen wij onze trainingen
                        af op de risico’s, het gebouw en de dagelijkse werksituatie.
                        Geen standaardprogramma, maar maatwerk dat aansluit bij de praktijk.
                    </p>
                    <List items={aanpakList} />
                </MotionSection>

                {/* WAAROM */}
                <MotionSection title="Waarom BHV Voorne aan Zee?" icon={CheckCircle} highlight>
                    <List items={waaromList} />
                </MotionSection>

                {/* VISIE */}
                <MotionSection title="Onze visie op veiligheid" icon={Eye}>
                    <p>
                        Veiligheid is meer dan een verplichting of een certificaat.
                        Het gaat om weten wat je moet doen op het moment dat het ertoe doet.
                        Door realistisch te trainen vergroten we het vertrouwen en de
                        effectiviteit van medewerkers in noodsituaties.
                    </p>
                </MotionSection>

                {/* DIENSTEN */}
                <MotionSection title="Wat wij doen" icon={Shield}>
                    <p>
                        Wij verzorgen praktijkgerichte BHV-, BHV Ploegleider- en EHBO-trainingen voor bedrijven en
                        organisaties,
                        waaronder basistrainingen en herhalingen. De inhoud stemmen we af op de werkomgeving, risico’s
                        en
                        procedures binnen jouw organisatie.
                    </p>

                    <p>
                        Tijdens de trainingen leren deelnemers hoe zij moeten handelen bij medische noodsituaties, hoe
                        zij een
                        slachtoffer reanimeren en een AED gebruiken, hoe zij eerste hulp verlenen, een ernstige bloeding
                        stoppen
                        en beginnende branden bestrijden. Voor BHV-ploegleiders besteden we daarnaast aandacht aan het
                        coördineren van de BHV-inzet en het aansturen van het team tijdens een incident.
                    </p>

                    <p>
                        Daarnaast begeleiden wij ontruimingsoefeningen en trainen wij medewerkers in het veilig, snel en
                        gestructureerd ontruimen van een gebouw volgens de geldende noodprocedures. Trainingen vinden
                        voornamelijk plaats op locatie, zodat medewerkers oefenen in hun eigen werkomgeving en precies
                        weten
                        wat zij moeten doen in een echte noodsituatie.
                    </p>
                </MotionSection>

                {/* DOELGROEP */}
                <MotionSection title="Voor wie wij werken" icon={Users}>
                    <List items={doelgroepList} />
                </MotionSection>

                {/* REGIO */}
                <MotionSection title="Werkgebied" icon={MapPin}>
                    <p>
                        BHV Voorne aan Zee is actief in de regio{" "}
                        <a href="/regio/voorne-aan-zee">Voorne aan Zee</a>,{" "}
                        <a href="/regio/rotterdam-rijnmond">Rotterdam-Rijnmond</a>{" "}
                        en omliggende gemeenten.
                    </p>

                    <p>
                        Wij verzorgen BHV-, BHV Ploegleider- en EHBO-trainingen en begeleiden
                        ontruimingsoefeningen bij bedrijven en organisaties in onder andere{" "}
                        <Link to="/regio/spijkenisse">Spijkenisse</Link>,{" "}
                        <Link to="/regio/hellevoetsluis">Hellevoetsluis</Link>,{" "}
                        <Link to="/regio/brielle">Brielle</Link>,{" "}
                        <Link to="/regio/rotterdam">Rotterdam</Link>

                        en omliggende regio’s.
                    </p>

                    <p>
                        Door trainingen op locatie aan te bieden, oefenen medewerkers in hun eigen
                        werkomgeving en volgens de geldende procedures. Zo sluiten onze trainingen
                        direct aan op de praktijk en zijn medewerkers optimaal voorbereid op
                        noodsituaties.
                    </p>
                </MotionSection>

            </div>

            {/* CTA */}
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
