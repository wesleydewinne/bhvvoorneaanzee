import "./HomePage.css";
import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import BlogSection from "@/features/blog/BlogSection.jsx";
import CTAButtons from "@/shared/components/ui/button/cta/CTAButton.jsx";
import { posts } from "@/features/blog/posts.js";
import trainingData from "@/shared/data/training.json";
import homePageHeader from "@/assets/image/common/headerimage/overons-header.jpg?w=1400&format=webp&quality=72";
import ClientExperiencesSection from "@/shared/components/ui/clientExperiencesCarousel/ClientExperiencesSection.jsx";
import wesleyTrainingPhoto from "@/assets/image/blog/weekVanDeTeek/Deweekvandeteek.webp";
import BadgeCarousel from "@/shared/components/sections/badges/BadgeCarousel.jsx";

import TrustBar from "@/shared/components/sections/trustBar/TrustBar.jsx";
import WhyChooseSection from "@/shared/components/sections/whyChooseSection/WhyChooseSection.jsx";
import ActionSection from "@/shared/components/sections/actionSection/ActionSection.jsx";
import AboutTrainerSection from "@/shared/components/sections/aboutTrainerSection/AboutTrainerSection.jsx";
import RegionSection from "@/shared/components/sections/regionSection/RegionSection.jsx";
import FaqSection from "@/shared/components/sections/faqSection/FaqSection.jsx";

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

    const homeCardOrder = ["workshops", "ontruiming", "bhv", "ploegleider", "ehbo"];

    const homeCards = homeCardOrder
        .map((categoryId) => trainingData.categories.find((category) => category.id === categoryId))
        .filter(Boolean)
        .map((category) => ({
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
            <section className="homepage-hero">
                <img
                    src={homePageHeader}
                    alt=""
                    className="homepage-hero__image"
                    decoding="async"
                    fetchPriority="high"
                    aria-hidden="true"
                />
                <div className="container homepage-hero__inner">
                    <div className="homepage-hero__content">
                        <div className="homepage-hero__title-row">
                            <h1 className="homepage-hero__title">
                                BHV, EHBO en ontruimingstrainingen voor bedrijven in Voorne aan Zee
                            </h1>

                            <GoogleReviewBadge />
                        </div>

                        <p className="homepage-hero__subtitle">
                            BHV Voorne aan Zee verzorgt incompany veiligheidstrainingen
                            voor organisaties in Voorne aan Zee, Rotterdam-Rijnmond,
                            Westland, Den Haag en omliggende plaatsen. Medewerkers leren
                            brand, letsel, reanimatie en ontruiming herkenbaar en rustig
                            aanpakken op hun eigen werkplek.
                        </p>

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
                initialFocusId="bhv"
            />

            <AboutTrainerSection
                portraitSrc={wesleyTrainingPhoto}
                actionSrc={wesleyTrainingPhoto}
            />

            <ClientExperiencesSection
                photoSrc={wesleyTrainingPhoto}
                photoAlt="Wesley geeft BHV training"
            />

            <BadgeCarousel />

            <RegionSection />

            <FaqSection />

            <section className="homepage__blog">
                <BlogSection
                    posts={posts}
                    title="Veiligheidsinzichten uit de praktijk"
                    subtitle="Artikelen over BHV, EHBO, ontruiming en veilig werken binnen organisaties."
                    limit={6}
                />
            </section>

        </div>
    );
}

export default HomePage;
