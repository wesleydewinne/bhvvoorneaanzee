import { useEffect, useMemo, useState } from "react";
import { BadgeEuro, FilePenLine, Trash2 } from "lucide-react";
import {
    formatCurrency,
    formatMoneyInput,
    parseMoneyInput,
} from "../helpers/quoteFormatters.js";
import quoteService from "../services/quoteService.js";

const costCategories = [
    ["TRAINER", "Trainer/instructeur"],
    ["EXTERNAL_SERVICE", "Externe instructeur/dienst"],
    ["LOCATION", "Locatie"],
    ["CATERING", "Lunch/catering"],
    ["TRAVEL", "Reiskosten"],
    ["PARKING_AND_TOLLS", "Parkeren en tol"],
    ["ELEARNING", "E-learning"],
    ["CERTIFICATE", "Certificaat"],
    ["MATERIAL", "Materiaal"],
    ["LOTUS", "LOTUS"],
    ["EXAM", "Examen"],
    ["PREPARATION", "Voorbereiding"],
    ["REPORTING", "Rapportage"],
    ["ADMINISTRATION", "Administratie"],
    ["OTHER", "Overige kosten"],
];

const pricingUnits = [
    ["PER_PARTICIPANT", "Per cursist"],
    ["PER_GROUP", "Per groep"],
    ["PER_DAY", "Per dag"],
    ["PER_HALF_DAY", "Per dagdeel"],
    ["PER_HOUR", "Per uur"],
    ["PER_KILOMETER", "Per kilometer"],
    ["FIXED_AMOUNT", "Vast bedrag"],
];

const emptyDiscount = {
    name: "",
    description: "",
    type: "PERCENTAGE",
    value: "",
    visibleToCustomer: true,
};

const discountPresets = [
    {
        value: "OWN_LOCATION",
        name: "Training op eigen locatie",
        description: "Omdat de training op uw eigen locatie plaatsvindt, is een locatiekorting toegepast.",
    },
    {
        value: "WELCOME",
        name: "Welkomstkorting",
        description: "Als nieuwe klant ontvangt u op dit trainingsonderdeel een eenmalige welkomstkorting.",
    },
    {
        value: "GROUP",
        name: "Groepskorting",
        description: "Op basis van het aantal deelnemers is voor dit trainingsonderdeel een groepskorting toegepast.",
    },
    {
        value: "COMBINATION",
        name: "Combinatiekorting",
        description: "Omdat meerdere trainingsonderdelen worden gecombineerd, is een combinatiekorting toegepast.",
    },
    { value: "OTHER", name: "", description: "" },
];

const emptyCost = {
    category: "TRAINER",
    name: "",
    description: "",
    pricingUnit: "FIXED_AMOUNT",
    unitCost: "",
    quantity: "",
    active: true,
    internalNote: "",
};

function apiMessage(error, fallback) {
    return error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        fallback;
}

