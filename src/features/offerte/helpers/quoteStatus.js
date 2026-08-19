export const QUOTE_STATUS = {
  DRAFT: { label: "Concept", group: "concept" },
  SENDING: { label: "Wordt verzonden", group: "sent" },
  SENT: { label: "Verzonden", group: "sent" },
  ACCEPTED: { label: "Geaccepteerd", group: "accepted" },
  REJECTED: { label: "Afgewezen", group: "closed" },
  EXPIRED: { label: "Verlopen", group: "closed" },
  CANCELLED: { label: "Geannuleerd", group: "closed" },
};

export const quoteStatusLabel = (status) =>
  QUOTE_STATUS[status]?.label || status || "Onbekend";

export const quoteStatusGroup = (status) =>
  QUOTE_STATUS[status]?.group || "closed";

export const formatQuoteDateTime = (value) =>
  value
    ? new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : null;
