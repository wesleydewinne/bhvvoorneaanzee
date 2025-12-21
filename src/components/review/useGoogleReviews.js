import { useEffect, useState } from 'react';

const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
const BANNED = ['wijkeurenalles'];

const normalize = (text = '') =>
    text.toLowerCase().replace(/[^a-z0-9]/g, '');

const formatDateNL = (unixSeconds) =>
    new Date(unixSeconds * 1000).toLocaleDateString('nl-NL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

export function useGoogleReviews() {
    const [status, setStatus] = useState('loading');
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        if (
            !PLACE_ID ||
            !window.google ||
            !window.google.maps?.places
        ) {
            setStatus('fallback');
            return;
        }

        const service = new window.google.maps.places.PlacesService(
            document.createElement('div')
        );

        service.getDetails(
            {
                placeId: PLACE_ID,
                fields: ['rating', 'user_ratings_total', 'reviews'],
            },
            (place, resultStatus) => {
                if (resultStatus !== 'OK' || !place) {
                    setStatus('fallback');
                    return;
                }

                setRating(place.rating ?? null);
                setTotal(place.user_ratings_total ?? null);

                const filtered = (place.reviews ?? []).filter((r) => {
                    if (!r?.text) return false;
                    if (r.text.length < 40) return false;
                    if (r.rating < 4) return false;

                    const text = normalize(r.text);
                    return !BANNED.some((b) => text.includes(b));
                });

                if (!filtered.length) {
                    setStatus('fallback');
                    return;
                }

                setReviews(
                    filtered.map((r) => ({
                        text: r.text,
                        author: r.author_name || 'Google review',
                        rating: r.rating,
                        date: r.time ? formatDateNL(r.time) : '',
                    }))
                );

                setStatus('success');
            }
        );
    }, []);

    return { status, reviews, rating, total };
}
