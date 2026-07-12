import api from "@/api/api.js";

const CHAT_ENDPOINT = "/chat/conversations";

const chatService = {
    async createConversation(payload) {
        const response = await api.post(CHAT_ENDPOINT, payload);
        return response.data;
    },
};

export default chatService;