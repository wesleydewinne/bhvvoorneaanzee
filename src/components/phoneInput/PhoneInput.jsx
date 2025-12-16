import { useState } from "react";

const landen = [
    { code: "+31", flag: "🇳🇱", label: "Nederland" },
    { code: "+32", flag: "🇧🇪", label: "België" },
    { code: "+49", flag: "🇩🇪", label: "Duitsland" },
    { code: "+44", flag: "🇬🇧", label: "Verenigd Koninkrijk" }
];

export default function PhoneInput({ value, onChange, error }) {

    const [land, setLand] = useState(landen[0]);

    const handleChange = (e) => {
        const digits = e.target.value.replace(/[^\d]/g, "");
        onChange(land.code + digits);
    };

    return (
        <div className="space-y-1">
            <label className="font-semibold">Telefoonnummer</label>

            <div className="d-flex gap-2">
                <select
                    className="border p-2 rounded-md"
                    value={land.code}
                    onChange={(e) => {
                        const nieuw = landen.find(l => l.code === e.target.value);
                        setLand(nieuw);
                        onChange(nieuw.code);
                    }}
                >
                    {landen.map((l) => (
                        <option key={l.code} value={l.code}>
                            {l.flag} {l.label} ({l.code})
                        </option>
                    ))}
                </select>

                <input
                    className="border p-2 flex-1 rounded-md"
                    placeholder="612345678"
                    onChange={handleChange}
                />
            </div>

            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}
