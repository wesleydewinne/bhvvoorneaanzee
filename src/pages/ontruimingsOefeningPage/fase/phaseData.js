import tabletop from "@/assets/image/trainingen/ontruimingsoefening/Ontruimingsoefening tabletop.png?w=1200&format=webp&quality=80";
import evacuation from "@/assets/image/trainingen/ontruimingsoefening/ontruiming.png?w=1400&format=webp&quality=82";
import smoke from "@/assets/image/scenarios/Rookontwikkeling_technische_ruimte.png?w=1200&format=webp&quality=80";
import power from "@/assets/image/scenarios/Stroomuitval.png?w=1200&format=webp&quality=80";
import gas from "@/assets/image/scenarios/Gaslek.png?w=1200&format=webp&quality=80";

export const phaseData = [
  {
    number: "0",
    slug: "tabletop",
    image: tabletop,
    label: "Tabletop-ontruimingsoefening",
    title: "Tabletop-ontruimingsoefening op locatie",
    headline: "Eerst het plan testen. Daarna pas het pand.",
    lead: "Een tabletop-ontruimingsoefening is een begeleide bespreking van een noodscenario aan de hand van de plattegrond, het ontruimingsplan en de werkelijke situatie in het gebouw. Er wordt nog niet fysiek ontruimd.",
    answer:
      "Fase 0 is geschikt als nulmeting, na een verbouwing of verhuizing, bij een nieuw BHV-team of wanneer het ontruimingsplan is gewijzigd. We maken rollen, routes, besluiten en mogelijke knelpunten zichtbaar voordat een praktijksimulatie plaatsvindt.",
    ideal: [
      "Nieuw of gewijzigd ontruimingsplan",
      "Verhuizing, verbouwing of gewijzigde risico’s",
      "Nieuw BHV-team of nieuwe ploegleider",
      "Voorbereiding op een fysieke ontruimingsoefening",
    ],
    steps: [
      "Ontruimingsplan, plattegrond en risico’s doornemen",
      "Melding en eerste besluiten stap voor stap bespreken",
      "Taken van BHV’ers, ploegleider en receptie verduidelijken",
      "Vluchtroutes, verzamelplaats en controle van ruimten toetsen",
      "Knelpunten en concrete verbeteracties vastleggen",
    ],
    result:
      "Na afloop weet de BHV-organisatie wie welke beslissing neemt, welke routes bruikbaar zijn en waar het plan nog moet worden aangescherpt. Je ontvangt praktische verbeterpunten als basis voor fase 1.",
    faqs: [
      [
        "Wat is een tabletop-ontruimingsoefening?",
        "Een tabletop is een oefening aan tafel waarbij het BHV-team een incident doorloopt met de plattegrond en het ontruimingsplan. Er vindt geen echte ontruiming plaats.",
      ],
      [
        "Wie doen mee aan fase 0?",
        "Meestal nemen de ploegleider BHV, BHV’ers en relevante sleutelfunctionarissen deel, bijvoorbeeld receptie, facilitair of management.",
      ],
      [
        "Hoe lang duurt een tabletop-oefening?",
        "De duur hangt af van het gebouw en het aantal scenario’s. Vooraf stemmen we de omvang en gewenste leerdoelen af.",
      ],
      [
        "Krijgen we verbeterpunten na afloop?",
        "Ja. We benoemen bevindingen over rollen, communicatie, routes, middelen en het ontruimingsplan, zodat de organisatie gericht kan verbeteren.",
      ],
    ],
  },
  {
    number: "1",
    slug: "aangekondigd",
    image: evacuation,
    label: "Aangekondigde ontruimingsoefening",
    title: "Aangekondigde ontruimingsoefening voor bedrijven",
    headline: "Veilig oefenen met iedereen aan boord.",
    lead: "Bij een aangekondigde ontruimingsoefening zijn datum en starttijd vooraf bekend. Medewerkers en BHV’ers kunnen daardoor gecontroleerd kennismaken met het alarm, de vluchtroutes, taakverdeling en verzamelplaats.",
    answer:
      "Fase 1 is de beste eerste praktijkoefening voor organisaties die de ontruimingsprocedure willen aanleren. De begeleider kan direct bijsturen, terwijl het BHV-team ervaring opdoet met alarmeren, ruimten controleren en aanwezigen begeleiden.",
    ideal: [
      "Eerste fysieke ontruimingsoefening",
      "Nieuwe medewerkers of nieuw BHV-team",
      "Nieuwe locatie of aangepaste vluchtroutes",
      "Organisaties die procedures veilig willen aanleren",
    ],
    steps: [
      "Doel, draaiboek en veiligheidsafspraken vaststellen",
      "Medewerkers informeren over datum en starttijd",
      "Alarm activeren en BHV-organisatie laten opkomen",
      "Ruimten, vluchtroutes en verzamelplaats observeren",
      "Direct nabespreken en verbeterpunten prioriteren",
    ],
    result:
      "Deelnemers herkennen het alarmsignaal, weten welke route zij moeten nemen en ervaren hoe de verzamelplaats werkt. Het BHV-team oefent de volledige basisprocedure in een veilige, overzichtelijke setting.",
    faqs: [
      [
        "Wat is een aangekondigde ontruimingsoefening?",
        "Bij een aangekondigde oefening weten medewerkers en BHV’ers vooraf op welke datum en tijd de ontruiming plaatsvindt. Het doel is de procedure veilig aanleren.",
      ],
      [
        "Wordt het hele gebouw ontruimd?",
        "Dat bepalen we samen. De oefening kan één afdeling, een bouwdeel of het volledige pand omvatten, afhankelijk van risico’s en leerdoelen.",
      ],
      [
        "Moet de bedrijfsvoering worden stilgelegd?",
        "Meestal slechts kort en gecontroleerd. We stemmen tijdstip, deelnemers en uitzonderingen vooraf af om verstoring te beperken.",
      ],
      [
        "Wat wordt tijdens fase 1 beoordeeld?",
        "Onder meer alarmering, opkomst van de BHV, communicatie, controle van ruimten, gebruik van vluchtroutes, verzamelplaats en registratie.",
      ],
    ],
  },
  {
    number: "2",
    slug: "onbekend-tijdstip",
    image: smoke,
    label: "Oefening met onbekend tijdstip",
    title: "Ontruimingsoefening met onbekend startmoment",
    headline: "Bekende oefenperiode. Onbekend moment.",
    lead: "Bij fase 2 is bekend dát er wordt geoefend, maar niet precies wanneer. Zo ontstaat een realistischer beeld van de dagelijkse paraatheid zonder de controle en veiligheid van een geplande oefenperiode te verliezen.",
    answer:
      "Deze oefenvorm test of medewerkers en BHV’ers de aangeleerde procedure ook uitvoeren wanneer zij niet klaarstaan. We observeren de eerste reactie, interne communicatie, routekeuze, controle van ruimten en registratie op de verzamelplaats.",
    ideal: [
      "Teams die fase 1 al beheersen",
      "Testen van routine en reactietijd",
      "Meerdere diensten of wisselende bezetting",
      "Controleren of verbeteracties echt werken",
    ],
    steps: [
      "Oefendag of oefenweek en randvoorwaarden afspreken",
      "Realistisch scenario voorbereiden zonder starttijd te delen",
      "Reactie en opschaling van de BHV observeren",
      "Gedrag van medewerkers en gebruik van routes beoordelen",
      "Tijdlijn reconstrueren en verbeteracties vastleggen",
    ],
    result:
      "Je krijgt een eerlijker beeld van de paraatheid op een normale werkdag. De evaluatie laat zien welke onderdelen routine zijn geworden en waar extra instructie, middelen of training nodig zijn.",
    faqs: [
      [
        "Wie weet wanneer fase 2 begint?",
        "Alleen een kleine voorbereidingsgroep en de oefenleiding kennen het exacte startmoment. De deelnemers weten doorgaans alleen de afgesproken oefenperiode.",
      ],
      [
        "Is een onbekend startmoment veilig?",
        "Ja, mits de oefening zorgvuldig wordt voorbereid. Kritieke processen, kwetsbare personen en stopcriteria worden vooraf met bevoegde contactpersonen afgestemd.",
      ],
      [
        "Wat is het verschil tussen fase 1 en fase 2?",
        "Bij fase 1 zijn datum en tijd bekend. Bij fase 2 is alleen de oefenperiode bekend en blijft het exacte startmoment voor deelnemers onbekend.",
      ],
      [
        "Kan fase 2 tijdens normale bezetting plaatsvinden?",
        "Juist dan ontstaat een representatief beeld. We stemmen wel af welke processen niet mogen worden verstoord en wie niet kan deelnemen.",
      ],
    ],
  },
  {
    number: "3",
    slug: "onaangekondigd",
    image: power,
    label: "Onaangekondigde ontruimingsoefening",
    title: "Onaangekondigde ontruimingsoefening op het werk",
    headline: "Test wat er gebeurt als niemand klaarstaat.",
    lead: "Een onaangekondigde ontruimingsoefening test de zelfstandige reactie van medewerkers en de BHV-organisatie. Moment en scenario zijn niet bekend bij de deelnemers; alleen de noodzakelijke voorbereidingsgroep is geïnformeerd.",
    answer:
      "Fase 3 is bedoeld voor organisaties met aantoonbare oefenervaring. De oefening brengt onder realistische tijdsdruk in beeld hoe alarmering, besluitvorming, communicatie, ontruiming en opvang zonder voorafgaande waarschuwing verlopen.",
    ideal: [
      "Ervaren BHV-organisaties",
      "Objectieve toets van de paraatheid",
      "Complexe bezetting of meerdere afdelingen",
      "Valideren van procedures onder tijdsdruk",
    ],
    steps: [
      "Risicoanalyse, stopcriteria en waarnemers vastleggen",
      "Scenario discreet voorbereiden met een kleine kerngroep",
      "Zelfstandige alarmering en besluitvorming observeren",
      "Ontruiming, verzamelplaats en overdracht beoordelen",
      "Feiten nabespreken en prioriteiten voor verbetering bepalen",
    ],
    result:
      "De organisatie ziet hoe de procedure werkelijk functioneert wanneer de routine onverwacht wordt aangesproken. Het verslag maakt sterke punten, afwijkingen en concrete verbetermaatregelen aantoonbaar.",
    faqs: [
      [
        "Is een onaangekondigde ontruimingsoefening verantwoord?",
        "Ja, wanneer de organisatie er klaar voor is en risico’s, uitzonderingen, stopcriteria en communicatie met een kleine voorbereidingsgroep zorgvuldig zijn geregeld.",
      ],
      [
        "Wie zijn vooraf geïnformeerd?",
        "Alleen personen die nodig zijn om de oefening veilig te organiseren, zoals opdrachtgever, oefenleiding en eventueel beveiliging of facilitair beheer.",
      ],
      [
        "Wanneer is een organisatie klaar voor fase 3?",
        "Als de basisprocedure eerder is geoefend, BHV-rollen duidelijk zijn en verbeterpunten uit aangekondigde oefeningen aantoonbaar zijn opgevolgd.",
      ],
      [
        "Worden reactietijden gemeten?",
        "Waar relevant leggen waarnemers tijdstippen vast, maar snelheid is nooit het enige criterium. Veiligheid, communicatie en volledigheid wegen eveneens mee.",
      ],
    ],
  },
  {
    number: "4",
    slug: "ketenoefening",
    image: gas,
    label: "Ketenoefening ontruiming",
    title: "Ketenoefening voor BHV en crisisorganisatie",
    headline: "Als samenwerken belangrijker wordt dan één procedure.",
    lead: "Een ketenoefening is een complexe ontruimingsoefening waarin meerdere interne disciplines en eventueel externe partners samenwerken. De nadruk ligt op opschaling, commandovoering, informatie-uitwisseling en overdracht.",
    answer:
      "Fase 4 combineert ontruiming met een breder incident, bijvoorbeeld rookontwikkeling, uitval van voorzieningen, een slachtoffer of een geblokkeerde route. De oefening toetst niet alleen het BHV-team, maar de hele veiligheidsketen rond de organisatie.",
    ideal: [
      "Volwassen BHV- en crisisorganisaties",
      "Meerdere locaties, teams of disciplines",
      "Ploegleiders en management onder druk trainen",
      "Samenwerking en overdracht integraal toetsen",
    ],
    steps: [
      "Gezamenlijke oefendoelen en betrokken disciplines bepalen",
      "Complex scenario met realistische injects uitwerken",
      "Opschaling, commandovoering en informatiestromen observeren",
      "Samenwerking, slachtofferzorg en overdracht toetsen",
      "Integrale evaluatie en verbeterplan voor de veiligheidsketen opleveren",
    ],
    result:
      "De evaluatie laat zien hoe besluiten, informatie en verantwoordelijkheden door de organisatie bewegen. Je krijgt verbeterpunten voor BHV, crisisorganisatie, facilitaire processen en samenwerking met andere partijen.",
    faqs: [
      [
        "Wat is een ketenoefening?",
        "Een ketenoefening test de samenwerking tussen meerdere rollen, afdelingen of organisaties tijdens een complex incident en een mogelijke ontruiming.",
      ],
      [
        "Doen hulpdiensten altijd mee aan fase 4?",
        "Nee. Deelname van externe hulpdiensten is afhankelijk van doel, haalbaarheid en afspraken. Een ketenoefening kan ook volledig met interne disciplines worden uitgevoerd.",
      ],
      [
        "Kan een LOTUS-slachtoffer worden ingezet?",
        "Ja, wanneer slachtofferzorg onderdeel is van het leerdoel en de inzet veilig en passend kan worden georganiseerd.",
      ],
      [
        "Wat levert een ketenoefening op?",
        "Een integraal beeld van opschaling, leiding, communicatie, samenwerking, overdracht en de aansluiting tussen het BHV-plan en bredere crisisprocedures.",
      ],
    ],
  },
];
