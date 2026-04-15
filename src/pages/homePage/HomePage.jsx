import "./HomePage.css";
import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import BlogSection from "@/features/blog/BlogSection.jsx";
import CTAButtons from "@/shared/components/ui/button/cta/CTAButton.jsx";
import ReviewSection from "@/features/reviews/components/ReviewSection.jsx";
import { posts } from "@/features/blog/posts.js";
import trainingData from "@/shared/data/training.json";
import homePageHeader from "@/assets/image/common/headerimage/overons-header.jpg";
import ClientExperiencesSection from "@/shared/components/ui/clientExperiencesCarousel/ClientExperiencesSection.jsx";
import wesleyTrainingPhoto from "@/assets/image/blog/weekVanDeTeek/Deweekvandeteek.webp";
import BadgeCarousel from "@/shared/components/sections/badges/BadgeCarousel.jsx";

import TrustBar from "@/shared/components/sections/trustBar/TrustBar.jsx";
import WhyChooseSection from "@/shared/components/sections/whyChooseSection/WhyChooseSection.jsx";
import ActionSection from "@/shared/components/sections/actionSection/ActionSection.jsx";
import AboutTrainerSection from "@/shared/components/sections/aboutTrainerSection/AboutTrainerSection.jsx";
import RegionSection from "@/shared/components/sections/regionSection/RegionSection.jsx";
import FaqSection from "@/shared/components/sections/faqSection/FaqSection.jsx";
import FloatingQuoteButton from "@/shared/components/ui/button/floatingQuoteButton/FloatingQuoteButton.jsx";

import GoogleReviewBadge from "@/features/reviews/components/GoogleReviewBadge.jsx";

function HomePage() {
    const getHomepageCardButtonText = (categoryId) => {
        switch (categoryId) {
            case "bhv":
                return "Bekijk alle BHV-trainingen";

            case "ploegleider":
                return "Bekijk alle ploegleidertrainingen";

            case "ontruiming":
                return "Bekijk alle ontruimingsoefeningen";

            case "ehbo":
                return "Bekijk alle EHBO-trainingen";

            case "workshops":
                return "Bekijk alle workshops";

            default:
                return "Bekijk aanbod";
        }
    };

    const homeCards = trainingData.categories.map((category) => ({
        id: category.id,
        title: category.cardTitle,
        description: category.description,
        image: category.image,
        alt: category.alt,
        buttonText: getHomepageCardButtonText(category.id),
        buttonTo: `/${category.id}`,
    }));

    return (
        <div className="homepage">
            <section
                className="homepage-hero"
                style={{ "--hero-bg": `url(${homePageHeader})` }}
            >
                <div className="container homepage-hero__inner">
                    <div className="homepage-hero__content">
                        <span className="homepage-hero__eyebrow">
                            Praktijkgerichte veiligheidstrainingen voor bedrijven
                        </span>

                        <h1 className="homepage-hero__title">
                            BHV-trainingen, BHV Ploegleider-trainingen en
                            ontruimingsoefeningen in Voorne aan Zee
                        </h1>

                        <p className="homepage-hero__subtitle">
                            Praktijkgerichte trainingen en oefeningen voor bedrijven en
                            organisaties. Wij verzorgen BHV-trainingen, BHV
                            Ploegleider-trainingen en realistische ontruimingsoefeningen op
                            locatie.
                        </p>

                        <GoogleReviewBadge />

                        <div className="homepage-hero__actions">
                            <CTAButtons />
                        </div>
                    </div>
                </div>
            </section>

            <TrustBar />

            <WhyChooseSection />

            <ActionSection />

            <TrainingCardSection
                title="Trainingsaanbod BHV Voorne aan Zee"
                cards={homeCards}
            />

            <AboutTrainerSection
                portraitSrc={wesleyTrainingPhoto}
                actionSrc={wesleyTrainingPhoto}
            />

            <ClientExperiencesSection
                photoSrc={wesleyTrainingPhoto}
                photoAlt="Wesley geeft BHV training"
            />

            {/*<div className="container">*/}
            {/*    <section className="homepage__reviews">*/}
            {/*        <ReviewSection />*/}
            {/*    </section>*/}
            {/*</div>*/}

            <BadgeCarousel />

            <RegionSection />

            <FaqSection />

            <div className="container">
                <section className="homepage__blog">
                    <BlogSection posts={posts} limit={6} />
                </section>
            </div>

            <FloatingQuoteButton to="/offerte" label="Offerte aanvragen" />
        </div>
    );
}

export default HomePage;