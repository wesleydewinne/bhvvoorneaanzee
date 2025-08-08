import './HomePage.css';
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";
import reactLogo from "../../assets/image/react.svg";
import TrainingCardSection from "../../components/sections/trainingSection/TrainingCardSection.jsx";
import Card from "./../../data/training.json"
import CardFallback from "../../assets/image/Card-Fallback.png"
import LogosSection from "../../components/sections/logosSection/LogosSection.jsx";
import CoverageSection from "../../components/sections/coverageSection/CoverageSection.jsx";
import CoverageArea from "../../components/coverageArea/CoverageArea.jsx";




function HomePage() {
    // Verwerk de JSON naar cards
    const homeCards = Card.categories.map((category) => ({
        title: category.cardTitle,
        description: category.description,
        image: category.image || CardFallback,
        showPrice: false,
        buttonText: category.buttontext || 'Meer info',
        buttonTo: `/${category.id}`
    }));

    return (
        <>
            <HeaderSection
                mainTitle="Welkom bij BHV Voorne aan Zee"
                subTitle="Professioneel en effectief trainen voor meer veiligheid."
                backgroundImage={reactLogo}
            />

            <TrainingCardSection title="Trainingsaanbod BHV Voorne aan Zee" cards={homeCards} />
            <section className="certificering-section">

                <LogosSection />

                {/*<CoverageSection*/}
                {/*    id="verzorgingsgebied"*/}
                {/*    ariaLabel="Verzorgingsgebied BHV Voorne aan Zee"*/}
                {/*>*/}
                {/*    /!*<h2 className="coverage-title">Ons Verzorgingsgebied</h2>*!/*/}
                {/*    /!*<p className="coverage-subtext">*!/*/}
                {/*    /!*    Wij verzorgen trainingen in Voorne aan Zee en omliggende gemeenten.*!/*/}
                {/*    /!*</p>*!/*/}
                {/*    <CoverageArea />*/}
                {/*</CoverageSection>*/}

            </section>


        </>
    );
}

export default HomePage;