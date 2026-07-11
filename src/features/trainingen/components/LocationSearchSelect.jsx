import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MapPin, Search, X } from "lucide-react";

function LocationSearchSelect({
                                  locations = [],
                                  value = "",
                                  onChange,
                                  onSelectLocation,
                                  label = "Locatie",
                                  placeholder = "Zoek op naam, adres, postcode of plaats...",
                                  required = false,
                                  disabled = false,
                                  error = "",
                              }) {
    const inputId = useId();
    const wrapperRef = useRef(null);

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const selectedLocation = useMemo(() => {
        if (!value) return null;
        return locations.find((location) => String(location.id) === String(value)) || null;
    }, [locations, value]);

    useEffect(() => {
        if (selectedLocation) {
            setQuery(
                `${selectedLocation.locationName || "-"}${
                    selectedLocation.city ? ` - ${selectedLocation.city}` : ""
                }`
            );
        } else if (!value) {
            setQuery("");
        }
    }, [selectedLocation, value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredLocations = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return locations.slice(0, 20);
        }

        return locations
            .filter((location) => {
                const searchableText = [
                    location.locationName,
                    location.address,
                    location.city,
                    location.postalCode,
                    location.phoneNumber,
                    location.locationEmail,
                    location.email,
                    location.companyName,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(normalizedQuery);
            })
            .slice(0, 20);
    }, [locations, query]);

    const handleInputChange = (event) => {
        const nextValue = event.target.value;
        setQuery(nextValue);
        setIsOpen(true);

        if (!nextValue.trim()) {
            onChange?.("");
            onSelectLocation?.(null);
        }
    };

    const handleSelectLocation = (location) => {
        onChange?.(String(location.id));
        onSelectLocation?.(location);

        setQuery(
            `${location.locationName || "-"}${location.city ? ` - ${location.city}` : ""}`
        );

        setIsOpen(false);
    };

    const handleFocus = () => {
        if (!disabled) {
            setIsOpen(true);
        }
    };

    const handleClear = () => {
        setQuery("");
        onChange?.("");
        onSelectLocation?.(null);
        setIsOpen(false);
    };

    return (
        <div className="training-form__field">
            <label htmlFor={inputId}>
                <MapPin aria-hidden="true" />
                {label} {required ? "*" : ""}
            </label>

            <div className="location-search-select" ref={wrapperRef}>
                <div className="location-search-select__input-wrapper">
                    <Search className="location-search-select__search-icon" aria-hidden="true" />
                    <input
                        id={inputId}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoComplete="off"
                    />

                    {query && !disabled && (
                        <button
                            type="button"
                            className="location-search-select__clear"
                            onClick={handleClear}
                            aria-label="Wis locatie"
                            title="Wis locatie"
                        >
                            <X aria-hidden="true" />
                        </button>
                    )}
                </div>

                <input
                    type="hidden"
                    name="locationId"
                    value={value || ""}
                    required={required}
                    readOnly
                />

                {isOpen && !disabled && (
                    <div className="location-search-select__dropdown">
                        {filteredLocations.length > 0 ? (
                            filteredLocations.map((location) => (
                                <button
                                    key={location.id}
                                    type="button"
                                    className="location-search-select__option"
                                    onClick={() => handleSelectLocation(location)}
                                >
                                    <span className="location-search-select__option-title">
                                        {location.locationName || "-"}
                                    </span>

                                    <span className="location-search-select__option-meta">
                                        ID: {location.id}
                                        {location.companyId ? ` - Bedrijf ID: ${location.companyId}` : ""}
                                        {location.city ? ` - ${location.city}` : ""}
                                        {location.address ? ` - ${location.address}` : ""}
                                        {location.postalCode ? ` - ${location.postalCode}` : ""}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <div className="location-search-select__empty">
                                Geen locaties gevonden.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {selectedLocation && (
                <small className="training-form__hint">
                    Geselecteerd: #{selectedLocation.id} - {selectedLocation.locationName}
                    {selectedLocation.city ? ` (${selectedLocation.city})` : ""}
                    {selectedLocation.companyId ? ` - Bedrijf ID: ${selectedLocation.companyId}` : ""}
                </small>
            )}

            {error && <small className="training-form__field-error">{error}</small>}
        </div>
    );
}

export default LocationSearchSelect;
