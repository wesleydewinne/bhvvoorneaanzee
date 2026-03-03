import axios from "axios";

/* =========================================================================
    AXIOS CLIENT – MET HTTPONLY COOKIES
    - Cookies worden automatisch verstuurd dankzij withCredentials: true
    - Geen Authorization headers of localStorage nodig
    - Werkt perfect met jouw Spring Boot refresh-strategie
========================================================================= */

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // 🔥 verplicht voor httpOnly cookies
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

/* =========================================================================
    RESPONSE INTERCEPTOR
    - Vangt expired tokens (401) en forceert nette automatische logout
    - Frontend hoeft geen refresh te doen → backend regelt dat al
========================================================================= */

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const status = error.response?.status;
        const originalRequest = error.config;

        /* -------------------------------------------------------------
            401 – Niet ingelogd of sessie verlopen
        ------------------------------------------------------------- */
        if (status === 401) {
            console.warn("⚠️ 401 ontvangen → gebruiker niet (meer) ingelogd");

            // login/refresh zelf niet onderscheppen
            if (
                originalRequest.url.includes("/auth/login") ||
                originalRequest.url.includes("/auth/refresh")
            ) {
                return Promise.reject(error);
            }

            return Promise.reject({
                ...error,
                autoLogout: true,
                message: "Je sessie is verlopen. Log opnieuw in.",
            });
        }

        /* -------------------------------------------------------------
            403 – Verboden (o.a. reCAPTCHA mislukking)
        ------------------------------------------------------------- */
        if (status === 403) {
            const backendMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                (typeof error.response?.data === "string" ? error.response.data : null);

            return Promise.reject({
                ...error,
                message: backendMsg || "Geen toestemming (403).",
            });
        }

        /* -------------------------------------------------------------
            429 – Rate limiting
        ------------------------------------------------------------- */
        if (status === 429) {
            return Promise.reject({
                ...error,
                message: "Te veel verzoeken. Wacht even en probeer opnieuw.",
            });
        }

        return Promise.reject(error);
    }
);

export default api;
