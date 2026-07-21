import api from "@/api/api.js";

const invoiceService = {
    async create(data, pdf) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("pdf", pdf);
        const response = await api.post("/invoices", formData, {
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
