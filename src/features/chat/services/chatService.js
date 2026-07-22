import api from "@/api/api.js";

const CONTACT_ENDPOINT = "/contact-messages";
const MAX_MESSAGE_LENGTH = 3000;

const FIELD_LABELS = {
    company: "Organisatie",
    phone: "Telefoonnummer",
    participants: "Aantal deelnemers",
    location: "Locatie",
    preferredPeriod: "Gewenste periode",
    trainingLevel: "Niveau",
    organizationType: "Type organisatie",
    buildingDetails: "Gebouwinformatie",
};

function formatValue(value) {
    if (Array.isArray(value)) {
        return value.join(", ");
    }

    if (value && typeof value === "object") {
        return JSON.stringify(value);
    }

    return String(value);
}

function buildContactMessage({ route, answers = {}, source }) {
    const details = Object.entries(answers)
        .filter(([key, value]) => !["name", "email"].includes(key) && value !== null && value !== undefined && value !== "")
        .map(([key, value]) => `${FIELD_LABELS[key] || key}: ${formatValue(value)}`);

    return [
        "Ingezonden via de websitechat.",
        `Onderwerp: ${route || "Niet opgegeven"}`,
        `Bron: ${source || "WEBSITE_CHAT"}`,
        "",
        ...details,
    ]
        .join("\n")
        .slice(0, MAX_MESSAGE_LENGTH);
}

const chatService = {
    async createConversation(payload) {
        const response = await api.post(CONTACT_ENDPOINT, {
            naam: String(payload?.visitor?.name || payload?.answers?.name || "").trim().slice(0, 100),
            email: String(payload?.visitor?.email || payload?.answers?.email || "").trim().slice(0, 150),
            bericht: buildContactMessage(payload),
        });

        return response.data;
    },
};

export default chatService;
