import RoleDashboardPanel from "./RoleDashboardPanel.jsx";

function BbmiTechnicianDashboardPanel({ overview, loading, error }) {
    return (
        <RoleDashboardPanel
            title="BBMI techniek dashboard"
            eyebrow="BBMI technicus"
            overview={overview}
            loading={loading}
            error={error}
            loadingText="Technische gegevens laden..."
            emptyText="Het BBMI techniek dashboard is voorbereid. Zodra technische controles en rapportages beschikbaar zijn, verschijnen ze hier."
        />
    );
}

export default BbmiTechnicianDashboardPanel;
