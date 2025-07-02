// import axios from "axios";
//
// const instance = axios.create({
//     baseURL: "https://jouw-backend-url.onrender.com/api",
// });
//
// instance.interceptors.request.use((config) => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
//
// export default instance;