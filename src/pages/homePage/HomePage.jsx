import "./HomePage.css";
import HeaderSection from "@/components/sections/headerSection/HeaderSection.jsx";
import TrainingCardSection from "@/components/sections/trainingSection/TrainingCardSection.jsx";
import LogosSection from "@/components/sections/logosSection/LogosSection.jsx";
import BlogSection from "@/components/sections/blogSection/BlogSection.jsx";
import CTAButtons from "@/components/button/cta/CTAButton.jsx";
import ReviewSection from "@/components/review/ReviewSection.jsx";

import reactLogo from "@/assets/image/react.svg";
import trainingData from "@/data/training.json";

function HomePage() {

    const homeCards = trainingData.categories.map((category) => ({
        id: category.id,
        title: category.cardTitle,
        description: category.description,
        image: category.image,
        buttonText: category.buttontext || "Meer info",
        buttonTo: `/${category.id}`
    }));

    return (
        <>
            {/* HERO */}
            <HeaderSection
                mainTitle="Welkom bij BHV Voorne aan Zee"
                subTitle="Professioneel en effectief trainen voor meer veiligheid."
                image={reactLogo}
            />

            {/* CONTENT */}
            <div className="container">

                <CTAButtons />

                <TrainingCardSection
                    title="Trainingsaanbod BHV Voorne aan Zee"
                    cards={homeCards}
                />

                <ReviewSection />

                <section className="certificering-section">
                    <BlogSection limit={10} />
                    <LogosSection />
                </section>

            </div>
        </>
    );
}

export default HomePage;
