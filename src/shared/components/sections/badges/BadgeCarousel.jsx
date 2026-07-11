import "./BadgeCarousel.css";

import bhvBadge from "@/assets/icons/certificering/ErkendOpleiderBHV.webp?w=180&format=webp&quality=72";
import ploegleiderBadge from "@/assets/icons/certificering/pl.webp?w=180&format=webp&quality=72";
import SDBRELBadge from "@/assets/icons/certificering/ErkendOpleiderSDBREL.webp?w=180&format=webp&quality=72";
import NRRBadge from "@/assets/icons/certificering/ErkendOpleiderNRR.webp?w=180&format=webp&quality=72";
import HOKBadge from "@/assets/icons/certificering/ErkendOpleiderHOK.webp?w=180&format=webp&quality=72";

const badges = [
    { id: 1, title: "BHV", image: bhvBadge },
    { id: 2, title: "Ploegleider", image: ploegleiderBadge },
    { id: 3, title: "Stop de Bloeding Red een Leven", image: SDBRELBadge },
    { id: 4, title: "Reanimatie NRR", image: NRRBadge },
    { id: 5, title: "EHBO", image: HOKBadge }
];

export default function BadgeCarousel() {
    const renderedBadges = [...badges, ...badges];

    return (
        <section className="badge-section">
            <div className="fade-left" />
            <div className="fade-right" />
            <div className="center-glow" />

            <div className="badge-track">
                {renderedBadges.map((badge, index) => (
                    <div className="badge-item" key={`${badge.id}-${index}`}>
                        <div className="badge-image-wrap">
                            <img
                                src={badge.image}
                                alt={badge.title}
                                className="badge-image"
                                width={180}
                                height={180}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
