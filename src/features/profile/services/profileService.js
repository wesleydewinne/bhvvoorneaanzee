import api from "@/api/api.js";

const profileService = {

    async getMyProfile() {
        const response = await api.get("/users/me");
        return response.data;
    },

    async updateProfile(data) {
        const response = await api.put("/users/me", data);
        return response.data;
    }

};

export default profileService;