export default function QuoteTrainingEditor({
    quoteId,
    training,
    index,
    editable,
    onChanged,
    onDelete,
    notify,
}) {
    const [draft, setDraft] = useState({
        participantCount: training.participantCount,
        description: training.description || "",
        salesPrice: formatMoneyInput(training.salesPrice || 0),
        vatPercentage: String(Number(training.vatPercentage || 0)),
        internalNote: training.internalNote || "",
    });
    const [discounts, setDiscounts] = useState([]);
    const [costs, setCosts] = useState([]);
    const [discountDraft, setDiscountDraft] = useState(emptyDiscount);
    const [discountPreset, setDiscountPreset] = useState("");
    const [costDraft, setCostDraft] = useState(emptyCost);
    const [editingDiscountId, setEditingDiscountId] = useState(null);
    const [editingCostId, setEditingCostId] = useState(null);
    const [showTrainingForm, setShowTrainingForm] = useState(false);
    const [showDiscounts, setShowDiscounts] = useState(false);
    const [showCosts, setShowCosts] = useState(false);
    const [busy, setBusy] = useState(false);
    const [actionMessage, setActionMessage] = useState({ type: "", text: "" });

    const loadChildren = async () => {
        const [discountResponse, costResponse] = await Promise.all([
            quoteService.getTrainingDiscounts(quoteId, training.id),
            quoteService.getTrainingCosts(quoteId, training.id),
        ]);
        setDiscounts(
            Array.isArray(discountResponse?.data) ? discountResponse.data : []
        );
        setCosts(Array.isArray(costResponse?.data) ? costResponse.data : []);
    };

    useEffect(() => {
        void loadChildren().catch((error) =>
            notify("error", apiMessage(error, "Kortingen en kosten laden is mislukt."))
        );
    }, [quoteId, training.id]);

    const discountTotal = useMemo(
        () => discounts.reduce(
            (sum, discount) => sum + Number(discount.calculatedAmount || 0),
            0
        ),
        [discounts]
    );
    const costTotal = useMemo(
        () => costs.reduce(
            (sum, cost) => sum + Number(cost.totalCost || 0),
            0
        ),
        [costs]
    );

    const run = async (action, successMessage) => {
        setBusy(true);
        setActionMessage({ type: "busy", text: "Wijziging opslaan..." });
        try {
            await action();
            setActionMessage({ type: "success", text: successMessage });
            notify("success", successMessage);

            const refreshResults = await Promise.allSettled([
                onChanged(),
                loadChildren(),
            ]);
            if (refreshResults.some((result) => result.status === "rejected")) {
                setActionMessage({
                    type: "success",
                    text: `${successMessage} Vernieuw de pagina als de nieuwe totalen nog niet zichtbaar zijn.`,
                });
            }
            return true;
        } catch (error) {
            const message = apiMessage(error, "De wijziging is mislukt.");
            setActionMessage({ type: "error", text: message });
            notify("error", message);
            return false;
        } finally {
            setBusy(false);
        }
    };

    const saveTraining = () => run(
        () => quoteService.updateTraining(quoteId, training.id, {
            quoteTrainingId: training.id,
            participantCount: Number(draft.participantCount),
            description: draft.description,
            salesPrice: parseMoneyInput(draft.salesPrice),
            vatPercentage: Number(draft.vatPercentage),
            internalNote: draft.internalNote.trim() || null,
        }),
        "Trainingsonderdeel bijgewerkt."
    );

    const saveDiscount = () => run(async () => {
        const payload = {
            ...discountDraft,
            value: parseMoneyInput(discountDraft.value),
            description: discountDraft.description.trim() || null,
        };
        if (editingDiscountId) {
            await quoteService.updateTrainingDiscount(
                quoteId,
                training.id,
                editingDiscountId,
                payload
            );
        } else {
            await quoteService.addTrainingDiscount(quoteId, training.id, payload);
        }
        setDiscountDraft(emptyDiscount);
        setDiscountPreset("");
        setEditingDiscountId(null);
    }, "Korting opgeslagen en totalen herberekend.");

    const saveCost = () => run(async () => {
        const payload = {
            ...costDraft,
            unitCost: parseMoneyInput(costDraft.unitCost),
            quantity: costDraft.pricingUnit === "FIXED_AMOUNT"
                ? null
                : Number(costDraft.quantity),
            description: costDraft.description.trim() || null,
            internalNote: costDraft.internalNote.trim() || null,
        };
        if (editingCostId) {
            await quoteService.updateTrainingCost(
                quoteId,
                training.id,
                editingCostId,
                payload
            );
        } else {
            await quoteService.addTrainingCost(quoteId, training.id, payload);
        }
        setCostDraft(emptyCost);
        setEditingCostId(null);
    }, "Interne kosten opgeslagen en marge herberekend.");

    return (
        <article className="quote-training-item quote-training-editor">
            {actionMessage.text && (
                <p
                    className={`quote-training-feedback quote-training-feedback-${actionMessage.type}`}
                    role={actionMessage.type === "error" ? "alert" : "status"}
                >
                    {actionMessage.text}
                </p>
            )}
            <div className="quote-training-item-top">
                <div>
                    <span className="quote-training-badge">Onderdeel {index + 1}</span>
                    <h3>{training.trainingName}</h3>
                    <p>{training.duration || "Duur niet opgegeven"}</p>
                </div>
                {editable && (
                    <div className="quote-training-card-actions" aria-label="Acties voor deze training">
                        <button
                            type="button"
                            className="quote-icon-action"
                            data-tooltip="Training wijzigen"
                            aria-label="Training wijzigen"
                            disabled={busy}
                            onClick={() => setShowTrainingForm((current) => !current)}
                        >
                            <FilePenLine aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className="quote-icon-action quote-icon-action-danger"
                            data-tooltip="Training verwijderen"
                            aria-label="Training verwijderen"
                            disabled={busy}
                            onClick={() => onDelete(training)}
                        >
                            <Trash2 aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>

            <div className="quote-training-overview">
                <section className="quote-training-price-card">
                    <h4>Prijsopbouw</h4>
                    <div><span>Basisbedrag</span><strong>{formatCurrency(training.baseSalesAmount)}</strong></div>
                    <div><span>Korting</span><strong>− {formatCurrency(discountTotal)}</strong></div>
                    <div><span>Prijs excl. btw</span><strong>{formatCurrency(training.subtotalExcludingVat)}</strong></div>
                    <div><span>Btw-tarief</span><strong>{Number(training.vatPercentage || 0)}%</strong></div>
                    <div><span>Btw-bedrag</span><strong>{formatCurrency(training.vatAmount)}</strong></div>
                    <div className="is-total"><span>Totaal incl. btw</span><strong>{formatCurrency(training.totalIncludingVat)}</strong></div>
                </section>

                <div className="quote-training-management">
                    <button
                        type="button"
                        className="quote-training-management-card quote-training-management-discount"
                        disabled={!editable || busy}
                        onClick={() => setShowDiscounts(true)}
                    >
                        <span className="quote-training-management-icon"><BadgeEuro aria-hidden="true" /></span>
                        <span>
                            <strong>Korting</strong>
                            <small>{discounts.length} {discounts.length === 1 ? "kortingsregel" : "kortingsregels"}</small>
                            {discounts.length > 0 && (
                                <span className="quote-management-rule-list">
                                    {discounts.map((discount) => (
                                        <span key={discount.id}>
                                            {discount.name}
                                            <b>{formatCurrency(discount.calculatedAmount)}</b>
                                        </span>
                                    ))}
                                </span>
                            )}
                        </span>
                        <span className="quote-training-management-value">{formatCurrency(discountTotal)}</span>
                    </button>

                    <button
                        type="button"
                        className="quote-training-management-card quote-training-management-costs"
                        disabled={!editable || busy}
                        onClick={() => setShowCosts(true)}
                    >
                        <span className="quote-training-management-icon"><FilePenLine aria-hidden="true" /></span>
                        <span>
                            <strong>Interne kosten</strong>
                            <small>{costs.length} {costs.length === 1 ? "kostenregel" : "kostenregels"}</small>
                            {costs.length > 0 && (
                                <span className="quote-management-rule-list">
                                    {costs.map((cost) => (
                                        <span key={cost.id}>
                                            {cost.name}
                                            <b>{formatCurrency(cost.totalCost)}</b>
                                        </span>
                                    ))}
                                </span>
                            )}
                        </span>
                        <span className="quote-training-management-value">{formatCurrency(costTotal)}</span>
                    </button>
                </div>
            </div>

            {editable && showTrainingForm && (
                <section className="quote-admin-section quote-action-panel">
                    <h4>Training wijzigen</h4>
                    <div className="quote-detail-grid">
                        <div>
                            <label>Deelnemers</label>
                            <input
                                type="number"
                                min="1"
                                value={draft.participantCount}
                                onChange={(event) =>
                                    setDraft({ ...draft, participantCount: event.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Verkoopprijs per eenheid excl. btw</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={draft.salesPrice}
                                onChange={(event) =>
                                    setDraft({ ...draft, salesPrice: event.target.value })
                                }
                                onBlur={() => setDraft({
                                    ...draft,
                                    salesPrice: formatMoneyInput(draft.salesPrice),
                                })}
                            />
                        </div>
                        <fieldset className="quote-vat-selector quote-detail-col-span-2">
                            <legend>Btw-tarief</legend>
                            <div>
                                {[21, 9, 0].map((percentage) => (
                                    <button
                                        key={percentage}
                                        type="button"
                                        className={
                                            Number(draft.vatPercentage) === percentage
                                                ? "is-selected"
                                                : ""
                                        }
                                        aria-pressed={
                                            Number(draft.vatPercentage) === percentage
                                        }
                                        onClick={() => setDraft({
                                            ...draft,
                                            vatPercentage: String(percentage),
                                        })}
                                    >
                                        {percentage}%
                                    </button>
                                ))}
                            </div>
                            <small>
                                Kies het btw-tarief dat voor dit trainingsonderdeel
                                op de factuur wordt toegepast.
                            </small>
                        </fieldset>
                        <div className="quote-detail-col-span-2">
                            <label>Omschrijving klant</label>
                            <textarea
                                rows="4"
                                value={draft.description}
                                onChange={(event) =>
                                    setDraft({ ...draft, description: event.target.value })
                                }
                            />
                        </div>
                        <div className="quote-detail-col-span-2">
                            <label>Interne notitie</label>
                            <textarea
                                rows="2"
                                value={draft.internalNote}
                                onChange={(event) =>
                                    setDraft({ ...draft, internalNote: event.target.value })
                                }
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="quote-btn quote-btn-primary"
                        disabled={busy}
                        onClick={saveTraining}
                    >
                        {busy ? "Bezig met opslaan..." : "Training opslaan"}
                    </button>
                </section>
            )}

            {showDiscounts && (
            <div className="quote-modal-overlay" role="presentation" onMouseDown={() => setShowDiscounts(false)}>
            <section
                className="quote-modal quote-training-management-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={`discount-title-${training.id}`}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="quote-modal-header">
                    <div>
                        <span className="quote-modal-eyebrow">{training.trainingName}</span>
                        <h3 id={`discount-title-${training.id}`}>Kortingen beheren</h3>
                    </div>
                    <button type="button" className="quote-modal-close" aria-label="Popup sluiten" onClick={() => setShowDiscounts(false)}>×</button>
                </div>
                <div className="quote-modal-body quote-action-panel">
                {discounts.length === 0 && <p>Geen korting op dit onderdeel.</p>}
                {discounts.map((discount) => (
                    <div className="quote-admin-list-row" key={discount.id}>
                        <span>
                            <strong>{discount.name}</strong><br />
                            {discount.type === "PERCENTAGE"
                                ? `${discount.value}%`
                                : formatCurrency(discount.value)}
                            {" — "}
                            {formatCurrency(discount.calculatedAmount)}
                        </span>
                        {editable && (
                            <span className="quote-admin-inline-actions">
                                <button
                                    type="button"
                                    className="quote-btn quote-btn-secondary"
                                    disabled={busy}
                                    onClick={() => {
                                        const matchingPreset = discountPresets.find(
                                            (preset) =>
                                                preset.value !== "OTHER" &&
                                                preset.name === discount.name
                                        );
                                        setEditingDiscountId(discount.id);
                                        setDiscountPreset(
                                            matchingPreset?.value || "OTHER"
                                        );
                                        setDiscountDraft({
                                            name: discount.name,
                                            description: discount.description || "",
                                            type: discount.type,
                                            value: formatMoneyInput(discount.value),
                                            visibleToCustomer: discount.visibleToCustomer,
                                        });
                                    }}
                                >
                                    Bewerken
                                </button>
                                <button
                                    type="button"
                                    className="quote-btn quote-btn-danger"
                                    disabled={busy}
                                    onClick={() => run(
                                        () => quoteService.deleteTrainingDiscount(
                                            quoteId,
                                            training.id,
                                            discount.id
                                        ),
                                        "Korting verwijderd."
                                    )}
                                >
                                    Verwijderen
                                </button>
                            </span>
                        )}
                    </div>
                ))}
                {editable && (
                    <div className="quote-detail-grid quote-admin-form">
                        <div className="quote-detail-col-span-2">
                            <label>Reden van de korting</label>
                            <select
                                value={discountPreset}
                                onChange={(event) => {
                                    const presetValue = event.target.value;
                                    const preset = discountPresets.find(
                                        (item) => item.value === presetValue
                                    );
                                    setDiscountPreset(presetValue);
                                    setDiscountDraft({
                                        ...discountDraft,
                                        name: preset?.name || "",
                                        description: preset?.description || "",
                                    });
                                }}
                            >
                                <option value="">Kies een kortingsregel</option>
                                {discountPresets.map((preset) => (
                                    <option key={preset.value} value={preset.value}>
                                        {preset.value === "OTHER"
                                            ? "Overige korting"
                                            : preset.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {discountPreset === "OTHER" && (
                            <div className="quote-detail-col-span-2">
                                <label>Naam overige korting</label>
                                <input
                                    value={discountDraft.name}
                                    onChange={(event) => setDiscountDraft({
                                        ...discountDraft,
                                        name: event.target.value,
                                    })}
                                />
                            </div>
                        )}
                        {discountPreset && (
                            <div className="quote-detail-col-span-2">
                                <label>Tekst op de offerte</label>
                                <textarea
                                    rows="3"
                                    value={discountDraft.description}
                                    onChange={(event) => setDiscountDraft({
                                        ...discountDraft,
                                        description: event.target.value,
                                    })}
                                />
                                <small>
                                    Deze tekst wordt gebruikt wanneer de korting
                                    zichtbaar is voor de klant.
                                </small>
                            </div>
                        )}
                        <div>
                            <label>Soort</label>
                            <select
                                value={discountDraft.type}
                                onChange={(event) => setDiscountDraft({
                                    ...discountDraft,
                                    type: event.target.value,
                                })}
                            >
                                <option value="PERCENTAGE">Percentage</option>
                                <option value="FIXED_AMOUNT">Vast bedrag</option>
                            </select>
                        </div>
                        <div>
                            <label>Waarde</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={discountDraft.value}
                                onChange={(event) => setDiscountDraft({
                                    ...discountDraft,
                                    value: event.target.value,
                                })}
                                onBlur={() => setDiscountDraft({
                                    ...discountDraft,
                                    value: formatMoneyInput(discountDraft.value),
                                })}
                            />
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={discountDraft.visibleToCustomer}
                                    onChange={(event) => setDiscountDraft({
                                        ...discountDraft,
                                        visibleToCustomer: event.target.checked,
                                    })}
                                />
                                Zichtbaar voor klant
                            </label>
                        </div>
                        <button
                            type="button"
                            className="quote-btn quote-btn-primary"
                            disabled={busy || !discountDraft.name || !discountDraft.value}
                            onClick={saveDiscount}
                        >
                            {busy
                                ? "Bezig met opslaan..."
                                : editingDiscountId
                                    ? "Korting opslaan"
                                    : "Korting toevoegen"}
                        </button>
                    </div>
                )}
                </div>
            </section>
            </div>
            )}

            {showCosts && (
            <div className="quote-modal-overlay" role="presentation" onMouseDown={() => setShowCosts(false)}>
            <section
                className="quote-modal quote-training-management-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={`cost-title-${training.id}`}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="quote-modal-header">
                    <div>
                        <span className="quote-modal-eyebrow">{training.trainingName}</span>
                        <h3 id={`cost-title-${training.id}`}>Interne kosten beheren</h3>
                    </div>
                    <button type="button" className="quote-modal-close" aria-label="Popup sluiten" onClick={() => setShowCosts(false)}>×</button>
                </div>
                <div className="quote-modal-body quote-action-panel">
                {costs.length === 0 && <p>Nog geen interne kosten.</p>}
                {costs.map((cost) => (
                    <div className="quote-admin-list-row" key={cost.id}>
                        <span>
                            <strong>{cost.name}</strong> ({cost.category})<br />
                            {formatCurrency(cost.unitCost)} × {cost.quantity}
                            {" = "}<strong>{formatCurrency(cost.totalCost)}</strong>
                        </span>
                        {editable && !cost.required && (
                            <span className="quote-admin-inline-actions">
                                <button
                                    type="button"
                                    className="quote-btn quote-btn-secondary"
                                    disabled={busy}
                                    onClick={() => {
                                        setEditingCostId(cost.id);
                                        setCostDraft({
                                            category: cost.category,
                                            name: cost.name,
                                            description: cost.description || "",
                                            pricingUnit: cost.pricingUnit,
                                            unitCost: formatMoneyInput(cost.unitCost),
                                            quantity: cost.pricingUnit === "FIXED_AMOUNT"
                                                ? ""
                                                : String(cost.quantity),
                                            active: cost.active,
                                            internalNote: cost.internalNote || "",
                                        });
                                    }}
                                >
                                    Bewerken
                                </button>
                                <button
                                    type="button"
                                    className="quote-btn quote-btn-danger"
                                    disabled={busy}
                                    onClick={() => run(
                                        () => quoteService.deleteTrainingCost(
                                            quoteId,
                                            training.id,
                                            cost.id
                                        ),
                                        "Kostenregel verwijderd."
                                    )}
                                >
                                    Verwijderen
                                </button>
                            </span>
                        )}
                    </div>
                ))}
                {editable && (
                    <div className="quote-detail-grid quote-admin-form">
                        <div>
                            <label>Categorie</label>
                            <select
                                value={costDraft.category}
                                onChange={(event) => setCostDraft({
                                    ...costDraft,
                                    category: event.target.value,
                                })}
                            >
                                {costCategories.map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Naam kostenpost</label>
                            <input
                                value={costDraft.name}
                                onChange={(event) => setCostDraft({
                                    ...costDraft,
                                    name: event.target.value,
                                })}
                            />
                        </div>
                        <div>
                            <label>Rekeneenheid</label>
                            <select
                                value={costDraft.pricingUnit}
                                onChange={(event) => setCostDraft({
                                    ...costDraft,
                                    pricingUnit: event.target.value,
                                    quantity: event.target.value === "FIXED_AMOUNT"
                                        ? ""
                                        : costDraft.quantity,
                                })}
                            >
                                {pricingUnits.map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Kostprijs per eenheid</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={costDraft.unitCost}
                                onChange={(event) => setCostDraft({
                                    ...costDraft,
                                    unitCost: event.target.value,
                                })}
                                onBlur={() => setCostDraft({
                                    ...costDraft,
                                    unitCost: formatMoneyInput(costDraft.unitCost),
                                })}
                            />
                        </div>
                        {costDraft.pricingUnit !== "FIXED_AMOUNT" && (
                            <div>
                                <label>
                                    Aantal
                                    {costDraft.pricingUnit === "PER_KILOMETER"
                                        ? " kilometers"
                                        : ""}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={costDraft.quantity}
                                    onChange={(event) => setCostDraft({
                                        ...costDraft,
                                        quantity: event.target.value,
                                    })}
                                />
                            </div>
                        )}
                        <button
                            type="button"
                            className="quote-btn quote-btn-primary"
                            disabled={
                                busy ||
                                !costDraft.name ||
                                costDraft.unitCost === "" ||
                                (
                                    costDraft.pricingUnit !== "FIXED_AMOUNT" &&
                                    costDraft.quantity === ""
                                )
                            }
                            onClick={saveCost}
                        >
                            {busy
                                ? "Bezig met opslaan..."
                                : editingCostId
                                    ? "Kosten opslaan"
                                    : "Kosten toevoegen"}
                        </button>
                    </div>
                )}
                </div>
            </section>
            </div>
            )}
        </article>
    );
}
