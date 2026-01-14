import ProtectedRoute from "@/components/route/ProtectedRoute";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import Profile from "@/pages/profile/Profile.jsx";
import { PRIVATE_PATHS } from "./routePaths";

const privateRoutes = [
    {
        path: PRIVATE_PATHS[0],
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: PRIVATE_PATHS[1],
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
];

export default privateRoutes;
