import ProtectedRoute from "@/features/auth/components/route/ProtectedRoute.jsx";
import Dashboard from "@/features/dashboard/pages/Dashboard.jsx";
import ProfilePage from "@/features/profile/pages/ProfilePage.jsx";
import { PRIVATE_PATHS } from "./routePaths.js";

import UsersManagementPage from "@/features/user-management/pages/UsersManagementPage.jsx";
import UserDetailPage from "@/features/user-management/pages/UserDetailPage.jsx";

import AdminEvaluationQrPage from "@/features/evaluation/pages/AdminEvaluationQrPage.jsx";
import AdminEvaluationResultsPage from "@/features/evaluation/pages/AdminEvaluationResultsPage.jsx";
import AdminEvaluationDetailPage from "@/features/evaluation/pages/AdminEvaluationDetailPage.jsx";
import AdminEvaluationGeneratePage from "@/features/evaluation/pages/AdminEvaluationGeneratePage.jsx";

import AdminLocationsPage from "@/features/locations/pages/AdminLocationsPage.jsx";
import LocationDetailPage from "@/features/locations/pages/LocationDetailPage.jsx";
import CreateLocationPage from "@/features/locations/pages/CreateLocationPage.jsx";
import EditLocationPage from "@/features/locations/pages/EditLocationPage.jsx";

import AdminTrainingenPage from "@/features/trainingen/pages/AdminTrainingenPage.jsx";
import CreateTrainingPage from "@/features/trainingen/pages/CreateTrainingPage.jsx";
import EditTrainingPage from "@/features/trainingen/pages/EditTrainingPage.jsx";
import TrainingDetailPage from "@/features/trainingen/pages/TrainingDetailPage.jsx";

import AdminContactMessagesPage from "@/features/contact/pages/AdminContactMessagesPage.jsx";
import ContactMessageDetailPage from "@/features/contact/pages/ContactMessageDetailPage.jsx";
import ArchivedContactMessagesPage from "@/features/contact/pages/ArchivedContactMessagesPage.jsx";

import AdminReviewsPage from "@/features/reviews/pages/AdminReviewsPage.jsx";

import AdminQuotesPage from "@/features/offerte/pages/AdminQuotesPage.jsx";
import AdminQuoteDetailPage from "@/features/offerte/pages/AdminQuoteDetailPage.jsx";

import TwoFactorSettingsPage from "@/features/auth/pages/TwoFactorSettingsPage.jsx";

const privateRoutes = [
    {
        path: PRIVATE_PATHS.dashboard,
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: PRIVATE_PATHS.profile,
        element: (
            <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
        ),
    },

    // =========================================================
    // USERS
    // =========================================================
    {
        path: "/account/beveiliging/2fa",
        element: (
            <ProtectedRoute>
                <TwoFactorSettingsPage />
            </ProtectedRoute>
        ),
    },

    {
        path: "/admin/users",
        element: (
            <ProtectedRoute>
                <UsersManagementPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/users/:id",
        element: (
            <ProtectedRoute>
                <UserDetailPage />
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

    // =========================================================
    // TRAININGEN
    // =========================================================
    {
        path: "/admin/trainingen",
        element: (
            <ProtectedRoute>
                <AdminTrainingenPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/trainingen/new",
        element: (
            <ProtectedRoute>
                <CreateTrainingPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/trainingen/:id",
        element: (
            <ProtectedRoute>
                <TrainingDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/trainingen/:id/edit",
        element: (
            <ProtectedRoute>
                <EditTrainingPage />
            </ProtectedRoute>
        ),
    },

    // =========================================================
    // CONTACTBERICHTEN
    // =========================================================
    {
        path: "/admin/contact-berichten",
        element: (
            <ProtectedRoute>
                <AdminContactMessagesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/contact-berichten/archief",
        element: (
            <ProtectedRoute>
                <ArchivedContactMessagesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/contact-berichten/:id",
        element: (
            <ProtectedRoute>
                <ContactMessageDetailPage />
            </ProtectedRoute>
        ),
    },

    // =========================================================
    // OFFERTES
    // =========================================================
    {
        path: "/admin/offertes",
        element: (
            <ProtectedRoute>
                <AdminQuotesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/offertes/:id",
        element: (
            <ProtectedRoute>
                <AdminQuoteDetailPage />
            </ProtectedRoute>
        ),
    },

    // =========================================================
    // REVIEWS
    // =========================================================
    {
        path: "/admin/reviews",
        element: (
            <ProtectedRoute>
                <AdminReviewsPage />
            </ProtectedRoute>
        ),
    },
];

export default privateRoutes;