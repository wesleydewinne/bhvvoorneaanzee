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

    async addCompanyLocation(locationId, payload) {
        const response = await apiClient.post(
            `${BASE_URL}/${locationId}/company-locations`,
            payload
        );
        return response.data;
    },

    async updateCompanyLocation(locationId, companyLocationId, payload) {
        const response = await apiClient.put(
            `${BASE_URL}/${locationId}/company-locations/${companyLocationId}`,
            payload
        );
        return response.data;
    },

    async removeCompanyLocation(locationId, companyLocationId) {
        const response = await apiClient.delete(
            `${BASE_URL}/${locationId}/company-locations/${companyLocationId}`
        );
        return response.data;
    },

    async uploadPhoto(id, file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await apiClient.post(`${BASE_URL}/${id}/photo`, formData);
        return response.data;
    },

    getPhotoUrl(id) {
        return `${apiClient.defaults.baseURL || ""}${BASE_URL}/${id}/photo`;
    },
};

export default locationService;
