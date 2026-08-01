import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, Plus } from "lucide-react";
import QuoteStatusBadge from "../components/QuoteStatusBadge.jsx";
import QuoteTrainingEditor from "../components/QuoteTrainingEditor.jsx";
import { joinContactName, splitContactName } from "../helpers/contactName.js";
import { formatCurrency, formatDate, formatMoneyInput, parseMoneyInput } from "../helpers/quoteFormatters.js";
import { quoteStatusLabels } from "../helpers/quoteStatusLabels.js";
import quoteService, { getQuotePdfErrorMessage } from "../services/quoteService.js";
import "../styles/AdminQuoteDetailPage.css";

function apiMessage(error, fallback) {
    return error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        fallback;
}

function toForm(quote) {
    const customer = quote.customer || {};
    const contactName = splitContactName(customer.contactPerson);
    return {
        companyName: customer.name || "",
        contactFirstName: contactName.firstName,
        contactLastName: contactName.lastName,
        contactEmail: customer.email || "",
        contactPhone: customer.phone || "",
        street: customer.street || "",
        houseNumber: customer.houseNumber || "",
        postalCode: customer.postalCode || "",
        city: customer.city || "",
        customerReference: quote.reference || "",
        quoteSubject: quote.subject || "",
        introductionText: quote.introduction || "",
        closingText: quote.closingText || "",
        validUntil: quote.validUntil || "",
        travelDistanceKm: formatMoneyInput(quote.travelDistanceKm || 0),
        travelFreeKm: formatMoneyInput(quote.travelFreeKm ?? 100),
        travelRatePerKm: formatMoneyInput(quote.travelRatePerKm || 0),
    };
}

function statusOptions(status) {
    const transitions = {
        DRAFT: ["DRAFT", "SENDING", "CANCELLED"],
        SENDING: ["SENDING", "DRAFT", "CANCELLED"],
        SENT: ["SENT", "DRAFT", "ACCEPTED", "REJECTED", "CANCELLED"],
        EXPIRED: ["EXPIRED", "DRAFT"],
        ACCEPTED: ["ACCEPTED"],
        REJECTED: ["REJECTED"],
        CANCELLED: ["CANCELLED"],
    };
    return transitions[status] || [status];
}

function distributeParticipants(participantCount, groupCount) {
    const participants = Math.max(0, Number(participantCount || 0));
    const groups = Math.max(1, Number(groupCount || 1));
    const baseSize = Math.floor(participants / groups);
    const remainder = participants % groups;

    return Array.from(
        { length: groups },
        (_, index) => baseSize + (index < remainder ? 1 : 0)
    );
}

