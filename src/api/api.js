import axios from "axios";

const SESSION_EXPIRED_MESSAGE = "Je sessie is verlopen. Log opnieuw in.";
const DEFAULT_ERROR_MESSAGE = "Er is een fout opgetreden.";
const NETWORK_ERROR_MESSAGE = "Kan geen verbinding maken met de server.";
const TIMEOUT_ERROR_MESSAGE = "De server reageert niet op tijd. Probeer het opnieuw.";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

let isRefreshing = false;
let refreshQueue = [];

function getBackendMessage(error) {
    const data = error?.response?.data;

    if (typeof data === "string") {
        return data;
    }

    return (
        data?.message ||
        data?.error ||
        data?.detail ||
        data?.title ||
        null
    );
}

function getFieldErrors(error) {
    const data = error?.response?.data;

    return (
        data?.fieldErrors ||
        data?.errors ||
        data?.violations ||
        null
    );
}

function getErrorCode(error) {
    const data = error?.response?.data;

    return data?.code || data?.errorCode || error?.code || null;
}

function getFallbackMessage(status) {
    switch (status) {
        case 400:
            return "De aanvraag is ongeldig.";
        case 401:
            return SESSION_EXPIRED_MESSAGE;
        case 403:
            return "Geen toegang of beveiligingscheck ongeldig.";
        case 404:
            return "De gevraagde gegevens zijn niet gevonden.";
        case 409:
            return "Deze actie conflicteert met bestaande gegevens.";
        case 422:
            return "Controleer de ingevulde gegevens.";
        case 429:
            return "Te veel verzoeken. Wacht even en probeer opnieuw.";
        case 500:
            return "Er ging iets mis op de server.";
        case 502:
        case 503:
        case 504:
            return "De server is tijdelijk niet beschikbaar.";
        default:
            return DEFAULT_ERROR_MESSAGE;
    }
}

export function normalizeApiError(error, overrides = {}) {
    const status = error?.response?.status || null;
    const isTimeout = error?.code === "ECONNABORTED";
    const isNetworkError = !error?.response && Boolean(error?.request);
    const requestId =
        error?.response?.headers?.["x-request-id"] ||
        error?.response?.headers?.["x-correlation-id"] ||
        null;

    const message =
        overrides.message ||
        getBackendMessage(error) ||
        (isTimeout ? TIMEOUT_ERROR_MESSAGE : null) ||
        (isNetworkError ? NETWORK_ERROR_MESSAGE : null) ||
        (status ? getFallbackMessage(status) : null) ||
        error?.message ||
        getFallbackMessage(status);

    return {
        name: "ApiError",
        status,
        code: overrides.code || getErrorCode(error),
        message,
        details: error?.response?.data || null,
        fieldErrors: getFieldErrors(error),
        requestId,
        isNetworkError,
        isTimeout,
        autoLogout: Boolean(overrides.autoLogout),
        response: error?.response,
        originalError: error,
    };
}

function processRefreshQueue(error) {
    refreshQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });

    refreshQueue = [];
}

function shouldSkipRefresh(request) {
    return (
        request?.url?.includes("/auth/login") ||
        request?.url?.includes("/auth/passkeys/login/") ||
        request?.url?.includes("/auth/2fa/") ||
        request?.url?.includes("/auth/refresh") ||
        request?.url?.includes("/auth/logout")
    );
}

function dispatchLogoutRequired() {
    window.dispatchEvent(new CustomEvent("auth:logout-required"));
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;
        const originalRequest = error?.config;

        if (status !== 401 || !originalRequest || shouldSkipRefresh(originalRequest)) {
            return Promise.reject(normalizeApiError(error));
        }

        if (originalRequest._retry) {
            dispatchLogoutRequired();

            return Promise.reject(
                normalizeApiError(error, {
                    autoLogout: true,
                    message: SESSION_EXPIRED_MESSAGE,
                })
            );
        }

        originalRequest._retry = true;

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
            await api.post("/auth/refresh");

            isRefreshing = false;
            processRefreshQueue();

            return api(originalRequest);
        } catch (refreshError) {
            const normalizedRefreshError = normalizeApiError(refreshError, {
                autoLogout: true,
                message: SESSION_EXPIRED_MESSAGE,
            });

            isRefreshing = false;
            processRefreshQueue(normalizedRefreshError);
            dispatchLogoutRequired();

            return Promise.reject(normalizedRefreshError);
        }
    }
);

export default api;
