import api from "@/api/api.js";

const authService = {
    getMe() {
        return api.get("/auth/me");
    },

    login(payload) {
        return api.post("/auth/login", payload);
    },

    logout() {
        return api.post("/auth/logout");
    },

    verifyTwoFactorLogin(code) {
        return api.post("/auth/2fa/verify-login", { code });
    },

    initTwoFactorSetup() {
        return api.post("/auth/2fa/setup/init");
    },

    verifyTwoFactorSetup(code) {
        return api.post("/auth/2fa/setup/verify", { code });
    },

    disableTwoFactor(code) {
        return api.post("/auth/2fa/disable", { code });
    },
};

export default authService;