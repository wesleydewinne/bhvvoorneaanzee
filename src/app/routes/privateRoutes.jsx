import ProtectedRoute from "@/features/auth/components/route/ProtectedRoute.jsx";
import Dashboard from "@/features/dashboard/pages/Dashboard.jsx";
import Profile from "@/pages/profile/ProfilePage.jsx";
import { PRIVATE_PATHS } from "./routePaths.js";

import AdminUsersPage from "@/features/admin/pages/AdminUsersPage.jsx";
import AdminUserDetailPage from "@/features/admin/pages/AdminUserDetailPage.jsx";

import AdminEvaluationQrPage from "@/features/evaluation/pages/AdminEvaluationQrPage.jsx";
import AdminEvaluationResultsPage from "@/features/evaluation/pages/AdminEvaluationResultsPage.jsx";
import AdminEvaluationDetailPage from "@/features/evaluation/pages/AdminEvaluationDetailPage.jsx";
import AdminEvaluationGeneratePage from "@/features/evaluation/pages/AdminEvaluationGeneratePage.jsx";

import AdminLocationsPage from "@/features/locations/pages/AdminLocationsPage.jsx";
import LocationDetailPage from "@/features/locations/pages/LocationDetailPage.jsx";
import CreateLocationPage from "@/features/locations/pages/CreateLocationPage.jsx";
import EditLocationPage from "@/features/locations/pages/EditLocationPage.jsx";

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

    // =========================================================
    // USERS
    // =========================================================
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

    // =========================================================
    // LOCATIONS
    // =========================================================
    {
        path: "/admin/locations",
        element: (
            <ProtectedRoute>
                <AdminLocationsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/locations/new",
        element: (
            <ProtectedRoute>
                <CreateLocationPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/locations/:id",
        element: (
            <ProtectedRoute>
                <LocationDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/locations/:id/edit",
        element: (
            <ProtectedRoute>
                <EditLocationPage />
            </ProtectedRoute>
        ),
    },

    // =========================================================
    // EVALUATIONS
    // =========================================================
    {
        path: "/admin/evaluations",
        element: (
            <ProtectedRoute>
                <AdminEvaluationResultsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/evaluations/generate",
        element: (
            <ProtectedRoute>
                <AdminEvaluationGeneratePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/evaluations/:trainingId/qr",
        element: (
            <ProtectedRoute>
                <AdminEvaluationQrPage />
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
