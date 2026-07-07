import api from "@/api/api.js";

const authService = {
    getMe() {
        return api.get("/users/me");
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

    listPasskeys() {
        return api.get("/auth/passkeys");
    },

    startPasskeyLogin() {
        return api.post("/auth/passkeys/login/options");
    },

    finishPasskeyLogin(payload) {
        return api.post("/auth/passkeys/login/verify", payload);
    },

    startPasskeyRegistration() {
        return api.post("/auth/passkeys/registration/options");
    },

    finishPasskeyRegistration(payload) {
        return api.post("/auth/passkeys/registration/verify", payload);
    },

    deletePasskey(id) {
        return api.delete(`/auth/passkeys/${id}`);
    },
};

export default authService;
