import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

const newDiscount = () => ({
  code: "OVERIG",
  description: "",
  type: "FIXED_AMOUNT",
  value: 0,
});

export default function InvoiceMomentsEditor({ moments, onChange }) {
  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= moments.length) return;
    const next = [...moments];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next.map((moment, itemIndex) => ({
      ...moment,
      sortOrder: itemIndex + 1,
    })));
  };

  const updateDiscount = (momentIndex, discountIndex, values) =>
    onChange(moments.map((moment, index) => index === momentIndex
      ? {
          ...moment,
          discounts: moment.discounts.map((discount, itemIndex) =>
            itemIndex === discountIndex ? { ...discount, ...values } : discount),
        }
      : moment));

  return (
    <div className="quote-invoice-moments">
      {moments.map((moment, momentIndex) => (
        <article className="quote-invoice-moment" key={moment.id}>
          <div className="quote-invoice-moment__header">
            <div>
              <strong>Factuurmoment {momentIndex + 1}</strong>
              <span>{moment.trainingName} · uitvoering {moment.executionNumber} van {moment.executionCount}</span>
            </div>
            <div className="quote-invoice-moment__order">
              <button type="button" className="quote-icon-button"
                aria-label="Factuurmoment omhoog" disabled={momentIndex === 0}
                onClick={() => move(momentIndex, -1)}><ArrowUp size={17} /></button>
              <button type="button" className="quote-icon-button"
                aria-label="Factuurmoment omlaag" disabled={momentIndex === moments.length - 1}
                onClick={() => move(momentIndex, 1)}><ArrowDown size={17} /></button>
            </div>
          </div>

          {(moment.discounts || []).map((discount, discountIndex) => (
            <div className="quote-form-grid quote-discount-row" key={discount.id || discountIndex}>
              <label className="quote-field">Omschrijving
                <input required value={discount.description}
                  placeholder="Bijvoorbeeld: gratis ontruimingsoefening"
                  onChange={(event) => updateDiscount(momentIndex, discountIndex,
                    { description: event.target.value, code: "OVERIG" })} />
              </label>
              <label className="quote-field">Soort korting
                <select value={discount.type}
                  onChange={(event) => updateDiscount(momentIndex, discountIndex,
                    { type: event.target.value, value: 0 })}>
                  <option value="FIXED_AMOUNT">Vast bedrag</option>
                  <option value="PERCENTAGE">Percentage</option>
                </select>
              </label>
              <label className="quote-field">
                {discount.type === "PERCENTAGE" ? "Korting (%)" : "Korting (€)"}
                <input required type="number" min="0.01"
                  max={discount.type === "PERCENTAGE" ? 100 : undefined}
                  step="0.01" value={discount.value}
                  onChange={(event) => updateDiscount(momentIndex, discountIndex,
                    { value: event.target.value })} />
              </label>
              <button type="button" className="quote-icon-button quote-icon-button--danger"
                onClick={() => onChange(moments.map((item, index) => index === momentIndex
                  ? { ...item, discounts: item.discounts.filter((_, i) => i !== discountIndex) }
                  : item))}>
                <Trash2 size={17} /> Korting verwijderen
              </button>
            </div>
          ))}

          <button type="button" className="quote-secondary-button"
            onClick={() => onChange(moments.map((item, index) => index === momentIndex
              ? { ...item, discounts: [...(item.discounts || []), newDiscount()] }
              : item))}>
            <Plus size={17} /> Korting op dit moment
          </button>
        </article>
      ))}
    </div>
  );
}
