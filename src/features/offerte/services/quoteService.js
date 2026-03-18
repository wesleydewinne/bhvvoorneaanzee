import api from "@/api/api";

const quoteService = {
    getTrainingTypes() {
        return api.get("/training-types/offer");
    },

    createQuote(payload) {
        return api.post("/quotes", payload);
    },

    getAllQuotes() {
        return api.get("/quotes");
    },

    getOpenQuotes() {
        return api.get("/quotes/open");
    },

    getArchivedQuotes() {
        return api.get("/quotes/archived");
    },

    getQuoteById(id) {
        return api.get(`/quotes/${id}`);
    },

    updateQuote(id, payload) {
        return api.put(`/quotes/${id}`, payload);
    },

    archiveQuote(id) {
        return api.patch(`/quotes/${id}/archive`);
    }
};

export default quoteService;