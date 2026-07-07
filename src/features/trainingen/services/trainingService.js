import api from "@/api/api.js";

const BASE_URL = "/courses";

const trainingService = {
    /*
     * Courses
     */

    getAll: async () => {
        const response = await api.get(BASE_URL);
        return response.data;
    },

    getById: async (courseId) => {
        const response = await api.get(`${BASE_URL}/${courseId}`);
        return response.data;
    },

    create: async (payload) => {
        const response = await api.post(BASE_URL, payload);
        return response.data;
    },

    update: async (courseId, payload) => {
        const response = await api.put(`${BASE_URL}/${courseId}`, payload);
        return response.data;
    },

    updateStatus: async (courseId, payload) => {
        const response = await api.patch(
            `${BASE_URL}/${courseId}/status`,
            payload
        );
        return response.data;
    },

    remove: async (courseId) => {
        await api.delete(`${BASE_URL}/${courseId}`);
    },

    getDeleted: async () => {
        const response = await api.get(`${BASE_URL}/deleted`);
        return response.data;
    },

    restore: async (courseId) => {
        const response = await api.patch(`${BASE_URL}/${courseId}/restore`);
        return response.data;
    },

    /*
     * Course participants
     */

    addParticipant: async (courseId, payload) => {
        const response = await api.post(
            `${BASE_URL}/${courseId}/participants`,
            payload
        );
        return response.data;
    },

    getParticipants: async (courseId) => {
        const response = await api.get(
            `${BASE_URL}/${courseId}/participants`
        );
        return response.data;
    },

    updateAttendance: async (courseId, participantId, payload) => {
        const response = await api.patch(
            `${BASE_URL}/${courseId}/participants/${participantId}/attendance`,
            payload
        );
        return response.data;
    },

    updateResult: async (courseId, participantId, payload) => {
        const response = await api.patch(
            `${BASE_URL}/${courseId}/participants/${participantId}/result`,
            payload
        );
        return response.data;
    },

    removeParticipant: async (courseId, participantId) => {
        await api.delete(
            `${BASE_URL}/${courseId}/participants/${participantId}`
        );
    },
};

export default trainingService;