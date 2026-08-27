import fireImage from "@/assets/image/homepageFotos/Wesley De Winne instructie brandblusser.webp?w=1400&format=webp&quality=82";
import babyImage from "@/assets/image/homepageFotos/Wesley De Winne Reanimatie instructie Baby reanimatie.webp?w=1400&format=webp&quality=82";
import reanimationImage from "@/assets/image/homepageFotos/Wesley De Winne instructie Reanimatie buiten.webp?w=1400&format=webp&quality=82";
import bleedingImage from "@/assets/image/homepageFotos/Wesley De Winne Instructie TQ.webp?w=1400&format=webp&quality=82";
import generalImage from "@/assets/image/trainingen/cardImage/workshop.webp?w=1400&format=webp&quality=82";

const commonRegion = {
  title: "Praktisch trainen op jouw locatie",
  paragraphs: [
    "We verzorgen de workshop incompany en stemmen voorbeelden, materialen en scenario’s af op de werkomgeving.",
    "Zo oefenen deelnemers precies wat zij in een echte situatie nodig hebben.",
  ],
};

const workshop = (data) => ({
  label: "Praktijkworkshop · incompany",
  region: commonRegion,
  ...data,
});

export const workshopData = {
  // Brandveiligheid
  kleineBlusmiddelen: workshop({
    slug: "/workshops-kleine-blusmiddelen",
    title: "Workshop Kleine Blusmiddelen",
    headline: "Een beginnende brand. Weet wanneer je blust — en wanneer niet.",
    lead: "Een praktijkgerichte workshop over veilig optreden bij een beginnende brand en het verantwoord gebruiken van kleine blusmiddelen.",
    image: fireImage,
    facts: [
      ["Voor wie", "BHV’ers en medewerkers"],
      ["Duur", "3 uur"],
      ["Vorm", "Theorie en praktijk"],
      ["Locatie", "Incompany"],
    ],
    answer: "Deelnemers leren een beginnende brand beoordelen, het juiste blusmiddel kiezen en hun eigen veiligheid bewaken. Niet iedere brand moet worden bestreden: veilig alarmeren en ontruimen blijft altijd de eerste afweging.",
    learn: [
      "Brandrisico’s en brandklassen herkennen",
      "Een schuim- of CO₂-blusser veilig gebruiken",
      "Een blusdeken correct inzetten",
      "De grenzen van een veilige inzet herkennen",
      "Juist handelen bij lithium-ion accubranden",
    ],
    modules: [
      {
        title: "Brand en risico",
        text: "Herkennen wat er brandt en hoe snel een situatie kan escaleren.",
        items: [
          "Rook, hitte en giftige gassen",
          "Brandklassen",
          "Eigen veiligheid",
        ],
      },
      {
        title: "Kiezen en handelen",
        text: "Het geschikte middel selecteren en veilig benaderen.",
        items: [
          "Schuim, CO₂ en blusdeken",
          "Veilige afstand",
          "Stopmoment bepalen",
        ],
      },
      {
        title: "Praktijkoefeningen",
        text: "Iedere deelnemer voert de handelingen zelf uit.",
        items: [
          "Blusser activeren",
          "Vloeistofbrand bestrijden",
          "Vlam in de pan",
        ],
      },
      {
        title: "Lithium-ion",
        text: "Een realistische kijk op accubranden en herontsteking.",
        items: [
          "Thermal runaway",
          "Koelen en isoleren",
          "Alarmeren en nazorg",
        ],
      },
    ],
    result: "Deelnemers kunnen een beginnende brand beter inschatten, kiezen bewust een geschikt blusmiddel en weten wanneer ontruimen veiliger is dan zelf optreden.",
    audience: {
      title: "Voor organisaties die veilig willen laten oefenen",
      text: "Geschikt voor BHV’ers én medewerkers zonder BHV-rol. Voor buitenoefeningen is een geschikte plek op eigen terrein nodig.",
    },
    faqs: [
      ["Moet ik BHV’er zijn?", "Nee. De workshop is geschikt voor BHV’ers en andere medewerkers."],
      ["Oefenen deelnemers zelf?", "Ja, de nadruk ligt op veilig en actief oefenen met blusmiddelen."],
      ["Kan de inhoud worden aangepast?", "Ja, we sluiten aan op de brandrisico’s en middelen van jouw organisatie."],
    ],
  }),

  // Brandmeldinstallatie
  bedienaarBrandmeldcentrale: workshop({
    slug: "/workshops-bedienaar-brandmeldcentrale",
    title: "Workshop Bedienaar Brandmeldcentrale",
    headline: "Van melding naar de juiste actie — zonder kostbare twijfel.",
    lead: "Leer brandmeldingen, storingen en doormeldingen correct beoordelen en gestructureerd afhandelen.",
    image: generalImage,
    facts: [
      ["Voor wie", "BMC-bedienaars"],
      ["Duur", "2 uur"],
      ["Vorm", "Uitleg en casussen"],
      ["Locatie", "Eigen installatie"],
    ],
    answer: "Deze workshop geeft aangewezen bedienaars inzicht in de werking van de brandmeldcentrale en een duidelijk stappenplan voor brand- en storingsmeldingen.",
    learn: [
      "Zones, detectoren en meldingen herkennen",
      "Brand- en storingsmeldingen onderscheiden",
      "Een controle veilig organiseren",
      "Correct communiceren met BHV en meldkamer",
      "Registreren, resetten en verantwoord opschalen",
    ],
    modules: [
      {
        title: "De installatie",
        text: "De opbouw en signalen van de BMC begrijpen.",
        items: [
          "Zones en detectoren",
          "Nevenpanelen",
          "Doormelding",
        ],
      },
      {
        title: "Melding beoordelen",
        text: "Van paneelmelding naar controle en besluit.",
        items: [
          "Brand of storing",
          "Locatie bepalen",
          "Veilige verificatie",
        ],
      },
      {
        title: "Communicatie",
        text: "Heldere informatie voor BHV, PAC/RAC en hulpdiensten.",
        items: [
          "Interne alarmering",
          "Meldkamercontact",
          "Overdracht",
        ],
      },
      {
        title: "Casussen",
        text: "Oefenen met herkenbare situaties op de eigen installatie.",
        items: [
          "Ongewenst alarm",
          "Storing",
          "Daadwerkelijke brand",
        ],
      },
    ],
    result: "Deelnemers handelen rustiger en consequenter, beperken vertraging en verkleinen de kans op onnodige ontruimingen of foutief resetten.",
    audience: {
      title: "Voor medewerkers met verantwoordelijkheid voor de BMC",
      text: "Technische voorkennis is niet nodig. Training op de eigen centrale heeft de voorkeur.",
    },
    faqs: [
      ["Is technische voorkennis nodig?", "Nee, we leggen de werking praktisch en begrijpelijk uit."],
      ["Kan dit op onze eigen centrale?", "Ja, hierdoor sluit de workshop direct aan op jullie procedures."],
      ["Komen storingen ook aan bod?", "Ja, inclusief registratie, opvolging en het verschil met een brandmelding."],
    ],
  }),

  // Communicatie tijdens incidenten
  portofoongebruik: workshop({
    slug: "/workshops-portofoongebruik",
    title: "Workshop Portofoongebruik",
    headline: "Kort, duidelijk en verstaanbaar wanneer iedere seconde telt.",
    lead: "Praktisch trainen in portofoondiscipline, berichtopbouw en samenwerking tijdens incidenten.",
    image: generalImage,
    facts: [
      ["Voor wie", "BHV- en crisisteams"],
      ["Duur", "2 uur"],
      ["Vorm", "Praktijk en scenario’s"],
      ["Locatie", "Incompany"],
    ],
    answer: "De workshop leert deelnemers hoe zij onder druk korte, volledige en begrijpelijke berichten verzenden en hoe zij een portofoonnet ordelijk houden.",
    learn: [
      "Een portofoon correct instellen en controleren",
      "Berichten kort en eenduidig opbouwen",
      "Luisteren en bevestigen volgens vaste afspraken",
      "Omgaan met slecht bereik en druk radioverkeer",
      "Communiceren tijdens realistische scenario’s",
    ],
    modules: [
      {
        title: "Techniek",
        text: "De basisfuncties en beperkingen van de eigen portofoons.",
        items: [
          "Kanalen en volume",
          "Zendknop en spreekafstand",
          "Bereikcontrole",
        ],
      },
      {
        title: "Gespreksdiscipline",
        text: "Afspraken die berichten begrijpelijk houden.",
        items: [
          "Oproepen en antwoorden",
          "Wie, wat, waar",
          "Bevestigen",
        ],
      },
      {
        title: "Onder druk",
        text: "Prioriteit houden bij veel radioverkeer.",
        items: [
          "Spoedverkeer",
          "Storing en uitval",
          "Escaleren",
        ],
      },
      {
        title: "Scenario",
        text: "Samenwerken in een herkenbaar incident.",
        items: [
          "Rolverdeling",
          "Informatie delen",
          "Nabespreking",
        ],
      },
    ],
    result: "Het team communiceert sneller, met minder herhaling en minder kans op misverstanden tijdens een inzet.",
    faqs: [
      ["Gebruiken we onze eigen portofoons?", "Bij voorkeur wel, zodat instellingen en bereik direct worden meegenomen."],
      ["Is ervaring vereist?", "Nee, de workshop is geschikt voor beginnende en ervaren gebruikers."],
      ["Kunnen onze procedures worden verwerkt?", "Ja, scenario’s en roepnamen stemmen we vooraf af."],
    ],
  }),

  // Reanimatie volwassenen
  reanimatieVolwassene: workshop({
    slug: "/workshops-reanimatie-volwassene",
    title: "Workshop Reanimatie en AED Volwassene",
    headline: "Herken een circulatiestilstand. Start. Blijf handelen.",
    lead: "Leer een circulatiestilstand herkennen, 112 alarmeren, reanimeren en een AED veilig inzetten.",
    image: reanimationImage,
    facts: [
      ["Voor wie", "Iedereen vanaf 16 jaar"],
      ["Duur", "2–3 uur"],
      ["Vorm", "Intensieve praktijk"],
      ["Groep", "Kleine groepen"],
    ],
    answer: "In deze workshop oefent iedere deelnemer de volledige reanimatieketen: veiligheid, bewustzijn en ademhaling beoordelen, hulp inschakelen, borstcompressies geven en de AED gebruiken.",
    learn: [
      "Een circulatiestilstand snel herkennen",
      "112 en omstanders effectief inschakelen",
      "Goede borstcompressies en beademingen geven",
      "Een AED veilig aansluiten en volgen",
      "Samenwerken en wisselen zonder lang te onderbreken",
    ],
    modules: [
      {
        title: "Herkennen en alarmeren",
        text: "De eerste minuten systematisch benutten.",
        items: [
          "Veiligheid",
          "Bewustzijn en ademhaling",
          "112 en AED",
        ],
      },
      {
        title: "Basisreanimatie",
        text: "Techniek, tempo en diepte actief oefenen.",
        items: [
          "Borstcompressies",
          "Beademingen",
          "Minimale onderbreking",
        ],
      },
      {
        title: "AED",
        text: "Veilig aansluiten en opdrachten opvolgen.",
        items: [
          "Elektroden plaatsen",
          "Schokanalyse",
          "Direct hervatten",
        ],
      },
      {
        title: "Scenario",
        text: "De hele hulpverlening uitvoeren onder realistische druk.",
        items: [
          "Taakverdeling",
          "Wisselen",
          "Overdracht",
        ],
      },
    ],
    result: "Deelnemers durven te starten en kunnen de essentiële reanimatiehandelingen uitvoeren totdat professionele hulp het overneemt.",
    faqs: [
      ["Heb ik voorkennis nodig?", "Nee, alle handelingen worden stap voor stap aangeleerd."],
      ["Oefent iedereen zelf?", "Ja, iedere deelnemer oefent op een reanimatiepop en met een trainings-AED."],
      ["Kan dit als opfrisser?", "Ja, de workshop is zeer geschikt om vaardigheden periodiek te onderhouden."],
    ],
  }),

  // Reanimatie kinderen en baby's
  reanimatieKindBaby: workshop({
    slug: "/workshops-reanimatie-kind-baby",
    title: "Workshop Reanimatie Kind en Baby",
    headline: "Kleine slachtoffers vragen om een andere aanpak.",
    lead: "Praktisch oefenen met verslikking, reanimatie en AED-gebruik bij baby’s en kinderen.",
    image: babyImage,
    facts: [
      ["Voor wie", "Ouders en professionals"],
      ["Duur", "2–3 uur"],
      ["Vorm", "Intensieve praktijk"],
      ["Groep", "Kleine groepen"],
    ],
    answer: "De workshop richt zich op de verschillen tussen hulpverlening aan volwassenen, kinderen en baby’s. Deelnemers oefenen met passende poppen en leren rustig en systematisch handelen.",
    learn: [
      "Bewustzijn en ademhaling bij een kind beoordelen",
      "Verslikking bij baby en kind verhelpen",
      "Kinder- en babyreanimatie uitvoeren",
      "Een AED verantwoord gebruiken",
      "112 alarmeren en helder overdragen",
    ],
    modules: [
      {
        title: "Beoordelen",
        text: "Veilig benaderen en afwijkende ademhaling herkennen.",
        items: [
          "Bewustzijn",
          "Ademhaling",
          "Alarmering",
        ],
      },
      {
        title: "Verslikking",
        text: "Effectief handelen bij een gedeeltelijke of volledige afsluiting.",
        items: [
          "Baby",
          "Kind",
          "Bewusteloosheid",
        ],
      },
      {
        title: "Reanimatie",
        text: "De aangepaste techniek voor kleine slachtoffers.",
        items: [
          "Startbeademingen",
          "Compressies",
          "Wisselen",
        ],
      },
      {
        title: "AED en scenario",
        text: "De complete hulpverlening in samenhang oefenen.",
        items: [
          "Elektroden",
          "Samenwerking",
          "Overdracht",
        ],
      },
    ],
    result: "Deelnemers herkennen levensbedreigende situaties sneller en hebben de techniek én het vertrouwen om bij een baby of kind direct te handelen.",
    faqs: [
      ["Is dit anders dan reanimatie bij volwassenen?", "Ja, onder meer de techniek, verhouding en aanpak bij verslikking verschillen."],
      ["Wordt met baby- en kinderpoppen geoefend?", "Ja, zodat iedereen de verschillen daadwerkelijk ervaart."],
      ["Is de workshop geschikt voor kinderopvang?", "Ja, ook voor scholen, sportverenigingen, ouders en verzorgers."],
    ],
  }),

  // Ernstig bloedverlies
  stopDeBloeding: workshop({
    slug: "/workshops-stop-de-bloeding",
    title: "Workshop Stop de Bloeding – Red een Leven",
    headline: "Ernstig bloedverlies wacht niet op de ambulance.",
    lead: "Leer levensbedreigend bloedverlies herkennen en stoppen met druk, wondtamponnade en een tourniquet.",
    image: bleedingImage,
    facts: [
      ["Voor wie", "BHV en risicoteams"],
      ["Duur", "2–3 uur"],
      ["Vorm", "Realistische praktijk"],
      ["Locatie", "Incompany"],
    ],
    answer: "Bij ernstig bloedverlies zijn de eerste minuten beslissend. Deelnemers leren veilig benaderen, 112 inschakelen en de juiste techniek kiezen om bloedverlies snel te beperken.",
    learn: [
      "Levensbedreigend bloedverlies herkennen",
      "Directe druk en drukverband toepassen",
      "Een wond correct tamponneren",
      "Een tourniquet veilig aanleggen",
      "Onder tijdsdruk samenwerken en overdragen",
    ],
    modules: [
      {
        title: "Herkennen",
        text: "Ernst en veiligheid snel beoordelen.",
        items: [
          "Hoeveelheid bloed",
          "Plaats en oorzaak",
          "112 alarmeren",
        ],
      },
      {
        title: "Directe druk",
        text: "De eerste en vaak snelste interventie.",
        items: [
          "Druk op de wond",
          "Drukverband",
          "Effect controleren",
        ],
      },
      {
        title: "Tamponnade en tourniquet",
        text: "Technieken voor diepe of niet beheersbare bloedingen.",
        items: [
          "Wond opvullen",
          "Tourniquet plaatsen",
          "Tijd registreren",
        ],
      },
      {
        title: "Scenario",
        text: "Beslissen en handelen onder realistische druk.",
        items: [
          "Taakverdeling",
          "Materiaalgebruik",
          "Overdracht",
        ],
      },
    ],
    result: "Deelnemers kunnen ernstig bloedverlies eerder herkennen en direct een passende levensreddende handeling uitvoeren.",
    faqs: [
      ["Is dit alleen voor BHV’ers?", "Nee, de workshop is geschikt voor iedereen die voorbereid wil zijn op ernstig letsel."],
      ["Oefenen we met echte materialen?", "Ja, met trainings-tourniquets en realistisch oefenmateriaal."],
      ["Past dit bij bouw en industrie?", "Juist in risicovolle omgevingen is deze gerichte voorbereiding waardevol."],
    ],
  }),

  // Incidenten op en rond water
  waterongevallen: workshop({
    slug: "/workshops-waterongevallen",
    title: "Workshop Waterongevallen",
    headline: "Help bij water — zonder zelf het volgende slachtoffer te worden.",
    lead: "Veilig handelen bij incidenten op en rond water, met aandacht voor reddingsmiddelen, onderkoeling en alarmering.",
    image: generalImage,
    facts: [
      ["Voor wie", "Teams nabij water"],
      ["Duur", "2–3 uur"],
      ["Vorm", "Theorie en scenario’s"],
      ["Locatie", "Bij voorkeur nabij water"],
    ],
    answer: "Waterincidenten zijn onvoorspelbaar. De workshop leert deelnemers risico’s beoordelen en hulp bieden vanaf de kant, zonder zichzelf onnodig in gevaar te brengen.",
    learn: [
      "Risico’s van stroming, kou en paniek herkennen",
      "112 gericht alarmeren",
      "Een werplijn of reddingsboei gebruiken",
      "Een slachtoffer veilig vanaf de kant helpen",
      "Onderkoeling en verdrinking herkennen",
    ],
    modules: [
      {
        title: "Risicoanalyse",
        text: "Eerst kijken, dan veilig beslissen.",
        items: [
          "Stroming en diepte",
          "Koude en zicht",
          "Eigen veiligheid",
        ],
      },
      {
        title: "Alarmeren",
        text: "Hulpdiensten snel naar de juiste plek krijgen.",
        items: [
          "Exacte locatie",
          "Situatie beschrijven",
          "Omstanders inzetten",
        ],
      },
      {
        title: "Reddingsmiddelen",
        text: "Hulp bieden zonder zelf te water te gaan.",
        items: [
          "Werplijn",
          "Reddingsboei",
          "Geïmproviseerde middelen",
        ],
      },
      {
        title: "Nazorg",
        text: "Handelen zodra het slachtoffer uit het water is.",
        items: [
          "Ademhaling",
          "Onderkoeling",
          "Overdracht",
        ],
      },
    ],
    result: "Deelnemers maken veiligere keuzes en kunnen aanwezige reddingsmiddelen doelgericht inzetten tot de hulpdiensten arriveren.",
    faqs: [
      ["Moet ik kunnen zwemmen?", "Nee. De basis is hulp bieden zonder zelf het water in te gaan."],
      ["Kan er bij ons aan het water worden geoefend?", "Ja, als de locatie vooraf veilig en geschikt wordt bevonden."],
      ["Voor welke organisaties is dit geschikt?", "Onder meer havens, zwembaden, recreatie, bouwprojecten en bedrijven aan het water."],
    ],
  }),

  // Kinder-EHBO aan huis
  kinderEhboHuiskamer: workshop({
    slug: "/workshops-kinder-ehbo-huiskamertraining",
    title: "Kinder-EHBO Huiskamertraining",
    headline: "Rust en zekerheid wanneer een kind direct hulp nodig heeft.",
    lead: "Een persoonlijke training aan huis over verslikking, reanimatie en veelvoorkomende ongevallen bij baby’s en kinderen.",
    image: babyImage,
    facts: [
      ["Voor wie", "Ouders en verzorgers"],
      ["Duur", "2,5–3 uur"],
      ["Vorm", "Persoonlijk en praktisch"],
      ["Groep", "4–8 deelnemers"],
    ],
    answer: "In een kleine, vertrouwde setting leren ouders en verzorgers wat zij kunnen doen bij verslikking, bewusteloosheid, reanimatie en veelvoorkomende kinderongevallen.",
    learn: [
      "Verslikking bij een baby of kind herkennen",
      "Baby- en kinderreanimatie uitvoeren",
      "Brandwonden en hoofdletsel beoordelen",
      "Koortsstuipen en allergische reacties herkennen",
      "Rustig 112 bellen en informatie overdragen",
    ],
    modules: [
      {
        title: "Verslikking",
        text: "Verschillen herkennen en direct passend handelen.",
        items: [
          "Baby",
          "Kind",
          "Bewusteloosheid",
        ],
      },
      {
        title: "Reanimatie",
        text: "Veel oefentijd op baby- en kinderpoppen.",
        items: [
          "Ademhaling",
          "Beademingen",
          "Compressies",
        ],
      },
      {
        title: "Kinderongevallen",
        text: "Eerste hulp bij herkenbare situaties thuis.",
        items: [
          "Brandwonden",
          "Vallen en hoofdletsel",
          "Allergie en koortsstuip",
        ],
      },
      {
        title: "Scenario’s",
        text: "Kennis toepassen in een veilige, persoonlijke setting.",
        items: [
          "Rust bewaren",
          "112 bellen",
          "Samenwerken",
        ],
      },
    ],
    result: "Deelnemers weten welke eerste stappen nodig zijn en voelen zich zekerder om bij een baby of kind daadwerkelijk hulp te verlenen.",
    audience: {
      title: "Voor ouders, grootouders en andere verzorgers",
      text: "Er is geen medische voorkennis nodig. De kleine groep biedt volop ruimte voor persoonlijke vragen en situaties.",
    },
    faqs: [
      ["Heb ik voorkennis nodig?", "Nee, de training begint bij de basis."],
      ["Waar vindt de training plaats?", "Bij een deelnemer thuis of op een andere kleine, geschikte locatie."],
      ["Oefent iedereen actief mee?", "Ja, dankzij de groep van vier tot acht deelnemers krijgt iedereen veel oefentijd."],
    ],
  }),
};
