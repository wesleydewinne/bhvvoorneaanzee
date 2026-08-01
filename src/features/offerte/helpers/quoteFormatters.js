import { quoteStatusLabels } from "./quoteStatusLabels.js";

export function formatQuoteStatus(status) {
    return quoteStatusLabels[status] || status || "-";
}

export function formatDateTime(value) {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

export function formatDate(value) {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "medium",
    }).format(date);
}

export function formatCurrency(value) {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
        return "€ 0,00";
    }

    return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
    }).format(numericValue);
}

export function formatAddress({ street, houseNumber, postalCode, city }) {
    const line1 = [street, houseNumber].filter(Boolean).join(" ").trim();
    const line2 = [postalCode, city].filter(Boolean).join(" ").trim();

    if (!line1 && !line2) return "-";
    if (line1 && line2) return `${line1}, ${line2}`;
    return line1 || line2;
}

export function formatMode(mode) {
    if (mode === "OVERLEG") return "Overleg";
    if (mode === "OFFERTE") return "Offerte";
    return "-";
}

export function normalizeNumberInput(value) {
    if (value === "" || value === null || value === undefined) {
        return "";
    }

    const number = Number(value);
    return Number.isNaN(number) ? "" : number;
}

export function parseMoneyInput(value) {
    if (typeof value === "number") return value;
    if (value === null || value === undefined || String(value).trim() === "") {
        return 0;
    }

    const compact = String(value).trim().replace(/\s/g, "");
    const normalized = compact.includes(",")
        ? compact.replace(/\./g, "").replace(",", ".")
        : compact;
    const number = Number(normalized);
    return Number.isFinite(number) ? number : 0;
}

export function formatMoneyInput(value) {
    const number = typeof value === "string"
        ? parseMoneyInput(value)
        : Number(value || 0);

    return new Intl.NumberFormat("nl-NL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
    }).format(Number.isFinite(number) ? number : 0);
}
