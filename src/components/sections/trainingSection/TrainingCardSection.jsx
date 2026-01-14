import TrainingCard from "@/components/cards/trainingCard/TrainingCard.jsx";
import "./TrainingCardSection.css";
import { resolveCardImage } from "@/utils/imageResolver";

const TrainingCardSection = ({ title, cards = [] }) => {
    return (
        <section className="training-card-section">

            {title && (
                <h2 className="training-card-section-title">
                    {title}
                </h2>
            )}

            <div className="training-card-grid">
                {cards.map((card, index) => (
                    <TrainingCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        image={resolveCardImage(card.image)}
                        alt={card.alt || "Afbeelding van training"}
                        buttonTo={card.buttonTo}
                        buttonText={card.buttonText}
                    />
                ))}
            </div>

        </section>
    );
};

export default TrainingCardSection;
