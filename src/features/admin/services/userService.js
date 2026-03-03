import api from "@/api/api";

const userService = {
    // userService.js
    getAll: async ({ search } = {}) => {
        const params = {};
        if (search && search.trim().length > 0) params.search = search.trim();

        const res = await api.get("/users", { params });
        return res.data;
    },

    getRoles: async () => {
        const res = await api.get("/users/roles/assignable");
        return res.data; // verwacht bv ["ROLE_STUDENT","ROLE_TRAINING_MANAGER",...]
    },

    create: async (form) => {
        const role = normalizeRole(form.role);

        const payload = {
            firstName: form.firstname?.trim(),
            lastName: form.lastname?.trim(),
            email: form.email?.trim(),
            password: form.password,

            // ✅ BELANGRIJK: backend DTO veld is 'role' (enum RoleName)
            // ✅ BELANGRIJK: waarde moet exact matchen met enum -> "ROLE_*"
            role: role,

            // Optioneel (zet aan als je dit in je form hebt)
            // locationId: form.locationId ? Number(form.locationId) : null,
            // locationRole: form.locationRole || null,
            // phoneNumber: form.phoneNumber?.trim() || null,
            // functionTitle: form.functionTitle?.trim() || null,
            // companyName: form.companyName?.trim() || null,
        };

        console.log("POST /users payload JSON:", JSON.stringify(payload, null, 2));

        const res = await api.post("/users", payload);
        return res.data;
    },

    activate: async (id) => {
        return api.post(`/users/${id}/activate`);
    },

    deactivate: async (id) => {
        await api.delete(`/users/${id}`);
    },

};

/**
 * Zorgt dat we altijd een RoleName string sturen die matcht met backend enum.
 * Voorbeelden:
 * - "ROLE_STUDENT" -> "ROLE_STUDENT"
 * - "STUDENT" -> "ROLE_STUDENT"
 * - "role student" -> "ROLE_STUDENT"
 * - "Training manager" -> "ROLE_TRAINING_MANAGER" (best effort)
 */
function normalizeRole(role) {
    if (!role) return "";

    const raw = String(role).trim();

    // als backendwaarde al goed is
    if (raw.startsWith("ROLE_")) return raw;

    // "role student" -> ROLE_STUDENT
    if (raw.toLowerCase().startsWith("role ")) {
        const cleaned = raw.slice(5).trim().toUpperCase().replaceAll(" ", "_");
        return `ROLE_${cleaned}`;
    }

    // "Training manager" -> ROLE_TRAINING_MANAGER (best effort)
    const cleaned = raw.toUpperCase().replaceAll(" ", "_");

    // als iemand per ongeluk al "TRAINING_MANAGER" geeft
    if (cleaned.startsWith("ROLE_")) return cleaned;

    return `ROLE_${cleaned}`;

}

export default userService;