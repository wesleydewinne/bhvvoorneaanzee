import api from "@/api/api";

export async function getQuotePdfErrorMessage(error, fallbackMessage) {
    const responseData = error?.response?.data;

    if (responseData instanceof Blob) {
        try {
            const text = await responseData.text();
            const data = JSON.parse(text);
            return data?.message || data?.error || fallbackMessage;
        } catch {
            return fallbackMessage;
        }
    }

    return error?.message || fallbackMessage;
}

const quoteService = {
    getTrainingTypes: () => api.get("/training-types/offer"),

    createQuote: (payload) => api.post("/quotes", payload),

    createAdminQuote: (payload) => api.post("/quotes/admin", payload),

    getAllQuotes: () => api.get("/quotes"),

    getOpenQuotes: () => api.get("/quotes", { params: { archived: false } }),

    getArchivedQuotes: () => api.get("/quotes", { params: { archived: true } }),

    getQuoteById: (id) => api.get(`/quotes/${id}`),

    downloadQuotePdf: (id) => api.get(`/quotes/${id}/pdf`, { responseType: "blob" }),

    sendQuote: (id) => api.post(`/quotes/${id}/send`),

    updateQuote: (id, payload) => api.put(`/quotes/${id}`, payload),

    patchQuote: (id, payload) => api.patch(`/quotes/${id}`, payload),

    archiveQuote: (id) => api.patch(`/quotes/${id}`, { status: "ARCHIVED" }),

    getDiscountCodes: () => api.get("/discount-codes"),
};

export default quoteService;
