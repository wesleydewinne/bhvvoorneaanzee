// import { BASE_API } from "../utils/constants.js";
//
// export async function uploadInvoice(formData) {
//     const res = await fetch(`${BASE_API}/facturen/upload`, {
//         method: "POST",
//         body: formData,
//     });
//     return await res.json();
// }
//
// export async function fetchInvoices(klantId) {
//     const res = await fetch(`${BASE_API}/facturen/klant/${klantId}`);
//     return await res.json();
// }
//
// export async function sendReminder(factuurId) {
//     return await fetch(`${BASE_API}/facturen/${factuurId}/herinnering`, {
//         method: "POST",
//     });
// }
