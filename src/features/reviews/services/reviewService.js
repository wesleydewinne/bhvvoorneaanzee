import api from "@/api/api.js";

const reviewService = {
    async getPublicReviews() {
        const response = await api.get("/public/reviews");
        return response.data;
    },

    async getReviewSchema() {
        const response = await api.get("/public/reviews/schema");
        return response.data;
    },

    async refreshReviews() {
        const response = await api.post("/admin/reviews/refresh");
        return response.data;
    },
};

export default reviewService;