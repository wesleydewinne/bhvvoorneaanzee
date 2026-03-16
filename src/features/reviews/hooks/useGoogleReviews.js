import { useEffect, useState } from "react";
import { useGoogleMaps } from "./useGoogleMaps.js";

const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
const BANNED = ["wijkeurenalles"];

const normalize = (text = "") =>
    text.toLowerCase().replace(/[^a-z0-9]/g, "");

const formatDateNL = (unixSeconds) =>
    new Date(unixSeconds * 1000).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

export function useGoogleReviews() {
    const { loaded, error: mapsError } = useGoogleMaps();

    const [status, setStatus] = useState("loading");
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [total, setTotal] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fail = (message) => {
            console.error("[Google Reviews]", message);

            if (!isMounted) return;

            setError(message);
            setStatus("fallback");
        };

        if (mapsError) {
            fail(mapsError);
            return () => {
                isMounted = false;
            };
        }

        if (!loaded) {
            return () => {
                isMounted = false;
            };
        }

        if (!PLACE_ID) {
            fail("VITE_GOOGLE_PLACE_ID ontbreekt.");
            return () => {
                isMounted = false;
            };
        }

        if (!window.google?.maps?.places) {
            fail("Google Places library is niet geladen.");
            return () => {
                isMounted = false;
            };
        }

        try {
            const service = new window.google.maps.places.PlacesService(
                document.createElement("div")
            );

            service.getDetails(
                {
                    placeId: PLACE_ID,
                    fields: ["rating", "user_ratings_total", "reviews"],
                },
                (place, resultStatus) => {
                    if (!isMounted) return;

                    console.log("[Google Reviews] getDetails status:", resultStatus);
                    console.log("[Google Reviews] place result:", place);

                    if (resultStatus !== "OK" || !place) {
                        fail(`Google Places gaf status terug: ${resultStatus}`);
                        return;
                    }

                    setRating(place.rating ?? null);
                    setTotal(place.user_ratings_total ?? null);

                    const rawReviews = place.reviews ?? [];

                    const filtered = rawReviews.filter((r) => {
                        if (!r?.text) return false;
                        if (r.text.length < 40) return false;
                        if ((r.rating ?? 0) < 4) return false;

                        const text = normalize(r.text);
                        return !BANNED.some((b) => text.includes(b));
                    });

                    console.log("[Google Reviews] raw reviews:", rawReviews.length);
                    console.log("[Google Reviews] filtered reviews:", filtered.length);

                    if (!filtered.length) {
                        fail("Er zijn geen reviews over na filtering.");
                        return;
                    }

                    setReviews(
                        filtered.map((r) => ({
                            text: r.text,
                            author: r.author_name || "Google review",
                            rating: r.rating ?? 5,
                            date: r.time ? formatDateNL(r.time) : "",
                        }))
                    );

                    setError(null);
                    setStatus("success");
                }
            );
        } catch (err) {
            fail(`Onverwachte fout in PlacesService: ${err.message}`);
        }

        return () => {
            isMounted = false;
        };
    }, [loaded, mapsError]);

    return { status, reviews, rating, total, error };
}