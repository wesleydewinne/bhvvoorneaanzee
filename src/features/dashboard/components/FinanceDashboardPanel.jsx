import RoleDashboardPanel from "./RoleDashboardPanel.jsx";

function FinanceDashboardPanel({ overview, loading, error }) {
    return (
        <RoleDashboardPanel
            title="Finance overzicht"
            eyebrow="Finance"
            overview={overview}
            loading={loading}
            error={error}
            loadingText="Financegegevens laden..."
            emptyText="Het finance dashboard is voorbereid. Zodra offertes, bedragen en betaalstatussen beschikbaar zijn, verschijnen ze hier."
        />
    );
}

export default FinanceDashboardPanel;
