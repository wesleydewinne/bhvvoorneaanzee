// 🔶 Afbeeldingen (lokaal, SEO-vriendelijk benoemd)
import fabriek from "@/assets/image/maatwerk/fabriek/maatwerk-fabriek.png";
import kantoor from "@/assets/image/maatwerk/kantoor/maatwerk-kantoor.png";
import scholen from "@/assets/image/maatwerk/scholen/maatwerk-scholen.png";
import winkels from "@/assets/image/maatwerk/winkel/maatwerk-winkels.png";
import zwembaden from "@/assets/image/maatwerk/zwembad/maatwerk-zwembaden.png";
import zorginstellingen from "@/assets/image/maatwerk/zorginstelling/maatwerk-zorginstellingen.png";
import vakantieparken from "@/assets/image/maatwerk/vakantiepark/maatwerk-vakantieparken-en-camping.png";
import autogarage from "@/assets/image/maatwerk/autogarage/maatwerk-autogarage-showroom.png";
import standaard from "@/assets/image/maatwerk/maatwerk-standaard.png";

// 🔹 Centrale branchedefinitie
const maatwerkBranches = [
    {
        id: "industrie",
        title: "Industrie & Productie",
        image: fabriek,
        items: [
            "Brand- en explosierisico’s",
            "Machines en installaties",
            "EHBO bij ernstig letsel",
            "Ontruiming en alarmering",
        ],
        description:
            "BHV-trainingen afgestemd op industriële processen, installaties en verhoogde risico’s.",
    },
    {
        id: "kantoor",
        title: "Kantooromgevingen",
        image: kantoor,
        items: [
            "Ontruiming bij brand",
            "Reanimatie en AED",
            "Rust en communicatie",
            "EHBO bij kleine incidenten",
        ],
        description:
            "Praktische BHV-trainingen voor kantoren, gericht op veiligheid en overzicht.",
    },
    {
        id: "onderwijs",
        title: "Onderwijs & Basisscholen",
        image: scholen,
        items: [
            "Veilig ontruimen met kinderen",
            "Eerste hulp bij letsel",
            "Duidelijke rolverdeling",
            "Rust en communicatie",
        ],
        description:
            "BHV-trainingen afgestemd op onderwijsinstellingen en leerlingveiligheid.",
    },
    {
        id: "detailhandel",
        title: "Winkels & Detailhandel",
        image: winkels,
        items: [
            "Brandveiligheid in publieksruimtes",
            "EHBO bij klanten",
            "Ontruiming tijdens openingstijden",
            "Omgaan met paniek",
        ],
        description:
            "Trainingen gericht op veiligheid van klanten en medewerkers in winkels.",
    },
    {
        id: "zwembaden",
        title: "Zwembaden & Recreatie",
        image: zwembaden,
        items: [
            "Reanimatie en AED",
            "Eerste hulp bij letsel",
            "Ontruiming van bezoekers",
            "Samenwerking BHV-team",
        ],
        description:
            "BHV-trainingen voor recreatieve omgevingen met publiek.",
    },
    {
        id: "zorg",
        title: "Zorginstellingen",
        image: zorginstellingen,
        items: [
            "Omgaan met minder zelfredzame personen",
            "Ontruiming met zorgcontinuïteit",
            "Eerste hulp bij medische incidenten",
            "Communicatie in noodsituaties",
        ],
        description:
            "Maatwerk BHV-trainingen voor zorginstellingen en begeleidingssituaties.",
    },
    {
        id: "camping",
        title: "Campings & Vakantieparken",
        image: vakantieparken,
        items: [
            "Brandveiligheid in caravans en chalets",
            "EHBO voor gasten",
            "Ontruiming open terrein",
            "Samenwerking met hulpdiensten",
        ],
        description:
            "BHV-trainingen afgestemd op recreatieparken en seizoensgebonden drukte.",
    },
    {
        id: "autobedrijf",
        title: "Autobedrijven & Werkplaatsen",
        image: autogarage,
        items: [
            "Brandgevaar door brandstoffen",
            "Ongevallen met gereedschap",
            "EHBO bij snij- en kneusletsel",
            "Veilige evacuatie",
        ],
        description:
            "BHV-trainingen voor garages en werkplaatsen met verhoogde technische risico’s.",
    },
    {
        id: "standaard",
        title: "Overige organisaties",
        image: standaard,
        items: [
            "Eerste hulp",
            "Brandbestrijding",
            "Ontruiming",
            "Alarmering",
        ],
        description:
            "Standaard BHV-trainingen die altijd worden aangepast aan jouw organisatie.",
    },
];

export default maatwerkBranches;
