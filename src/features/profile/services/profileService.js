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

    async getProfilePhoto() {
        const response = await api.get("/users/me/photo", {
            responseType: "blob",
        });

        return response.data;
    },

    async uploadProfilePhoto(file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/users/me/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },
};

export default profileService;
