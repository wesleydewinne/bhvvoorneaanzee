import RoleDashboardPanel from "./RoleDashboardPanel.jsx";

function LocationManagerDashboardPanel({ overview, loading, error }) {
    return (
        <RoleDashboardPanel
            title="Locatie dashboard"
            eyebrow="Locatiemanager"
            overview={overview}
            loading={loading}
            error={error}
            loadingText="Locatiegegevens laden..."
            emptyText="Het locatiedashboard is voorbereid. Zodra planning, trainingen en locatieacties beschikbaar zijn, verschijnen ze hier."
        />
    );
}

export default LocationManagerDashboardPanel;
