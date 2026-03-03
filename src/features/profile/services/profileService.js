import api from "@/api/api";

const userService = {
    getAll: async () => {
        const res = await api.get("/users");
        return res.data;
    },

    getRoles: async () => {
        const res = await api.get("/users/roles/assignable");
        return res.data; // ["ADMIN","TRAINING_MANAGER",...]
    },

    create: async (form) => {
        const roleName = normalizeRole(form.role);

        const payload = {
            firstName: form.firstname,
            lastName: form.lastname,
            email: form.email,
            password: form.password,
            roleName: roleName,
        };

        console.log("POST /users payload:", payload);

        const res = await api.post("/users", payload);
        return res.data;
    },

    deactivate: async (id) => {
        await api.delete(`/users/${id}`);
    },
};

function normalizeRole(role) {
    if (!role) return "";
    return role.startsWith("ROLE_") ? role.replace("ROLE_", "") : role;
}

export default userService;