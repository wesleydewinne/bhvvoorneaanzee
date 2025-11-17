import { useState, useEffect } from "react";
import axios from "axios";

export default function StatusIndicator() {
    const [online, setOnline] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/health`)
            .then(() => setOnline(true))
            .catch(() => setOnline(false));
    }, []);

    return (
        <div style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: online ? "green" : "red"
        }}></div>
    );
}
