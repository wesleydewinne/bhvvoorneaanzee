export const quoteStatusLabels = {
    REQUESTED: "Nieuw",
    IN_PROGRESS: "In behandeling",
    WAITING_FOR_CUSTOMER: "Wacht op klant",
    READY_TO_SEND: "Klaar om te versturen",
    SENT: "Verzonden",
    ACCEPTED: "Geaccepteerd",
    REJECTED: "Afgewezen",
    EXPIRED: "Verlopen",
    ARCHIVED: "Gearchiveerd",
};

export const quoteStatusOptions = Object.entries(quoteStatusLabels).map(([value, label]) => ({
    value,
    label,
}));