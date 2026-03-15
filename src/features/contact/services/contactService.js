// src/features/contact/services/contactService.js
import api from "@/api/api.js";

const contactService = {
    sendMessage: async (payload) => {
        const response = await api.post("/contact-messages", payload);
        return response.data;
    },

    getAllMessages: async (archived = false) => {
        const response = await api.get("/admin/contact-messages", {
            params: { archived }
        });
        return response.data;
    },

    getMessageById: async (id) => {
        const response = await api.get(`/admin/contact-messages/${id}`);
        return response.data;
    },

    updateMessageStatus: async (id, status) => {
        const response = await api.patch(`/admin/contact-messages/${id}/status`, {
            status
        });
        return response.data;
    }
};

export default contactService;