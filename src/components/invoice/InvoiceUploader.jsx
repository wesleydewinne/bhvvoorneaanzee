// import { useState } from "react";
// import { uploadInvoice } from "../../services/api.js";
//
// export default function InvoiceUploader({ clientId }) {
//     const [file, setFile] = useState(null);
//     const [termijn, setTermijn] = useState(14);
//
//     const handleUpload = async () => {
//         if (!file) return;
//
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("termijn", termijn);
//         formData.append("klantId", clientId);
//
//         const res = await uploadInvoice(formData);
//         alert(res.message);
//     };
//
//     return (
//         <div className="p-4 border rounded">
//             <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//             <DeadlineButton termijn={termijn} setTermijn={setTermijn} />
//             <button onClick={handleUpload}>Verstuur Factuur</button>
//         </div>
//     );
// }
