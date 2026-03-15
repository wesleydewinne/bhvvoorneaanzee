// src/features/contact/helpers/contactHelpers.js
export const STATUS_OPTIONS = [
    { value: "ONTVANGEN", label: "Ontvangen" },
    { value: "IN_BEHANDELING", label: "In behandeling" },
    { value: "AFGEHANDELD", label: "Afgehandeld" }
];

export function getStatusLabel(status) {
    switch (status) {
        case "ONTVANGEN":
            return "Ontvangen";
        case "IN_BEHANDELING":
            return "In behandeling";
        case "AFGEHANDELD":
            return "Afgehandeld";
        default:
            return status ?? "Onbekend";
    }
}

export function formatDateTime(value) {
    if (!value) return "-";

    const date = new Date(value);

    return new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(date);
}

export function filterMessages(messages, searchTerm) {
    if (!searchTerm.trim()) return messages;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return messages.filter((message) =>
        message.naam?.toLowerCase().includes(lowerSearchTerm) ||
        message.email?.toLowerCase().includes(lowerSearchTerm) ||
        message.bericht?.toLowerCase().includes(lowerSearchTerm) ||
        getStatusLabel(message.status).toLowerCase().includes(lowerSearchTerm)
    );
}

export function sortArchivedMessagesByArchivedDate(messages) {
    return [...messages].sort((a, b) => {
        const first = a.archivedAt ? new Date(a.archivedAt).getTime() : 0;
        const second = b.archivedAt ? new Date(b.archivedAt).getTime() : 0;
        return second - first;
    });
}