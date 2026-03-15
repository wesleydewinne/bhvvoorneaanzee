import api from "@/api/api.js";

const BASE_URL = "/courses";

const trainingService = {
    getAll: async () => {
        const response = await api.get(BASE_URL);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    create: async (payload) => {
        const response = await api.post(BASE_URL, payload);
        return response.data;
    },

    update: async (id, payload) => {
        const response = await api.put(`${BASE_URL}/${id}`, payload);
        return response.data;
    },

    updateStatus: async (id, payload) => {
        const response = await api.patch(`${BASE_URL}/${id}/status`, payload);
        return response.data;
    },

    remove: async (id) => {
        const response = await api.delete(`${BASE_URL}/${id}`);
        return response.data;
    },

    getDeleted: async () => {
        const response = await api.get(`${BASE_URL}/deleted`);
        return response.data;
    },

    restore: async (id) => {
        const response = await api.patch(`${BASE_URL}/${id}/restore`);
        return response.data;
    },
};

export default trainingService;