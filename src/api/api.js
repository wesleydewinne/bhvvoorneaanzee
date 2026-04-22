import axios from "axios";

/* =========================================================================
   AXIOS CLIENT – HTTPONLY COOKIE AUTH
========================================================================= */

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

/* =========================================================================
   REFRESH STATE (voorkomt multiple refresh calls tegelijk)
========================================================================= */

let isRefreshing = false;
let refreshQueue = [];

/* helper: queued requests opnieuw uitvoeren */
const processQueue = (error) => {
    refreshQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve();
        }
    });
    refreshQueue = [];
};

/* =========================================================================
   RESPONSE INTERCEPTOR
========================================================================= */

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const status = error.response?.status;
        const originalRequest = error.config;

        /* -------------------------------------------------------------
           401 – TOKEN VERLOPEN → probeer refresh
        ------------------------------------------------------------- */
        if (status === 401) {
            console.warn("⚠️ 401 ontvangen");

            // voorkom loop
            if (originalRequest._retry) {
                return Promise.reject({
                    ...error,
                    autoLogout: true,
                    message: "Je sessie is verlopen. Log opnieuw in.",
                });
            }

            // login/refresh zelf overslaan
            if (
                originalRequest?.url?.includes("/auth/login") ||
                originalRequest?.url?.includes("/auth/refresh")
            ) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            /* ---------------------------------------------------------
               ALS AL BEZIG MET REFRESH → queue
            --------------------------------------------------------- */
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshQueue.push({
                        resolve: () => resolve(api(originalRequest)),
                        reject,
                    });
                });
            }

            isRefreshing = true;

            try {
                console.log("🔄 Refresh token aanvragen...");

                await api.post("/auth/refresh");

                console.log("✅ Refresh gelukt");

                processQueue();

                return api(originalRequest);

            } catch (refreshError) {
                console.warn("❌ Refresh mislukt");

                processQueue(refreshError);

                return Promise.reject({
                    ...refreshError,
                    autoLogout: true,
                    message: "Je sessie is verlopen. Log opnieuw in.",
                });

            } finally {
                isRefreshing = false;
            }
        }

        /* -------------------------------------------------------------
           403 – Forbidden
        ------------------------------------------------------------- */
        if (status === 403) {
            const backendMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                (typeof error.response?.data === "string"
                    ? error.response.data
                    : null);

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