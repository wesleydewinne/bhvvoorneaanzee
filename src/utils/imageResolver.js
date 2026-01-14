// src/utils/imageResolver.js

// Alle images automatisch laten bundlen door Vite
const images = import.meta.glob(
    "@/assets/image/cardImage/*.{png,jpg,jpeg,svg}",
    { eager: true }
);

// Fallback image
import fallbackImage from "@/assets/image/Card-Fallback.png";

/**
 * Zet een bestandsnaam uit JSON om naar een echte Vite asset URL
 * @param {string} fileName
 * @returns {string} image url
 */
export function resolveCardImage(fileName) {
    if (!fileName) return fallbackImage;

    const match = Object.keys(images).find((key) =>
        key.endsWith(fileName)
    );

    return match ? images[match].default : fallbackImage;
}
