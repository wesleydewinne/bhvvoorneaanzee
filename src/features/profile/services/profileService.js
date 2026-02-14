import api from "@/api/api.js";

const profileService = {
    getMyProfile: async () => {
        const response = await api.get("/profile/me");
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await api.put("/profile", data);
        return response.data;
    }
};

export default profileService;