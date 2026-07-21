import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import quoteService from "../services/quoteService.js";
import "../styles/AdminQuotesPage.css";
import "../styles/AdminQuoteDetailPage.css";

const initialCustomer = { firstName: "", lastName: "", company: "", email: "", phone: "", street: "", houseNumber: "", postalCode: "", city: "" };
const createTraining = () => ({ trainingType: "", participantCount: 1, numberOfExercises: 1, onSite: true });

export default function AdminCreateQuotePage() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(initialCustomer);
    const [trainings, setTrainings] = useState([createTraining()]);
    const [trainingOptions, setTrainingOptions] = useState([]);
    const [discountOptions, setDiscountOptions] = useState([]);
    const [discountCode, setDiscountCode] = useState("");
    const [discountTrainingIndex, setDiscountTrainingIndex] = useState("");
    const [remarks, setRemarks] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([quoteService.getTrainingTypes(), quoteService.getDiscountCodes()])
            .then(([types, discounts]) => {
                setTrainingOptions(Array.isArray(types?.data) ? types.data : []);
                setDiscountOptions(Array.isArray(discounts?.data) ? discounts.data : []);
            })
            .catch(() => setError("Trainingstypen of kortingscodes laden is mislukt."));
    }, []);

    const setCustomerField = (field, value) => setCustomer((current) => ({ ...current, [field]: value }));
    const setTrainingField = (index, field, value) => setTrainings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));

    const submit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            const response = await quoteService.createAdminQuote({
                mode: "OFFERTE",
                customer: {
                    firstName: customer.firstName.trim(), lastName: customer.lastName.trim(),
                    company: customer.company.trim() || null, email: customer.email.trim(), phone: customer.phone.trim(),
                    address: { street: customer.street.trim(), houseNumber: customer.houseNumber.trim(), postalCode: customer.postalCode.trim(), city: customer.city.trim() },
                },
                trainings: trainings.map((item) => ({ trainingType: item.trainingType, participantCount: Number(item.participantCount) || null, numberOfExercises: Number(item.numberOfExercises) || null, onSite: item.onSite, groupSize: null })),
                discountCode: discountCode || null,
                discountTrainingIndex: discountTrainingIndex === "" ? null : Number(discountTrainingIndex),
                remarks: remarks.trim() || null,
            });
            const createdId = response?.data?.id;
            navigate(createdId ? `/admin/offertes/${createdId}` : "/admin/offertes", { replace: true });
        } catch (err) {
            setError(err?.message || "Offerte aanmaken is mislukt.");
        } finally {
            setSaving(false);
        }
    };

    const customerFields = [["firstName", "Voornaam"], ["lastName", "Achternaam"], ["company", "Bedrijf"], ["email", "E-mailadres"], ["phone", "Telefoon"], ["street", "Straat"], ["houseNumber", "Huisnummer"], ["postalCode", "Postcode"], ["city", "Plaats"]];

    return <section className="quote-detail-page">
        <div className="quote-detail-header"><div><h1>Nieuwe offerte</h1><p>Maak intern een offerte aan; prijzen en korting worden door de backend berekend.</p></div><button className="quote-back-btn" type="button" onClick={() => navigate("/admin/offertes")}>Annuleren</button></div>
        {error && <p className="quote-feedback quote-feedback-error">{error}</p>}
        <form onSubmit={submit}>
            <section className="quote-detail-card"><h2>Klantgegevens</h2><div className="quote-detail-grid">{customerFields.map(([field, label]) => <div key={field}><label htmlFor={`new-quote-${field}`}>{label}</label><input id={`new-quote-${field}`} type={field === "email" ? "email" : "text"} value={customer[field]} onChange={(event) => setCustomerField(field, event.target.value)} required={field !== "company"} /></div>)}</div></section>
            <section className="quote-detail-card"><div className="quote-training-header"><div><h2>Trainingen</h2><p>Voeg een of meer trainingsregels toe.</p></div><button className="quote-page-create-btn" type="button" onClick={() => setTrainings((current) => [...current, createTraining()])}>Training toevoegen</button></div>
                {trainings.map((training, index) => <div className="quote-detail-grid" key={index}>
                    <div><label>Trainingstype</label><select value={training.trainingType} onChange={(event) => setTrainingField(index, "trainingType", event.target.value)} required><option value="">Kies type</option>{trainingOptions.map((option) => <option key={option.code} value={option.code}>{option.displayName}</option>)}</select></div>
                    <div><label>Deelnemers</label><input type="number" min="1" value={training.participantCount} onChange={(event) => setTrainingField(index, "participantCount", event.target.value)} /></div>
                    <div><label>Aantal oefeningen</label><input type="number" min="1" value={training.numberOfExercises} onChange={(event) => setTrainingField(index, "numberOfExercises", event.target.value)} /></div>
                    <div><label><input type="checkbox" checked={training.onSite} onChange={(event) => setTrainingField(index, "onSite", event.target.checked)} /> Op locatie</label></div>
                    {trainings.length > 1 && <button className="quote-btn quote-btn-danger" type="button" onClick={() => setTrainings((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Training verwijderen</button>}
                </div>)}
            </section>
            <section className="quote-detail-card"><h2>Korting en opmerkingen</h2><div className="quote-detail-grid">
                <div><label>Kortingscode</label><select value={discountCode} onChange={(event) => setDiscountCode(event.target.value)}><option value="">Geen korting</option>{discountOptions.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}</select></div>
                <div><label>Korting op training</label><select value={discountTrainingIndex} onChange={(event) => setDiscountTrainingIndex(event.target.value)}><option value="">Automatisch / alle</option>{trainings.map((_, index) => <option key={index} value={index}>Training {index + 1}</option>)}</select></div>
                <div className="quote-detail-col-span-2"><label>Opmerkingen</label><textarea rows="4" value={remarks} onChange={(event) => setRemarks(event.target.value)} /></div>
            </div></section>
            <div className="quote-detail-actions"><button className="quote-btn quote-btn-primary" type="submit" disabled={saving}>{saving ? "Berekenen en opslaan..." : "Offerte aanmaken"}</button></div>
        </form>
    </section>;
}
