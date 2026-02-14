import { jsPDF } from 'jspdf';
import logo from '@/assets/image/common/logo/logo.png';

// maximale breedte x 210
// maximale hoogte Y 297

export function generateBhvPdfWithLogo(name, companyName, email) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const img = new Image();
    img.src = logo;

    const footerText = 'www.bhvvoorneaanzee.nl | info@bhvvoorneaanzee.nl';

    const drawHeaderFooter = () => {
        // 🟧 Zwarte headerbalk
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, pageWidth, 30, 'F');

        // 📌 Logo linksboven
        const logoX = 175;
        const logoY = 3;
        const logoWidth = 25;
        const logoHeight = 25;
        doc.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight);

        // 📌 Headertekst rechts van logo
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        const headerText = 'BHV Voorne aan Zee – Veiligheid op maat';
        const textX = logoX + logoWidth - 180;
        const textY = 18;
        doc.text(headerText, textX, textY);

        // 🟧 Oranje footer
        doc.setFillColor(255, 102, 0);
        doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');

        // 📌 Footertekst gecentreerd
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        const textWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (pageWidth - textWidth) / 2, pageHeight - 7);
    };



    img.onload = () => {
        // ➕ Pagina 1 – Intro
        drawHeaderFooter();
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text(`Welkom ${name}, bij het downlouden van dit formulier`,20, 50 );
        doc.text(`Bedrijf: ${companyName}`, 20, 60);
        doc.text(`E-mailadres: ${email}`, 20, 70);
        doc.setFontSize(12);
        doc.text('In deze gids lees je alles over:', 20, 80);
        doc.text('- Hoe je BHV goed organiseert binnen je bedrijf', 25, 90);
        doc.text('- Wettelijke verplichtingen', 25, 95);
        doc.text('- Onze aanpak in Voorne aan Zee', 25, 100);




        // ➕ Pagina 2 – Organisatie
        doc.addPage();
        drawHeaderFooter();
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('1. Hoe je BHV goed organiseert binnen je bedrijf', 50, 45);
        doc.setFontSize(11);
        doc.text([
            'Als werkgever ben je volgens de Arbowet verplicht om de veiligheid en gezondheid van je medewerkers te waarborgen. ',
            '',
            'Een goed ingerichte BHV-organisatie maakt hier essentieel onderdeel van uit.',
            'Maar weet je precies waar je als ondernemer aan moet voldoen?  ',
            'Heb je bijvoorbeeld in kaart gebracht hoeveel BHV’ers er nodig zijn op jouw locatie?',
            'Of hoe vaak zij moeten worden bijgeschoold?',
            '',
            'De belangrijkste verplichtingen op een rij:',
        ], 20, 55, { maxWidth: 170 });
        doc.text([

            '- Er moet altijd minimaal één getrainde BHV’er aanwezig zijn tijdens werktijd.',
            '- BHV’ers moeten regelmatig worden getraind en hun kennis op peil houden.',
            '- Medewerkers moeten duidelijke instructies krijgen over hoe te handelen bij incidenten.',
            '- Er moet afstemming zijn met externe hulpdiensten zoals brandweer en ambulance.',
            '- EHBO-koffers, blusmiddelen en andere hulpmiddelen moeten beschikbaar en toegankelijk zijn. ',
        ], 25, 100, { maxWidth: 170 });

        doc.text([
            'Heb je dit al goed geregeld?',
            'Of twijfel je of je BHV-structuur nog voldoet aan de huidige wetgeving?',
            '',
            'Wij denken graag met je mee en kunnen een vrijblijvende analyse maken van jouw huidige situatie.',
        ], 20, 130, { maxWidth: 170 });



        // // ➕ Pagina 3 – Wettelijke verplichtingen
        doc.addPage();
        drawHeaderFooter();
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('2. Wettelijke verplichtingen', 69, 45);
        doc.setFontSize(11);
        doc.text('Als werkgever ben je in Nederland volgens de Arbowet (Arbeidsomstandighedenwet) verplicht om te zorgen voor een veilige en gezonde werkomgeving. Een goed georganiseerde bedrijfshulpverlening (BHV) is daar een essentieel onderdeel van.', 20, 55, { maxWidth: 170 });
        doc.setFontSize(13);
        doc.text('Wat zegt de wet?', 22, 75, { maxWidth: 170 });
        doc.setFontSize(11);
        doc.text( [
            'De Arbowet stelt dat elke werkgever – ongeacht de grootte van het bedrijf – BHV moet organiseren. Er moet altijd iemand aanwezig zijn die adequaat kan handelen bij een calamiteit, zoals brand, ontruiming of een medische noodsituatie.',
            '',
            'Maar wat betekent dat concreet?',
        ], 20, 82, { maxWidth: 170 });
        doc.text( [
            'Moet jouw bedrijf één BHV’er hebben, of meerdere?',
            'Zijn jouw BHV’ers goed opgeleid en gecertificeerd?',
            'Is hun kennis actueel?',
            'Heb je een ontruimingsplan dat iedereen kent?',
            'Is er een vaste procedure voor het melden van incidenten?',
        ], 30, 107, { maxWidth: 170 });
        doc.setFontSize(13);
        doc.text('Wat ben je verplicht te regelen?', 22, 135, { maxWidth: 170 });
        doc.setFontSize(11);
        doc.text('De belangrijkste verplichtingen op een rij:', 20, 142, { maxWidth: 170 });
        doc.text( [
            'Je moet voldoende BHV’ers aanwijzen. Het aantal hangt af van het aantal werknemers, het type werkzaamheden en de risico’s.',
            'Je moet zorgen voor adequate opleiding en uitrusting van de BHV’ers. Denk aan blusmiddelen, EHBO-koffers en communicatiemiddelen.',
            'De BHV-organisatie moet altijd operationeel zijn – dus ook bij afwezigheid door vakantie of ziekte.',
            'Je moet zorgen voor duidelijke instructies aan alle medewerkers over hoe zij moeten handelen bij incidenten.',
            'Er moet afstemming zijn met externe hulpdiensten, zoals brandweer en ambulance.',
        ], 30, 150, { maxWidth: 150 });
        doc.setFontSize(13);
        doc.text('Waarom is dit belangrijk?', 22, 195, { maxWidth: 170 });
        doc.setFontSize(11);
        doc.text( [
            'De gevolgen van een gebrekkige BHV-organisatie zijn groot: mensenlevens kunnen in gevaar komen, en je riskeert bovendien hoge boetes van de Nederlandse Arbeidsinspectie. Ook kan je aansprakelijk worden gesteld bij schade of letsel.',
            '',
            'Daarom is het verstandig om jezelf als werkgever regelmatig de volgende vragen te stellen:',
        ], 20, 202, { maxWidth: 170 });
        doc.text( [
            'Heb ik mijn risico’s voldoende in kaart gebracht?',
            'Weet ik wat de minimale eisen zijn voor mijn branche?',
            'Zijn mijn BHV’ers gemotiveerd en voldoende getraind?',
            'Zijn de procedures op papier én bekend bij het personeel?',
        ], 30, 226, { maxWidth: 170 });
        doc.setFontSize(13);
        doc.text('Wat kun je nu al doen?', 22, 250);
        doc.setFontSize(11);
        doc.text('Wij adviseren om minimaal één keer per jaar je BHV-organisatie te evalueren. Wij helpen je hier graag bij met een vrijblijvende risico-inschatting, helder inzicht in de wettelijke eisen voor jouw branche, praktijkgerichte trainingen volgens de Arbowet en oplossingen op maat voor zowel kleine als grote organisaties.', 20, 256, { maxWidth: 170 });




        // ➕ Pagina 4 – Onze aanpak
        doc.addPage();
        drawHeaderFooter();
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('3. Onze aanpak in Voorne aan Zee', 60, 45);
        doc.setFontSize(11);
        doc.text([
            'Bij BHV Voorne aan Zee geloven we dat bedrijfshulpverlening niet alleen een wettelijke verplichting is, maar vooral een essentieel onderdeel van een veilige werkomgeving. Onze aanpak is daarom niet standaard, maar volledig afgestemd op jouw organisatie, jouw mensen en jouw omgeving.',
            '',
            'Wij stellen je de vragen die ertoe doen:',
        ], 20, 55, { maxWidth: 170 });
        doc.text( [
            'Zijn je medewerkers voldoende voorbereid op noodsituaties?',
            'Heb je een helder en werkbaar BHV-plan dat past bij jouw bedrijfsvoering?',
            'Oefen je regelmatig met scenario’s die echt kunnen voorkomen in jouw branche?',
        ], 30, 79, { maxWidth: 170 });
        doc.text('Onze ervaring leert dat een BHV-plan pas werkt als het aansluit op de praktijk. Daarom starten we altijd met een vrijblijvende intake, waarin we samen jouw situatie analyseren:', 20, 99, { maxWidth: 170 });
        doc.text( [
            'Wat zijn de grootste risico’s binnen jouw bedrijf?',
            'Welke BHV-structuur is realistisch en haalbaar?',
            'Welke wettelijke eisen zijn voor jouw type onderneming van toepassing?',
        ], 30, 110, { maxWidth: 170 });
        doc.text('Op basis daarvan doen wij een voorstel op maat, met daarin:', 20, 129, { maxWidth: 170 });
        doc.text( [
            'Een helder opleidingsplan (theorie en praktijk)',
            'Aanbevolen aantal BHV’ers per locatie',
            'Inhoud en frequentie van oefeningen',
            'Advies over communicatie en veiligheidssignalering op de werkvloer',
        ], 30, 135, { maxWidth: 170 });
        doc.setFontSize(14);
        doc.text('Onze trainingen', 20, 165);
        doc.setFontSize(11);
        doc.text([
            'Onze trainingen zijn praktisch, no-nonsense en interactief. Geen saaie lesdagen, maar energieke sessies met realistische scenario’s, geleid door ervaren instructeurs. Wij trainen op locatie of op een van onze trainingslocaties in Voorne aan Zee. Flexibiliteit is onze kracht: ook in de avonduren of op zaterdagen.',
            '',
            'Tot slot: wij houden je op de hoogte van hercertificering, wijzigingen in de wetgeving en nieuwe trainingen. Zo blijft jouw organisatie niet alleen compliant, maar vooral veilig.',
            '',
            'Klaar om jouw BHV-aanpak serieus te organiseren? Neem gerust contact met ons op – wij denken met je mee, zonder verplichting.',
        ], 20, 175, { maxWidth: 170 });


        // 💾 PDF downloaden
        doc.save(`BHV-gids-${companyName}.pdf`);
    };
}
