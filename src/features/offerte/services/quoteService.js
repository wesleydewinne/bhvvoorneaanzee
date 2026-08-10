import api from "@/api/api.js";

const quoteService = {
    async getTrainingTypes() {
        const response = await api.get("/training-types/offer");
        return Array.isArray(response.data) ? response.data : [];
    },

    async create(payload) {
        const response = await api.post("/admin/quotes", payload);
        return response.data;
    },

    async getAllQuotes() {
        const response = await api.get("/admin/quotes");
        return Array.isArray(response.data) ? response.data : [];
    },

    async getQuote(id) {
        const response = await api.get(`/admin/quotes/${id}`);
        return response.data;
    },

    async update(id, payload) {
        const response = await api.put(`/admin/quotes/${id}`, payload);
        return response.data;
    },

    async updateStatus(id, status) {
        const response = await api.patch(`/admin/quotes/${id}/status`, { status });
        return response.data;
    },

    async downloadPdf(id, quoteNumber) {
        const response = await api.get(`/admin/quotes/${id}/pdf`, {
            responseType: "blob",
            timeout: 60000,
            headers: { Accept: "application/pdf" },
        });

        return {
            blob: response.data,
            fileName: getFileName(response.headers["content-disposition"], quoteNumber),
        };
    },

    async submitRequest(payload) {
        const response = await api.post("/quotes", payload);
        return response.data;
    },

    async getRequests() {
        const response = await api.get("/admin/quote-requests");
        return Array.isArray(response.data) ? response.data : [];
    },

    async getRequest(id) {
        const response = await api.get(`/admin/quote-requests/${id}`);
        return response.data;
    },

    async updateRequestStatus(id, status) {
        const response = await api.patch(`/admin/quote-requests/${id}/status`, { status });
        return response.data;
    },
};

function getFileName(contentDisposition, quoteNumber) {
    const utfMatch = contentDisposition?.match(/filename\*=UTF-8''([^;]+)/i);
    const regularMatch = contentDisposition?.match(/filename="?([^";]+)"?/i);
    const encodedName = utfMatch?.[1] || regularMatch?.[1];

    if (encodedName) {
        try {
            return decodeURIComponent(encodedName);
        } catch {
            return encodedName;
        }
    }

    return `offerte-${quoteNumber || "concept"}.pdf`;
}

export default quoteService;
