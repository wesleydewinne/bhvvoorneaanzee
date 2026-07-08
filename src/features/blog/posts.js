import blogOntruimenImg from "@/assets/image/blog/ontruimen/Blog_Ontruimen.png?w=1000&format=webp&quality=72";
import blogArbeidsOngevallen from "@/assets/image/blog/arbeidsongevallen/Blog_arbeidsongevallen.png?w=1000&format=webp&quality=72";
import header112Img from "@/assets/image/blog/112app/Blog_112_Header.webp";
import headerBurgerhulpImg from "@/assets/image/blog/burgerhulpverlener/headerBurgerhulpImg.webp";
import mijnHartslagNuAppMockup from "@/assets/image/blog/burgerhulpverlener/mijn-hartslagnu-app-mockup.png?w=720&format=webp&quality=78";
import weekVanDeTeek from "@/assets/image/blog/weekVanDeTeek/Deweekvandeteek.webp";
import bhvPraktijkTrainingImg from "@/assets/image/homepageFotos/Wesley De Winne met blusdeken en brandpop.webp?w=720&format=webp&quality=72";

export const posts = [
    {
        slug: "week-van-de-teek-controleer-op-tijd",
        title: "Week van de Teek: controleren voorkomt problemen",
        date: "30 maart 2026",
        category: "Gezondheid",
        author: "Wesley",
        image: weekVanDeTeek,
        seo: {
            title: "Week van de Teek: controleren voorkomt problemen | BHV Voorne aan Zee",
            description: "Praktische uitleg over teken controleren, veilig verwijderen en wanneer je contact opneemt met de huisarts.",
            keywords: ["tekenbeet", "Week van de Teek", "teken verwijderen", "gezondheid", "EHBO"],
            about: ["teken", "gezondheid", "EHBO"],
            datePublished: "2026-03-30",
            dateModified: "2026-03-30"
        },
        page: {
            variant: "guide",
            hero: "split",
            summary: "Praktische uitleg over teken controleren, veilig verwijderen en wanneer je contact opneemt met de huisarts.",
            highlight: "Controleer jezelf na een bezoek aan groen. Hoe sneller je een teek verwijdert, hoe kleiner de kans op klachten.",
            takeaways: [
                "Teken zitten niet alleen in het bos, maar ook in tuinen, parken en hoog gras.",
                "Controleer warme en beschutte plekken zoals knieholtes, oksels, liezen en haargrens.",
                "Verwijder een teek rustig met een puntig pincet of tekenverwijderaar.",
                "Neem contact op met de huisarts bij een rode ring, vlek of griepachtige klachten."
            ]
        },
        content: [
            {
                id: "intro1",
                type: "paragraph",
                text: "Het is deze week de Week van de Teek. Een goed moment om extra stil te staan bij tekenbeten en het voorkomen van klachten. Teken komen niet alleen voor in bossen en duinen, maar ook in parken, tuinen, bermen en hoog gras. Juist daarom is het verstandig om jezelf, kinderen en huisdieren te controleren nadat je in het groen bent geweest."
            },
            {
                id: "quote1",
                type: "blockquote",
                text: "Een tekencheck duurt maar even, maar kan veel problemen voorkomen."
            }
        ],
        faq: [
            {
                question: "Waarom is een tekencheck belangrijk?",
                answer: "Een teek is klein en wordt daardoor makkelijk gemist. Toch kan een tekenbeet gevolgen hebben voor je gezondheid. Hoe sneller je een teek ontdekt en verwijdert, hoe kleiner de kans op problemen. Even controleren kost maar een paar minuten en kan veel ellende voorkomen.",
                link: {
                    text: "Lees meer op GGD Leefomgeving over teken",
                    href: "https://ggdleefomgeving.nl/ongedierte-en-schadelijke-planten/teken/"
                }
            },
            {
                question: "Waar moet je op letten na een bezoek aan groen?",
                answer: "Controleer jezelf na een bezoek aan bos, park, tuin, duinen of hoog gras. Let extra op knieholtes, liezen, oksels, achter de oren, bij de haargrens en rond de taille. Controleer ook kinderen en huisdieren als zij buiten zijn geweest.",
                link: {
                    text: "Bekijk Tekenradar voor extra informatie",
                    href: "https://www.tekenradar.nl/"
                }
            },
            {
                question: "Hoe verwijder je een teek veilig?",
                answer: "Gebruik een puntig pincet of een speciale tekenverwijderaar. Pak de teek zo dicht mogelijk op de huid vast en trek hem rustig eruit. Gebruik vooraf geen olie, alcohol, zeep of andere middelen. Gebruik je een tekentang of andere tekenverwijderaar? Volg dan de gebruiksaanwijzing.",
                link: {
                    text: "Bekijk hoe je een teek verwijdert",
                    href: "https://www.tekenradar.nl/informatie/hoe-verwijder-ik-een-teek"
                }
            },
            {
                question: "Wanneer neem je contact op met de huisarts?",
                answer: "Houd de plek van de beet goed in de gaten. Ontstaat er na enkele dagen of weken een rode vlek of ring, of krijg je griepachtige klachten zoals koorts, spierpijn, hoofdpijn of gewrichtspijn? Neem dan contact op met de huisarts en vertel dat je een tekenbeet hebt gehad.",
                link: {
                    text: "Lees wanneer je medische hulp inschakelt",
                    href: "https://ggdleefomgeving.nl/ongedierte-en-schadelijke-planten/teken/"
                }
            }
        ]
    },
    {
        slug: "tekort-burgerhulpverleners-lokaal",
        title: "Tekort aan burgerhulpverleners: elke minuut telt",
        date: "18 februari 2026",
        category: "Reanimatie",
        author: "Wesley",
        image: headerBurgerhulpImg,
        seo: {
            title: "Burgerhulpverleners en AED-dekking: waarom lokale hulp telt | BHV Voorne aan Zee",
            description: "Kennisbankuitleg over burgerhulpverleners, HartslagNu, AED-dekking, de Mijn HartslagNu app en wat je lokaal kunt doen bij een hartstilstand.",
            keywords: ["burgerhulpverlener", "burgerhulpverlening", "HartslagNu", "Mijn HartslagNu app", "dekkingskaart AED", "AED aanmelden", "reanimatie", "hartstilstand"],
            about: ["burgerhulpverlening", "HartslagNu", "reanimatie", "AED"],
            datePublished: "2026-02-18",
            dateModified: "2026-07-08"
        },
        page: {
            variant: "guide",
            hero: "split",
            summary: "Hoe burgerhulpverleners, AED's, HartslagNu en lokale dekking samen helpen bij een mogelijke hartstilstand.",
            highlight: "Bij een hartstilstand telt elke minuut. Een burgerhulpverlener in de buurt kan al starten terwijl de ambulance onderweg is.",
            takeaways: [
                "HartslagNu is het landelijke reanimatie-oproepsysteem van Nederland.",
                "Burgerhulpverleners kunnen worden opgeroepen bij een mogelijke hartstilstand in de buurt.",
                "AED-dekking gaat niet alleen over het aantal AED's, maar ook over beschikbaarheid en bereikbaarheid.",
                "De Mijn HartslagNu app helpt burgerhulpverleners sneller en duidelijker te reageren op een oproep."
            ]
        },
        content: [
            {
                id: "intro1",
                type: "paragraph",
                text: "Bij een hartstilstand buiten het ziekenhuis zijn de eerste minuten van levensbelang. HartslagNu helpt om burgerhulpverleners en AED's snel in te zetten, zodat er eerder gestart kan worden met reanimatie terwijl de ambulance onderweg is."
            },
            {
                id: "intro2",
                type: "paragraph",
                text: "Deze blog is bedoeld als kennisbankuitleg: wat doet een burgerhulpverlener, waarom is lokale dekking belangrijk, wat laat de dekkingskaart zien en hoe helpt de Mijn HartslagNu app bij een oproep?"
            },
            {
                id: "heading1",
                type: "heading",
                level: 2,
                wide: true,
                text: "Wat is burgerhulpverlening?"
            },
            {
                id: "text1",
                type: "paragraph",
                text: "Een burgerhulpverlener is iemand die kan reanimeren en via HartslagNu kan worden opgeroepen bij een mogelijke hartstilstand in de buurt. De opdracht kan zijn om direct naar het slachtoffer te gaan, of om eerst een AED op te halen. Het doel is simpel: zo vroeg mogelijk starten met reanimatie en een AED inzetten als dat nodig is."
            },
            {
                id: "text2",
                type: "paragraph",
                text: "Burgerhulpverlening vervangt de ambulancezorg niet. Het overbrugt juist de kostbare minuten totdat professionele hulpverleners er zijn. Daarom is het belangrijk dat er genoeg opgeleide mensen en bereikbare AED's in de omgeving beschikbaar zijn."
            },
            {
                id: "heading2",
                type: "heading",
                level: 2,
                text: "Waarom lokale dekking belangrijk is"
            },
            {
                id: "text3",
                type: "paragraph",
                text: "Een wijk, bedrijventerrein, sportpark of buitengebied kan op papier dichtbij hulp lijken, maar in de praktijk telt beschikbaarheid. Zijn er op dat moment burgerhulpverleners in de buurt? Is er een AED aangemeld? Is die AED ook bereikbaar buiten openingstijden? Juist die combinatie bepaalt of hulp snel genoeg op gang komt."
            },
            {
                id: "heading3",
                type: "heading",
                level: 2,
                text: "Wat laat de dekkingskaart zien?"
            },
            {
                id: "text4",
                type: "paragraph",
                text: "De HartslagNu dekkingskaart geeft inzicht in waar AED's zijn aangemeld en waar nog dekking ontbreekt. Dat maakt de kaart waardevol voor inwoners, bedrijven, verenigingen en gemeenten die willen weten of hun omgeving voldoende voorbereid is op een reanimatieoproep."
            },
            {
                id: "link1",
                type: "link",
                text: "Bekijk de HartslagNu dekkingskaart",
                href: "https://hartslagnu-dekking-kaart.stanglobal.com/"
            },
            {
                id: "link2",
                type: "link",
                text: "Lees meer over burgerhulpverlening",
                href: "https://hartslagnu.nl/"
            },
            {
                id: "heading4",
                type: "heading",
                level: 2,
                text: "De Mijn HartslagNu app bij een oproep"
            },
            {
                id: "text5",
                type: "paragraph",
                text: "Met de Mijn HartslagNu app kun je reanimatieoproepen ontvangen, direct reageren, het reanimatieadres bekijken en navigeren naar de locatie. Volgens HartslagNu wordt standaard gealarmeerd op basis van je ingevoerde woon- en werkadres. Als je onderweg bent, kun je tijdelijk je GPS-locatie delen via de app."
            },
            {
                id: "image1",
                type: "image",
                src: mijnHartslagNuAppMockup,
                alt: "Telefoonmockup met voorbeeld van een reanimatieoproep in een app"
            },
            {
                id: "heading5",
                type: "heading",
                level: 2,
                text: "Wat kun je lokaal doen?"
            },
            {
                id: "list1",
                type: "list",
                items: [
                    "Controleer op de dekkingskaart of er in jouw omgeving voldoende AED-dekking is.",
                    "Meld een AED aan als die beschikbaar is voor reanimatieoproepen.",
                    "Zorg dat openingstijden en bereikbaarheid van een AED kloppen.",
                    "Volg een reanimatie- en AED-training als je burgerhulpverlener wilt worden.",
                    "Houd je gegevens en beschikbaarheid in HartslagNu actueel.",
                    "Bespreek binnen je organisatie wie kan reanimeren en waar de AED hangt."
                ]
            },
            {
                id: "quote1",
                type: "blockquote",
                text: "Een burgerhulpverlener kan het verschil maken tussen wachten op hulp en direct beginnen met levensreddend handelen."
            }
        ],
        faq: [
            {
                question: "Wat is een burgerhulpverlener?",
                answer: "Een burgerhulpverlener is iemand die kan reanimeren en via HartslagNu kan worden opgeroepen bij een mogelijke hartstilstand in de buurt. Je kunt naar het slachtoffer worden gestuurd of eerst een AED ophalen."
            },
            {
                question: "Waarom zijn meer burgerhulpverleners nodig?",
                answer: "Niet iedere buurt heeft op elk moment genoeg beschikbare hulpverleners. Overdag zijn mensen vaak aan het werk of onderweg. Hoe meer getrainde mensen zich aanmelden, hoe groter de kans dat iemand snel kan starten met reanimatie."
            },
            {
                question: "Wat laat de HartslagNu dekkingskaart zien?",
                answer: "De dekkingskaart geeft inzicht in aangemelde AED's en plekken waar nog dekking ontbreekt. Dat helpt om te zien waar extra AED's of betere beschikbaarheid belangrijk kunnen zijn.",
                link: {
                    text: "Open de dekkingskaart",
                    href: "https://hartslagnu-dekking-kaart.stanglobal.com/"
                }
            },
            {
                question: "Waarvoor gebruik je de Mijn HartslagNu app?",
                answer: "Met de Mijn HartslagNu app kun je reanimatieoproepen ontvangen, direct reageren, het reanimatieadres bekijken en naar de locatie navigeren. De app alarmeert standaard op basis van woon- en werkadres. Tijdelijk GPS delen kan als je dat zelf instelt.",
                link: {
                    text: "Bekijk de Mijn HartslagNu app",
                    href: "https://hartslagnu.nl/burgerhulpverlening/hartslagnu-app/"
                }
            },
            {
                question: "Waarom is een aangemelde AED belangrijk?",
                answer: "Een AED helpt alleen in het oproepsysteem als bekend is waar hij hangt en wanneer hij bereikbaar is. Door een AED aan te melden, kan die bij een reanimatieoproep worden meegenomen in de hulpverlening."
            },
            {
                question: "Hoe meld je jezelf aan?",
                answer: "Aanmelden doe je via HartslagNu. Je hebt daarvoor reanimatiekennis nodig en je gegevens moeten kloppen, zodat je bij een oproep snel en betrouwbaar ingezet kunt worden.",
                link: {
                    text: "Ga naar Mijn HartslagNu",
                    href: "https://mijnhartslagnu.nl/"
                }
            },
            {
                question: "Moet je geoefend blijven als burgerhulpverlener?",
                answer: "Ja. Reanimatie en AED-gebruik zijn praktische vaardigheden. Door regelmatig te oefenen blijf je zekerder in het herkennen van een hartstilstand, het geven van borstcompressies en het samenwerken met anderen."
            }
        ]
    },
    {
        slug: "bhv-training-veiligheid-werkvloer",
        title: "Waarom een BHV-training onmisbaar is voor veiligheid op de werkvloer",
        date: "5 september 2025",
        category: "BHV",
        author: "Wesley",
        image: blogArbeidsOngevallen,
        seo: {
            title: "BHV-training op de werkvloer: waarom oefenen nodig is | BHV Voorne aan Zee",
            description: "Praktische uitleg waarom BHV-training belangrijk is voor veilig werken, eerste hulp, brand, ontruiming en rust bij incidenten.",
            keywords: ["BHV-training", "bedrijfshulpverlening", "veiligheid werkvloer", "arbeidsongevallen", "BHV cursus", "BHV verplicht", "BHV Voorne aan Zee"],
            about: ["BHV", "veilig werken", "bedrijfshulpverlening", "arbeidsveiligheid"],
            datePublished: "2025-09-05",
            dateModified: "2026-07-08"
        },
        page: {
            variant: "guide",
            hero: "split",
            featureMediaPair: true,
            summary: "Wat er gebeurt bij een arbeidsongeval, wat je direct moet doen en waarom BHV-training dan verschil maakt.",
            highlight: "Bij een arbeidsongeval telt de eerste minuut. Wie weet wat hij moet doen, brengt rust en wint tijd.",
            takeaways: [
                "Eerst veiligheid: voorkom dat het incident groter wordt.",
                "Daarna alarmeren: intern, 112 en waar nodig de werkgever.",
                "Start hulp binnen je eigen kennis en mogelijkheden.",
                "Leg vast wat er is gebeurd en leer ervan voor de volgende keer."
            ]
        },
        content: [
            {
                id: "intro1",
                type: "paragraph",
                text: "Een arbeidsongeval begint vaak als een gewone werkdag. Iemand stapt mis, raakt bekneld, krijgt iets op zich of wordt onwel. In een paar seconden verandert de sfeer op de werkvloer: mensen schrikken, kijken naar elkaar en wachten op iemand die richting geeft."
            },
            {
                id: "intro2",
                type: "paragraph",
                text: "Juist dan maakt voorbereiding verschil. De vraag is niet alleen of er een verbanddoos of AED aanwezig is, maar vooral: wie neemt de leiding, wie belt 112, wie helpt het slachtoffer, wie houdt omstanders weg en wie vangt de professionele hulpdiensten op?"
            },
            {
                id: "heading0",
                type: "heading",
                level: 2,
                wide: true,
                text: "Waarom dit onderwerp aandacht verdient"
            },
            {
                id: "text0",
                type: "paragraph",
                text: "De Monitor Arbeidsongevallen 2024 van de Nederlandse Arbeidsinspectie laat zien dat arbeidsveiligheid blijvende aandacht vraagt. In 2024 rondde de Arbeidsinspectie 2.702 ongevalsonderzoeken af. Daarvan waren 1.990 ongevallen meldingsplichtig, met 2.001 slachtoffers en 58 dodelijke slachtoffers. Cijfers over 2025 zijn nog niet op dezelfde manier in kaart gebracht, daarom is deze blog gebaseerd op de meest recente monitor over 2024."
            },
            {
                id: "link1",
                type: "link",
                text: "Bekijk de BHV-trainingen",
                href: "/bhv"
            },
            {
                id: "link2",
                type: "link",
                text: "Vraag advies voor jouw organisatie",
                href: "/contact"
            },
            {
                id: "quote1",
                type: "blockquote",
                text: "Een goede BHV'er koopt tijd: voor het slachtoffer, voor collega's en voor de professionele hulpdiensten."
            },
            {
                id: "heading1",
                type: "heading",
                level: 2,
                text: "De video laat precies zien waar het om draait"
            },
            {
                id: "text1",
                type: "paragraph",
                text: "De korte video van V-Kam Education maakt de boodschap simpel: een ongeluk op het werk is geen theorie. Als er iets gebeurt, moet je niet eerst gaan uitzoeken wat de bedoeling is. Dan wil je dat mensen weten wie helpt, wie belt, wie begeleidt en wie overzicht houdt."
            },
            {
                id: "video1",
                type: "video",
                title: "Ongeluk op het werk? Dit moet je doen.",
                src: "https://www.youtube.com/embed/OdfWUprSj0E?si=UkkAyEJorbjmSdje",
                credit: "Deze video is eigendom van V-Kam Education en wordt getoond via YouTube."
            },
            {
                id: "heading2",
                type: "heading",
                level: 2,
                text: "Van schrik naar actie: wat doe je eerst?"
            },
            {
                id: "text2",
                type: "paragraph",
                text: "Bij een incident ontstaat bijna altijd ruis. Mensen willen helpen, maar lopen soms juist in de weg. Anderen wachten af, omdat ze niet zeker weten wat ze mogen doen. Een getrainde BHV'er brengt rust in die eerste fase en maakt van paniek een volgorde."
            },
            {
                id: "list1",
                type: "list",
                items: [
                    "Maak de situatie veilig voor slachtoffer, collega's en jezelf.",
                    "Alarmeer intern en bel 112 als dat nodig is.",
                    "Start eerste hulp binnen je eigen kennis en mogelijkheden.",
                    "Houd omstanders op afstand en geef duidelijke taken.",
                    "Vang professionele hulpdiensten op en geef kort door wat er is gebeurd.",
                    "Zorg dat de werkgever weet wanneer melden bij de Arbeidsinspectie verplicht is."
                ]
            },
            {
                id: "heading3",
                type: "heading",
                level: 2,
                wide: true,
                text: "Waarom BHV-training meer is dan een certificaat"
            },
            {
                id: "text3",
                type: "paragraph",
                text: "Een certificaat aan de muur helpt niemand als medewerkers in de praktijk niet durven handelen. Een goede BHV-training maakt noodsituaties herkenbaar en oefent de keuzes die onder spanning nodig zijn. Niet alleen reanimatie en AED, maar ook brand, ontruiming, communicatie en samenwerken met externe hulpdiensten."
            },
            {
                id: "image1",
                type: "image",
                src: bhvPraktijkTrainingImg,
                alt: "Praktijktraining BHV met blusdeken en brandpop"
            },
            {
                id: "text3b",
                type: "paragraph",
                text: "Juist door praktisch te oefenen zie je waar twijfel ontstaat: wie pakt de leiding, wie belt intern door, wie haalt de AED, wie houdt de doorgang vrij en wie vangt de ambulance of brandweer op? Die rolverdeling moet niet pas tijdens een echt incident duidelijk worden."
            },
            {
                id: "text3c",
                type: "paragraph",
                text: "Daarom hoort een BHV-training aan te sluiten op de werkplek zelf. In een kantoor oefen je andere situaties dan in een werkplaats, zorglocatie, winkel, horecaomgeving, school of camping. Hoe herkenbaarder de oefening, hoe groter de kans dat medewerkers later rustig en doelgericht handelen."
            },
            {
                id: "heading4",
                type: "heading",
                level: 2,
                text: "Maak het passend bij jouw werkplek"
            },
            {
                id: "text4",
                type: "paragraph",
                text: "De risico's in een kantoor zijn anders dan in een werkplaats, zorglocatie, winkel, horecaomgeving, school of camping. Daarom wordt BHV sterker wanneer je oefent met herkenbare situaties uit je eigen organisatie. Dan wordt veiligheid concreet: waar hangt de AED, welke uitgang gebruik je, wie neemt de leiding en hoe bereiken hulpdiensten de juiste plek?"
            },
            {
                id: "heading5",
                type: "heading",
                level: 2,
                text: "Gebruik een incident om beter voorbereid te zijn"
            },
            {
                id: "text5",
                type: "paragraph",
                text: "Na een ongeval wil je niet alleen weten wat er is gebeurd, maar ook waarom het kon gebeuren. Was de werkplek veilig genoeg? Waren instructies duidelijk? Was de BHV-bezetting passend? Door incidenten, bijna-incidenten en oefeningen serieus te bespreken, wordt veiligheid steeds praktischer en beter uitvoerbaar. Leg verbeterpunten vast en gebruik ze bij de volgende oefening of herhaling."
            }
        ],
        faq: [
            {
                question: "Wat doet een BHV'er bij een incident?",
                answer: "Een BHV'er verleent eerste hulp, alarmeert intern en extern, beperkt een beginnende brand als dat veilig kan en begeleidt een ontruiming. De belangrijkste taak is overzicht houden en snel de juiste stappen zetten."
            },
            {
                question: "Kan een BHV-training worden afgestemd op mijn organisatie?",
                answer: "Ja. Een training wordt sterker wanneer voorbeelden, risico's en scenario's passen bij jullie werkplek. Denk aan kantoor, zorg, winkel, horeca, werkplaats, school, camping of productieomgeving."
            },
            {
                question: "Is BHV verplicht voor bedrijven?",
                answer: "Ja. De basis staat in artikel 3 lid 1 onder e van de Arbowet: de werkgever moet doeltreffende maatregelen treffen voor eerste hulp bij ongevallen, brandbestrijding en evacuatie van werknemers en andere aanwezigen, en verbinding onderhouden met externe hulpverleningsorganisaties. Artikel 15 werkt dit verder uit voor de bedrijfshulpverlening. Hoeveel BHV'ers nodig zijn, hangt af van de grootte, risico's, bezetting en inrichting van de organisatie.",
                link: {
                    text: "Bekijk Arbowet artikel 3e en 15",
                    href: "https://wetten.overheid.nl/BWBR0010346/"
                }
            },
            {
                question: "Wanneer moet je een arbeidsongeval melden?",
                answer: "Een werkgever moet een arbeidsongeval direct melden bij de Nederlandse Arbeidsinspectie als het slachtoffer overlijdt, wordt opgenomen in het ziekenhuis of blijvend letsel oploopt. Twijfel je of een ongeval meldingsplichtig is, dan adviseert de Arbeidsinspectie om het ongeval toch te melden.",
                link: {
                    text: "Lees wanneer melden verplicht is",
                    href: "https://www.nlarbeidsinspectie.nl/onderwerpen/arbeidsomstandighedenwet/arbeidsongevallen"
                }
            },
            {
                question: "Wat heeft de RI&E met BHV te maken?",
                answer: "De RI&E laat zien welke risico's in een bedrijf aanwezig zijn. Op basis daarvan bepaal je welke maatregelen, BHV-taken, materialen en oefeningen nodig zijn. Zo sluit bedrijfshulpverlening beter aan op de echte situatie op de werkvloer.",
                link: {
                    text: "Lees meer over RI&E en plan van aanpak",
                    href: "https://www.nlarbeidsinspectie.nl/onderwerpen/arbeidsomstandighedenwet/risico-inventarisatie-evaluatie-en-plan-van-aanpak"
                }
            },
            {
                question: "Hoeveel BHV'ers heb je nodig?",
                answer: "Dat is niet voor ieder bedrijf hetzelfde. Het hangt af van de risico's, het aantal aanwezigen, werktijden, verdiepingen, bezoekers en hoe snel hulp beschikbaar moet zijn. De RI&E is een logisch startpunt om dit goed te bepalen."
            },
            {
                question: "Welke onderdelen horen bij een BHV-training?",
                answer: "Een BHV-training behandelt onder andere eerste hulp, reanimatie en AED, brandbestrijding met kleine blusmiddelen, alarmeren, communiceren en veilig ontruimen. De exacte invulling hangt af van het bedrijf en de risico's op de werkvloer."
            },
            {
                question: "Hoe vaak moet je BHV herhalen?",
                answer: "BHV-kennis zakt weg als je niet oefent. Jaarlijks herhalen is in de praktijk verstandig, zodat vaardigheden zoals reanimatie, AED-gebruik, brand en ontruiming actief blijven."
            }
        ]
    },
    {
        slug: "ontruimen-moet-je-oefenen",
        title: "Ontruimen moet je oefenen",
        date: "10 september 2025",
        category: "Ontruiming",
        author: "Wesley",
        image: blogOntruimenImg,
        seo: {
            title: "Ontruimen moet je oefenen | BHV Voorne aan Zee",
            description: "Waarom ontruimingsoefeningen nodig zijn, wat je ermee test en hoe oefenen zorgt voor rust en duidelijkheid bij nood.",
            keywords: ["ontruimingsoefening", "ontruimingsplan", "BHV", "NEN 8112", "veilig ontruimen"],
            about: ["ontruiming", "BHV", "veiligheid"],
            datePublished: "2025-09-10",
            dateModified: "2025-09-10"
        },
        page: {
            variant: "guide",
            hero: "split",
            summary: "Waarom ontruimingsoefeningen nodig zijn en hoe oefenen zorgt voor rust en duidelijkheid bij nood.",
            highlight: "Een ontruimingsplan werkt pas echt als mensen het geoefend hebben.",
            takeaways: [
                "Oefenen maakt duidelijk of routes, taken en communicatie werken.",
                "Iedere BHV'er en ontruimer moet weten wat zijn of haar rol is.",
                "Varieer scenario's zodat de organisatie niet op routine leunt.",
                "Evalueer na afloop wat goed ging en wat beter kan."
            ]
        },
        content: [
            {
                id: "intro1",
                type: "paragraph",
                text: "Stel je voor: het brandalarm gaat af. Sirenes loeien, lampen knipperen en in een fractie van een seconde verandert de rustige werkomgeving in een situatie vol spanning. Op dat moment moet iedereen weten wat er van hem of haar verwacht wordt. Maar zonder oefening ontstaat er vaak twijfel: welke uitgang moet ik nemen, waar is de verzamelplaats, moet ik mijn spullen meenemen? Juist in die momenten van onzekerheid ontstaat paniek. En precies dat is de reden waarom ontruimen niet alleen iets is voor in een handboek, maar vooral iets wat je samen moet oefenen."
            },
            { id: "heading1", type: "heading", level: 2, text: "De wettelijke plicht" },
            {
                id: "text1",
                type: "paragraph",
                text: "De Nederlandse wet laat hier geen twijfel over bestaan. Volgens artikel 15 van de Arbowet moet iedere werkgever zorgen voor een goed georganiseerde bedrijfshulpverlening. Dat betekent: voldoende BHV'ers, een actueel ontruimingsplan en - minstens zo belangrijk - regelmatige oefeningen. Ook de NEN 8112 schrijft duidelijk voor hoe een ontruimingsplan eruit moet zien en dat oefenen verplicht en aantoonbaar is."
            },
            {
                id: "text2",
                type: "paragraph",
                text: "Maar de waarde van oefenen gaat verder dan wet- en regelgeving. In de praktijk zie je pas tijdens een oefening of alles werkt zoals bedacht. Werkt de brandmeldinstallatie zoals gepland? Worden alle nooduitgangen gebruikt? Komen mensen rustig en vlot naar de verzamelplaats? Dat leer je niet uit een document, maar door het te doen."
            },
            { id: "heading2", type: "heading", level: 2, text: "Wat een goede oefening inhoudt" },
            {
                id: "text3",
                type: "paragraph",
                text: "Een effectieve ontruimingsoefening draait om meer dan 'met z'n allen naar buiten lopen'. Het gaat om samenwerking, communicatie en realisme. Iedere BHV'er en ontruimer heeft zijn eigen taak: van het controleren van ruimtes tot het begeleiden van collega's en bezoekers. Portofoons, noodverlichting en de brandmeldinstallatie moeten feilloos functioneren."
            },
            {
                id: "text4",
                type: "paragraph",
                text: "Daarnaast is het goed om te varieren in scenario's. Soms een kleine oefening met beperkte inzet, soms een onverwachte oefening midden op de dag. Wissel situaties af: een brand in de keuken, rookontwikkeling in een opslagruimte of zelfs een dreiging van buitenaf. Juist die variatie maakt een organisatie weerbaar."
            },
            { id: "heading3", type: "heading", level: 2, text: "Voorbereiden, doen en leren" },
            {
                id: "text5",
                type: "paragraph",
                text: "Een ontruimingsoefening vraagt om voorbereiding. Bepaal vooraf wat je wilt testen: de snelheid van het ontruimen, de rolverdeling, of juist de communicatie. Tijdens de uitvoering observeer je wat er goed gaat en noteer je de verbeterpunten."
            },
            {
                id: "text6",
                type: "paragraph",
                text: "Het allerbelangrijkste gebeurt daarna: de evaluatie. In een open gesprek bespreek je de ervaringen. Misschien was er onduidelijkheid over de verzamelplaats, of werd een nooddeur niet gebruikt. Door dit samen te bespreken, groeit het team en wordt de volgende oefening effectiever."
            },
            { id: "heading4", type: "heading", level: 2, text: "Waarom dit echt het verschil maakt" },
            {
                id: "text7",
                type: "paragraph",
                text: "Elke seconde telt in een noodsituatie. Een goed geoefende organisatie wint kostbare tijd - en tijd redt levens. Mensen doen in een crisis wat ze geoefend hebben; zonder oefening vervallen ze in paniek of wachten ze af. Daarom is oefenen geen overbodige luxe, maar een investering in veiligheid en vertrouwen."
            },
            { id: "heading5", type: "heading", level: 2, text: "Conclusie" },
            {
                id: "text8",
                type: "paragraph",
                text: "Ontruimen moet je oefenen - niet omdat het in de wet staat, maar omdat het de enige manier is om echt voorbereid te zijn. Een organisatie die oefent, laat zien dat veiligheid niet op papier staat, maar leeft in de praktijk. En dat geeft vertrouwen: voor collega's, bezoekers en iedereen die in jouw gebouw aanwezig is."
            }
        ]
    },
    {
        slug: "112nl-app-levensreddend",
        title: "112NL-app: sneller contact met de meldkamer",
        date: "7 juli 2026",
        category: "Noodmelding",
        author: "Wesley",
        image: header112Img,
        seo: {
            title: "112NL-app gebruiken bij noodsituaties | BHV Voorne aan Zee",
            headline: "112NL-app: sneller contact met de meldkamer",
            description: "Lees hoe de 112NL-app werkt, wanneer chatten met de meldkamer kan, welke gegevens worden meegestuurd en wat BHV'ers vooraf moeten instellen.",
            keywords: [
                "112NL-app",
                "112 app",
                "112 bellen",
                "meldkamer chat",
                "locatie delen 112",
                "BHV noodmelding",
                "EHBO noodsituatie"
            ],
            about: ["112NL-app", "noodmelding", "BHV", "EHBO", "meldkamer"],
            datePublished: "2026-07-07",
            dateModified: "2026-07-07"
        },
        page: {
            variant: "guide",
            hero: "split",
            featureMediaPair: true,
            summary: "Praktische uitleg over bellen, chatten, locatie delen en wat je vooraf moet instellen.",
            highlight: "Bel 112 alleen bij echte spoed. Gebruik de app niet om te testen.",
            takeaways: [
                "De 112NL-app helpt je sneller de juiste hulpdienst te bereiken.",
                "Locatie delen werkt alleen als je toestemming geeft en locatievoorzieningen aanstaan.",
                "De meldkamer kan een chat starten als spreken of verstaan lastig is.",
                "Vul je gegevens vooraf in, niet pas tijdens een noodsituatie."
            ]
        },
        content: [
            {
                id: "intro1",
                type: "paragraph",
                text: "Een noodsituatie komt altijd onverwacht. Je belt 112, maar wat als je niet precies weet waar je bent, niet goed kunt spreken of de situatie te chaotisch is om alles rustig uit te leggen? De 112NL-app helpt je om sneller en duidelijker contact te maken met de meldkamer."
            },
            { id: "heading1", type: "heading", level: 2, text: "Wat is de 112NL-app?" },
            {
                id: "text1",
                type: "paragraph",
                text: "De 112NL-app is bedoeld voor iedereen in Nederland die in nood snel en eenvoudig de meldkamer wil bereiken. Vanuit de app kun je direct aangeven of je politie, brandweer of ambulance nodig hebt. Je kunt ook aangeven dat je niet kunt spreken."
            },
            {
                id: "video1",
                type: "video",
                src: "https://www.youtube.com/embed/8srvlpzVxQk"
            },
            {
                id: "quote1",
                type: "blockquote",
                text: "Installeer de 112NL-app voordat je hem nodig hebt. In een echte noodsituatie wil je niet meer zoeken of instellen."
            },
            {
                id: "link1",
                type: "link",
                text: "Lees meer over de 112NL-app op de officiele politie-website",
                href: "https://www.politie.nl/informatie/informatie-over-de-112nl-app.html"
            },
            {
                id: "link2",
                type: "link",
                text: "Bekijk de veelgestelde vragen van de Landelijke Meldkamer Samenwerking",
                href: "https://www.meldkamersamenwerking.nl/voor-de-burger/"
            }
        ],
        faq: [
            {
                question: "Wat wordt er meegestuurd via de 112NL-app?",
                answer: "De app kan je gekozen hulpdienst, je vooraf ingevulde gegevens zoals naam en telefoonnummer, je locatie, informatie over moeite met spreken of horen en je voorkeurstaal voor de chatfunctie meesturen. Je locatie wordt alleen gebruikt als locatie delen aanstaat en je daar toestemming voor hebt gegeven."
            },
            {
                question: "Kan ik zelf een chat starten in de 112NL-app?",
                answer: "Nee. Je belt via de app met 112. De meldkamer kan een chat starten als het gesprek niet goed verloopt, als spreken of verstaan lastig is, of wanneer Nederlands of Engels moeilijk is. De chat kan het gesprek vertalen naar je voorkeurstaal."
            },
            {
                question: "Hoe zet ik de 112NL-app vooraf goed klaar?",
                answer: "Download de app op je telefoon, vul je gegevens vooraf in, geef toestemming voor locatie delen als je wilt dat je locatie wordt meegestuurd en zet notificaties aan. De app werkt niet op een tablet of laptop."
            },
            {
                question: "Wordt mijn locatie altijd meegestuurd via de 112NL-app?",
                answer: "Alleen wanneer locatie delen op je telefoon aanstaat en je de app toestemming hebt gegeven om je locatie te gebruiken."
            },
            {
                question: "Mag ik de 112NL-app testen?",
                answer: "Nee. Test de app niet zomaar, omdat je daarmee een lijn kunt bezetten die nodig is voor echte noodsituaties."
            },
            {
                question: "Wat is een praktisch voorbeeld van de 112NL-app?",
                answer: "Stel dat je getuige bent van een ongeluk in een buitengebied en niemand het exacte adres weet. Via de app kies je ambulance, je locatie wordt gedeeld als je daar toestemming voor hebt gegeven en de centralist kan zo nodig via chat aanvullende vragen stellen."
            },
            {
                question: "Wat betekent de 112NL-app voor BHV en EHBO?",
                answer: "Voor BHV'ers en EHBO'ers blijft rustig handelen belangrijk: veiligheid inschatten, eerste hulp starten, iemand 112 laten bellen en zorgen dat hulpdiensten goed worden opgevangen. De app vervangt geen training, maar kan wel helpen om sneller en duidelijker contact te krijgen met de meldkamer."
            }
        ]
    }
];
