import RoleDashboardPanel from "./RoleDashboardPanel.jsx";

function SafetyManagerDashboardPanel({ overview, loading, error }) {
    return (
        <RoleDashboardPanel
            title="Safety manager dashboard"
            eyebrow="Safety manager"
            overview={overview}
            loading={loading}
            error={error}
            loadingText="Safety manager gegevens laden..."
            emptyText="Het safety manager dashboard is voorbereid. Zodra veiligheidsacties, controles en rapportages gekoppeld zijn, verschijnen ze hier."
        />
    );
}

export default SafetyManagerDashboardPanel;
