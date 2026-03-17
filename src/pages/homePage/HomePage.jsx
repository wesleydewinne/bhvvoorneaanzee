import "./HomePage.css";
import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import LogosSection from "@/shared/components/sections/logosSection/LogosSection.jsx";
import BlogSection from "@/features/blog/BlogSection.jsx";
import CTAButtons from "@/shared/components/ui/button/cta/CTAButton.jsx";
import ReviewSection from "@/features/reviews/components/ReviewSection.jsx";
import { posts } from "@/features/blog/posts.js";
import trainingData from "@/shared/data/training.json";
import homePageHeader from "@/assets/image/common/headerimage/overons-header.jpg";

function HomePage() {
    const homeCards = trainingData.categories.map((category) => ({
        id: category.id,
        title: category.cardTitle,
        description: category.description,
        image: category.image,
        alt: category.alt,
        buttonText: category.buttontext || "Meer info",
        buttonTo: `/${category.id}`
    }));

    return (
        <div className="homepage">
            <section
                className="homepage-hero"
                style={{"--hero-bg": `url(${homePageHeader})`}}
            >
                <div className="container homepage-hero__inner">
                    <div className="homepage-hero__content">
            <span className="homepage-hero__eyebrow">
                Praktijkgerichte veiligheidstrainingen voor bedrijven
            </span>

                        <h1 className="homepage-hero__title">
                            BHV-trainingen, BHV Ploegleider-trainingen en ontruimingsoefeningen in Voorne aan Zee
                        </h1>

                        <p className="homepage-hero__subtitle">
                            Praktijkgerichte trainingen en oefeningen voor bedrijven en organisaties.
                            Wij verzorgen BHV-trainingen, BHV Ploegleider-trainingen en realistische
                            ontruimingsoefeningen op locatie.
                        </p>
                    </div>


                </div>
            </section>
            <CTAButtons/>


            <TrainingCardSection
                title="Trainingsaanbod BHV Voorne aan Zee"
                cards={homeCards}
            />


            <div className="container">
                <section className="homepage__reviews">
                    <ReviewSection/>
                </section>

                <section className="homepage__certifications">
                    <LogosSection/>
                </section>

                <section className="homepage__blog">
                    <BlogSection posts={posts} limit={10}/>
                </section>
            </div>
        </div>
    );
}

export default HomePage;