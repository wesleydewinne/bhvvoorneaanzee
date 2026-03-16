import { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export function useGoogleMaps() {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!GOOGLE_MAPS_API_KEY) {
            setError("VITE_GOOGLE_MAPS_API_KEY ontbreekt.");
            return;
        }

        if (window.google?.maps?.places) {
            setLoaded(true);
            return;
        }

        const existingScript = document.querySelector(
            'script[data-google-maps="true"]'
        );

        if (existingScript) {
            const handleLoad = () => setLoaded(true);
            const handleError = () =>
                setError("Google Maps script kon niet geladen worden.");

            existingScript.addEventListener("load", handleLoad);
            existingScript.addEventListener("error", handleError);

            return () => {
                existingScript.removeEventListener("load", handleLoad);
                existingScript.removeEventListener("error", handleError);
            };
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.setAttribute("data-google-maps", "true");

        script.onload = () => {
            if (window.google?.maps?.places) {
                setLoaded(true);
            } else {
                setError("Google Places library is niet beschikbaar na laden.");
            }
        };

        script.onerror = () => {
            setError("Google Maps script kon niet geladen worden.");
        };

        document.head.appendChild(script);

        return () => {};
    }, []);

    return { loaded, error };
}