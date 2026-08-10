import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import quoteService from "../services/quoteService.js";
import { buildQuotePayload, createInitialQuote, formatCurrency } from "../helpers/quoteHelpers.js";
import QuoteSection from "./QuoteSection.jsx";
import TrainingItemsEditor from "./TrainingItemsEditor.jsx";

const updateNested = (setter, section, field, value) => setter((current) => ({
    ...current,
    [section]: { ...current[section], [field]: value },
}));

export default function QuotePdfForm({ initialValue, onSave, submitLabel = "Offerte opslaan" }) {
    const [form, setForm] = useState(() => initialValue || createInitialQuote());
    const [trainingTypes, setTrainingTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        quoteService.getTrainingTypes()
            .then(setTrainingTypes)
            .catch((reason) => setError(reason.message || "De trainingstypen konden niet worden geladen."))
            .finally(() => setLoadingTypes(false));
    }, []);

    const payload = useMemo(() => buildQuotePayload(form), [form]);

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await onSave(payload);
        } catch (reason) {
            setError(reason.message || "De offerte-PDF kon niet worden gemaakt.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="quote-form" onSubmit={submit}>
            {error && <div className="quote-alert quote-alert--error" role="alert">{error}</div>}

            <QuoteSection title="Offertegegevens" description="Referentie, geldigheid en teksten op de omslag.">
                <div className="quote-form-grid quote-form-grid--three">
                    {[["quoteNumber", "Offertenummer", "text"], ["quoteDate", "Offertedatum", "date"], ["validUntil", "Geldig tot", "date"]].map(([field, label, type]) => (
                        <label className="quote-field" key={field}>{label}<input required type={type} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} /></label>
                    ))}
                    <label className="quote-field quote-field--span-3">Covertitel<input maxLength={250} value={form.coverTitle} onChange={(e) => setForm({ ...form, coverTitle: e.target.value })} /></label>
                    <label className="quote-field quote-field--span-3">Coverondertitel<input maxLength={500} value={form.coverSubtitle} onChange={(e) => setForm({ ...form, coverSubtitle: e.target.value })} /></label>
                </div>
            </QuoteSection>

            <QuoteSection title="Opdrachtgever" description="Gegevens die rechtstreeks in de offerte worden opgenomen.">
                <div className="quote-form-grid quote-form-grid--three">
                    {[
                        ["organizationName", "Organisatie", true], ["contactPersonName", "Contactpersoon", true], ["greetingName", "Aanspreeknaam", false],
                        ["streetAndHouseNumber", "Straat en huisnummer", true], ["postalCode", "Postcode", true], ["city", "Plaats", true],
                        ["country", "Land", true], ["contactEmail", "E-mail", false, "email"], ["contactPhone", "Telefoon", false, "tel"],
                    ].map(([field, label, required, type = "text"]) => <label className="quote-field" key={field}>{label}<input type={type} required={required} value={form.customer[field]} onChange={(e) => updateNested(setForm, "customer", field, e.target.value)} /></label>)}
                </div>
            </QuoteSection>

            <QuoteSection title="Trainingslocatie" description="Uitvoeringslocatie en praktische toegangsinformatie.">
                <div className="quote-form-grid quote-form-grid--three">
                    {[
                        ["locationName", "Locatienaam"], ["streetAndHouseNumber", "Straat en huisnummer"], ["postalCode", "Postcode"],
                        ["city", "Plaats"], ["country", "Land"], ["roomOrArea", "Ruimte of terrein"],
                    ].map(([field, label]) => <label className="quote-field" key={field}>{label}<input required={["locationName", "city", "country"].includes(field)} value={form.trainingLocation[field]} onChange={(e) => updateNested(setForm, "trainingLocation", field, e.target.value)} /></label>)}
                    <label className="quote-field quote-field--span-3">Toegangs- en aanmeldinstructies<textarea rows="3" value={form.trainingLocation.accessInstructions} onChange={(e) => updateNested(setForm, "trainingLocation", "accessInstructions", e.target.value)} /></label>
                </div>
            </QuoteSection>

            <QuoteSection title="Trainingen" description="De technische code bewaakt de koppeling met de juiste programmateksten.">
                {loadingTypes ? <p>Trainingstypen laden…</p> : <TrainingItemsEditor items={form.trainingItems} trainingTypes={trainingTypes} onChange={(trainingItems) => setForm({ ...form, trainingItems })} />}
            </QuoteSection>

            <QuoteSection title="Inhoud en advies" description="Klantgerichte teksten voor de aanvraag, doelstelling en planning.">
                <div className="quote-form-grid quote-form-grid--two">
                    {[
                        ["requestSummary", "Samenvatting aanvraag", true], ["trainingGoal", "Doel van de training", true],
                        ["personalForeword", "Persoonlijk voorwoord", false], ["planningNotes", "Planningsopmerkingen", false],
                    ].map(([field, label, required]) => <label className="quote-field" key={field}>{label}<textarea rows="5" required={required} maxLength={5000} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} /></label>)}
                    <label className="quote-field quote-field--span-2">Adviezen <span>(één advies per regel)</span><textarea rows="5" value={form.recommendations} onChange={(e) => setForm({ ...form, recommendations: e.target.value })} /></label>
                </div>
            </QuoteSection>

            <QuoteSection title="Korting en afronding" description="Alle bedragen zijn exclusief btw; de samenvatting wordt automatisch berekend.">
                <div className="quote-form-grid quote-form-grid--four">
                    {[["code", "Kortingscode", "text"], ["description", "Omschrijving", "text"], ["percentage", "Percentage", "number"], ["amountExcludingVat", "Kortingsbedrag", "number"]].map(([field, label, type]) => <label className="quote-field" key={field}>{label}<input type={type} min={type === "number" ? 0 : undefined} step={type === "number" ? "0.01" : undefined} value={form.discount[field]} onChange={(e) => updateNested(setForm, "discount", field, e.target.value)} /></label>)}
                    <label className="quote-field">Btw-percentage<input type="number" min="0" max="100" step="0.01" value={form.vatPercentage} onChange={(e) => setForm({ ...form, vatPercentage: e.target.value })} /></label>
                    <label className="quote-field quote-field--span-3">Link voor digitaal akkoord<input type="url" value={form.agreementUrl} onChange={(e) => setForm({ ...form, agreementUrl: e.target.value })} /></label>
                </div>
                <div className="quote-totals" aria-label="Offertetotalen">
                    <span>Trainingen <strong>{formatCurrency(payload.priceSummary.trainingSubtotalExcludingVat)}</strong></span>
                    <span>Reiskosten <strong>{formatCurrency(payload.priceSummary.travelCostsExcludingVat)}</strong></span>
                    <span>Korting <strong>− {formatCurrency(payload.priceSummary.discountTotalExcludingVat)}</strong></span>
                    <span>Totaal incl. btw <strong>{formatCurrency(payload.priceSummary.totalIncludingVat)}</strong></span>
                </div>
            </QuoteSection>

            <div className="quote-submit-bar">
                <p>De offerte wordt veilig opgeslagen. Daarna kan de PDF vanuit het overzicht worden gedownload.</p>
                <button type="submit" disabled={submitting || loadingTypes}>
                    {submitting ? <LoaderCircle className="quote-spin" size={20} /> : <Save size={20} />}
                    {submitting ? "Opslaan..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
