import blogOntruimenImg from "@/assets/image/blog/ontruimen/Blog_Ontruimen.png"
import blogArbeidsOngevallen from "@/assets/image/blog/arbeidsongevallen/Blog_arbeidsongevallen.png"
import header112Img from "@/assets/image/blog/112app/Blog_112_Header.webp";
import poster112Img from "@/assets/image/blog/112app/Blog_112_Poster.webp";
import headerBurgerhulpImg from "@/assets/image/blog/burgerhulpverlener/headerBurgerhulpImg.webp";



export const posts = [

    {
        slug: "tekort-burgerhulpverleners-lokaal",
        title: "Tekort aan burgerhulpverleners: elke minuut telt",
        date: "18 februari 2026",
        author: "Wesley",
        image: headerBurgerhulpImg,
        content: [
            {
                id: "intro1",
                type: "paragraph",
                text: "In het nieuws was het opnieuw te horen: er zijn te weinig burgerhulpverleners in Nederland. En dat is zorgelijk. Bij een hartstilstand buiten het ziekenhuis zijn de eerste 6 minuten cruciaal. Hoe sneller gestart wordt met reanimatie en een AED wordt ingezet, hoe groter de overlevingskans."
            },

            {id: "heading1", type: "heading", level: 2, text: "Wat is een burgerhulpverlener?"},
            {
                id: "text1",
                type: "paragraph",
                text: "Een burgerhulpverlener is iemand die via het oproepsysteem van HartslagNu wordt gealarmeerd bij een mogelijke hartstilstand in de buurt. Je ontvangt een melding op je telefoon en gaat direct naar het slachtoffer of haalt een AED op. Zo wordt de tijd tot de eerste hulpverlening drastisch verkort."
            },

            // {id: "image1", type: "image", src: burgerhulpImg, alt: "Burgerhulpverlener met AED in woonwijk"},

            {id: "heading2", type: "heading", level: 2, text: "Waarom zijn er meer nodig?"},
            {
                id: "list1",
                type: "list",
                items: [
                    "Niet elke regio heeft voldoende actieve hulpverleners.",
                    "Overdag zijn veel mensen niet in hun woonwijk aanwezig.",
                    "Snelle start van reanimatie verdubbelt of verdrievoudigt de overlevingskans.",
                    "Meer aanmeldingen betekent kortere responstijd."
                ]
            },

            {id: "heading3", type: "heading", level: 2, text: "Aanmelden als burgerhulpverlener"},
            {
                id: "text2",
                type: "paragraph",
                text: "Wil jij het verschil maken? Meld je aan via HartslagNu. Na registratie kun je worden opgeroepen bij een reanimatiemelding in jouw buurt. Een geldig reanimatiecertificaat is vereist."
            },

            {
                id: "link1",
                type: "link",
                text: "Meld je aan als burgerhulpverlener via HartslagNu",
                href: "https://hartslagnu.nl/burgerhulpverlening/aanmelden/"
            },

            {id: "heading4", type: "heading", level: 2, text: "Nog geen certificaat?"},
            {
                id: "text3",
                type: "paragraph",
                text: "Heb je nog geen geldig reanimatiecertificaat of wil je je vaardigheden opfrissen? Dan kun je bij mij een praktijkgerichte training volgen. Ik train cursisten in de regio Voorne aan Zee, Rozenburg, Maassluis en Vlaardingen. Kleine groepen, veel praktijk en realistische scenario’s."
            },

            {
                id: "link2",
                type: "link",
                text: "Neem contact op voor training of meer informatie",
                href: "/contact"
            },

            {
                id: "quote1",
                type: "blockquote",
                text: "Een burgerhulpverlener kan het verschil maken tussen leven en dood – ook in jouw straat."
            }
        ]
    },

    {


    // Post 1
        slug: "bhv-training-veiligheid-werkvloer",
        title: "Waarom een BHV-training onmisbaar is voor veiligheid op de werkvloer",
        date: "5 september 2025",
        author: "Wesley",
        image: blogArbeidsOngevallen,
        content: [
            { "id": "heading1", "type": "heading", "level": 2, "text": "Waarom BHV-training essentieel is" },
            { "id": "text1", "type": "paragraph", "text": "In Nederland gebeuren jaarlijks duizenden arbeidsongevallen. Volgens het Jaarverslag 2024 van de Nederlandse Arbeidsinspectie werden er in dat jaar 4.306 arbeidsongevallen gemeld, waarvan 52 dodelijk. Dat zijn gemiddeld 12 ongevallen per dag, waarvan één met dodelijke afloop. Deze cijfers laten zien dat veiligheid op de werkvloer geen luxe is, maar een noodzaak." },
            { "id": "text2", "type": "paragraph", "text": "Hier komt de rol van BHV (bedrijfshulpverlening) om de hoek kijken. BHV is niet alleen een wettelijke verplichting voor bedrijven, maar vooral een investering in de veiligheid van medewerkers en collega’s." },

            { "id": "heading2", "type": "heading", "level": 2, "text": "Wat is BHV en waarom belangrijk?" },
            { "id": "text3", "type": "paragraph", "text": "BHV staat voor bedrijfshulpverlening en omvat eerste hulp bij ongevallen, brandbestrijding en het coördineren van evacuaties. BHV’ers worden opgeleid om in noodsituaties snel en effectief te handelen, waardoor schade en letsel zoveel mogelijk wordt beperkt." },
            { "id": "list1", "type": "list", "items": [
                    "Reanimeren en gebruik van een AED",
                    "Brandbestrijding met kleine blusmiddelen",
                    "Veilige evacuatieprocedures begeleiden",
                    "Eerste hulp bij verwondingen zoals snijwonden of botbreuken"
                ] },

            { "id": "image1", "type": "image", "src": blogArbeidsOngevallen, "alt": "Illustratie BHV-training op de werkvloer" },

            { "id": "heading3", "type": "heading", "level": 2, "text": "BHV bij incidenten" },
            { "id": "text4", "type": "paragraph", "text": "De meeste mensen associëren BHV met preventie, maar het grootste belang ligt vaak in actief handelen bij incidenten. Wanneer een ongeval zich voordoet, telt elke seconde. Een goed opgeleide BHV’er kan eerste hulp verlenen, paniek voorkomen en hulpdiensten inschakelen." },
            { "id": "quote1", "type": "blockquote", "text": "Oefening baart kunst – iedere seconde telt in noodsituaties." },

            { "id": "video1", "type": "video", "src": "https://www.youtube.com/embed/OdfWUprSj0E?si=UkkAyEJorbjmSdje" },

            { "id": "sep1", "type": "separator" },

            { "id": "heading4", "type": "heading", "level": 2, "text": "Conclusie" },
            { "id": "text5", "type": "paragraph", "text": "De cijfers liegen er niet om: jaarlijks vinden er duizenden ongevallen plaats op de werkvloer. BHV-trainingen geven medewerkers kennis, vaardigheden en zelfvertrouwen om effectief te handelen. Een BHV-cursus is daarom een investering in veiligheid, welzijn en levensreddend handelen." }
        ]
    },
    {
        slug: "ontruimen-moet-je-oefenen",
        title: "Ontruimen moet je oefenen",
        date: "10 september 2025",
        author: "Wesley",
        image: blogOntruimenImg,
        content: [
            { id: "intro1", type: "paragraph", text: "Stel je voor: het brandalarm gaat af. Sirenes loeien, lampen knipperen en in een fractie van een seconde verandert de rustige werkomgeving in een situatie vol spanning. Op dat moment moet iedereen weten wat er van hem of haar verwacht wordt. Maar zonder oefening ontstaat er vaak twijfel: welke uitgang moet ik nemen, waar is de verzamelplaats, moet ik mijn spullen meenemen? Juist in die momenten van onzekerheid ontstaat paniek. En precies dát is de reden waarom ontruimen niet alleen iets is voor in een handboek, maar vooral iets wat je samen moet oefenen." },

            { id: "heading1", type: "heading", level: 2, text: "De wettelijke plicht" },
            { id: "text1", type: "paragraph", text: "De Nederlandse wet laat hier geen twijfel over bestaan. Volgens artikel 15 van de Arbowet moet iedere werkgever zorgen voor een goed georganiseerde bedrijfshulpverlening. Dat betekent: voldoende BHV’ers, een actueel ontruimingsplan en – minstens zo belangrijk – regelmatige oefeningen. Ook de NEN 8112 schrijft duidelijk voor hoe een ontruimingsplan eruit moet zien en dat oefenen verplicht en aantoonbaar is." },
            { id: "text2", type: "paragraph", text: "Maar de waarde van oefenen gaat verder dan wet- en regelgeving. In de praktijk zie je pas tijdens een oefening of alles werkt zoals bedacht. Werkt de brandmeldinstallatie zoals gepland? Worden alle nooduitgangen gebruikt? Komen mensen rustig en vlot naar de verzamelplaats? Dat leer je niet uit een document, maar door het te doen." },

            { id: "heading2", type: "heading", level: 2, text: "Wat een goede oefening inhoudt" },
            { id: "text3", type: "paragraph", text: "Een effectieve ontruimingsoefening draait om meer dan ‘met z’n allen naar buiten lopen’. Het gaat om samenwerking, communicatie en realisme. Iedere BHV’er en ontruimer heeft zijn eigen taak: van het controleren van ruimtes tot het begeleiden van collega’s en bezoekers. Portofoons, noodverlichting en de brandmeldinstallatie moeten feilloos functioneren." },
            { id: "text4", type: "paragraph", text: "Daarnaast is het goed om te variëren in scenario’s. Soms een kleine oefening met beperkte inzet, soms een onverwachte oefening midden op de dag. Wissel situaties af: een brand in de keuken, rookontwikkeling in een opslagruimte of zelfs een dreiging van buitenaf. Juist die variatie maakt een organisatie weerbaar." },

            { id: "heading3", type: "heading", level: 2, text: "Voorbereiden, doen en leren" },
            { id: "text5", type: "paragraph", text: "Een ontruimingsoefening vraagt om voorbereiding. Bepaal vooraf wat je wilt testen: de snelheid van het ontruimen, de rolverdeling, of juist de communicatie. Tijdens de uitvoering observeer je wat er goed gaat en noteer je de verbeterpunten." },
            { id: "text6", type: "paragraph", text: "Het allerbelangrijkste gebeurt daarna: de evaluatie. In een open gesprek bespreek je de ervaringen. Misschien was er onduidelijkheid over de verzamelplaats, of werd een nooddeur niet gebruikt. Door dit samen te bespreken, groeit het team en wordt de volgende oefening effectiever." },

            { id: "heading4", type: "heading", level: 2, text: "Waarom dit écht het verschil maakt" },
            { id: "text7", type: "paragraph", text: "Elke seconde telt in een noodsituatie. Een goed geoefende organisatie wint kostbare tijd – en tijd redt levens. Mensen doen in een crisis wat ze geoefend hebben; zonder oefening vervallen ze in paniek of wachten ze af. Daarom is oefenen geen overbodige luxe, maar een investering in veiligheid en vertrouwen." },

            { id: "heading5", type: "heading", level: 2, text: "Conclusie" },
            { id: "text8", type: "paragraph", text: "Ontruimen moet je oefenen – niet omdat het in de wet staat, maar omdat het de enige manier is om écht voorbereid te zijn. Een organisatie die oefent, laat zien dat veiligheid niet op papier staat, maar leeft in de praktijk. En dát geeft vertrouwen: voor collega’s, bezoekers en iedereen die in jouw gebouw aanwezig is." }
        ]
    },

// Bovenaan in je bestand


    {
        slug: "112nl-app-levensreddend",
        title: "112NL-app: als elke seconde telt",
        date: "1 oktober 2025",
        author: "Wesley",
        image: header112Img,
        content: [
            {
                id: "intro1",
                type: "paragraph",
                text: "Een noodsituatie komt altijd onverwacht. Je belt 112, maar wat als je niet precies weet waar je bent? Misschien sta je langs de snelweg zonder hectometerpaal, of midden in een natuurgebied zonder herkenningspunten. Juist op dat moment telt elke seconde – en kan de 112NL-app het verschil maken."
            },

            {id: "heading1", type: "heading", level: 2, text: "Wat is de 112NL-app?"},
            {
                id: "text1",
                type: "paragraph",
                text: "De 112NL-app is een officiële app van de overheid die je direct verbindt met de meldkamer. Het bijzondere aan de app is dat cruciale informatie automatisch wordt gedeeld: je locatie, je gegevens en de hulpdienst die je nodig hebt. Zo gaat er geen kostbare tijd verloren."
            },

            {id: "image1", type: "image", src: poster112Img, alt: "Voorlichtingsposter 112NL-app met QR-code"},

            {id: "heading2", type: "heading", level: 2, text: "De belangrijkste voordelen"},
            {
                id: "list1",
                type: "list",
                items: [
                    "Locatie direct meegestuurd – de meldkamer weet meteen waar je bent.",
                    "Direct de juiste centralist – politie, brandweer of ambulance, zonder doorschakelen.",
                    "Je gegevens vooraf ingevuld – zoals naam, telefoonnummer en eventuele spraak- of gehoorproblemen.",
                    "Chatfunctie – ideaal als je niet kunt spreken of verstaan."
                ]
            },

            {id: "heading3", type: "heading", level: 2, text: "Zie hoe het werkt"},
            {
                id: "video1",
                type: "video",
                src: "https://www.youtube.com/embed/8srvlpzVxQk"
            },

            {id: "heading4", type: "heading", level: 2, text: "Een praktisch voorbeeld"},
            {
                id: "text2",
                type: "paragraph",
                text: "Je bent getuige van een ongeluk. Paniek om je heen, niemand weet het exacte adres. Via de app wordt je locatie automatisch doorgestuurd en komt de juiste hulpdienst meteen in actie. Terwijl jij via chat de situatie doorgeeft, zijn politie en ambulance al onderweg."
            },

            {id: "heading5", type: "heading", level: 2, text: "Download en gebruik"},
            {
                id: "text3",
                type: "paragraph",
                text: "De app is gratis beschikbaar voor Android en iOS. Vul direct je gegevens in na installatie, zodat de app altijd klaarstaat wanneer elke seconde telt. Onthoud: misbruik van 112 is strafbaar – gebruik de app alleen in echte noodgevallen."
            },

            {
                id: "quote1",
                type: "blockquote",
                text: "112 bellen redt levens – de 112NL-app maakt het sneller, makkelijker en betrouwbaarder."
            },

            {
                id: "link1",
                type: "link",
                text: "Lees meer over de 112NL-app op de officiële politie-website",
                href: "https://www.politie.nl/informatie/informatie-over-de-112nl-app.html"
            }
        ]
    },



    {
        slug: "bhv-training-cruciaal",
        title: "Waarom BHV-training cruciaal is",
        date: "5 september 2025",
        author: "Wesley",
        image: "",
        content: [
            { id: "heading1", type: "heading", level: 2, text: "Introductie" },
            { id: "text1", type: "paragraph", text: "Een goede BHV-training redt levens." },
            { id: "text2", type: "paragraph", text: "Herhaling en oefening zijn essentieel." },
            { id: "list1", type: "list", items: ["Altijd bereikbaar zijn", "Kennis van levensreddende handelingen", "Weten hoe je een ontruiming goed uitvoert"] },
            { id: "image1", type: "image", src: "https://via.placeholder.com/600x300", alt: "BHV training" },
            { id: "quote1", type: "blockquote", text: "Oefening baart kunst." },
            { id: "code1", type: "code", language: "javascript", code: "console.log('Hello BHV');" },
            { id: "video1", type: "video", src: "https://www.youtube.com/embed/VIDEO_ID" },
            { id: "sep1", type: "separator" },
            { id: "heading2", type: "heading", level: 3, text: "Conclusie" },
            { id: "text3", type: "paragraph", text: "BHV en EHBO kennis blijft essentieel. Blijf oefenen en bijscholen." }
        ]
    }
    ]
