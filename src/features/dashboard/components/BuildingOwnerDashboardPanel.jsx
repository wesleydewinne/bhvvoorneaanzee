import RoleDashboardPanel from "./RoleDashboardPanel.jsx";

function BuildingOwnerDashboardPanel({ overview, loading, error }) {
    return (
        <RoleDashboardPanel
            title="Gebouw dashboard"
            eyebrow="Gebouweigenaar"
            overview={overview}
            loading={loading}
            error={error}
            loadingText="Gebouwgegevens laden..."
            emptyText="Het gebouwdashboard is voorbereid. Zodra locaties, rapportages en acties gekoppeld zijn, verschijnen ze hier."
        />
    );
}

export default BuildingOwnerDashboardPanel;
