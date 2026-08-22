import api from "@/api/api";

const userService = {
    async getAll({ search, locationId } = {}) {
        const params = {};

        if (search && search.trim()) {
            params.search = search.trim();
        }

        if (locationId) {
            params.locationId = locationId;
        }

        const response = await api.get("/users", { params });
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    async getAssignableRoles() {
        const response = await api.get("/users/roles/assignable");
        return response.data;
    },

    async create(formData) {
        const payload = {
            firstName: formData.firstName?.trim(),
            lastName: formData.lastName?.trim(),
            email: formData.email?.trim(),
            password: formData.password,
            role: formData.role,
            locationId: formData.locationId ? Number(formData.locationId) : null,
            locationRole: formData.locationRole || null,
            phoneNumber: normalizeOptionalString(formData.phoneNumber),
            functionTitle: normalizeOptionalString(formData.functionTitle),
            companyName: normalizeOptionalString(formData.companyName),
        };

        const response = await api.post("/users", payload);
        return response.data;
    },

    async update(id, formData) {
        const payload = {
            firstName: normalizeOptionalString(formData.firstName),
            lastName: normalizeOptionalString(formData.lastName),
            email: normalizeOptionalString(formData.email),
            phoneNumber: normalizeClearableString(formData.phoneNumber),
            dateOfBirth: normalizeOptionalString(formData.dateOfBirth),
            clearDateOfBirth: !formData.dateOfBirth,
            companyId: formData.companyId ? Number(formData.companyId) : null,
            companyName: formData.companyId
                ? null
                : normalizeClearableString(formData.companyName),
            functionTitle: normalizeClearableString(formData.functionTitle),
            nibhvNummer: normalizeClearableString(formData.nibhvNummer),
            oranjeKruisNummer: normalizeClearableString(formData.oranjeKruisNummer),
            enabled: typeof formData.enabled === "boolean" ? formData.enabled : null,
            accountNonLocked:
                typeof formData.accountNonLocked === "boolean"
                    ? formData.accountNonLocked
                    : null,
            mustChangePassword:
                typeof formData.mustChangePassword === "boolean"
                    ? formData.mustChangePassword
                    : null,
            globalRoles: Array.isArray(formData.globalRoles) ? formData.globalRoles : [],
            locationRoles: Array.isArray(formData.locationRoles) ? formData.locationRoles : [],
            status: formData.status || null,
        };

        const response = await api.put(`/users/${id}`, payload);
        return response.data;
    },

    async activate(id) {
        const response = await api.post(`/users/${id}/activate`);
        return response.data;
    },

    async lock(id) {
        const response = await api.post(`/users/${id}/lock`);
        return response.data;
    },

    async unlock(id) {
        const response = await api.post(`/users/${id}/unlock`);
        return response.data;
    },

    async archive(id) {
        const response = await api.post(`/users/${id}/archive`);
        return response.data;
    },

    async deactivate(id) {
        await api.delete(`/users/${id}`);
    },

    async downloadPrivacyExport(id) {
        const response = await api.get(`/users/${id}/privacy-export`, {
            responseType: "blob",
        });
        const disposition = response.headers?.["content-disposition"] || "";
        const filenameMatch = disposition.match(/filename="?([^";]+)"?/i);
        const filename = filenameMatch?.[1] || `persoonsgegevens-gebruiker-${id}.json`;
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    },

    async getPrivacyDeletionPreview(id) {
        const response = await api.get(`/users/${id}/privacy-deletion-preview`);
        return response.data;
    },

    async anonymizePrivacyData(id, confirmEmail) {
        const response = await api.post(`/users/${id}/privacy-anonymize`, {
            confirmEmail,
        });
        return response.data;
    },
};

function normalizeOptionalString(value) {
    if (typeof value !== "string") {
        return null;
    }

    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
}

function normalizeClearableString(value) {
    return typeof value === "string" ? value.trim() : "";
}

export default userService;