export default function AdminQuoteDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quote, setQuote] = useState(null);
    const [form, setForm] = useState(null);
    const [catalog, setCatalog] = useState([]);
    const [newTraining, setNewTraining] = useState({
        trainingConfigurationId: "",
        participantCount: 1,
        internalNote: "",
    });
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showAddTraining, setShowAddTraining] = useState(false);

    const notify = (type, text) => setMessage({ type, text });

    const loadQuote = useCallback(async () => {
        const response = await quoteService.getQuoteById(id);
        setQuote(response.data);
        setForm(toForm(response.data));
        setSelectedStatus(response.data.status);
        return response.data;
    }, [id]);

    useEffect(() => {
        setLoading(true);
        Promise.all([loadQuote(), quoteService.getTrainingCatalog()])
            .then(([, catalogResponse]) => {
                setCatalog(Array.isArray(catalogResponse?.data)
                    ? catalogResponse.data
                    : []);
            })
            .catch((error) =>
                notify("error", apiMessage(error, "Offerte laden is mislukt."))
            )
            .finally(() => setLoading(false));
    }, [loadQuote]);

    const editable = quote?.status === "DRAFT";
    const trainings = quote?.quoteTrainings || [];
    const totalBaseSales = trainings.reduce(
        (total, training) => total + Number(training.baseSalesAmount || 0),
        0
    );
    const totalDiscount = Math.max(
        0,
        totalBaseSales - Number(quote?.subtotalExcludingVat || 0)
    );
    const travelDistance = parseMoneyInput(form?.travelDistanceKm ?? 0);
    const travelFreeKm = parseMoneyInput(form?.travelFreeKm ?? 100);
    const travelRate = parseMoneyInput(form?.travelRatePerKm ?? 0);
    const chargeableTravelKm = Math.max(0, travelDistance - travelFreeKm);
    const calculatedTravelCosts = chargeableTravelKm * travelRate;

    const updateForm = (name, value) => {
        setForm((current) => ({ ...current, [name]: value }));
    };

    const run = async (action, successText) => {
        setBusy(true);
        setMessage({ type: "", text: "" });
        try {
            await action();
            await loadQuote();
            notify("success", successText);
            return true;
        } catch (error) {
            notify("error", apiMessage(error, "De wijziging is mislukt."));
            return false;
        } finally {
            setBusy(false);
        }
    };

    const saveDetails = () => run(
        () => {
            const {
                contactFirstName,
                contactLastName,
                ...quoteFields
            } = form;

            return quoteService.updateQuote(id, {
            quoteId: id,
            ...quoteFields,
            contactPersonName: joinContactName(
                contactFirstName,
                contactLastName
            ),
            contactPhone: form.contactPhone.trim() || null,
            customerReference: form.customerReference.trim() || null,
            introductionText: form.introductionText.trim() || null,
            closingText: form.closingText.trim() || null,
            travelDistanceKm: parseMoneyInput(form.travelDistanceKm),
            travelFreeKm: parseMoneyInput(form.travelFreeKm),
            travelRatePerKm: parseMoneyInput(form.travelRatePerKm),
            });
        },
        "Klant- en offertegegevens opgeslagen."
    );

    const addTraining = async () => {
        const saved = await run(async () => {
        await quoteService.addTraining(id, {
            quoteId: id,
            trainingConfigurationId: newTraining.trainingConfigurationId,
            participantCount: Number(newTraining.participantCount),
            internalNote: newTraining.internalNote.trim() || null,
        });
        setNewTraining({
            trainingConfigurationId: "",
            participantCount: 1,
            internalNote: "",
        });
        }, "Training toegevoegd.");
        if (saved) setShowAddTraining(false);
    };

    const deleteTraining = (training) => {
        if (!window.confirm(`Training “${training.trainingName}” verwijderen?`)) {
            return;
        }
        void run(
            () => quoteService.deleteTraining(id, training.id),
            "Training verwijderd."
        );
    };

    const changeStatus = () => {
        if (selectedStatus === quote.status) return;
        void run(
            () => quoteService.patchQuote(id, { status: selectedStatus }),
            selectedStatus === "SENDING"
                ? "Offerte staat klaar om te verzenden."
                : "Status bijgewerkt."
        );
    };

    const sendQuote = () => {
        if (!window.confirm(
            `Offerte ${quote.quoteNumber} naar ${quote.customer?.email} verzenden?`
        )) return;

        void run(
            () => quoteService.sendQuote(id),
            "Offerte met PDF en akkoordlink verzonden."
        );
    };

    const downloadPdf = async () => {
        setBusy(true);
        try {
            const response = await quoteService.downloadQuotePdf(id);
            const url = URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            const link = document.createElement("a");
            link.href = url;
            link.download = `offerte-${quote.quoteNumber}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            notify("error", await getQuotePdfErrorMessage(
                error,
                "PDF downloaden is mislukt."
            ));
        } finally {
            setBusy(false);
        }
    };

    const selectedCatalogItem = useMemo(
        () => catalog.find(
            (item) =>
                item.trainingConfigurationId ===
                newTraining.trainingConfigurationId
        ),
        [catalog, newTraining.trainingConfigurationId]
    );

    if (loading) {
        return <section className="quote-detail-page">Offerte laden...</section>;
    }
    if (!quote || !form) {
        return (
            <section className="quote-detail-page">
                {message.text || "Offerte niet gevonden."}
            </section>
        );
    }

    return (
        <section className="quote-detail-page">
            <div className="quote-detail-header">
                <div>
                    <h1>Offerte {quote.quoteNumber}</h1>
                    <p>
                        {formatDate(quote.quoteDate)} · geldig tot{" "}
                        {formatDate(quote.validUntil)}
                    </p>
                </div>
                <button
                    type="button"
                    className="quote-back-btn"
                    onClick={() => navigate("/admin/offertes")}
                >
                    Terug naar overzicht
                </button>
            </div>

            {message.text && (
                <p className={`quote-feedback quote-feedback-${message.type}`}>
                    {message.text}
                </p>
            )}

            <section className="quote-detail-card quote-status-bar">
                <div className="quote-status-current">
                    <span>Huidige status</span>
                    <QuoteStatusBadge status={quote.status} />
                </div>
                <div className="quote-status-select">
                    <label htmlFor="quote-status">Status aanpassen</label>
                    <select
                        id="quote-status"
                        value={selectedStatus}
                        onChange={(event) => setSelectedStatus(event.target.value)}
                        disabled={busy}
                    >
                        {statusOptions(quote.status).map((status) => (
                            <option key={status} value={status}>
                                {quoteStatusLabels[status] || status}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    className="quote-btn quote-btn-primary"
                    disabled={busy || selectedStatus === quote.status}
                    onClick={changeStatus}
                >
                    Wijziging opslaan
                </button>
                <div className="quote-header-preview">
                    <span>Controleer eerst de klantversie</span>
                    <button
                        type="button"
                        className="quote-btn quote-btn-secondary quote-btn-with-icon"
                        disabled={busy}
                        onClick={downloadPdf}
                    >
                        <Eye aria-hidden="true" />
                        Voorbeeld offerte bekijken
                    </button>
                </div>
                {quote.status === "SENDING" && (
                    <button
                        type="button"
                        className="quote-btn quote-btn-primary"
                        disabled={busy}
                        onClick={sendQuote}
                    >
                        Nu verzenden
                    </button>
                )}
            </section>

            <div className="quote-detail-layout">
                <section className="quote-detail-card">
                    <h2>Klantgegevens</h2>
                    <div className="quote-detail-grid">
                        {[
                            ["companyName", "Bedrijfsnaam"],
                            ["contactFirstName", "Voornaam"],
                            ["contactLastName", "Achternaam (incl. tussenvoegsel)"],
                            ["contactEmail", "E-mailadres", "email"],
                            ["contactPhone", "Telefoon"],
                            ["street", "Straat"],
                            ["houseNumber", "Huisnummer"],
                            ["postalCode", "Postcode"],
                            ["city", "Plaats"],
                            ["customerReference", "Klantreferentie"],
                        ].map(([name, label, type = "text"]) => (
                            <div key={name}>
                                <label htmlFor={`quote-${name}`}>{label}</label>
                                <input
                                    id={`quote-${name}`}
                                    type={type}
                                    value={form[name]}
                                    disabled={!editable || busy}
                                    onChange={(event) =>
                                        updateForm(name, event.target.value)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    {editable && (
                        <button
                            type="button"
                            className="quote-btn quote-btn-primary quote-card-save"
                            disabled={busy}
                            onClick={saveDetails}
                        >
                            Klantgegevens opslaan
                        </button>
                    )}
                </section>

                <section className="quote-detail-card">
                    <h2>Offertegegevens</h2>
                    <div className="quote-detail-grid">
                        <div className="quote-detail-col-span-2">
                            <label htmlFor="quoteSubject">Onderwerp</label>
                            <input
                                id="quoteSubject"
                                value={form.quoteSubject}
                                disabled={!editable || busy}
                                onChange={(event) =>
                                    updateForm("quoteSubject", event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="validUntil">Geldig tot</label>
                            <input
                                id="validUntil"
                                type="date"
                                value={form.validUntil}
                                disabled={!editable || busy}
                                onChange={(event) =>
                                    updateForm("validUntil", event.target.value)
                                }
                            />
                        </div>
                        <div className="quote-detail-col-span-2">
                            <label htmlFor="introduction">Inleiding</label>
                            <textarea
                                id="introduction"
                                rows="5"
                                value={form.introductionText}
                                disabled={!editable || busy}
                                onChange={(event) =>
                                    updateForm("introductionText", event.target.value)
                                }
                            />
                        </div>
                        <div className="quote-detail-col-span-2">
                            <label htmlFor="closingText">Afsluitende tekst</label>
                            <textarea
                                id="closingText"
                                rows="4"
                                value={form.closingText}
                                disabled={!editable || busy}
                                onChange={(event) =>
                                    updateForm("closingText", event.target.value)
                                }
                            />
                        </div>
                    </div>
                    {editable && (
                        <button
                            type="button"
                            className="quote-btn quote-btn-primary"
                            disabled={busy}
                            onClick={saveDetails}
                        >
                            Offertegegevens opslaan
                        </button>
                    )}
                </section>
            </div>

            <section className="quote-detail-card quote-financial-overview">
                <h2>Financieel overzicht</h2>
                <p className="quote-financial-intro">
                    Interne berekening voor beheer. Deze samenvatting wordt niet
                    op de klantofferte getoond.
                </p>
                <div className="quote-financial-groups">
                    <section className="quote-financial-group">
                        <h3>Offertetotaal</h3>
                        <div><span>Prijs excl. btw</span><strong>{formatCurrency(quote.subtotalExcludingVat)}</strong></div>
                        <div><span>Btw-bedrag</span><strong>{formatCurrency(quote.vatAmount)}</strong></div>
                        <div className="is-total"><span>Totaal incl. btw</span><strong>{formatCurrency(quote.totalIncludingVat)}</strong></div>
                    </section>

                    <section className="quote-financial-group quote-financial-group-discount">
                        <h3>Korting</h3>
                        <div><span>Verkoop vóór korting</span><strong>{formatCurrency(totalBaseSales)}</strong></div>
                        <div><span>Totale korting</span><strong>− {formatCurrency(totalDiscount)}</strong></div>
                        <div className="is-total"><span>Verkoop na korting</span><strong>{formatCurrency(quote.subtotalExcludingVat)}</strong></div>
                    </section>

                    <section className="quote-financial-group quote-financial-group-internal">
                        <h3>Intern resultaat</h3>
                        <div><span>Interne kostprijs</span><strong>{formatCurrency(quote.totalCostAmount)}</strong></div>
                        <div><span>Wat je overhoudt</span><strong>{formatCurrency(quote.marginAmount)}</strong></div>
                        <div className="is-total"><span>Marge</span><strong>{Number(quote.marginPercentage || 0).toFixed(1)}%</strong></div>
                    </section>
                </div>
            </section>

            <div className="quote-logistics-layout">
            <section className="quote-detail-card quote-travel-card">
                <div className="quote-travel-heading">
                    <div>
                        <h2>Reiskosten</h2>
                        <p>
                            Alleen kilometers boven de vrije grens worden aan
                            de klant doorberekend.
                        </p>
                    </div>
                    <strong>{formatCurrency(calculatedTravelCosts)}</strong>
                </div>
                <div className="quote-travel-grid">
                    <div>
                        <label htmlFor="travel-distance">Totale reisafstand</label>
                        <div className="quote-input-suffix">
                            <input
                                id="travel-distance"
                                type="text"
                                inputMode="decimal"
                                value={form.travelDistanceKm}
                                disabled={!editable || busy}
                                onChange={(event) => updateForm("travelDistanceKm", event.target.value)}
                            />
                            <span>km</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="travel-free">Vrije kilometers</label>
                        <div className="quote-input-suffix">
                            <input
                                id="travel-free"
                                type="text"
                                inputMode="decimal"
                                value={form.travelFreeKm}
                                disabled={!editable || busy}
                                onChange={(event) => updateForm("travelFreeKm", event.target.value)}
                            />
                            <span>km</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="travel-rate">Tarief per extra kilometer</label>
                        <div className="quote-input-prefix">
                            <span>€</span>
                            <input
                                id="travel-rate"
                                type="text"
                                inputMode="decimal"
                                value={form.travelRatePerKm}
                                disabled={!editable || busy}
                                onChange={(event) => updateForm("travelRatePerKm", event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="quote-travel-result">
                        <span>Belaste kilometers</span>
                        <strong>{chargeableTravelKm.toLocaleString("nl-NL")} km</strong>
                    </div>
                </div>
                {editable && (
                    <button
                        type="button"
                        className="quote-btn quote-btn-primary"
                        disabled={busy}
                        onClick={saveDetails}
                    >
                        Reiskosten opslaan
                    </button>
                )}
            </section>

            <section className="quote-detail-card quote-grouping-card">
                <div className="quote-grouping-heading">
                    <div>
                        <h2>Ideale groepsindeling</h2>
                        <p>Voorstel op basis van het maximum per trainingsgroep.</p>
                    </div>
                </div>
                <div className="quote-grouping-list">
                    {trainings.map((training) => {
                        const maximum = Math.max(
                            1,
                            Number(training.maximumParticipantsPerGroup || 10)
                        );
                        const idealGroups = Math.max(
                            1,
                            Math.ceil(Number(training.participantCount || 0) / maximum)
                        );
                        const configuredGroups = Math.max(
                            idealGroups,
                            Number(training.groupCount || idealGroups)
                        );
                        const distribution = distributeParticipants(
                            training.participantCount,
                            configuredGroups
                        );

                        return (
                            <article key={training.id} className="quote-grouping-item">
                                <div>
                                    <strong>{training.trainingName}</strong>
                                    <span>
                                        {training.participantCount} deelnemers · maximaal {maximum} per groep
                                    </span>
                                </div>
                                <div className="quote-grouping-groups">
                                    {distribution.map((size, index) => (
                                        <span key={`${training.id}-${index}`}>
                                            Groep {index + 1}: <b>{size}</b>
                                        </span>
                                    ))}
                                </div>
                            </article>
                        );
                    })}
                    {!trainings.length && <p>Nog geen trainingsonderdelen toegevoegd.</p>}
                </div>
            </section>
            </div>

            <section className="quote-detail-card">
                <div className="quote-section-heading">
                    <div>
                        <h2>Trainingsonderdelen</h2>
                        <p>{trainings.length} {trainings.length === 1 ? "onderdeel" : "onderdelen"} in deze offerte</p>
                    </div>
                    {editable && (
                        <button
                            type="button"
                            className="quote-btn quote-btn-primary quote-btn-with-icon"
                            onClick={() => setShowAddTraining(true)}
                        >
                            <Plus aria-hidden="true" />
                            Training toevoegen
                        </button>
                    )}
                </div>
                {!trainings.length && <p>Nog geen trainingen toegevoegd.</p>}
                <div className="quote-training-list">
                    {trainings.map((training, index) => (
                        <QuoteTrainingEditor
                            key={training.id}
                            quoteId={id}
                            training={training}
                            index={index}
                            editable={editable}
                            onChanged={loadQuote}
                            onDelete={deleteTraining}
                            notify={notify}
                        />
                    ))}
                </div>
            </section>

            {editable && showAddTraining && (
                <div className="quote-modal-overlay" role="presentation" onMouseDown={() => setShowAddTraining(false)}>
                    <section
                        className="quote-modal quote-add-training-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-training-title"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <div className="quote-modal-header">
                            <div>
                                <span className="quote-modal-eyebrow">Nieuw onderdeel</span>
                                <h3 id="add-training-title">Training toevoegen</h3>
                            </div>
                            <button
                                type="button"
                                className="quote-modal-close"
                                aria-label="Popup sluiten"
                                onClick={() => setShowAddTraining(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="quote-modal-body">
                    <div className="quote-detail-grid">
                        <div className="quote-detail-col-span-2">
                            <label htmlFor="catalog-training">Training</label>
                            <select
                                id="catalog-training"
                                value={newTraining.trainingConfigurationId}
                                onChange={(event) => setNewTraining({
                                    ...newTraining,
                                    trainingConfigurationId: event.target.value,
                                })}
                            >
                                <option value="">Kies een training</option>
                                {catalog.map((item) => (
                                    <option
                                        key={item.trainingConfigurationId}
                                        value={item.trainingConfigurationId}
                                    >
                                        {item.name} — {formatCurrency(item.sellingPrice)}
                                    </option>
                                ))}
                            </select>
                            {selectedCatalogItem && (
                                <small>
                                    {selectedCatalogItem.shortDescription} · maximaal{" "}
                                    {selectedCatalogItem.maximumParticipantsPerGroup} per groep
                                </small>
                            )}
                        </div>
                        <div>
                            <label htmlFor="new-participants">Deelnemers</label>
                            <input
                                id="new-participants"
                                type="number"
                                min={selectedCatalogItem?.minimumParticipants || 1}
                                value={newTraining.participantCount}
                                onChange={(event) => setNewTraining({
                                    ...newTraining,
                                    participantCount: event.target.value,
                                })}
                            />
                        </div>
                        <div>
                            <label htmlFor="new-training-note">Interne notitie</label>
                            <input
                                id="new-training-note"
                                value={newTraining.internalNote}
                                onChange={(event) => setNewTraining({
                                    ...newTraining,
                                    internalNote: event.target.value,
                                })}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="quote-btn quote-btn-primary quote-btn-with-icon"
                        disabled={busy || !newTraining.trainingConfigurationId}
                        onClick={addTraining}
                    >
                        <Plus aria-hidden="true" />
                        Training toevoegen
                    </button>
                        </div>
                    </section>
                </div>
            )}

            <section hidden>
                <p>
                    Zet een gecontroleerde conceptofferte eerst op
                    “Wordt verzonden”. Daarna verschijnt de verzendknop.
                </p>
            </section>
        </section>
    );
}
