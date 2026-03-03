import ProtectedRoute from "@/features/auth/components/route/ProtectedRoute.jsx";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import Profile from "@/pages/profile/ProfilePage.jsx";
import { PRIVATE_PATHS } from "./routePaths.js";
import AdminUsersPage from "@/features/admin/pages/AdminUsersPage.jsx";
import AdminUserDetailPage from "@/features/admin/pages/AdminUserDetailPage.jsx";

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
    {
        path: "/admin/users",
        element: (
            <ProtectedRoute>
                <AdminUsersPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/users/:id",
        element: (
            <ProtectedRoute>
                <AdminUserDetailPage />
            </ProtectedRoute>
        ),
    }
];

export default privateRoutes;
