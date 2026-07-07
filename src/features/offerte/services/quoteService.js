import api from "@/api/api";

const CLOSED_QUOTE_STATUSES = ["ACCEPTED", "REJECTED", "EXPIRED", "ARCHIVED"];

function normalizeQuotes(response) {
    const data = response?.data;

    if (Array.isArray(data)) {
        return data;
    }

    if (Array.isArray(data?.content)) {
        return data.content;
    }

    if (Array.isArray(data?.data)) {
        return data.data;
    }

    return [];
}

async function getQuotesByClientFilter(predicate) {
    const response = await api.get("/quotes");
    const quotes = normalizeQuotes(response).filter(predicate);

    return {
        ...response,
        data: quotes,
    };
}

const quoteService = {
    getTrainingTypes: () => api.get("/training-types/offer"),

    createQuote: (payload) => api.post("/quotes", payload),

    getAllQuotes: () => api.get("/quotes"),

    getOpenQuotes: () =>
        getQuotesByClientFilter((quote) => !CLOSED_QUOTE_STATUSES.includes(quote?.status)),

    getArchivedQuotes: () =>
        getQuotesByClientFilter((quote) => quote?.status === "ARCHIVED"),

    getQuoteById: (id) => api.get(`/quotes/${id}`),

    updateQuote: (id, payload) => api.put(`/quotes/${id}`, payload),

    patchQuote: (id, payload) => api.patch(`/quotes/${id}`, payload),

    archiveQuote: (id) => api.patch(`/quotes/${id}`, { status: "ARCHIVED" }),

    getDiscountCodes: () => api.get("/discount-codes"),
};

export default quoteService;
