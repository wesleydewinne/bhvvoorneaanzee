import { useState } from "react";

function LocationForm({
                          initialValues,
                          onSubmit,
                          submitLabel = "Opslaan",
                          loading = false,
                          serverError = "",
                      }) {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.locationName.trim()) {
            nextErrors.locationName = "Locatienaam is verplicht.";
        }

        if (!form.address.trim()) {
            nextErrors.address = "Adres is verplicht.";
        }

        if (!form.postalCode.trim()) {
            nextErrors.postalCode = "Postcode is verplicht.";
        }

        if (!form.city.trim()) {
            nextErrors.city = "Plaats is verplicht.";
        }

        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "E-mail is ongeldig.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        await onSubmit({
            locationName: form.locationName.trim(),
            address: form.address.trim(),
            postalCode: form.postalCode.trim(),
            city: form.city.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            description: form.description.trim(),
        });
    };

    return (
        <form className="location-form" onSubmit={handleSubmit} noValidate>
            {serverError ? (
                <div className="form-message form-message--error">{serverError}</div>
            ) : null}

            <div className="form-grid">
                <div className="form-field">
                    <label htmlFor="locationName">Locatienaam</label>
                    <input
                        id="locationName"
                        name="locationName"
                        type="text"
                        value={form.locationName}
                        onChange={handleChange}
                    />
                    {errors.locationName ? (
                        <p className="form-error">{errors.locationName}</p>
                    ) : null}
                </div>

                <div className="form-field">
                    <label htmlFor="address">Adres</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={form.address}
                        onChange={handleChange}
                    />
                    {errors.address ? (
                        <p className="form-error">{errors.address}</p>
                    ) : null}
                </div>

                <div className="form-field">
                    <label htmlFor="postalCode">Postcode</label>
                    <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={form.postalCode}
                        onChange={handleChange}
                    />
                    {errors.postalCode ? (
                        <p className="form-error">{errors.postalCode}</p>
                    ) : null}
                </div>

                <div className="form-field">
                    <label htmlFor="city">Plaats</label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={form.city}
                        onChange={handleChange}
                    />
                    {errors.city ? (
                        <p className="form-error">{errors.city}</p>
                    ) : null}
                </div>

                <div className="form-field">
                    <label htmlFor="phone">Telefoon</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email ? (
                        <p className="form-error">{errors.email}</p>
                    ) : null}
                </div>

                <div className="form-field form-field--full">
                    <label htmlFor="description">Omschrijving</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="6"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="location-form__actions">
                <button type="submit" className="button" disabled={loading}>
                    {loading ? "Bezig..." : submitLabel}
                </button>
            </div>
        </form>
    );
}

export default LocationForm;
