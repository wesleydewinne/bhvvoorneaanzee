import api from "@/api/api";

function extractTokenFromUrl(url) {
    try {
        const parsed = new URL(url, window.location.origin);
        return parsed.searchParams.get("t") || "";
    } catch {
        return "";
    }
}

const evaluationService = {
    async generateQr(trainingId) {
        const linkResponse = await api.post(`/evaluations/qr/${trainingId}`);
        const evaluationUrl = linkResponse.data;
        const token = extractTokenFromUrl(evaluationUrl);

        return {
            evaluationUrl,
            token,
            trainingTitle: null,
        };
    },

    async getQrPngUrl(trainingId) {
        const response = await api.get(`/evaluations/qr/${trainingId}/png`, {
            responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "image/png" });
        return window.URL.createObjectURL(blob);
    },

    async getContext(token) {
        const response = await api.get(`/evaluations/context`, {
            params: { t: token },
        });
        return response.data;
    },

    async submitEvaluation(payload) {
        const response = await api.post(`/evaluations/submit`, payload);
        return response.data;
    },

    async getSummary(trainingId) {
        const response = await api.get(`/evaluations/summary/${trainingId}`);
        return response.data;
    },

    async getAllSummaries() {
        const response = await api.get(`/evaluations/summaries`);
        return response.data;
    },

    async getResponsesByTrainingId(trainingId) {
        const response = await api.get(`/evaluations/responses/${trainingId}`);
        return response.data;
    },

    async downloadCsv(trainingId) {
        const response = await api.get(`/evaluations/export/${trainingId}/csv`, {
            responseType: "blob",
        });

        return response.data;
    },
};

export default evaluationService;