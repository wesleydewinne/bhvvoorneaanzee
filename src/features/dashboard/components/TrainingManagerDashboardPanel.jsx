import RoleDashboardPanel from "./RoleDashboardPanel.jsx";

function TrainingManagerDashboardPanel({ overview, loading, error }) {
    return (
        <RoleDashboardPanel
            title="Training manager dashboard"
            eyebrow="Training manager"
            overview={overview}
            loading={loading}
            error={error}
            loadingText="Training manager gegevens laden..."
            emptyText="Het training manager dashboard is voorbereid. Zodra planning, trainers en trainingsacties gekoppeld zijn, verschijnen ze hier."
        />
    );
}

export default TrainingManagerDashboardPanel;
