import { useState } from "react";

function CompanyForm({
                         initialValues,
                         onSubmit,
                         submitLabel = "Opslaan",
                         loading = false,
                         serverError = "",
                     }) {
    const [form, setForm] = useState(initialValues || {
        name: "", primaryContactName: "", primaryContactEmail: "", primaryContactPhone: "", logoFile: null,
    });
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

    const handleFileChange = (event) => {
        setForm((prev) => ({ ...prev, logoFile: event.target.files?.[0] ?? null }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Bedrijfsnaam is verplicht.";
        }

        if (form.name.trim().length > 150) {
            nextErrors.name = "Bedrijfsnaam mag maximaal 150 tekens zijn.";
        }

        if (form.primaryContactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.primaryContactEmail)) {
            nextErrors.primaryContactEmail = "E-mailadres is ongeldig.";
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
            name: form.name.trim(),
            primaryContactName: form.primaryContactName.trim() || null,
            primaryContactEmail: form.primaryContactEmail.trim() || null,
            primaryContactPhone: form.primaryContactPhone.trim() || null,
        }, form.logoFile);
    };

    return (
        <form className="company-form" onSubmit={handleSubmit} noValidate>
            {serverError ? (
                <div className="form-message form-message--error">
                    {serverError}
                </div>
            ) : null}

            <div className="form-grid">
                <div className="form-field form-field--full">
                    <label htmlFor="name">Bedrijfsnaam</label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Bijvoorbeeld: BHV Voorne aan Zee"
                    />

                    {errors.name ? (
                        <p className="form-error">{errors.name}</p>
                    ) : null}
                </div>

                <div className="form-field">
                    <label htmlFor="primaryContactName">Hoofdcontactpersoon</label>
                    <input id="primaryContactName" name="primaryContactName" type="text" maxLength="150" value={form.primaryContactName} onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label htmlFor="primaryContactEmail">E-mail hoofdcontactpersoon</label>
                    <input id="primaryContactEmail" name="primaryContactEmail" type="email" maxLength="160" value={form.primaryContactEmail} onChange={handleChange} />
                    {errors.primaryContactEmail ? <p className="form-error">{errors.primaryContactEmail}</p> : null}
                </div>

                <div className="form-field">
                    <label htmlFor="primaryContactPhone">Telefoon hoofdcontactpersoon</label>
                    <input id="primaryContactPhone" name="primaryContactPhone" type="tel" maxLength="40" value={form.primaryContactPhone} onChange={handleChange} />
                </div>

                <div className="form-field form-field--full">
                    <label htmlFor="logoFile">Bedrijfslogo</label>
                    <input id="logoFile" type="file" accept="image/*" onChange={handleFileChange} />
                    <small className="form-help">De afbeelding wordt na het opslaan geüpload.</small>
                </div>
            </div>

            <div className="company-form__actions">
                <button type="submit" className="button" disabled={loading}>
                    {loading ? "Bezig..." : submitLabel}
                </button>
            </div>
        </form>
    );
}

export default CompanyForm;
