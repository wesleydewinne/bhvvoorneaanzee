import { useState, useEffect } from "react";

export default function BackendStatus({ showText = true }) {
    const [online, setOnline] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/health`)
            .then(() => setOnline(true))
            .catch(() => setOnline(false));
    }, []);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "white" }}>
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: online ? "green" : "red",
                }}
            />
            {showText && (
                <span>{online ? "Backend online" : "Backend offline"}</span>
            )}
        </div>
    );
}
