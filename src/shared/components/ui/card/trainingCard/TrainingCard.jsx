import "./TrainingCard.css";
import { Link } from "react-router-dom";

/**
 * TrainingCard
 * Presentatiecomponent voor trainingskaarten
 * Volledig compatibel met JSON data + Vite asset resolver
 */
const TrainingCard = ({
                          title = "Trainingstitel",
                          description,

                          // image props (nieuw & legacy)
                          image,
                          cardImage,

                          // alt props (nieuw & legacy)
                          alt = "Afbeelding van training",
                          cardAlt,

                          // CTA
                          buttonTo = "#",
                          buttonStyle = "",
                          buttonIcon = null,
                          buttonText = "Meer info",
                      }) => {

    // unified image & alt
    const finalImage = cardImage || image;
    const finalAlt = cardAlt || alt;

    return (
        <article className="training-card">

            {/* IMAGE */}
            {finalImage && (
                <div className="training-card-image-wrapper">
                    <img
                        src={finalImage}
                        alt={finalAlt}
                        className="training-card-image"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            )}

            {/* CONTENT */}
            <div className="training-card-content">

                <div className="content-block">
                    <h3 className="training-card-title">
                        {title}
                    </h3>

                    {description && (
                        <p className="training-card-description">
                            {description}
                        </p>
                    )}
                </div>

                {/* CTA BUTTON */}
                <Link
                    to={buttonTo}
                    className={`training-card-button ${buttonStyle}`}
                >
                    {buttonIcon && (
                        <span className="icon">
                            {buttonIcon}
                        </span>
                    )}

                    {buttonText}
                </Link>

            </div>
        </article>
    );
};

export default TrainingCard;
