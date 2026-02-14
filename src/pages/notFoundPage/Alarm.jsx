import React, { useEffect, useRef, useState } from "react";
import alarmSound from "@/assets/sound/alarm.mp3";

function Alarm() {
    const audioRef = useRef(null);
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        const onFirstClick = () => {
            if (audioRef.current && !hasPlayed) {
                audioRef.current.play().catch(err => {
                    console.warn("Play failed:", err);
                });
                setHasPlayed(true);
            }
            window.removeEventListener("click", onFirstClick);
        };

        window.addEventListener("click", onFirstClick);

        return () => {
            window.removeEventListener("click", onFirstClick);
        };
    }, [hasPlayed]);

    return (
        <audio ref={audioRef} src={alarmSound} loop preload="auto" />
    );
}

export default Alarm;
