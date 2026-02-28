import api from "@/api/api";

const userService = {

    getAll: async () => {
        const res = await api.get("/users");
        return res.data;
    },

    create: async (data) => {
        const res = await api.post("/users", data);
        return res.data;
    },

    deactivate: async (id) => {
        await api.delete(`/users/${id}`);
    },

    getRoles: async () => {
        const res = await api.get("/users/roles");
        return res.data;
    }
};

export default userService;
