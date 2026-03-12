import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function LocationActionsMenu({ location, onDelete }) {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        if (!open && menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const estimatedMenuHeight = 150;

            setDropUp(spaceBelow < estimatedMenuHeight);
        }

        setOpen((prev) => !prev);
    };

    const handleNavigate = (path) => {
        setOpen(false);
        navigate(path);
    };

    const handleDeleteClick = () => {
        setOpen(false);
        onDelete(location);
    };

    return (
        <div className="location-actions-menu" ref={menuRef}>
            <button
                type="button"
                className="location-actions-menu__trigger"
                onClick={toggleMenu}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Acties voor locatie ${location.locationName}`}
                title="Acties"
            >
                <span className="location-actions-menu__dots">⋮</span>
            </button>

            {open && (
                <div
                    className={`location-actions-menu__dropdown ${
                        dropUp ? "location-actions-menu__dropdown--up" : "location-actions-menu__dropdown--down"
                    }`}
                    role="menu"
                >
                    <button
                        type="button"
                        className="location-actions-menu__item"
                        onClick={() => handleNavigate(`/admin/locations/${location.id}`)}
                    >
                        Bekijken
                    </button>

                    <button
                        type="button"
                        className="location-actions-menu__item"
                        onClick={() => handleNavigate(`/admin/locations/${location.id}/edit`)}
                    >
                        Bewerken
                    </button>

                    <button
                        type="button"
                        className="location-actions-menu__item location-actions-menu__item--danger"
                        onClick={handleDeleteClick}
                    >
                        Verwijderen
                    </button>
                </div>
            )}
        </div>
    );
}

export default LocationActionsMenu;
