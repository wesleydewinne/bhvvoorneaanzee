import { Plus, Trash2 } from "lucide-react";
import { createTrainingItem, formatCurrency } from "../helpers/quoteHelpers.js";

const isEvacuationDrill = (trainingCode = "") =>
  trainingCode.startsWith("EVACUATION_DRILL_PHASE_");

/**
 * Bewerkt alleen de invoer die de offertebackend nodig heeft: training en
 * deelnemers. Groepen, prijseenheid, prijs en totalen komen na opslaan terug
 * uit de backend en zijn hier uitsluitend ter informatie zichtbaar.
 */
export default function TrainingItemsEditor({
  items,
  trainingTypes,
  onChange,
}) {
  const update = (index, values) =>
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...values } : item,
      ),
    );

  const selectTraining = (index, trainingCode) => {
    const training = trainingTypes.find((item) => item.code === trainingCode);
    update(index, {
      trainingCode,
      title: training?.displayName || trainingCode,
      description: training?.description || "",
      participantCount: isEvacuationDrill(trainingCode)
        ? 1
        : normalizeCount(items[index]?.participantCount),
    });
  };

  return (
    <div className="quote-training-list">
      {items.map((item, index) => (
        <article
          className="quote-training-card"
          key={item.legacyTrainingId || `${index}-${item.trainingCode}`}
        >
          <div className="quote-training-card__header">
            <h3>Training {index + 1}</h3>
            {items.length > 1 && (
              <button
                type="button"
                className="quote-icon-button quote-icon-button--danger"
                onClick={() =>
                  onChange(items.filter((_, itemIndex) => itemIndex !== index))
                }
                aria-label={`Training ${index + 1} verwijderen`}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          <div className="quote-form-grid quote-form-grid--three">
            <label className="quote-field quote-field--span-2">
              Trainingstype
              <select
                required
                value={item.trainingCode}
                onChange={(event) => selectTraining(index, event.target.value)}
              >
                <option value="">Kies een training</option>
                {trainingTypes.map((training) => (
                  <option value={training.code} key={training.code}>
                    {training.displayName}
                  </option>
                ))}
              </select>
            </label>
            <label className="quote-field">
              {isEvacuationDrill(item.trainingCode)
                ? "Aantal oefeningen"
                : "Aantal cursisten"}
              <input
                required
                type="number"
                min="1"
                step="1"
                value={item.participantCount}
                onChange={(event) =>
                  update(index, {
                    participantCount: Number(event.target.value),
                  })
                }
              />
            </label>
            {item.legacyTrainingId && (
              <div className="quote-field quote-field--span-3">
                <span>Door backend berekend</span>
                <strong>
                  {item.groupCount} groep(en) · {item.priceUnitLabel} ·{" "}
                  {formatCurrency(item.totalExcludingVat)} excl. btw
                </strong>
              </div>
            )}
            {!item.legacyTrainingId && (
              <p className="quote-field quote-field--span-3">
                Groepen en bedragen worden na opslaan door de backend berekend.
              </p>
            )}
          </div>
        </article>
      ))}
      <button
        type="button"
        className="quote-secondary-button"
        onClick={() => onChange([...items, createTrainingItem()])}
      >
        <Plus size={18} /> Training toevoegen
      </button>
    </div>
  );
}

function normalizeCount(value) {
  const count = Number(value);
  return Number.isInteger(count) && count > 0 ? count : 1;
}
