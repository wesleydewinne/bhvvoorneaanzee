import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import BlogSection from "@/features/blog/BlogSection.jsx";
import { posts } from "@/features/blog/posts.js";
import trainingData from "@/shared/data/training.json";
import ClientExperiencesSection from "@/shared/components/ui/clientExperiencesCarousel/ClientExperiencesSection.jsx";
import wesleyTrainingPhoto from "@/assets/image/blog/weekVanDeTeek/Deweekvandeteek.webp";
import BadgeCarousel from "@/shared/components/sections/badges/BadgeCarousel.jsx";
import WhyChooseSection from "@/shared/components/sections/whyChooseSection/WhyChooseSection.jsx";
import ActionSection from "@/shared/components/sections/actionSection/ActionSection.jsx";
import AboutTrainerSection from "@/shared/components/sections/aboutTrainerSection/AboutTrainerSection.jsx";
import RegionSection from "@/shared/components/sections/regionSection/RegionSection.jsx";
import FaqSection from "@/shared/components/sections/faqSection/FaqSection.jsx";

function getHomepageCardButtonText(categoryId) {
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
}

function HomePageDeferredSections() {
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
        <>
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
        </>
    );
}

export default HomePageDeferredSections;
