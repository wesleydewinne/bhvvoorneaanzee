import axios from "axios";

/* -------------------------------------------------------------
    Access token opslaan / wissen
------------------------------------------------------------- */
export function setAccessToken(token) {
    if (token) {
        localStorage.setItem("accessToken", token);
    } else {
        localStorage.removeItem("accessToken");
    }
}

/* -------------------------------------------------------------
    Axios Client
------------------------------------------------------------- */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // refresh-cookie meesturen
    headers: {
        "Content-Type": "application/json",
    },
});

/* -------------------------------------------------------------
    Request Interceptor – Access token automatisch meesturen
------------------------------------------------------------- */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* -------------------------------------------------------------
    Response Interceptor – Automatische Refresh Handler
------------------------------------------------------------- */

let isRefreshing = false;
let failedQueue = [];

function processQueue(newToken) {
    failedQueue.forEach((cb) => cb(newToken));
    failedQueue = [];
}

api.interceptors.response.use(
    (response) => response, // gewoon doorgeven
    async (error) => {
        const originalRequest = error.config;

        // Geen 401? Teruggeven
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Niet opnieuw proberen op login of refresh zelf
        if (
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/refresh")
        ) {
            setAccessToken(null);
            return Promise.reject(error);
        }

        // Refresh bezig? Wacht in queue
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push((newToken) => {
                    if (!newToken) reject(error);
                    else {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(api(originalRequest));
                    }
                });
            });
        }

        // Start refresh één keer
        isRefreshing = true;

        try {
            const res = await api.post("/auth/refresh");

            // Nieuw access token uit backend response halen
            const { accessToken: newToken } = res.data;

            // Opslaan
            setAccessToken(newToken);

            // Queue afhandelen
            processQueue(newToken);

            // Reset flag
            isRefreshing = false;

            // Originele request opnieuw uitvoeren
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);

        } catch (refreshError) {
            // Refresh mislukt → iedereen laten falen
            processQueue(null);
            setAccessToken(null);

            isRefreshing = false;
            return Promise.reject(refreshError);
        }
    }
);

export default api;
