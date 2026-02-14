// import { useEffect, useState } from "react";
// import { getMijnFacturen } from "../../services/factuurService.js";
//
// export default function FactuurList({ klantId }) {
//     const [facturen, setFacturen] = useState([]);
//
//     useEffect(() => {
//         (async () => {
//             const data = await getMijnFacturen(klantId);
//             setFacturen(data);
//         })();
//     }, [klantId]);
//
//     return (
//         <div>
//             <h2>Mijn Facturen</h2>
//             {facturen.map((f) => (
//                 <div key={f.id}>
//                     <p>{f.factuurnummer} - {f.vervalDatum}</p>
//                     <a href={f.bestandPad} target="_blank">Bekijk PDF</a>
//                 </div>
//             ))}
//         </div>
//     );
// }