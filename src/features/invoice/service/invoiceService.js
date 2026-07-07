import api from "@/api/api.js";

const invoiceService = {
    async create(formData) {
        const response = await api.post("/invoices/multipart/form-data", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/invoices/${id}`);
        return response.data;
    },

    async downloadPdf(id) {
        const response = await api.get(`/invoices/${id}/pdf`, {
            responseType: "blob",
        });
        return response.data;
    },

    async getStatus(id) {
        const response = await api.get(`/invoices/${id}/status`);
        return response.data;
    },
};

export default invoiceService;
