import React from "react";
import "./LogosSection.css";
import hetoranjekruis from "@/assets/icons/certificering/hetoranjekruis.png";
import nibhv from "@/assets/icons/certificering/NIBHV.png";
import nrr from "@/assets/icons/certificering/nrr.png";
import stopdebloedingredeenleven from "@/assets/icons/certificering/stopdebloedingredeenleven.png";

const LogosSection = () => {
    const logos = [
        {
            src: hetoranjekruis,
            url: "https://www.hetoranjekruis.nl/",
            alt: "Het Oranje Kruis",
        },
        {
            src: nibhv,
            url: "https://www.nibhv.nl/",
            alt: "NIBHV",
        },
        {
            src: nrr,
            url: "https://www.reanimatieraad.nl/",
            alt: "Nederlandse Reanimatie Raad",
        },
        {
            src: stopdebloedingredeenleven,
            url: "https://www.stopdebloedingredeenleven.nl/",
            alt: "Stop de bloeding, red een leven",
        },
    ];

    return (
        <section className="logos-section" aria-label="Erkende certificeringen">
            <h3 className="logos-title">
                Erkende Trainingen met Certificaat van onderstaande instanties
            </h3>
            <div className="logos-container">
                {logos.map((logo, index) => (
                    <a
                        key={index}
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className="logo-image"
                            loading="lazy"
                        />
                    </a>
                ))}
            </div>
        </section>
    );
};

export default LogosSection;
