import api from "@/api/api";

const evaluationService = {
    async generateQr(trainingId) {
        const res = await api.post(`/api/evaluations/qr/${trainingId}`);
        return res.data;
    },

    async getContext(token) {
        const res = await api.get(`/api/evaluations/context`, {
            params: { t: token }
        });
        return res.data;
    },

    async submitEvaluation(payload) {
        const res = await api.post(`/api/evaluations/submit`, payload);
        return res.data;
    },

    async getSummary(trainingId) {
        const res = await api.get(`/api/evaluations/summary/${trainingId}`);
        return res.data;
    }
};

export default evaluationService;