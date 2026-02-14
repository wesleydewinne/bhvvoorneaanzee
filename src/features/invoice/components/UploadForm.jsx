// import { useState } from "react";
// import { uploadFactuur } from "../../services/factuurService.js";
//
// export default function UploadForm({ klantId }) {
//     const [file, setFile] = useState(null);
//     const [termijn, setTermijn] = useState(14);
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file) return;
//         await uploadFactuur(file, klantId, termijn);
//         alert("Verzonden");
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//             <select value={termijn} onChange={(e) => setTermijn(Number(e.target.value))}>
//                 <option value={14}>14 dagen</option>
//                 <option value={30}>30 dagen</option>
//             </select>
//             <button type="submit">Upload factuur</button>
//         </form>
//     );
// }