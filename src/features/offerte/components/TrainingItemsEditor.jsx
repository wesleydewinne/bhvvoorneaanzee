import { Plus, Trash2 } from "lucide-react";
import { createTrainingItem, inferUnambiguousDuration } from "../helpers/quoteHelpers.js";

const durationOptions = [
    ["", "Kies de werkelijke duur"],
    ["HALF_DAY", "Halve dag"],
    ["FULL_DAY", "Hele dag"],
    ["MULTI_DAY", "Meerdaagse training"],
];

export default function TrainingItemsEditor({ items, trainingTypes, onChange }) {
    const update = (index, field, value) => {
        onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
    };

    const selectTraining = (index, code) => {
        const training = trainingTypes.find((item) => item.code === code);
        onChange(items.map((item, itemIndex) => itemIndex === index ? {
            ...item,
            trainingCode: code,
            title: training?.displayName || "",
            trainingDuration: inferUnambiguousDuration(training),
        } : item));
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
                                <input type="number" required min={min} step={step} value={item[field]} onChange={(event) => update(index, field, event.target.value)} />
                            </label>
                        ))}
                        <label className="quote-field quote-field--span-2">Prijseenheid
                            <input required maxLength={100} value={item.priceUnitLabel} onChange={(event) => update(index, "priceUnitLabel", event.target.value)} placeholder="Bijvoorbeeld: deelnemer, groep of training" />
                        </label>
                        <label className="quote-field">Reiskosten excl. btw
                            <input type="number" min="0" step="0.01" value={item.travelCostsExcludingVat} onChange={(event) => update(index, "travelCostsExcludingVat", event.target.value)} />
                        </label>
                    </div>
                </article>
            ))}
            <button type="button" className="quote-secondary-button" onClick={() => onChange([...items, createTrainingItem()])}>
                <Plus size={18} /> Training toevoegen
            </button>
        </div>
    );
}
