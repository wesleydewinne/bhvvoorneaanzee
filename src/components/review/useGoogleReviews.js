import { useEffect, useState } from 'react';

const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
const BANNED = ['wijkeurenalles'];

const normalize = text =>
    text.toLowerCase().replace(/[^a-z0-9]/g, '');

export function useGoogleReviews() {
    const [status, setStatus] = useState('loading');
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        if (!window.google || !google.maps?.places) {
            return;
        }

        const service = new google.maps.places.PlacesService(
            document.createElement('div')
        );

        service.getDetails(
            {
                placeId: PLACE_ID,
                fields: ['rating', 'user_ratings_total', 'reviews']
            },
            (place, resultStatus) => {
                if (resultStatus !== 'OK' || !place) {
                    setStatus('fallback');
                    return;
                }

                const rawReviews = place.reviews ?? [];

                const filtered = rawReviews.filter(r => {
                    if (!r?.text || r.text.length < 40) return false;
                    if (r.rating < 4) return false;

                    const text = normalize(r.text);
                    return !BANNED.some(b => text.includes(b));
                });

                setRating(place.rating);
                setTotal(place.user_ratings_total);

                if (!filtered.length) {
                    setStatus('fallback');
                    setReviews([]);
                    return;
                }

                setReviews(
                    filtered.map(r => ({
                        text: r.text,
                        author: r.author_name
                    }))
                );

                setStatus('success');
            }
        );
    }, []);

    return { status, reviews, rating, total };
}
