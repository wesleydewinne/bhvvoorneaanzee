import { useState } from "react";

export default function UserSearchBar({ onSearch, initialValue = "" }) {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch?.(value);
    };

    const handleReset = () => {
        setValue("");
        onSearch?.("");
    };

    return (
        <form className="um-searchbar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Zoek op naam of e-mail"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />

            <button type="submit" className="um-button">
                Zoeken
            </button>

            <button
                type="button"
                className="um-button um-button--secondary"
                onClick={handleReset}
            >
                Reset
            </button>
        </form>
    );
}