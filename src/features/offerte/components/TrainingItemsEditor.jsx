import { Plus, Trash2 } from "lucide-react";
import { createTrainingItem, inferUnambiguousDuration } from "../helpers/quoteHelpers.js";

const durationOptions = [
    ["", "Kies de werkelijke duur"],
    ["HALF_DAY", "Halve dag"],
    ["FULL_DAY", "Hele dag"],
    ["MULTI_DAY", "Meerdaagse training"],
];

export default function TrainingItemsEditor({ items, trainingTypes, onChange }) {
    const getTraining = (code) => trainingTypes.find((item) => item.code === code);

    const calculateGroups = (participantCount, training) => {
        const participants = Math.max(0, Number(participantCount) || 0);
        const maximum = Number(training?.maxParticipantsPerGroup);
        return maximum > 0 && participants > 0 ? Math.ceil(participants / maximum) : 1;
    };

    const usesParticipantPrice = (training) => ["BHV", "EHBO"].includes(training?.category);

    const withCalculatedPrice = (item, training = getTraining(item.trainingCode)) => {
        const quantity = usesParticipantPrice(training)
            ? Math.max(0, Number(item.participantCount) || 0)
            : Math.max(1, Number(item.executionCount) || 1);
        const unitPrice = Number(item.unitPriceExcludingVat) || 0;
        return {
            ...item,
            quantity,
            priceUnitLabel: usesParticipantPrice(training) ? "deelnemer" : "training",
            totalExcludingVat: Math.round(quantity * unitPrice * 100) / 100,
        };
    };

    const resizeTravelCosts = (values, executionCount) => Array.from(
        { length: Math.max(1, Number(executionCount) || 1) },
        (_, index) => values?.[index] ?? 0
    );

    const update = (index, field, value) => {
        onChange(items.map((item, itemIndex) => {
            if (itemIndex !== index) return item;

            let updated = { ...item, [field]: value };
            const training = getTraining(item.trainingCode);

            if (field === "participantCount") {
                const groupCount = calculateGroups(value, training);
                updated = {
                    ...updated,
                    groupCount,
                    executionCount: groupCount,
                    travelCostsByExecution: resizeTravelCosts(item.travelCostsByExecution, groupCount),
                };
            }

            if (field === "groupCount") {
                const executions = Math.max(1, Number(value) || 1);
                updated = {
                    ...updated,
                    executionCount: executions,
                    travelCostsByExecution: resizeTravelCosts(item.travelCostsByExecution, executions),
                };
            }

            if (field === "executionCount") {
                updated.travelCostsByExecution = resizeTravelCosts(item.travelCostsByExecution, value);
            }

            if (["participantCount", "groupCount", "executionCount", "unitPriceExcludingVat"].includes(field)) {
                updated = withCalculatedPrice(updated, training);
            }

            return updated;
        }));
    };

    const updateTravelCost = (itemIndex, executionIndex, value) => {
        onChange(items.map((item, index) => index !== itemIndex ? item : {
            ...item,
            travelCostsByExecution: resizeTravelCosts(
                item.travelCostsByExecution,
                item.executionCount
            ).map((amount, currentIndex) => currentIndex === executionIndex ? value : amount),
        }));
    };

    const selectTraining = (index, code) => {
        const training = trainingTypes.find((item) => item.code === code);
        onChange(items.map((item, itemIndex) => {
            if (itemIndex !== index) return item;
            const groupCount = calculateGroups(item.participantCount, training);
            return withCalculatedPrice({
                ...item,
                trainingCode: code,
                title: training?.displayName || "",
                trainingDuration: inferUnambiguousDuration(training),
                groupCount,
                executionCount: groupCount,
                unitPriceExcludingVat: training?.basePrice ?? 0,
                travelCostsByExecution: resizeTravelCosts(item.travelCostsByExecution, groupCount),
            }, training);
        }));
    };

    return (
        <div className="quote-training-list">
            {items.map((item, index) => (
                <article className="quote-training-card" key={`${index}-${item.trainingCode}`}>
                    <div className="quote-training-card__header">
                        <h3>Training {index + 1}</h3>
                        {items.length > 1 && (
                            <button type="button" className="quote-icon-button quote-icon-button--danger" onClick={() => onChange(items.filter((_, i) => i !== index))} aria-label={`Training ${index + 1} verwijderen`}>
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                    <div className="quote-form-grid quote-form-grid--three">
                        <label className="quote-field quote-field--span-2">Trainingstype
                            <select required value={item.trainingCode} onChange={(event) => selectTraining(index, event.target.value)}>
                                <option value="">Kies een training</option>
                                {trainingTypes.map((training) => <option value={training.code} key={training.code}>{training.displayName}</option>)}
                            </select>
                        </label>
                        <label className="quote-field">Duur
                            <select required value={item.trainingDuration} onChange={(event) => update(index, "trainingDuration", event.target.value)}>
                                {durationOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                            </select>
                        </label>
                        <label className="quote-field quote-field--span-3">Titel op de offerte
                            <input required maxLength={250} value={item.title} onChange={(event) => update(index, "title", event.target.value)} />
                        </label>
                        <label className="quote-field quote-field--span-3">Aanvullende omschrijving
                            <textarea rows="3" maxLength={2500} value={item.description} onChange={(event) => update(index, "description", event.target.value)} />
                        </label>
                        {[
                            ["participantCount", "Deelnemers", 0, 1], ["groupCount", "Groepen", 0, 1], ["executionCount", "Uitvoeringen", 1, 1],
                            ["quantity", "Hoeveelheid", 0, 0.01], ["unitPriceExcludingVat", "Eenheidsprijs excl. btw", 0, 0.01], ["totalExcludingVat", "Regeltotaal excl. btw", 0, 0.01],
                        ].map(([field, label, min, step]) => (
                            <label className="quote-field" key={field}>{label}
                                <input type="number" required min={min} step={step} value={item[field]} readOnly={["quantity", "totalExcludingVat"].includes(field)} onChange={(event) => update(index, field, event.target.value)} />
                            </label>
                        ))}
                        <label className="quote-field quote-field--span-2">Prijseenheid
                            <input required readOnly maxLength={100} value={item.priceUnitLabel} placeholder="Bijvoorbeeld: deelnemer, groep of training" />
                        </label>
                        <div className="quote-field quote-field--span-3">
                            <span>Reiskosten per uitvoering excl. btw</span>
                            <div className="quote-form-grid quote-form-grid--three">
                                {resizeTravelCosts(item.travelCostsByExecution, item.executionCount).map((amount, executionIndex) => (
                                    <label className="quote-field" key={executionIndex}>Uitvoering {executionIndex + 1}
                                        <input type="number" min="0" step="0.01" value={amount} onChange={(event) => updateTravelCost(index, executionIndex, event.target.value)} />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>
            ))}
            <button type="button" className="quote-secondary-button" onClick={() => onChange([...items, createTrainingItem()])}>
                <Plus size={18} /> Training toevoegen
            </button>
        </div>
    );
}
