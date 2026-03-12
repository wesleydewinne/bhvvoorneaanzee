import apiClient from "@/api/api.js";

const BASE_URL = "/locations";

const locationService = {
    async getAll() {
        const response = await apiClient.get(BASE_URL);
        return response.data;
    },

    async getById(id) {
        const response = await apiClient.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    async create(payload) {
        const response = await apiClient.post(BASE_URL, payload);
        return response.data;
    },

    async update(id, payload) {
        const response = await apiClient.put(`${BASE_URL}/${id}`, payload);
        return response.data;
    },

    async remove(id) {
        await apiClient.delete(`${BASE_URL}/${id}`);
    },
};

export default locationService;
