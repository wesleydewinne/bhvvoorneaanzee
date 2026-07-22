import { useCallback, useEffect, useRef } from "react";
import TrainingCard from "@/shared/components/ui/card/trainingCard/TrainingCard.jsx";
import "./TrainingCardSection.css";
import { resolveCardImage } from "@/shared/utils/imageResolver.js";

const TrainingCardSection = ({ title, cards = [], initialFocusId }) => {
    const carouselRef = useRef(null);

    const focusInitialCard = useCallback(() => {
        if (!carouselRef.current || !initialFocusId) return;

        const carousel = carouselRef.current;
        const focusCard = carousel.querySelector(`[data-card-id="${initialFocusId}"]`);

        if (!focusCard) return;

        const isMobile = window.matchMedia("(max-width: 576px)").matches;
        const targetLeft = isMobile
            ? focusCard.offsetLeft - 12
            : focusCard.offsetLeft - ((carousel.clientWidth - focusCard.clientWidth) / 2);

        carousel.scrollLeft = Math.max(targetLeft, 0);
    }, [initialFocusId]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return undefined;

        let firstFrame = 0;
        let secondFrame = 0;

        // Wait until React's DOM changes and the newly loaded stylesheet have
        // both been painted before reading geometry. Reading it during commit
        // forced the browser to synchronously lay out the entire section.
        const scheduleFocus = () => {
            window.cancelAnimationFrame(firstFrame);
            window.cancelAnimationFrame(secondFrame);

            firstFrame = window.requestAnimationFrame(() => {
                secondFrame = window.requestAnimationFrame(focusInitialCard);
            });
        };

        scheduleFocus();

        const resizeObserver = new ResizeObserver(scheduleFocus);
        resizeObserver.observe(carousel);

        return () => {
            resizeObserver.disconnect();
            window.cancelAnimationFrame(firstFrame);
            window.cancelAnimationFrame(secondFrame);
        };
    }, [focusInitialCard, cards.length]);

    const scrollCarousel = (direction) => {
        if (!carouselRef.current) return;

        const cardWidth = carouselRef.current.querySelector(".training-card-scene")?.offsetWidth || 320;
        const gap = 28;

        carouselRef.current.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: "smooth",
        });
    };

    return (
        <section className="training-card-section">
            <div className="training-card-section-header">
                {title && (
                    <h2 className="training-card-section-title">
                        {title}
                    </h2>
                )}

            </div>

            <div className="training-card-grid" ref={carouselRef}>
                {cards.map((card, index) => (
                    <div
                        className={`training-card-scene${card.id === initialFocusId ? " is-focus-card" : ""}`}
                        data-card-id={card.id}
                        key={card.id || index}
                    >
                        <TrainingCard
                            title={card.title}
                            description={card.description}
                            image={resolveCardImage(card.image)}
                            alt={card.alt || "Afbeelding van training"}
                            buttonTo={card.buttonTo}
                            buttonText={card.buttonText}
                        />
                    </div>
                ))}
            </div>

            {cards.length > 1 && (
                <div
                    className="training-card-carousel-controls"
                    aria-label="Trainingsaanbod carousel bediening"
                >
                    <button
                        className="training-card-carousel-button"
                        type="button"
                        aria-label="Vorige trainingen bekijken"
                        onClick={() => scrollCarousel(-1)}
                    >
                        <span
                            className="training-card-carousel-icon training-card-carousel-icon--prev"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        className="training-card-carousel-button"
                        type="button"
                        aria-label="Volgende trainingen bekijken"
                        onClick={() => scrollCarousel(1)}
                    >
                        <span
                            className="training-card-carousel-icon training-card-carousel-icon--next"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            )}
        </section>
    );
};

export default TrainingCardSection;
