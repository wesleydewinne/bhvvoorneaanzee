// SmokeLottieOverlay.jsx
import React from "react";
import Lottie from "lottie-react";
import smokeAnimation from "@/assets/animatie/smoke.json"; // pad naar jouw bestand

const SmokeLottieOverlay = () => {
    return (
        <div style={{
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.7, // rook wat transparant maken
        }}>
            <Lottie
                animationData={smokeAnimation}
                loop
                autoplay
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
};

export default SmokeLottieOverlay;
