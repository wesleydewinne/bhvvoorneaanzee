export default function QuoteDetailActions({
                                               saving,
                                               archiving,
                                               onSave,
                                               onArchive,
                                           }) {
    return (
        <div className="quote-detail-actions">
            <button
                type="button"
                className="quote-btn quote-btn-primary"
                onClick={onSave}
                disabled={saving || archiving}
            >
                {saving ? "Opslaan..." : "Opslaan"}
            </button>

            <button
                type="button"
                className="quote-btn quote-btn-danger"
                onClick={onArchive}
                disabled={saving || archiving}
            >
                {archiving ? "Archiveren..." : "Afhandelen / archiveren"}
            </button>
        </div>
    );
}