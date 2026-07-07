function CompanySearchBar({ value, onChange }) {
    return (
        <div className="companies-toolbar__search">
            <label htmlFor="company-search" className="sr-only">
                Zoek bedrijf
            </label>

            <input
                id="company-search"
                type="text"
                className="form-input"
                placeholder="Zoek op ID of bedrijfsnaam"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
}

export default CompanySearchBar;