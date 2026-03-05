import ProtectedRoute from "@/features/auth/components/route/ProtectedRoute.jsx";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import Profile from "@/pages/profile/ProfilePage.jsx";
import { PRIVATE_PATHS } from "./routePaths.js";
import AdminUsersPage from "@/features/admin/pages/AdminUsersPage.jsx";
import AdminUserDetailPage from "@/features/admin/pages/AdminUserDetailPage.jsx";
import AdminEvaluationQrPage from "@/features/admin/pages/AdminEvaluationQrPage.jsx";
import AdminEvaluationsOverviewPage from "@/features/admin/pages/AdminEvaluationsOverviewPage.jsx";
import AdminEvaluationDetailPage from "@/features/admin/pages/AdminEvaluationDetailPage.jsx";

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
    },
    {
        path: "/admin/evaluations/qr",
        element: (
            <ProtectedRoute>
                <AdminEvaluationQrPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/evaluations",
        element: (
            <ProtectedRoute>
                <AdminEvaluationsOverviewPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/evaluations/:trainingId",
        element: (
            <ProtectedRoute>
                <AdminEvaluationDetailPage />
            </ProtectedRoute>
        ),
    },
];

export default privateRoutes;
