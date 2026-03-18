import { formatCurrency } from "../helpers/quoteFormatters.js";

export default function QuoteDetailPricingCard({ quote, formState, onFieldChange }) {
    return (
        <section className="quote-detail-card">
            <h2>Prijs en berekening</h2>

            <div className="quote-pricing-summary">
                <div>
                    <span>Berekende reiskosten</span>
                    <strong>{formatCurrency(quote.travelSurcharge)}</strong>
                </div>
                <div>
                    <span>Berekende prijs vóór korting</span>
                    <strong>{formatCurrency(quote.priceBeforeDiscount)}</strong>
                </div>
                <div>
                    <span>Berekend kortingsbedrag</span>
                    <strong>{formatCurrency(quote.discountAmount)}</strong>
                </div>
                <div>
                    <span>Berekend eindtotaal</span>
                    <strong>{formatCurrency(quote.totalPrice)}</strong>
                </div>
            </div>

            <div className="quote-detail-grid" style={{ marginTop: "1.6rem" }}>
                <div>
                    <label htmlFor="discountCode">Kortingscode</label>
                    <input
                        id="discountCode"
                        type="text"
                        value={formState.discountCode}
                        onChange={(e) => onFieldChange("discountCode", e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="discountTrainingIndex">Korting training-index</label>
                    <input
                        id="discountTrainingIndex"
                        type="number"
                        min="0"
                        value={formState.discountTrainingIndex}
                        onChange={(e) => onFieldChange("discountTrainingIndex", e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="travelSurcharge">Reiskosten totaal</label>
                    <input
                        id="travelSurcharge"
                        type="number"
                        step="0.01"
                        value={formState.travelSurcharge}
                        onChange={(e) => onFieldChange("travelSurcharge", e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="travelSurchargePerTraining">Reiskosten per rit</label>
                    <input
                        id="travelSurchargePerTraining"
                        type="number"
                        step="0.01"
                        value={formState.travelSurchargePerTraining}
                        onChange={(e) => onFieldChange("travelSurchargePerTraining", e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="priceBeforeDiscount">Prijs vóór korting</label>
                    <input
                        id="priceBeforeDiscount"
                        type="number"
                        step="0.01"
                        value={formState.priceBeforeDiscount}
                        onChange={(e) => onFieldChange("priceBeforeDiscount", e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="discountAmount">Kortingsbedrag</label>
                    <input
                        id="discountAmount"
                        type="number"
                        step="0.01"
                        value={formState.discountAmount}
                        onChange={(e) => onFieldChange("discountAmount", e.target.value)}
                    />
                </div>

                <div className="quote-detail-col-span-2">
                    <label htmlFor="totalPrice">Eindtotaal</label>
                    <input
                        id="totalPrice"
                        type="number"
                        step="0.01"
                        value={formState.totalPrice}
                        onChange={(e) => onFieldChange("totalPrice", e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
}