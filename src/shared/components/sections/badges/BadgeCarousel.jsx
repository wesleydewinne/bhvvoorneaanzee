import { useEffect, useRef } from "react";
import "./BadgeCarousel.css";

import bhvBadge from "@/assets/icons/certificering/ErkendOpleiderBHV.webp";
import ploegleiderBadge from "@/assets/icons/certificering/pl.webp";
import SDBRELBadge from "@/assets/icons/certificering/ErkendOpleiderSDBREL.webp";
import NRRBadge from "@/assets/icons/certificering/ErkendOpleiderNRR.webp";
import HOKBadge from "@/assets/icons/certificering/ErkendOpleiderHOK.webp";

const badges = [
    { id: 1, title: "BHV", image: bhvBadge },
    { id: 2, title: "Ploegleider", image: ploegleiderBadge },
    { id: 3, title: "Stop de Bloeding Red een Leven", image: SDBRELBadge },
    { id: 4, title: "Reanimatie NRR", image: NRRBadge },
    { id: 5, title: "EHBO", image: HOKBadge }
];

export default function BadgeCarousel() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const animationRef = useRef(null);
    const offsetRef = useRef(0);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        let lastTime = 0;
        const speed = 45;

        const updateVisuals = () => {
            const sectionRect = section.getBoundingClientRect();
            const sectionCenter = sectionRect.left + sectionRect.width / 2;
            const maxDistance = sectionRect.width / 2;

            const items = track.querySelectorAll(".badge-item");

            items.forEach((item) => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.left + rect.width / 2;
                const distance = Math.abs(sectionCenter - itemCenter);

                const ratio = Math.max(0, 1 - distance / maxDistance);

                const scale = 0.52 + ratio * 0.90;
                const opacity = 0.3 + ratio * 0.7;
                const glowStrength = Math.max(0, (ratio - 0.6) / 0.4);
                const liftY = ratio * -6;

                item.style.transform = `translateY(${liftY}px) scale(${scale})`;
                item.style.opacity = `${opacity}`;
                item.style.zIndex = `${Math.round(ratio * 100)}`;

                const img = item.querySelector(".badge-image");

                if (img) {
                    const darkShadow = 14 + ratio * 28;
                    const orangeGlow = 16 + glowStrength * 62;
                    const orangeOpacity = 0.12 + glowStrength * 0.42;

                    img.style.filter = `
                        drop-shadow(0 6px ${darkShadow}px rgba(0, 0, 0, 0.38))
                        drop-shadow(0 0 ${orangeGlow}px rgba(255, 122, 0, ${orangeOpacity}))
                    `;
                }
            });
        };

        const animate = (time) => {
            if (!lastTime) lastTime = time;

            const delta = (time - lastTime) / 1000;
            lastTime = time;

            const singleSetWidth = track.scrollWidth / 6;

            offsetRef.current -= speed * delta;

            if (Math.abs(offsetRef.current) >= singleSetWidth) {
                offsetRef.current += singleSetWidth;
            }

            track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

            updateVisuals();
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            offsetRef.current = 0;
            lastTime = 0;
            updateVisuals();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const renderedBadges = [...badges, ...badges, ...badges, ...badges, ...badges, ...badges];

    return (
        <section className="badge-section" ref={sectionRef}>
            <div className="fade-left" />
            <div className="fade-right" />
            <div className="center-glow" />

            <div className="badge-track" ref={trackRef}>
                {renderedBadges.map((badge, index) => (
                    <div className="badge-item" key={`${badge.id}-${index}`}>
                        <div className="badge-image-wrap">
                            <img src={badge.image} alt={badge.title} className="badge-image" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}