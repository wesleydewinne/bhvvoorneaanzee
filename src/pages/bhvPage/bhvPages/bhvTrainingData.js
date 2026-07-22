import basisImage from "@/assets/image/trainingen/cardImage/bhv/bhvbasiscursus.webp?w=1400&format=webp&quality=82";
import basisOnlineImage from "@/assets/image/trainingen/cardImage/bhv/bhvbasiscursusmetelearning.webp?w=1400&format=webp&quality=82";
import refresherImage from "@/assets/image/trainingen/cardImage/bhv/bhvherhalingcursus.webp?w=1400&format=webp&quality=82";
import refresherOnlineImage from "@/assets/image/trainingen/cardImage/bhv/bhvherhalingcursusmetelearning.webp?w=1400&format=webp&quality=82";
import rhythmImage from "@/assets/image/homepageFotos/Wesley De Winne instructie brandblusser.webp?w=1400&format=webp&quality=82";

export const bhvTrainingData = {
  basis2: {
    slug: "/bhv-basis-2-daagse",
    label: "BHV Basis · twee praktijkdagen",
    title: "BHV Basis 2-daagse training",
    headline: "Twee dagen oefenen. Handelen zonder twijfel.",
    lead: "Een volledige BHV-basistraining voor nieuwe bedrijfshulpverleners. Deelnemers oefenen brandbestrijding, ontruiming, eerste hulp, reanimatie en AED-gebruik in een praktijkgerichte leerroute.",
    image: basisImage,
    priceEndpoint: "/trainings/BHV_BASIC_2_DAYS/pricing",
    facts: [
      ["Voor wie", "Nieuwe BHV’ers"],
      ["Duur", "2 praktijkdagen"],
      ["Vorm", "Incompany of deelname op afspraak"],
      ["Groep", "Incompany 2–10 deelnemers"],
    ],
    answerTitle: "Wat is een 2-daagse BHV-basistraining?",
    answer:
      "De 2-daagse BHV-basistraining is bedoeld voor medewerkers die nog geen geldig BHV-certificaat hebben. Tijdens twee praktijkgerichte trainingsdagen leren deelnemers stap voor stap hoe zij moeten handelen bij een ongeval, brand of ontruiming.",
    answerParagraphs: [
      "De volledige lesstof wordt tijdens de trainingsdagen behandeld. Deelnemers oefenen onder andere eerste hulp, reanimatie en AED, beginnende brandbestrijding, alarmering en het veilig ontruimen van een gebouw. Daarbij is veel ruimte om handelingen te oefenen, vragen te stellen en realistische praktijksituaties te doorlopen.",
      "Deze leerroute is geschikt voor organisaties die nieuwe BHV’ers uitgebreid en zonder e-learning willen laten opleiden. Na succesvolle afronding ontvangen de deelnemers een erkend NIBHV-certificaat.",
    ],
    learn: [
      "Beginnende brand veilig beoordelen en bestrijden",
      "Een ontruiming alarmeren en begeleiden",
      "Reanimeren en een AED gebruiken",
      "Eerste hulp bij ziektebeelden en letsel",
      "Veilig communiceren en samenwerken tijdens incidenten",
    ],
    modules: [
      {
        title: "Dag 1 · Brand en ontruiming",
        text: "Herkennen van brandrisico’s, kiezen en gebruiken van blusmiddelen, alarmeren, communiceren en een ontruiming gestructureerd begeleiden.",
        items: [
          "Brandklassen en blusmiddelen",
          "Eigen veiligheid en deurprocedure",
          "Alarmering en ontruiming",
        ],
      },
      {
        title: "Dag 2 · Levensreddend handelen",
        text: "Praktisch handelen bij medische noodsituaties, met veel oefentijd voor reanimatie, AED en eerste hulp.",
        items: [
          "Bewustzijn en ademhaling beoordelen",
          "Reanimatie en AED",
          "Ziektebeelden en verwondingen",
        ],
      },
    ],
    resultTitle: "Wat kan de deelnemer na deze training?",
    resultParagraphs: [
      "Na succesvolle afronding kan de deelnemer handelen bij een ongeval, brand of ontruiming. De deelnemer beheerst de basisvaardigheden van eerste hulp, reanimatie en AED, brandbestrijding, alarmering en ontruiming.",
      "Dankzij twee praktijkgerichte trainingsdagen is er voldoende tijd om alle handelingen uitgebreid te leren en te oefenen. Na een voldoende beoordeling ontvangt de deelnemer een erkend NIBHV-certificaat en is hij of zij inzetbaar als BHV’er.",
    ],
    faqs: [
      [
        "Voor wie is de BHV Basis 2-daagse geschikt?",
        "Voor nieuwe BHV’ers en medewerkers van wie kennis en vaardigheden volledig opnieuw moeten worden opgebouwd.",
      ],
      [
        "Kan deze BHV-basiscursus incompany worden gegeven?",
        "Ja. Wij verzorgen de training op locatie, zodat deelnemers oefenen met risico’s en middelen uit hun eigen werkomgeving.",
      ],
      [
        "Hoe groot mag de groep zijn?",
        "Voor een incompany training werken we doorgaans met kleine groepen tot tien deelnemers, zodat iedereen voldoende oefentijd krijgt.",
      ],
      [
        "Welke onderdelen komen aan bod?",
        "Brandbestrijding, ontruiming, alarmering, eerste hulp, reanimatie en het gebruik van een AED.",
      ],
    ],
  },
  basisElearning: {
    slug: "/bhv-basis-e-learning",
    label: "BHV Basis · e-learning en praktijk",
    title: "BHV Basis met e-learning",
    headline: "Theorie in eigen tempo. Praktijk met volle aandacht.",
    lead: "Een blended BHV-basiscursus waarbij deelnemers de theorie online voorbereiden en de essentiële handelingen tijdens één intensieve praktijkdag trainen.",
    image: basisOnlineImage,
    priceEndpoint: "/trainings/BHV_BASIC_ELEARNING_1_DAY/pricing",
    facts: [
      ["Voor wie", "Nieuwe BHV’ers"],
      ["Duur", "E-learning + 1 praktijkdag"],
      ["Vorm", "Blended en incompany"],
      ["Groep", "2–10 deelnemers"],
    ],
    answerTitle: "Wat is een BHV-basiscursus met e-learning?",
    answer:
      "De BHV-basiscursus met e-learning is bedoeld voor medewerkers die nog geen geldig BHV-certificaat hebben en de theorie vooraf online willen volgen. De deelnemer doorloopt de digitale lesstof zelfstandig en volgt daarna één praktijkgerichte trainingsdag.",
    answerParagraphs: [
      "Tijdens de praktijkdag oefent de deelnemer eerste hulp, reanimatie en AED, brandbestrijding, alarmering en het veilig ontruimen van een gebouw. Omdat de theorie vooraf is afgerond, kan de beschikbare trainingstijd volledig worden gebruikt voor praktische handelingen, realistische situaties en persoonlijke feedback van de instructeur.",
      "Deze leerroute behandelt dezelfde BHV-basisvaardigheden als de 2-daagse BHV-basistraining, maar combineert online theorie met één praktijkdag. Na succesvolle afronding van de e-learning en een voldoende beoordeling tijdens de praktijktraining ontvangt de deelnemer een erkend NIBHV-certificaat.",
    ],
    learn: [
      "Online de theoretische BHV-basis opbouwen",
      "Brandblusmiddelen veilig toepassen",
      "Ontruiming en alarmering oefenen",
      "Reanimeren en een AED gebruiken",
      "Eerste hulp praktisch uitvoeren",
    ],
    modules: [
      {
        title: "Vooraf · E-learning",
        text: "Deelnemers doorlopen de theorie zelfstandig en sluiten het online onderdeel af voordat de praktijkdag begint.",
        items: [
          "Brandveiligheid en ontruiming",
          "Levensreddend handelen",
          "Risico’s en alarmering",
        ],
      },
      {
        title: "Praktijkdag · Handelen",
        text: "Onder begeleiding worden de handelingen actief geoefend en beoordeeld in herkenbare noodsituaties.",
        items: [
          "Blussen en ontruimen",
          "Reanimatie en AED",
          "Eerste hulp en communicatie",
        ],
      },
    ],
    resultTitle: "Wat kan de deelnemer na deze training?",
    resultParagraphs: [
      "Na succesvolle afronding kan de deelnemer handelen bij een ongeval, brand of ontruiming. De deelnemer beheerst de basisvaardigheden van eerste hulp, reanimatie en AED, beginnende brandbestrijding, alarmering en het veilig ontruimen van een gebouw.",
      "Doordat de theorie vooraf via e-learning is gevolgd, wordt de praktijkdag vooral gebruikt om handelingen te oefenen, feedback te ontvangen en realistische situaties te doorlopen. Na een voldoende beoordeling ontvangt de deelnemer een erkend NIBHV-certificaat en kan hij of zij binnen de eigen organisatie als BHV’er worden ingezet.",
    ],
    faqs: [
      [
        "Hoe werkt BHV Basis met e-learning?",
        "De theorie wordt vooraf online gevolgd. Daarna oefent de deelnemer de verplichte vaardigheden tijdens een praktijkdag.",
      ],
      [
        "Hoeveel tijd kost de e-learning?",
        "De benodigde tijd verschilt per deelnemer. De online leeromgeving kan in eigen tempo worden doorlopen vóór de praktijktraining.",
      ],
      [
        "Is dit een volledige BHV-basiscursus?",
        "Ja, de combinatie behandelt de theoretische basis en de praktische BHV-vaardigheden. Deelname en beoordeling moeten volledig worden afgerond.",
      ],
      [
        "Kan de praktijkdag op onze locatie?",
        "Ja. De praktijktraining kan incompany worden verzorgd en worden afgestemd op de eigen werkomgeving.",
      ],
    ],
  },
  refresher: {
    slug: "/bhv-herhaling-1-dag",
    label: "BHV Herhaling · volledige praktijkdag",
    title: "BHV Herhaling 1 dag",
    headline: "Vaardigheden opfrissen voordat routine verdwijnt.",
    lead: "Een praktijkgerichte herhalingstraining voor BHV’ers die hun kennis, zekerheid en handelingssnelheid actueel willen houden.",
    image: refresherImage,
    priceEndpoint: "/trainings/BHV_REFRESHER_1_DAY/pricing",
    facts: [
      ["Voor wie", "BHV’ers met een geldig certificaat"],
      ["Duur", "1 trainingsdag"],
      ["Vorm", "Praktijkgericht en incompany"],
      ["Groep", "2–10 deelnemers"],
    ],
    answerTitle: "Wat is een BHV-herhaling van 1 dag?",
    answer:
      "De BHV-herhaling van één dag is bedoeld voor opgeleide BHV’ers die hun kennis en praktische vaardigheden willen opfrissen en onderhouden. Tijdens deze praktijkgerichte trainingsdag worden de belangrijkste onderdelen van bedrijfshulpverlening opnieuw geoefend.",
    answerParagraphs: [
      "Deelnemers oefenen onder andere eerste hulp, reanimatie en het gebruik van een AED, beginnende brandbestrijding, alarmering en het veilig ontruimen van een gebouw. Daarbij werken zij met herkenbare praktijksituaties en realistische scenario’s.",
      "Er is aandacht voor het correct uitvoeren van handelingen, samenwerking binnen de BHV-organisatie en eventuele veranderingen in procedures of risico’s. Na een voldoende beoordeling ontvangt de deelnemer een nieuw erkend NIBHV-certificaat.",
    ],
    learn: [
      "Reanimatie en AED opnieuw automatiseren",
      "Brandbestrijding veilig uitvoeren",
      "Samenwerken tijdens een ontruiming",
      "Actuele eerstehulpvaardigheden toepassen",
      "Communiceren en besluiten onder druk",
    ],
    modules: [
      {
        title: "Blok 1 · Levensreddend handelen",
        text: "Kernvaardigheden worden gecontroleerd, gecorrigeerd en opnieuw ingeslepen.",
        items: [
          "Reanimatie en AED",
          "Bewusteloosheid",
          "Letsel en ziektebeelden",
        ],
      },
      {
        title: "Blok 2 · Brand en ontruiming",
        text: "Deelnemers oefenen met blusmiddelen, alarmering, taakverdeling en ontruiming.",
        items: [
          "Beginnende brand",
          "Vluchtroutes en controle",
          "Scenario en evaluatie",
        ],
      },
    ],
    resultTitle: "Wat kan de deelnemer na deze training?",
    resultParagraphs: [
      "Na afloop zijn de belangrijkste BHV-vaardigheden opnieuw geoefend en beoordeeld. De deelnemer kan handelen bij een ongeval, reanimatie, beginnende brand en ontruiming.",
      "De oefeningen sluiten waar mogelijk aan op de risico’s, procedures en aandachtspunten van de eigen organisatie. Na een voldoende beoordeling ontvangt de deelnemer een nieuw erkend NIBHV-certificaat.",
    ],
    faqs: [
      [
        "Voor wie is een BHV-herhaling bedoeld?",
        "Voor BHV’ers die eerder een basiscursus hebben afgerond en hun kennis en praktische vaardigheden actueel willen houden.",
      ],
      [
        "Hoe vaak moet een BHV’er herhalen?",
        "De werkgever moet zorgen dat de BHV-organisatie doeltreffend blijft. De frequentie wordt afgestemd op risico’s, ervaring en oefenbehoefte.",
      ],
      [
        "Kan de herhaling bedrijfsspecifiek worden gemaakt?",
        "Ja. Bij incompany trainen kunnen scenario’s en aandachtspunten aansluiten op de werkvloer en RI&E.",
      ],
      [
        "Wat als een certificaat lang verlopen is?",
        "Dan beoordelen we welke leerroute passend is. Soms is een volledige basistraining verstandiger dan een verkorte herhaling.",
      ],
    ],
  },
  refresherElearning: {
    slug: "/bhv-herhaling-e-learning",
    label: "BHV Herhaling · e-learning en praktijk",
    title: "BHV Herhaling met e-learning",
    headline: "Online actualiseren. Praktisch bewijzen dat je het kunt.",
    lead: "Een efficiënte herhalingsroute voor ervaren BHV’ers: theorie vooraf online, daarna een compacte praktijktraining gericht op de essentiële handelingen.",
    image: refresherOnlineImage,
    priceEndpoint: "/trainings/BHV_REFRESHER_ELEARNING_HALF_DAY/pricing",
    facts: [
      ["Voor wie", "Ervaren BHV’ers"],
      ["Duur", "E-learning + praktijkdeel"],
      ["Vorm", "Blended en incompany"],
      ["Groep", "2–10 deelnemers"],
    ],
    answerTitle: "Wat is een BHV-herhaling met e-learning?",
    answer:
      "De BHV-herhaling met e-learning is bedoeld voor opgeleide BHV’ers die hun kennis en praktische vaardigheden willen onderhouden. De deelnemer volgt vooraf zelfstandig de actuele BHV-theorie en neemt daarna deel aan een praktijkgerichte training van ongeveer 3,5 uur.",
    answerParagraphs: [
      "Tijdens het praktijkdeel oefenen deelnemers onder andere eerste hulp, reanimatie en AED, beginnende brandbestrijding, alarmering en het veilig ontruimen van een gebouw. Doordat de theorie vooraf online is afgerond, kan de beschikbare trainingstijd volledig worden gebruikt voor praktische handelingen, realistische scenario’s en persoonlijke feedback van de instructeur.",
      "De oefeningen worden waar mogelijk afgestemd op de risico’s, procedures en aandachtspunten binnen de eigen organisatie. Na afronding van de e-learning en een voldoende beoordeling tijdens de praktijktraining ontvangt de deelnemer een nieuw erkend NIBHV-certificaat.",
    ],
    learn: [
      "Theorie flexibel actualiseren",
      "Reanimatie en AED aantoonbaar beheersen",
      "Blusmiddelen veilig gebruiken",
      "Ontruiming en communicatie oefenen",
      "Gericht feedback krijgen op handelen",
    ],
    modules: [
      {
        title: "Vooraf · Online herhalen",
        text: "De theoretische kennis wordt zelfstandig opgefrist en getoetst vóór het praktijkmoment.",
        items: ["Actuele BHV-kennis", "Brand en ontruiming", "Eerste hulp"],
      },
      {
        title: "Praktijk · Vaardigheden toetsen",
        text: "De contacttijd richt zich op uitvoeren, corrigeren en aantoonbaar beheersen van kernhandelingen.",
        items: [
          "Reanimatie en AED",
          "Blusvaardigheden",
          "Scenario en samenwerking",
        ],
      },
    ],
    resultTitle: "Wat kan de deelnemer na deze training?",
    resultParagraphs: [
      "Na afloop zijn de belangrijkste BHV-vaardigheden opnieuw geoefend en beoordeeld. De deelnemer kan doelgericht handelen bij eerste hulp, reanimatie en AED, een beginnende brand en het veilig ontruimen van een gebouw.",
      "Doordat de theorie vooraf via e-learning is afgerond, wordt het praktijkdeel volledig benut voor oefenen, realistische scenario’s en persoonlijke feedback. Na een voldoende beoordeling ontvangt de deelnemer een nieuw erkend NIBHV-certificaat.",
    ],
    faqs: [
      [
        "Voor wie is herhaling met e-learning geschikt?",
        "Voor BHV’ers met basiservaring die zelfstandig online kunnen voorbereiden en tijdens het praktijkdeel hun vaardigheden laten zien.",
      ],
      [
        "Vervangt de e-learning de praktijk?",
        "Nee. BHV bevat praktische vaardigheden die actief moeten worden geoefend en beoordeeld.",
      ],
      [
        "Wanneer moet de e-learning klaar zijn?",
        "Het online onderdeel moet vóór het afgesproken praktijkmoment volledig zijn afgerond.",
      ],
      [
        "Kan dit incompany?",
        "Ja. Het praktijkdeel kan op locatie worden georganiseerd voor een passende groep deelnemers.",
      ],
    ],
  },
  rhythm: {
    slug: "/bhv-ritme",
    label: "BHV Ritme · verspreid door het jaar",
    title: "BHV Ritme",
    headline: "BHV Ritme: doorlopende BHV-training op locatie",
    lead: "BHV Ritme is geen losse training, maar een doorlopend programma waarbij BHV’ers twee of drie keer per jaar praktijkgericht oefenen op hun eigen werklocatie.",
    image: rhythmImage,
    priceEndpoint: null,
    facts: [
      ["Voor wie", "BHV-teams met een geldige basis"],
      ["Ritme", "2 of 3 momenten per jaar"],
      ["Vorm", "Incompany en scenario-gericht"],
      ["Groep", "Maximaal 10 deelnemers"],
    ],
    answerTitle: "Wat is BHV Ritme en hoe werkt het?",
    answer:
      "BHV Ritme is een doorlopend incompany trainingsprogramma waarmee BHV’ers meerdere keren per jaar praktisch oefenen op hun eigen werkplek.",
    answerParagraphs: [
      "De basis bestaat altijd uit een praktijkgerichte BHV-herhaling van ongeveer 3,5 uur. Tijdens deze training worden eerste hulp, reanimatie en AED, brandbestrijding en ontruiming opnieuw geoefend.",
      "Daarna volgt, afhankelijk van de gekozen leerlijn, een realistische scenariotraining met een LOTUS-slachtoffer en/of een ontruimingsoefening op de eigen locatie. Zo oefenen BHV’ers niet alleen losse handelingen, maar ook het samenwerken en handelen tijdens een noodsituatie.",
      "De inhoud wordt afgestemd op het gebouw, de aanwezige risico’s, het ontruimingsplan en de BHV-organisatie. Aandachtspunten uit een training kunnen tijdens een volgend oefenmoment opnieuw worden meegenomen.",
      "Met BHV Ritme blijft BHV niet beperkt tot één verplicht trainingsmoment per jaar, maar wordt veiligheid een terugkerend onderdeel van de organisatie.",
    ],
    why: {
      kicker: "Vaker oefenen, beter handelen",
      title: "Waarom kiezen voor BHV Ritme?",
      paragraphs: [
        "Een jaarlijkse BHV-herhaling is vaak maar één momentopname. Met BHV Ritme komen de BHV’ers meerdere keren per jaar in actie, waardoor kennis, praktische vaardigheden en interne afspraken beter blijven hangen.",
        "De basis is een praktijkgerichte BHV-herhaling van ongeveer 3,5 uur. Afhankelijk van de gekozen leerlijn volgt daarna een scenariotraining met een LOTUS-slachtoffer en/of een ontruimingsoefening op de eigen werkplek. Zo wordt niet alleen geoefend wat een BHV’er moet doen, maar vooral hoe het team tijdens een echte noodsituatie samen handelt.",
        "Ieder volgend oefenmoment bouwt voort op eerdere observaties. Verbeterpunten worden opnieuw bekeken, procedures worden aangescherpt en de samenwerking binnen de BHV-organisatie wordt steeds sterker.",
        "Het resultaat: BHV’ers die niet alleen een certificaat hebben, maar daadwerkelijk voorbereid zijn om binnen hun eigen organisatie te handelen.",
      ],
    },
    learn: [
      "BHV-kennis wordt gedurende het hele jaar onderhouden",
      "Deelnemers oefenen regelmatig met praktische noodsituaties",
      "Trainingen sluiten aan op het gebouw en de bedrijfsrisico’s",
      "Aandachtspunten uit eerdere trainingen komen opnieuw terug",
      "Nieuwe medewerkers kunnen makkelijker worden meegenomen",
      "De BHV-organisatie blijft actief en beter voorbereid",
    ],
    modules: [
      {
        title: "Ritme 2 · Twee trainingsmomenten",
        text: "Bij BHV Ritme 2 worden de BHV-trainingen verdeeld over twee momenten in het jaar. Zo onderhouden deelnemers hun basisvaardigheden én oefenen zij aanvullend met een praktijksituatie die past bij de eigen organisatie.",
        items: [
          "Moment 1: BHV-herhaling van circa 3,5 uur",
          "Moment 2: keuze uit een LOTUS-scenariotraining of ontruimingsoefening",
          "Afgestemd op: het gebouw, de risico’s en de BHV-organisatie",
          "Geschikt voor: organisaties die twee keer per jaar praktijkgericht willen oefenen",
        ],
      },
      {
        title: "Ritme 3 · Drie trainingsmomenten",
        text: "Bij BHV Ritme 3 worden drie verschillende praktijkmomenten over het jaar verdeeld. Hierdoor oefenen BHV’ers zowel hun basisvaardigheden als het handelen tijdens een realistisch incident en een ontruiming.",
        items: [
          "Moment 1: BHV-herhaling van circa 3,5 uur",
          "Moment 2: scenariotraining met een LOTUS-slachtoffer",
          "Moment 3: ontruimingsoefening op de eigen werklocatie",
          "Geschikt voor: organisaties die BHV structureel en volledig willen onderhouden",
        ],
      },
    ],
    steps: [
      [
        "01",
        "Inventarisatie van de organisatie",
        "We bespreken de werkzaamheden, aanwezige risico’s, BHV-bezetting, locaties en leerdoelen van de organisatie.",
      ],
      [
        "02",
        "Jaarplanning samenstellen",
        "We verdelen de relevante BHV-onderwerpen over twee of drie trainingsmomenten gedurende het jaar.",
      ],
      [
        "03",
        "Praktijkgericht trainen",
        "De BHV’ers oefenen op locatie met eerste hulp, reanimatie, brand, ontruiming, communicatie en realistische noodscenario’s.",
      ],
      [
        "04",
        "Evalueren en bijsturen",
        "Na ieder trainingsmoment bespreken we de bevindingen en bepalen we welke onderwerpen extra aandacht nodig hebben.",
      ],
    ],
    audience: {
      title: "Voor welke organisaties is BHV Ritme geschikt?",
      paragraphs: [
        "BHV Ritme is bedoeld voor organisaties met opgeleide BHV’ers die hun kennis en praktische vaardigheden vaker dan één keer per jaar willen onderhouden.",
        "De leerroute is onder andere geschikt voor scholen, zorginstellingen, kantoren, productiebedrijven, logistieke organisaties, winkels, horeca en organisaties met meerdere vestigingen.",
        "De inhoud wordt afgestemd op het gebouw, de aanwezige risico’s, de bezetting, het ontruimingsplan en de leerdoelen van de BHV-organisatie.",
      ],
      note: "BHV Ritme is geen basiscursus, maar een doorlopende leerlijn voor reeds opgeleide BHV’ers.",
    },
    region: {
      title: "BHV Ritme als incompany training in jouw regio",
      paragraphs: [
        "BHV Voorne aan Zee verzorgt BHV Ritme op de eigen locatie van de organisatie. Vanuit Voorne aan Zee werken wij onder andere in Brielle, Hellevoetsluis, Rockanje, Oostvoorne, Rozenburg, Spijkenisse, Nissewaard, Hoogvliet, Rotterdam, de Botlek, Vlaardingen, Maassluis, Schiedam, Barendrecht, Rhoon, de Hoeksche Waard, het Westland en delen van Zeeland.",
        "Door op de eigen werkplek te trainen, kunnen het gebouw, de vluchtroutes, aanwezige noodmiddelen, interne procedures en bedrijfsspecifieke risico’s direct bij de oefeningen worden betrokken.",
        "Staat jouw locatie er niet tussen? Neem contact op om de mogelijkheden te bespreken.",
      ],
    },
    resultParagraphs: [
      "Met BHV Ritme oefenen BHV’ers niet één keer, maar op meerdere momenten verspreid over het jaar. Daardoor blijven eerste hulp, brandbestrijding, ontruiming en samenwerking beter paraat.",
      "Elk trainingsmoment bouwt voort op eerdere observaties. Verbeterpunten blijven daardoor niet alleen in een verslag staan, maar worden tijdens een volgend moment opnieuw besproken en geoefend.",
      "Het resultaat is een BHV-organisatie die sneller, zekerder en beter afgestemd handelt binnen de eigen werkomgeving.",
    ],
    faqs: [
      [
        "Wat is BHV Ritme?",
        "BHV Ritme is een doorlopend BHV-trainingsprogramma waarbij BHV’ers twee of drie keer per jaar een kortere praktijktraining volgen. De onderwerpen worden verspreid over het jaar, zodat kennis en vaardigheden regelmatig worden onderhouden.",
      ],
      [
        "Is BHV Ritme een BHV-basiscursus?",
        "Nee. BHV Ritme is bedoeld voor medewerkers die al een BHV-basiscursus hebben afgerond. De leerlijn onderhoudt en verdiept hun bestaande kennis en praktische vaardigheden.",
      ],
      [
        "Wat is het verschil tussen BHV Ritme 2 en BHV Ritme 3?",
        "BHV Ritme 2 bestaat uit een BHV-herhaling en één extra praktijkmoment naar keuze: een LOTUS-scenariotraining of een ontruimingsoefening. Bij BHV Ritme 3 worden alle drie de onderdelen gedurende het jaar uitgevoerd.",
      ],
      [
        "Wat houdt de BHV-herhaling van 3,5 uur in?",
        "Tijdens de BHV-herhaling worden de belangrijkste onderdelen van eerste hulp, reanimatie en AED, brandbestrijding en ontruiming praktijkgericht opgefrist.",
      ],
      [
        "Kunnen we zelf kiezen wat we tijdens het tweede moment oefenen?",
        "Ja. Bij BHV Ritme 2 kiest de organisatie tussen een realistische scenariotraining met een LOTUS-slachtoffer en een ontruimingsoefening op de eigen locatie.",
      ],
      [
        "Worden de oefeningen aangepast aan onze organisatie?",
        "Ja. De inhoud wordt afgestemd op het gebouw, de aanwezige risico’s, de werkzaamheden, het ontruimingsplan en de inrichting van de BHV-organisatie.",
      ],
      [
        "Wordt BHV Ritme op onze eigen locatie gegeven?",
        "Ja. BHV Ritme wordt als incompany training op de eigen werklocatie verzorgd. Daardoor kunnen het gebouw, de vluchtroutes, noodmiddelen en interne procedures bij de oefeningen worden betrokken.",
      ],
      [
        "Is BHV Ritme geschikt voor meerdere vestigingen?",
        "Ja. Voor organisaties met meerdere locaties kan per vestiging een passend programma worden samengesteld. De trainingsonderwerpen en scenario’s kunnen daarbij per locatie verschillen.",
      ],
    ],
  },
};
