import React from "react";
import "./LogosSection.css";
import hetoranjekruis from "../../../assets/icons/certificering/hetoranjekruis.png";
import nibhv from "../../../assets/icons/certificering/NIBHV.png";
import nrr from "../../../assets/icons/certificering/nrr.png";
import stopdebloedingredeenleven from "../../../assets/icons/certificering/stopdebloedingredeenleven.png";

const LogosSection = () => {
    // Array met logo-afbeeldingen die jouw erkende certificeringen vertegenwoordigen
    const logos = [
        hetoranjekruis,
        nibhv,
        nrr,
        stopdebloedingredeenleven,
    ];

    return (
        <section className="logos-section" aria-label="Erkende certificeringen">
            <h3 className="logos-title">
                Erkende Trainingen met Certificaat van onderstaande instanties
            </h3>
            <div className="logos-container">
                {logos.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Logo erkende instantie ${index + 1}`}
                        className="logo-image"
                        loading="lazy"
                    />
                ))}
            </div>
        </section>
    );
};

export default LogosSection;
