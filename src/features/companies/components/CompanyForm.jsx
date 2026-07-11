import { useState } from "react";

function CompanyForm({
                         initialValues,
                         onSubmit,
                         submitLabel = "Opslaan",
                         loading = false,
                         serverError = "",
                     }) {
    const [form, setForm] = useState(initialValues || { name: "", logoFile: null });
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
