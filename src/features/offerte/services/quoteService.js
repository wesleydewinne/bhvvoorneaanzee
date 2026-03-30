import api from "@/api/api";

const quoteService = {
    getTrainingTypes: () => api.get("/training-types/offer"),

    createQuote: (payload) => api.post("/quotes", payload),

    getAllQuotes: () => api.get("/quotes"),

    getOpenQuotes: () => api.get("/quotes/open"),

    getArchivedQuotes: () => api.get("/quotes/archived"),

    getQuoteById: (id) => api.get(`/quotes/${id}`),

    updateQuote: (id, payload) => api.put(`/quotes/${id}`, payload),

    patchQuote: (id, payload) => api.patch(`/quotes/${id}`, payload),

    archiveQuote: (id) => api.patch(`/quotes/${id}/archive`),

    getDiscountCodes: () => api.get("/quotes/discount-codes"),
};

export default quoteService;