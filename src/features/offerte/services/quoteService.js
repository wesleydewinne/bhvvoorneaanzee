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
    getTrainingCatalog: () => api.get("/training-catalog"),

    createQuote: (payload) => api.post("/quotes", payload),

    createAdminQuote: (payload) => api.post("/quotes/admin", payload),

    getAllQuotes: () => api.get("/quotes"),

    getQuoteById: (id) => api.get(`/quotes/${id}`),

    downloadQuotePdf: (id) => api.get(`/quotes/${id}/pdf`, {
        responseType: "blob",
        headers: { Accept: "application/pdf" },
    }),

    sendQuote: (id) => api.post(`/quotes/${id}/send`),

    updateQuote: (id, payload) => api.put(`/quotes/${id}`, payload),

    addTraining: (quoteId, payload) =>
        api.post(`/quotes/${quoteId}/trainings`, payload),

    updateTraining: (quoteId, trainingId, payload) =>
        api.put(`/quotes/${quoteId}/trainings/${trainingId}`, payload),

    deleteTraining: (quoteId, trainingId) =>
        api.delete(`/quotes/${quoteId}/trainings/${trainingId}`),

    getTrainingDiscounts: (quoteId, trainingId) =>
        api.get(`/quotes/${quoteId}/trainings/${trainingId}/discounts`),

    addTrainingDiscount: (quoteId, trainingId, payload) =>
        api.post(`/quotes/${quoteId}/trainings/${trainingId}/discounts`, payload),

    updateTrainingDiscount: (quoteId, trainingId, discountId, payload) =>
        api.put(
            `/quotes/${quoteId}/trainings/${trainingId}/discounts/${discountId}`,
            payload
        ),

    deleteTrainingDiscount: (quoteId, trainingId, discountId) =>
        api.delete(
            `/quotes/${quoteId}/trainings/${trainingId}/discounts/${discountId}`
        ),

    getTrainingCosts: (quoteId, trainingId) =>
        api.get(`/quotes/${quoteId}/trainings/${trainingId}/costs`),

    addTrainingCost: (quoteId, trainingId, payload) =>
        api.post(`/quotes/${quoteId}/trainings/${trainingId}/costs`, payload),

    updateTrainingCost: (quoteId, trainingId, costId, payload) =>
        api.put(
            `/quotes/${quoteId}/trainings/${trainingId}/costs/${costId}`,
            payload
        ),

    deleteTrainingCost: (quoteId, trainingId, costId) =>
        api.delete(
            `/quotes/${quoteId}/trainings/${trainingId}/costs/${costId}`
        ),

    updateValidUntil: (id, validUntil) =>
        api.patch(`/quotes/${id}/valid-until`, { validUntil }),

    patchQuote: (id, payload) => api.patch(`/quotes/${id}/status`, {
        quoteId: id,
        targetStatus: payload?.status,
        statusNote: payload?.statusNote || null,
    }),

    archiveQuote: (id) => api.patch(`/quotes/${id}`, { status: "ARCHIVED" }),

};

export default quoteService;
