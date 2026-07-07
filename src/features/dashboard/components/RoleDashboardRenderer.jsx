import BbmiTechnicianDashboardPanel from "./BbmiTechnicianDashboardPanel.jsx";
import BuildingOwnerDashboardPanel from "./BuildingOwnerDashboardPanel.jsx";
import FinanceDashboardPanel from "./FinanceDashboardPanel.jsx";
import LocationManagerDashboardPanel from "./LocationManagerDashboardPanel.jsx";
import SafetyManagerDashboardPanel from "./SafetyManagerDashboardPanel.jsx";
import TeamLeaderDashboardPanel from "./TeamLeaderDashboardPanel.jsx";
import TrainerDashboardPanel from "./TrainerDashboardPanel.jsx";
import TrainingManagerDashboardPanel from "./TrainingManagerDashboardPanel.jsx";
import { DASHBOARD_PROFILE_TYPES } from "../helpers/dashboardProfiles.js";

function RoleDashboardRenderer({ profileType, overview, loading, error }) {
    const props = { overview, loading, error };

    switch (profileType) {
        case DASHBOARD_PROFILE_TYPES.TRAINER:
            return <TrainerDashboardPanel {...props} />;
        case DASHBOARD_PROFILE_TYPES.TRAINING_MANAGER:
            return <TrainingManagerDashboardPanel {...props} />;
        case DASHBOARD_PROFILE_TYPES.SAFETY_MANAGER:
            return <SafetyManagerDashboardPanel {...props} />;
        case DASHBOARD_PROFILE_TYPES.FINANCE:
            return <FinanceDashboardPanel {...props} />;
        case DASHBOARD_PROFILE_TYPES.BUILDING_OWNER:
            return <BuildingOwnerDashboardPanel {...props} />;
        case DASHBOARD_PROFILE_TYPES.LOCATION_MANAGER:
            return <LocationManagerDashboardPanel {...props} />;
        case DASHBOARD_PROFILE_TYPES.TECHNICIAN:
            return <BbmiTechnicianDashboardPanel {...props} />;
        case DASHBOARD_PROFILE_TYPES.TEAM_LEADER:
            return <TeamLeaderDashboardPanel {...props} />;
        default:
            return null;
    }
}

export default RoleDashboardRenderer;
