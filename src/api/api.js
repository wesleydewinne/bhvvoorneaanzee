import axios from "axios";

/* =========================================================================
    Axios Client
    - Werkt volledig met HttpOnly cookies (access + refresh)
    - Geen localStorage meer
    - Geen Authorization headers meer
    - withCredentials = true → browser stuurt cookies automatisch mee
    - Backend behandelt refresh logic zelf via /auth/refresh endpoint
========================================================================= */

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // stuurt cookies mee
    headers: {
        "Content-Type": "application/json",
    },
});

/* =========================================================================
    Globale Response Interceptor
    - Doel: Nettere foutmeldingen + juiste afhandeling van JWT expiratie
    - LET OP:
      Omdat je backend al een automatische refresh-cookie strategie gebruikt,
      hoeft deze interceptor *geen* nieuwe tokens op te halen.
      Alleen netjes afhandelen.
========================================================================= */

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const status = error.response?.status;
        const originalRequest = error.config;

        /* -------------------------------------------------------------
            401 Unauthorized
            Kan komen door:
            - accessToken verlopen
            - refresh token verlopen
            - gebruiker uitgelogd
        ------------------------------------------------------------- */

        if (status === 401) {
            console.warn("401 ontvangen → gebruiker waarschijnlijk niet ingelogd");

            // Als het een login of refresh call is → direct teruggeven
            if (
                originalRequest.url.includes("/auth/login") ||
                originalRequest.url.includes("/auth/refresh")
            ) {
                return Promise.reject(error);
            }

            // → frontend moet gebruiker naar login sturen
            return Promise.reject({
                ...error,
                autoLogout: true,
                message: "Je sessie is verlopen. Log opnieuw in.",
            });
        }

        /* -------------------------------------------------------------
            403 Forbidden
            Komt vooral door:
            - CAPTCHA ongeldig
            - ongeldige beveiligingscheck
        ------------------------------------------------------------- */
        if (status === 403) {
            return Promise.reject({
                ...error,
                message: "Beveiligingscontrole mislukt (403).",
            });
        }

        /* -------------------------------------------------------------
            429 Too Many Requests
            Rate limiting
        ------------------------------------------------------------- */
        if (status === 429) {
            return Promise.reject({
                ...error,
                message: "Te veel verzoeken. Wacht even en probeer opnieuw.",
            });
        }

        /* -------------------------------------------------------------
            Andere errors → gewoon doorgeven
        ------------------------------------------------------------- */
        return Promise.reject(error);
    }
);

export default api;
