import './BhvPage.css';
import data from "../../data/training.json";
import TrainingCardSection from '../../components/sections/trainingSection/TrainingCardSection.jsx';
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";
import headerImage from "../../assets/image/react.svg";
import fallback from "../../assets/image/fallbackAfbeelding.png";
import FactorsSection from "../../components/sections/factorsSection/FactorsSection.jsx";

function BhvPage() {
    const bhvCategory = data.categories.find(category => category.id === "bhv");
    console.log("👉 Geselecteerde BHV-categorie:", bhvCategory);

    const bhvTrainings = bhvCategory ? bhvCategory.trainings : [];

    console.log("📋 Gevonden BHV-trainingen:", bhvTrainings);

    const bhvCards = bhvTrainings.map(training => {
        const lawReferenceOne = "https://wetten.overheid.nl/jci1.3:c:BWBR0010346&hoofdstuk=2&artikel=3&z=2025-01-01&g=2025-01-01";
        const lawReferenceTwo = "https://wetten.overheid.nl/jci1.3:c:BWBR0010346&hoofdstuk=3&artikel=15&z=2025-01-01&g=2025-01-01";
        const lawReferenceThree = "https://www.rie.nl/over-rie/een-rie-maken#hoe-kies-je-het-juiste-hulpmiddel?utm_medium=gekopieerde_link&utm_source=rie.nl"

        const [isOpen, setIsOpen] = useState(false);

        const selectedTrainings = training.filter(training =>
            [1, 2].includes(training.id)
        );

        const handleToggle = () => {
            setIsOpen(!isOpen);
        };
        const factor1 = [
            "De aard, grootte en ligging van de organisatie",
            "De in de organisatie aanwezige gevaren (ook gevaren vanuit de omgeving) en de maatgevende brandscenario's",
            "Het terreurdreigingsniveau",
            "Het aantal aanwezige werknemers en anderen (inclusief de tijdstippen waarop zij aanwezig zijn)",
            "Het aantal niet zelfredzame personen",
            "De opkomsttijd van de professionele hulpverleningsdiensten",
            "De aanwezigheid van een infrastructuur op het gebied van arbeidsomstandigheden",
            "Samenwerkingsmogelijkheden met andere organisaties",
            "De aantoonbare aanwezige deskundigheid",
        ];

        // const bhvTasks = [
        //     {
        //         icon: <FirstAidKit size={25} color="#ff8000" weight="bold" />,
        //         task: "Het verlenen van eerste hulp bij ongevallen"
        //     },
        //     {
        //         icon: <FireExtinguisher size={25} color="#ff6f61" weight="regular" />,
        //         task: "Het beperken en bestrijden van brand en het beperken van de gevolgen van ongevallen"
        //     },
        //     {
        //         icon: <Fire size={25} color="#ff8000" weight="bold" />,
        //         task: "Het in noodsituaties alarmeren en evacueren van alle werknemers en andere personen in het bedrijf of de inrichting"
        //     },
        // ];

        // const articleThreeTasks = [
        //     {
        //         icon: <CheckCircle size={20} color="#ff8000" weight="bold" />,
        //         task: "Risico’s inventariseren en evalueren (RI&E) om een plan van aanpak op te stellen waarin de nodige maatregelen worden beschreven.",
        //     },
        //     {
        //         icon: <CheckCircle size={20} color="#ff8000" weight="bold" />,
        //         task: "Werknemers informeren over de risico’s die zij lopen en de preventieve maatregelen die de werkgever heeft getroffen om die risico’s te beperken.",
        //     },
        //     {
        //         icon: <CheckCircle size={20} color="#ff8000" weight="bold" />,
        //         task: "De benodigde organisatie voor bedrijfshulpverlening (BHV) inrichten, zodat er altijd voldoende, goed opgeleide BHV’ers aanwezig zijn om te handelen in geval van nood (bijvoorbeeld bij brand, ongevallen of andere calamiteiten).",
        //     },
        //     {
        //         icon: <CheckCircle size={20} color="#ff8000" weight="bold" />,
        //         task: "Zorg dragen voor een veilige en gezonde werkomgeving door continu risico’s te monitoren en maatregelen aan te passen waar nodig.",
        //     },
        // ]
        // const articleFifteenTasks = [
        //     {
        //         icon: <CheckCircle size={20} color="#ff8000" weight="bold" />,
        //         task: "Bepalen van de benodigde BHV-voorzieningen: De werkgever moet vaststellen hoeveel bedrijfshulpverleners er nodig zijn, afhankelijk van de grootte van de organisatie en de specifieke risico’s. Het aantal BHV’ers moet in verhouding staan tot de risico’s die in de RI&E zijn geïdentificeerd."
        //     },
        //     {
        //         icon: <CheckCircle size={20} color="#ff8000" weight="bold" />,
        //         task: "Opleiding en training: De werkgever is verplicht om ervoor te zorgen dat de bedrijfshulpverleners voldoende training en scholing ontvangen om adequaat te kunnen handelen in noodsituaties. Dit omvat training in eerste hulp, brandbestrijding en evacuatie."
        //     },
        //     {
        //         icon: <CheckCircle size={20} color="#ff8000" weight="bold" />,
        //         task: "Toegankelijkheid van BHV’ers: Er moet te allen tijde een bedrijfshulpverlener beschikbaar zijn. Dit kan door het inplannen van roosters of door ervoor te zorgen dat er een team van BHV’ers aanwezig is tijdens operationele momenten."
        //     },
        //     {
        //         icon: <CheckCircle size={20} color="#ff8000" weight="bold" />,
        //         task: "Evaluatie van de BHV-voorzieningen: De BHV-organisatie moet regelmatig worden geëvalueerd om ervoor te zorgen dat de hulpverlening altijd up-to-date en effectief blijft. Dit omvat oefeningen, het bijhouden van de competenties van BHV’ers en het actualiseren van het BHV-plan."
        //     }
        // ]

        const resolvedImage = training.cardImage?.trim()
            ? training.cardImage
            : (bhvCategory?.image || fallback);

        const individualPrice = training.pricing?.[0]?.individualPrice || null;
        const groupPrice = training.pricing?.[0]?.groupPrice || null;

        const cardData = {
            title: training.title,
            description: `BHV training - ${training.type}`,
            cardImage: resolvedImage,
            cardAlt: training.cardAlt || training.title,
            pricing: {
                individualPrice: individualPrice,
                groupPrice: groupPrice
            },
            showPrice: true,
            buttonTo: `/training/${training.type}`,
            buttonText: 'Meer informatie',
            buttonStyle: 'primary',
            buttonIcon: '📘'
        };

        console.log("🧾 TrainingCard gegenereerd:", cardData);
        return cardData;
    });


    return (
        <>
            <HeaderSection
                mainTitle="Training bedrijfshulpverlening (BHV)"
                backgroundImage={headerImage}
            />

            <p>
                Bedrijfshulpverlening (BHV) is een essentieel onderdeel van de veiligheid op de werkvloer. Het omvat de
                georganiseerde hulp die wordt verleend tijdens noodsituaties, zoals brand, ongevallen of andere
                calamiteiten. Het doel van BHV is om snel en effectief te reageren op incidenten, zodat de gevolgen voor
                medewerkers en de organisatie minimaal blijven. Dit kan variëren van het bieden van eerste hulp bij
                verwondingen tot het evacueren van het personeel bij brand of andere dreigende gevaren.

                In Nederland is BHV wettelijk verplicht voor alle bedrijven. Elke werkgever is verantwoordelijk voor het
                creëren van een veilige werkomgeving en het zorgen voor de aanwezigheid van voldoende getrainde
                bedrijfshulpverleners. Deze BHV&apos;ers moeten opgeleid worden in het verlenen van eerste hulp,
                brandbestrijding en evacuatie, zodat ze in noodsituaties adequaat kunnen handelen. Ze spelen een
                cruciale rol in het beperken van schade en het voorkomen van letsel.

                Een goed opgezette BHV-organisatie zorgt ervoor dat medewerkers zich veilig voelen, wetende dat er snel
                en professioneel gehandeld kan worden als dat nodig is. Het is dan ook niet alleen een wettelijke
                verplichting, maar ook een manier om een cultuur van veiligheid en zorg te bevorderen binnen de
                organisatie.
            </p>

            <FactorsSection
                title="Maatgevende factoren"
                description="Maatgevende factoren zijn bepalend bij de opzet van de bedrijfshulpverlening:"
                factors={factor1}
                imageSrc="/images/brandveiligheid.jpg"
                imageAlt="Brandveiligheid illustratie"
                imagePosition="right"
                className="custom-section"
            />

            <TrainingCardSection
                title="Kies jouw BHV Training"
                cards={bhvCards}
            />
        </>
    );
}

export default BhvPage;
