export default function QuoteDetailNotesCard({ formState, onFieldChange }) {
    return (
        <section className="quote-detail-card">
            <h2>Opmerkingen en notities</h2>

            <div className="quote-detail-grid">
                <div className="quote-detail-col-span-2">
                    <label htmlFor="remarks">Opmerking / vraag van klant</label>
                    <textarea
                        id="remarks"
                        rows="5"
                        value={formState.remarks}
                        onChange={(e) => onFieldChange("remarks", e.target.value)}
                    />
                </div>

                <div className="quote-detail-col-span-2">
                    <label htmlFor="internalNotes">Interne notities</label>
                    <textarea
                        id="internalNotes"
                        rows="6"
                        value={formState.internalNotes}
                        onChange={(e) => onFieldChange("internalNotes", e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
}