import './HomePage.css';
import HeaderSection from "../../components/sections/headerSection/HeaderSection.jsx";
import reactLogo from "../../assets/image/react.svg";
import TrainingCardSection from "../../components/sections/trainingSection/TrainingCardSection.jsx";
import Card from "./../../data/training.json"




function HomePage() {
    // Verwerk de JSON naar cards
    const homeCards = Card.categories.map((category) => ({
        title: category.cardTitle,
        description: category.description,
        image: category.image || '/images/fallback.jpg',
        showPrice: false,
        buttonText: category.buttontext || 'Meer info',
        buttonTo: `/training/${category.id}` // link naar subpagina
    }));

    return (
        <>
            <HeaderSection
                mainTitle="Welkom bij BHV Voorne aan Zee"
                subTitle="Professioneel en effectief trainen voor meer veiligheid."
                backgroundImage={reactLogo}
            />

            <TrainingCardSection title="Onze Trainingen" cards={homeCards} />
            <section className="certificering-section">

            </section>
            <section className="footer-section">

            </section>
        </>
    );
}

export default HomePage;