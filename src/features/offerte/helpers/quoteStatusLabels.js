export const quoteStatusLabels = {
    DRAFT: "Concept",
    SENDING: "Wordt verzonden",
    SENT: "Verzonden",
    ACCEPTED: "Geaccepteerd",
    REJECTED: "Afgewezen",
    EXPIRED: "Verlopen",
    CANCELLED: "Geannuleerd",
};

export const quoteStatusOptions = Object.entries(quoteStatusLabels).map(([value, label]) => ({
    value,
    label,
}));
