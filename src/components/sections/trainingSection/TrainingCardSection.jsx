import React from 'react';
import TrainingCard from '../../cards/trainingCard/TrainingCard.jsx';
import './TrainingCardSection.css';

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
                        cardImage={card.cardImage || card.image || '/images/fallback.jpg'}
                        cardAlt={card.cardAlt || card.alt || 'Afbeelding van training'}
                        pricing={Array.isArray(card.pricing) ? card.pricing[0] : card.pricing || {}}
                        showPrice={card.showPrice}
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
