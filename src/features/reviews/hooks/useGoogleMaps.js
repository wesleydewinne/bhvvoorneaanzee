import { useEffect, useState } from "react";

export function useGoogleMaps() {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (window.google?.maps?.places) {
            setLoaded(true);
            return;
        }

        const existingScript = document.querySelector(
            'script[src*="maps.googleapis.com/maps/api/js"]'
        );

        if (existingScript) {
            const checkGoogleLoaded = () => {
                if (window.google?.maps?.places) {
                    setLoaded(true);
                } else {
                    setError("Google Maps script geladen, maar Places library ontbreekt.");
                }
            };

            existingScript.addEventListener("load", checkGoogleLoaded);
            checkGoogleLoaded();

            return () => {
                existingScript.removeEventListener("load", checkGoogleLoaded);
            };
        }

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            setError("VITE_GOOGLE_MAPS_API_KEY ontbreekt.");
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (window.google?.maps?.places) {
                setLoaded(true);
            } else {
                setError("Google Maps script geladen, maar Places library ontbreekt.");
            }
        };

        script.onerror = () => {
            setError("Google Maps script kon niet laden.");
        };

        document.head.appendChild(script);
    }, []);

    return { loaded, error };
}