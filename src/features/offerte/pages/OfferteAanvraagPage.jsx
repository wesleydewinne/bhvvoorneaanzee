import { useEffect, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import quoteService from "../services/quoteService.js";
import "../styles/Offerte.css";

const emptyForm = {
    organizationName: "", contactName: "", email: "", phone: "", trainingCodes: [],
    participantCount: 1, preferredLocation: "", message: "", privacyAccepted: false, website: "",
};

export default function OfferteAanvraagPage() {
    const [form, setForm] = useState(emptyForm);
    const [trainingTypes, setTrainingTypes] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        quoteService.getPublicTrainingTypes().then(setTrainingTypes).catch((reason) => setError(reason.message));
    }, []);

    const submit = async (event) => {
        event.preventDefault();
        setSubmitting(true); setError("");
        try {
            await quoteService.submitRequest({ ...form, participantCount: Number(form.participantCount) });
            setSubmitted(true);
        } catch (reason) {
            setError(reason.message || "De aanvraag kon niet worden verzonden.");
        } finally { setSubmitting(false); }
    };

    if (submitted) return <main className="quote-public-page"><section className="quote-public-success"><CheckCircle2 /><h1>Aanvraag ontvangen</h1><p>Bedankt. We nemen contact met je op om de aanvraag door te nemen.</p></section></main>;

    return <main className="quote-public-page">
        <section className="quote-public-card">
            <header><p className="quote-eyebrow">Vrijblijvende aanvraag</p><h1>Offerte voor een training aanvragen</h1><p>Vertel ons wat je nodig hebt. Je hoeft hiervoor niet in te loggen.</p></header>
            {error && <p className="quote-alert quote-alert--error" role="alert">{error}</p>}
            <form className="quote-request-form" onSubmit={submit}>
                <label>Organisatie<input value={form.organizationName} onChange={(e) => setForm({...form, organizationName:e.target.value})} /></label>
                <label>Naam contactpersoon *<input required value={form.contactName} onChange={(e) => setForm({...form, contactName:e.target.value})} /></label>
                <label>E-mailadres *<input required type="email" value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} /></label>
                <label>Telefoonnummer<input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone:e.target.value})} /></label>
                <label className="quote-request-form__wide">Training(en) *<select required multiple value={form.trainingCodes} onChange={(e) => setForm({...form, trainingCodes:[...e.target.selectedOptions].map((item) => item.value)})}>{trainingTypes.map((training) => <option key={training.code} value={training.code}>{training.displayName}</option>)}</select><small>Gebruik Ctrl of Command om meerdere trainingen te selecteren.</small></label>
                <label>Aantal deelnemers *<input required min="1" type="number" value={form.participantCount} onChange={(e) => setForm({...form, participantCount:e.target.value})} /></label>
                <label>Voorkeurslocatie<input value={form.preferredLocation} onChange={(e) => setForm({...form, preferredLocation:e.target.value})} /></label>
                <label className="quote-request-form__wide">Toelichting<textarea rows="5" value={form.message} onChange={(e) => setForm({...form, message:e.target.value})} /></label>
                <label className="quote-honeypot" aria-hidden="true">Website<input tabIndex="-1" autoComplete="off" value={form.website} onChange={(e) => setForm({...form, website:e.target.value})} /></label>
                <label className="quote-check quote-request-form__wide"><input required type="checkbox" checked={form.privacyAccepted} onChange={(e) => setForm({...form, privacyAccepted:e.target.checked})} /> Ik geef toestemming om deze gegevens te verwerken voor mijn offerteaanvraag.</label>
                <button className="quote-primary-button quote-request-form__wide" disabled={submitting}><Send />{submitting ? "Verzenden..." : "Aanvraag versturen"}</button>
            </form>
        </section>
    </main>;
}
