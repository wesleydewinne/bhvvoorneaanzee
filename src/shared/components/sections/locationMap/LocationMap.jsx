import { useEffect, useRef, useState } from "react";

export default function LocationMap({
                                        lat = 51.9045,
                                        lng = 4.2480,
                                        zoom = 14,
                                        interactive = false,
                                    }) {
    const mapRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!interactive) return;

        const loadMap = () => {
            if (window.google && window.google.maps) {
                initMap();
                return;
            }

            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.body.appendChild(script);
        };

        const initMap = () => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat, lng },
                zoom,
            });

            new window.google.maps.Marker({
                position: { lat, lng },
                map,
            });

            setLoaded(true);
        };

        loadMap();
    }, [interactive, lat, lng, zoom]);

    // 🚀 Default = snelle SEO vriendelijke iframe
    if (!interactive) {
        return (
            <section className="w-full">
                <iframe
                    title="BHV Voorne aan Zee Locatie"
                    width="100%"
                    height="400"
                    loading="lazy"
                    allowFullScreen
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
                />
            </section>
        );
    }

    // 🔥 Interactieve versie
    return (
        <section className="w-full">
            <div
                ref={mapRef}
                style={{ width: "100%", height: "400px" }}
            />
        </section>
    );
}
