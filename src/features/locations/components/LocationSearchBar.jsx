function LocationSearchBar({ value, onChange }) {
    return (
        <div className="locations-toolbar__search">
            <label htmlFor="location-search" className="sr-only">
                Zoek locatie
            </label>
            <input
                id="location-search"
                type="text"
                className="form-input"
                placeholder="Zoek op ID, naam, adres, postcode, plaats, telefoon of e-mail"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
}

export default LocationSearchBar;
