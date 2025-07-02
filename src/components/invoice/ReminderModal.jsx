// import { useEffect, useState } from "react";
// import { getReminders, sendHerinnering } from "../../services/factuurService.js";
//
// export default function ReminderModal({ klantId }) {
//     const [reminders, setReminders] = useState([]);
//
//     useEffect(() => {
//         (async () => {
//             const data = await getReminders(klantId);
//             setReminders(data);
//         })();
//     }, [klantId]);
//
//     const handleSend = async (factuurId) => {
//         await sendHerinnering(factuurId);
//         alert("Herinnering verzonden");
//     };
//
//     if (reminders.length === 0) return null;
//
//     return (
//         <div className="modal">
//             <h2>Openstaande facturen</h2>
//             {reminders.map((r) => (
//                 <div key={r.id}>
//                     <p>Factuurnummer: {r.factuurnummer} - Vervallen op {r.vervalDatum}</p>
//                     <button onClick={() => handleSend(r.id)}>Verstuur herinnering</button>
//                 </div>
//             ))}
//         </div>
//     );
// }