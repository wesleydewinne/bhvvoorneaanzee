import api from "@/api/api";

const profileService = {
    async getMe() {
        const response = await api.get("/users/me");
        return response.data;
    },

    async updateProfile(payload) {
        const response = await api.put("/users/me", payload);
        return response.data;
    },

    async changePassword(payload) {
        const response = await api.put("/users/me/password", payload);
        return response.data;
    },
};

export default profileService;