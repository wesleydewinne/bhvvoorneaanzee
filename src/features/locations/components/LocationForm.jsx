import { useEffect, useState } from "react";
import companyService from "@/features/companies/services/companyService.js";

const INFO_TYPES = ["GENERAL", "ACCESS", "PARKING", "FACILITIES", "TRAINING", "SAFETY", "TECHNICAL", "FINANCE", "OTHER"];
const ROLE_OPTIONS = ["ROLE_ADMIN", "ROLE_TRAINING_MANAGER", "ROLE_SAFETY_MANAGER", "ROLE_TRAINER", "ROLE_BUILDING_OWNER", "ROLE_LOCATION_MANAGER", "ROLE_FINANCE", "ROLE_OFFICE", "ROLE_BBMI_TECHNICIAN", "ROLE_STUDENT"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyCompanyLocation = () => ({
    companyId: "", locationEmail: "", locationPhone: "", contactPersonName: "",
    contactPersonEmail: "", contactPersonPhone: "", buildingSection: "", floor: "",
    roomNumber: "", primaryLocation: false, active: true, activeFrom: "", activeUntil: "", notes: "",
});
const emptyInfo = () => ({ title: "", content: "", type: "GENERAL", visibleForRoles: [], important: false, sortOrder: "" });

function LocationForm({ initialValues, onSubmit, submitLabel = "Opslaan", loading = false, serverError = "" }) {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [companies, setCompanies] = useState([]);
    const [companiesError, setCompaniesError] = useState("");
    const [companiesLoading, setCompaniesLoading] = useState(true);

    useEffect(() => {
        companyService.getAll()
            .then((data) => setCompanies(Array.isArray(data) ? data : []))
            .catch((error) => setCompaniesError(error?.message || "Bedrijven konden niet worden opgehaald."))
            .finally(() => setCompaniesLoading(false));
    }, []);

    const setField = (name, value) => {
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: "" }));
    };
    const updateListItem = (list, index, name, value) => setForm((current) => ({
        ...current,
        [list]: current[list].map((item, itemIndex) => itemIndex === index ? { ...item, [name]: value } : item),
    }));
    const removeListItem = (list, index) => setForm((current) => ({
        ...current, [list]: current[list].filter((_, itemIndex) => itemIndex !== index),
    }));
    const cleanText = (value) => value?.trim() || null;
    const optionalNumber = (value) => value === "" || value == null ? null : Number(value);

    const validate = () => {
        const next = {};
        [["locationName", "Locatienaam"], ["address", "Adres"], ["postalCode", "Postcode"], ["city", "Plaats"]]
            .forEach(([field, label]) => { if (!form[field]?.trim()) next[field] = `${label} is verplicht.`; });
        if (form.email && !EMAIL_PATTERN.test(form.email)) next.email = "E-mail is ongeldig.";
        form.companyLocations.forEach((relation, index) => {
            if (!relation.companyId) next[`company-${index}`] = "Kies een bedrijf.";
            if (relation.locationEmail && !EMAIL_PATTERN.test(relation.locationEmail)) next[`company-${index}`] = "Vestiging e-mail is ongeldig.";
            if (relation.contactPersonEmail && !EMAIL_PATTERN.test(relation.contactPersonEmail)) next[`company-${index}`] = "Contactpersoon e-mail is ongeldig.";
        });
        form.additionalInfo.forEach((info, index) => {
            if (!info.title.trim() || !info.content.trim() || !info.visibleForRoles.length) next[`info-${index}`] = "Titel, inhoud en minimaal één rol zijn verplicht.";
        });
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        const payload = {
            locationName: form.locationName.trim(), address: form.address.trim(), postalCode: form.postalCode.trim(), city: form.city.trim(),
            phone: cleanText(form.phone), email: cleanText(form.email), locationImageUrl: cleanText(form.locationImageUrl),
            description: cleanText(form.description), numberOfBuildings: optionalNumber(form.numberOfBuildings),
            locationFloorCount: optionalNumber(form.locationFloorCount), buildingFloorCount: optionalNumber(form.buildingFloorCount), parkingInfo: cleanText(form.parkingInfo),
            additionalInfo: form.additionalInfo.map((info) => ({ title: info.title.trim(), content: info.content.trim(), type: info.type, visibleForRoles: info.visibleForRoles, important: info.important, sortOrder: optionalNumber(info.sortOrder) })),
            companyLocations: form.companyLocations.map((relation) => ({
                companyId: Number(relation.companyId), locationEmail: cleanText(relation.locationEmail), locationPhone: cleanText(relation.locationPhone),
                contactPersonName: cleanText(relation.contactPersonName), contactPersonEmail: cleanText(relation.contactPersonEmail), contactPersonPhone: cleanText(relation.contactPersonPhone),
                buildingSection: cleanText(relation.buildingSection), floor: cleanText(relation.floor), roomNumber: cleanText(relation.roomNumber),
                activeFrom: relation.activeFrom || null, activeUntil: relation.activeUntil || null, notes: cleanText(relation.notes),
            })),
        };
        await onSubmit(payload, form.locationImageFile);
    };

    if (!form) return null;
    const basicFields = [
        ["locationName", "Locatienaam", "text"], ["address", "Adres", "text"], ["postalCode", "Postcode", "text"], ["city", "Plaats", "text"],
        ["phone", "Telefoon", "text"], ["email", "E-mail", "email"], ["numberOfBuildings", "Aantal gebouwen", "number"],
        ["locationFloorCount", "Bouwlagen locatie", "number"], ["buildingFloorCount", "Bouwlagen gebouw", "number"],
    ];

    return <form className="location-form" onSubmit={handleSubmit} noValidate>
        {serverError ? <div className="form-message form-message--error">{serverError}</div> : null}
        <div className="form-grid">
            {basicFields.map(([name, label, type]) => <div className="form-field" key={name}>
                <label htmlFor={name}>{label}</label>
                <input id={name} type={type} min={type === "number" ? "0" : undefined} value={form[name]} onChange={(e) => setField(name, e.target.value)} />
                {errors[name] ? <p className="form-error">{errors[name]}</p> : null}
            </div>)}
            <div className="form-field form-field--full"><label htmlFor="description">Omschrijving</label><textarea id="description" rows="5" value={form.description} onChange={(e) => setField("description", e.target.value)} /></div>
            <div className="form-field form-field--full"><label htmlFor="parkingInfo">Parkeerinformatie</label><textarea id="parkingInfo" rows="4" value={form.parkingInfo} onChange={(e) => setField("parkingInfo", e.target.value)} /></div>
            <div className="form-field form-field--full"><label htmlFor="locationImageUrl">Externe foto-URL</label><input id="locationImageUrl" type="url" value={form.locationImageUrl || ""} onChange={(e) => setField("locationImageUrl", e.target.value)} /></div>
            <div className="form-field form-field--full"><label htmlFor="locationImageFile">Locatiefoto uploaden</label><input id="locationImageFile" type="file" accept="image/*" onChange={(e) => setField("locationImageFile", e.target.files?.[0] ?? null)} /></div>
        </div>

        <section className="nested-form-section">
            <div className="nested-form-section__header"><div><h2>Bedrijven op deze locatie</h2><p>Leg per bedrijf de vestigings- en contactgegevens vast.</p></div><button type="button" className="button button--secondary" onClick={() => setField("companyLocations", [...form.companyLocations, emptyCompanyLocation()])}>Bedrijf koppelen</button></div>
            {companiesLoading ? <p>Bedrijven laden...</p> : null}{companiesError ? <p className="form-error">{companiesError}</p> : null}
            {form.companyLocations.map((relation, index) => <article className="nested-form-card" key={relation._id ?? index}>
                <div className="nested-form-card__header"><h3>Bedrijf {index + 1}</h3><button type="button" className="button button--danger" onClick={() => removeListItem("companyLocations", index)}>Verwijderen</button></div>
                {errors[`company-${index}`] ? <p className="form-error">{errors[`company-${index}`]}</p> : null}
                <div className="form-grid">
                    <div className="form-field form-field--full"><label>Bedrijf</label><select value={relation.companyId} onChange={(e) => updateListItem("companyLocations", index, "companyId", e.target.value)}><option value="">Kies een bedrijf</option>{companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}</select></div>
                    {[['locationEmail','Vestiging e-mail','email'],['locationPhone','Vestiging telefoon','text'],['contactPersonName','Contactpersoon','text'],['contactPersonEmail','Contactpersoon e-mail','email'],['contactPersonPhone','Contactpersoon telefoon','text'],['buildingSection','Gebouwdeel','text'],['floor','Verdieping','text'],['roomNumber','Ruimtenummer','text'],['activeFrom','Actief vanaf','date'],['activeUntil','Actief tot','date']].map(([name,label,type]) => <div className="form-field" key={name}><label>{label}</label><input type={type} value={relation[name] || ""} onChange={(e) => updateListItem("companyLocations", index, name, e.target.value)} /></div>)}
                    <div className="form-field form-field--full"><label>Notities</label><textarea rows="3" value={relation.notes || ""} onChange={(e) => updateListItem("companyLocations", index, "notes", e.target.value)} /></div>
                    <label className="check-field"><input type="checkbox" checked={relation.primaryLocation} onChange={(e) => updateListItem("companyLocations", index, "primaryLocation", e.target.checked)} /> Primaire locatie</label>
                    <label className="check-field"><input type="checkbox" checked={relation.active} onChange={(e) => updateListItem("companyLocations", index, "active", e.target.checked)} /> Actief</label>
                </div>
            </article>)}
        </section>

        <section className="nested-form-section">
            <div className="nested-form-section__header"><div><h2>Aanvullende informatie</h2><p>Voeg toegangs-, parkeer-, veiligheids- of andere informatie toe.</p></div><button type="button" className="button button--secondary" onClick={() => setField("additionalInfo", [...form.additionalInfo, emptyInfo()])}>Informatie toevoegen</button></div>
            {form.additionalInfo.map((info, index) => <article className="nested-form-card" key={info._id ?? index}>
                <div className="nested-form-card__header"><h3>Informatieblok {index + 1}</h3><button type="button" className="button button--danger" onClick={() => removeListItem("additionalInfo", index)}>Verwijderen</button></div>
                {errors[`info-${index}`] ? <p className="form-error">{errors[`info-${index}`]}</p> : null}
                <div className="form-grid">
                    <div className="form-field"><label>Titel</label><input maxLength="120" value={info.title} onChange={(e) => updateListItem("additionalInfo", index, "title", e.target.value)} /></div>
                    <div className="form-field"><label>Type</label><select value={info.type} onChange={(e) => updateListItem("additionalInfo", index, "type", e.target.value)}>{INFO_TYPES.map((type) => <option key={type}>{type}</option>)}</select></div>
                    <div className="form-field form-field--full"><label>Inhoud</label><textarea maxLength="2000" rows="4" value={info.content} onChange={(e) => updateListItem("additionalInfo", index, "content", e.target.value)} /></div>
                    <div className="form-field form-field--full"><label>Zichtbaar voor rollen</label><div className="role-checkbox-grid">{ROLE_OPTIONS.map((role) => <label key={role} className="check-field"><input type="checkbox" checked={info.visibleForRoles.includes(role)} onChange={(e) => updateListItem("additionalInfo", index, "visibleForRoles", e.target.checked ? [...info.visibleForRoles, role] : info.visibleForRoles.filter((item) => item !== role))} /> {role}</label>)}</div></div>
                    <div className="form-field"><label>Sorteervolgorde</label><input type="number" min="0" value={info.sortOrder ?? ""} onChange={(e) => updateListItem("additionalInfo", index, "sortOrder", e.target.value)} /></div>
                    <label className="check-field"><input type="checkbox" checked={info.important} onChange={(e) => updateListItem("additionalInfo", index, "important", e.target.checked)} /> Belangrijk</label>
                </div>
            </article>)}
        </section>
        <div className="location-form__actions"><button type="submit" className="button" disabled={loading || companiesLoading}>{loading ? "Bezig..." : submitLabel}</button></div>
    </form>;
}

export default LocationForm;
