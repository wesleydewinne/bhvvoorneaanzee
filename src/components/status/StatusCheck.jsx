import { useState, useEffect } from "react";
import axios from "axios";

export default function StatusCheck() {
    const [status, setStatus] = useState("Checking...");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/health`)
            .then(() => setStatus("Backend is online"))
            .catch(() => setStatus("Backend is offline"));
    }, []);

    return (
        <div>
            <p>{status}</p>
        </div>
    );
}
