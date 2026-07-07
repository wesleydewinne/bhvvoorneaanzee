import RoleDashboardPanel from "./RoleDashboardPanel.jsx";

function TeamLeaderDashboardPanel({ overview, loading, error }) {
    return (
        <RoleDashboardPanel
            title="Teamleider dashboard"
            eyebrow="Teamleider"
            overview={overview}
            loading={loading}
            error={error}
            loadingText="Teamgegevens laden..."
            emptyText="Het teamleiderdashboard is voorbereid. Zodra teamplanning, cursisten en evaluaties gekoppeld zijn, verschijnen ze hier."
        />
    );
}

export default TeamLeaderDashboardPanel;
