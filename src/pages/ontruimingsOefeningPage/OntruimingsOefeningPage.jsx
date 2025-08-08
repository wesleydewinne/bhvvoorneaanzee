import './OntruimingsOefeningPage.css';

import Tile from "../../components/tile/Tile.jsx";
import GeneralButton from "../../components/button/GeneralButton/GeneralButton.jsx";
import { PersonSimpleRun } from "phosphor-react";

import tabletop from "../../assets/image/ontruimingsoefening/Ontruimingsoefening tabletop.png";
import ontruiming2 from "../../assets/image/ontruimingsoefening/ontruiming.png";
import CardFallback from "../../assets/image/Card-Fallback.png";

import React from "react";

function OntruimingsOefeningPage() {
    return (
        <>
        <section className="text-ontruimingsoefening-top">
            <p>Een ontruimingsoefening bestaat uit verschillende stadia met oplopende moeilijkheidsgraad en complexiteit. Dit maakt het mogelijk om oefeningen te kiezen die passen bij de specifieke situatie en ervaring van een organisatie. In het begin leren medewerkers de theorie en basisprincipes van evacuatie, wat ideaal is voor nieuwe organisaties. Vervolgens wordt er een fysieke ontruiming gepland waarbij de datum en het tijdstip vooraf worden aangekondigd. Dit helpt om vertrouwd te raken met de procedures. Daarna wordt de dag van de oefening aangekondigd, maar blijft het exacte tijdstip onbekend. Dit vergroot het realisme en zorgt ervoor dat medewerkers alert blijven. Na verloop van tijd voert de organisatie een ontruimingsoefening uit zonder voorafgaande aankondiging of bespreking. De instructeur start de oefening onaangekondigd en de interne veiligheidsteam moet direct handelen. Een lotusslachtoffer kan ingezet worden om de oefening realistischer te maken en de vaardigheden te testen. In de meest uitdagende fase worden externe hulpdiensten zoals brandweer en ambulance betrokken. Zonder aankondiging starten zij de oefening samen met het interne team, wat de samenwerking en communicatie test. Deze uitgebreide oefeningen helpen om de paraatheid en veiligheid van de organisatie te verbeteren, zodat iedereen goed voorbereid is op een noodsituatie.</p>
        </section>
            <div className='inner-container-tile-reserve'>
            <Tile
                imageUrl={tabletop}
                altText="Afbleeding van een tabletop ontruimingsoefeningen"
        />
        <Tile
            title="Fase 0"
            subtitle1="Tabletop oefening"
            subtitle2="Doornemen ontruimingsplan met de BHV-organisatie"
            description="Een tabletop oefening is een effectieve manier om een ontruimingsplan te testen en te verbeteren. Door de oefening op de locatie van de klant uit te voeren, kunnen we verschillende scenario's doornemen, zoals brand of gaslekken, en direct de praktische toepasbaarheid van het plan evalueren. Tijdens de oefening worden zowel het plan als de reacties van de medewerkers stap voor stap besproken. Dit biedt een gelegenheid om vragen te beantwoorden en onduidelijkheden op te lossen. Meerdere scenario's worden geoefend om ervoor te zorgen dat het personeel flexibel kan reageren op onverwachte situaties. Door de locatie te gebruiken, kunnen we tevens eventuele tekortkomingen in de fysieke omgeving identificeren, zoals ontoegankelijke nooduitgangen of onduidelijke noodverlichting. Na elke oefening evalueren we de resultaten en maken we verbeterpunten kenbaar. Het doel is om het personeel goed voorbereid te laten zijn, zodat ze weten wat te doen in geval van een noodsituatie, wat de veiligheid van iedereen ten goede komt."
        />
    </div>
    <div className='inner-container-tile'>
        <Tile
            imageUrl={tabletop}
            altText="Afbleeding van een tabletop ontruimingsoefeningen"
        />
        <Tile
            title="Fase 1"
            subtitle1="Fysieke Ontruiming"
            subtitle2="Datum en tijdstip worden vooraf aangekondigd"
            description="Voorafgaand aan de oefening vindt een uitgebreide voorbespreking plaats met de organisator, zoals het hoofd BHV. Tijdens deze bespreking worden de doelstellingen, scenario's en verantwoordelijkheden doorgenomen om iedereen goed voor te bereiden. De daadwerkelijke ontruiming wordt uitgevoerd onder begeleiding van een ervaren instructeur, die de oefening observeert en evalueert. Deze fase is vooral geschikt voor organisaties die nieuw zijn in hun gebouw of recent zijn verhuisd, omdat het helpt om vertrouwd te raken met de specifieke kenmerken van de locatie en de ontruimingsprocedures. Het doel is om de paraatheid van de organisatie te verbeteren en ervoor te zorgen dat iedereen weet wat te doen in een noodsituatie, wat bijdraagt aan een verhoogde veiligheid en een effectieve reactie tijdens een echte evacuatie."
        />
    </div>
    <div className='inner-container-tile-reserve'>
        <Tile
            imageUrl={ontruiming2}
            altText="Afbleeding van een tabletop ontruimingsoefeningen"
        />
        <Tile
            title="fase 2"
            subtitle1="Fysieke Ontruiming"
            subtitle2="Dag of week worden vooraf aangekondigd"
            description="Een fysieke ontruiming waarbij de dag of week vooraf wordt aangekondigd, maar niet het exacte tijdstip. Voorafgaand aan de oefening vindt een voorbespreking plaats met de organisator, zoals het hoofd BHV. De instructeur heeft een waarnemende rol in plaats van een leidende rol, waardoor medewerkers de ontruimingsprocedures zelf moeten toepassen. Dit verhoogt het realisme en test hoe snel en effectief het personeel reageert op een onverwachte noodsituatie, wat bijdraagt aan de algehele paraatheid en veiligheid van de organisatie."
        />
    </div>
    <div className='inner-container-tile'>
        <Tile
            imageUrl={tabletop}
            altText="Afbleeding van een tabletop ontruimingsoefeningen"
        />
        <Tile
            title="fase 3"
            subtitle1="Fysieke Ontruiming"
            subtitle2="Dag of week wordt niet vooraf aangekondigd"
            description="De ontruimingsoefening wordt de oefening zo realistisch mogelijk uitgevoerd zonder voorafgaande aankondiging van de dag of week. De instructeur komt onaangekondigd en onopvallend naar de organisatie en start de oefening. De uitvoering van de ontruiming ligt volledig in handen van de BHV-organisatie, waardoor hun paraatheid en reactievermogen op de proef worden gesteld. Daarnaast kan ervoor gekozen worden om een lotusslachtoffer in te zetten om de oefening nog realistischer te maken. Deze aanpak zorgt voor een grondige test van de ontruimingsprocedures en de effectieve samenwerking van het team in een onverwachte noodsituatie."
        />
    </div>
    <div className='inner-container-tile-reserve'>
        <Tile
            imageUrl={CardFallback}
            altText="Afbleeding van een tabletop ontruimingsoefeningen"
        />
        <Tile
            title="fase 4"
            subtitle1="Fysieke Ontruiming"
            subtitle2="Externe hulpverleningsdiensten worden betrokken bij de oefening"
            description="De ontruimingsoefening worden externe hulpdiensten betrokken. De oefening is vooraf niet aangekondigde bij het personeel. De instructeur blijft op de achtergrond en observeert, terwijl de BHV-organisatie de leiding heeft over de ontruiming. Externe hulpdiensten zoals brandweer en ambulance doen mee, wat de realiteit van de oefening vergroot en de communicatie en coördinatie tussen alle partijen test. Er kan ook een lotusslachtoffer worden ingezet om de oefening nog realistischer te maken. Dit helpt om mogelijke zwakke punten te identificeren en de paraatheid en veiligheid van de organisatie te verhogen."
        />
    </div>

    <section className='text-buttons-ontruimingsoefening-bottum'>
        <div className="text-ontruimingsoefening-bottum">
            <p>Als je net naar een nieuwe locatie bent verhuisd of nog nooit een ontruimingsoefening hebt gedaan, zijn een tabletop, Fase 0 en Fase 1 de perfecte startpunten om jouw organisatie voor te bereiden op noodsituaties. In de tabletop fase introduceren we de theorie en basisprincipes van evacuatie, zodat jouw personeel een grondig begrip krijgt van de procedures. Fase 1 omvat een fysieke ontruiming waarbij de datum en het tijdstip vooraf worden aangekondigd, met begeleiding van onze ervaren instructeurs om een soepel verloop te garanderen. Voor organisaties die al vaker hebben geoefend, bieden Fase 2, Fase 3 en Fase 4 een hogere mate van realisme en uitdaging. In Fase 2 wordt de dag aangekondigd, maar blijft het exacte tijdstip een verrassing, waardoor het team alert blijft. Fase 3 wordt volledig onaangekondigd uitgevoerd om de reactiesnelheid en paraatheid van jouw BHV-organisatie te testen. Voor de ultieme realistische simulatie wordt in Fase 4 de hulp van externe diensten zoals brandweer en ambulance ingeroepen. Dit test de samenwerking en communicatie tussen alle betrokkenen en maakt de oefening compleet. Door deze verschillende fases te doorlopen, kan jouw organisatie stapsgewijs de paraatheid en veiligheid verbeteren. Of je nu net bent verhuisd of al ervaring hebt met oefeningen, wij helpen je graag bij het plannen en uitvoeren van ontruimingsoefeningen om een veilige werkomgeving te creëren! Aarzel niet om contact op te nemen voor meer informatie en ondersteuning.</p>
        </div>

        <div className="buttons-ontruimingsoefening">

            <GeneralButton
                text='Ontruimingsoefening fase 0'
                to="/ontruimingsoefening/fase0"
                icon= {<PersonSimpleRun size={20} />}
                buttonstyle="button-dark"
            />
            <GeneralButton
                text='Ontruimingsoefening fase 1'
                to="/ontruimingsoefening/fase1"
                icon= {<PersonSimpleRun size={20} />}
                buttonstyle="button-dark"
            />
            <GeneralButton
                text='ontruimingsoefening fase 2'
                to="/ontruimingsoefening/fase2"
                icon= {<PersonSimpleRun size={20} />}
                buttonstyle="button-dark"
            />
            <GeneralButton
                text='Ontruimingsoefening fase 3'
                to="/ontruimingsoefening/fase3"
                icon= {<PersonSimpleRun size={20} />}
                buttonstyle="button-dark"
            />
            <GeneralButton
                text="Ontruimingsoefening fase 4"
                to="/ontruimingsoefening/fase4"
                icon={<PersonSimpleRun size={20} />}
                buttonClass="button-dark"
            />
        </div>
    </section>

        </>
    );
}

export default OntruimingsOefeningPage;