import React from 'react';
import './TrainingCard.css';

const TrainingCard = ({
                          title = "Trainingstitel",
                          description,
                          cardImage,
                          image,
                          cardAlt,
                          alt = "Afbeelding van training",
                          pricing= {},
                          showPrice,
                          buttonTo = "#",
                          buttonStyle = "",
                          buttonIcon = null,
                          buttonText = "Meer info"
                      }) => {
    const finalImage = cardImage || image;
    const finalAlt = cardAlt || alt;

    console.log("🎯 TrainingCard ontvangen props:", {
        title,
        finalImage,
        showPrice,
        pricing
    });

    return (
        <div className="training-card">
            {/* Afbeelding */}
            {finalImage && (
                <div className="training-card-image-wrapper">
                    <img
                        src={finalImage}
                        alt={finalAlt}
                        className="training-card-image"
                    />
                </div>
            )}

            {/* Inhoud */}
            <div className="training-card-content">
                <div className="content-block">
                    <h2 className="training-card-title">{title}</h2>

                    {description && (
                        <p className="training-card-description">{description}</p>
                    )}
                </div>
                {/* Prijsweergave */}
                {showPrice && (
                    <div className="training-card-pricing">
                        {pricing.individualPrice ? (
                            <p>Individueel: €{Number(pricing.individualPrice).toFixed(2)} excl. BTW</p>
                        ) : null}
                        {pricing.groupPrice ? (
                            <p>Groep: €{Number(pricing.groupPrice).toFixed(2)} excl. BTW</p>
                        ) : null}
                        {!pricing.individualPrice && !pricing.groupPrice && (
                            <p>Prijs op te vragen via email</p>
                        )}
                    </div>
                )}

                {/* Button */}
                <a href={buttonTo} className={`training-card-button ${buttonStyle}`}>
                    {buttonIcon && <span className="icon">{buttonIcon}</span>}
                    {buttonText}
                </a>
            </div>
        </div>
    );
};

export default TrainingCard;
