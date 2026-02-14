// import axios from "../utils/axiosInstance";
//
// export const uploadFactuur = (file, klantId, termijn) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("klantId", klantId);
//     formData.append("termijn", termijn);
//     return axios.post("/facturen/upload", formData);
// };
//
// export const getReminders = (klantId) => axios.get(`/facturen/reminders/${klantId}`).then(res => res.data);
// export const sendHerinnering = (factuurId) => axios.post(`/facturen/herinnering/${factuurId}`);
// export const getMijnFacturen = (klantId) => axios.get(`/facturen/mijn/${klantId}`).then(res => res.data);
