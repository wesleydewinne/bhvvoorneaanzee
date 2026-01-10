import React from 'react';
import TrainingCard from '../../cards/trainingCard/TrainingCard.jsx';
import './TrainingCardSection.css';

// 🔹 automatische import van alle afbeeldingen in assets
const images = import.meta.glob(
    "../../../assets/images/cardImage/*.{png,jpg,jpeg,svg}",
    { eager: true }
);

// fallback afbeelding
import fallbackImage from "../../../assets/image/Card-Fallback.png";

// helper functie
function resolveImage(fileName) {
    if (!fileName) return fallbackImage;
    const match = Object.keys(images).find((key) => key.endsWith(fileName));
    return match ? images[match].default : fallbackImage;
}

const TrainingCardSection = ({ title, cards = [], showPrice = false }) => {
    return (
        <section className="training-card-section">
            {title && <h2 className="training-card-section-title">{title}</h2>}

            <div className="training-card-grid">
                {cards.map((card, index) => (
                    <TrainingCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        // 🔹 resolve images hier
                        image={resolveImage(card.cardImage || card.image)}
                        alt={card.cardAlt || card.alt || "Afbeelding van training"}
                        pricing={Array.isArray(card.pricing) ? card.pricing[0] : card.pricing || {}}
                        showPrice={card.showPrice ?? showPrice}
                        buttonTo={card.buttonTo}
                        buttonText={card.buttonText}
                        buttonStyle={card.buttonStyle}
                        buttonIcon={card.buttonIcon}
                    />
                ))}
            </div>
        </section>
    );
};

export default TrainingCardSection;
