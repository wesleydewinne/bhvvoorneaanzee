import "./HomePage.css";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import LogosSection from "@/shared/components/sections/logosSection/LogosSection.jsx";
import BlogSection from "@/shared/components/sections/blogSection/BlogSection.jsx";
import CTAButtons from "@/shared/components/ui/button/cta/CTAButton.jsx";
import ReviewSection from "@/features/reviews/components/ReviewSection.jsx";
import { posts } from "@/pages/blog/posts.js";

import reactLogo from "@/assets/image/react.svg";
import trainingData from "@/shared/data/training.json";

import { imageMap } from "@/shared/utils/imageMap";

function HomePage() {

    const homeCards = trainingData.categories.map((category) => ({
        id: category.id,
        title: category.cardTitle,
        description: category.description,
        image: category.image, // GEEN imageMap hier
        alt: category.alt,
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
            </div>
                <TrainingCardSection
                    title="Trainingsaanbod BHV Voorne aan Zee"
                    cards={homeCards}
                />

                <div className="container">
                    <ReviewSection />
                    <section className="certificering-section">
                        <LogosSection />
                    </section>
                    <BlogSection posts={posts} limit={10} />
                </div>
        </>
    );
}

export default HomePage;
