import { lazy } from "react";
import ProtectedRoute from "@/features/auth/components/route/ProtectedRoute.jsx";
import { PRIVATE_PATHS } from "./routePaths.js";

const Dashboard = lazy(() => import("@/features/dashboard/pages/Dashboard.jsx"));
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage.jsx"));
const TwoFactorSettingsPage = lazy(() => import("@/features/auth/pages/TwoFactorSettingsPage.jsx"));
const PasskeySetupPage = lazy(() => import("@/features/auth/pages/PasskeySetupPage.jsx"));

const UsersManagementPage = lazy(() => import("@/features/user-management/pages/UsersManagementPage.jsx"));
const UserDetailPage = lazy(() => import("@/features/user-management/pages/UserDetailPage.jsx"));

const AdminEvaluationQrPage = lazy(() => import("@/features/evaluation/pages/AdminEvaluationQrPage.jsx"));
const AdminEvaluationResultsPage = lazy(() => import("@/features/evaluation/pages/AdminEvaluationResultsPage.jsx"));
const AdminEvaluationDetailPage = lazy(() => import("@/features/evaluation/pages/AdminEvaluationDetailPage.jsx"));
const AdminEvaluationGeneratePage = lazy(() => import("@/features/evaluation/pages/AdminEvaluationGeneratePage.jsx"));

const AdminLocationsPage = lazy(() => import("@/features/locations/pages/AdminLocationsPage.jsx"));
const LocationDetailPage = lazy(() => import("@/features/locations/pages/LocationDetailPage.jsx"));
const CreateLocationPage = lazy(() => import("@/features/locations/pages/CreateLocationPage.jsx"));
const EditLocationPage = lazy(() => import("@/features/locations/pages/EditLocationPage.jsx"));

const AdminCompaniesPage = lazy(() => import("@/features/companies/pages/AdminCompaniesPage.jsx"));
const CreateCompanyPage = lazy(() => import("@/features/companies/pages/CreateCompanyPage.jsx"));
const CompanyDetailPage = lazy(() => import("@/features/companies/pages/CompanyDetailPage.jsx"));
const EditCompanyPage = lazy(() => import("@/features/companies/pages/EditCompanyPage.jsx"));

const AdminTrainingenPage = lazy(() => import("@/features/trainingen/pages/AdminTrainingenPage.jsx"));
const CreateTrainingPage = lazy(() => import("@/features/trainingen/pages/CreateTrainingPage.jsx"));
const EditTrainingPage = lazy(() => import("@/features/trainingen/pages/EditTrainingPage.jsx"));
const TrainingDetailPage = lazy(() => import("@/features/trainingen/pages/TrainingDetailPage.jsx"));

const AdminContactMessagesPage = lazy(() => import("@/features/contact/pages/AdminContactMessagesPage.jsx"));
const ContactMessageDetailPage = lazy(() => import("@/features/contact/pages/ContactMessageDetailPage.jsx"));
const ArchivedContactMessagesPage = lazy(() => import("@/features/contact/pages/ArchivedContactMessagesPage.jsx"));

const AdminReviewsPage = lazy(() => import("@/features/reviews/pages/AdminReviewsPage.jsx"));

const AdminQuotesPage = lazy(() => import("@/features/offerte/pages/AdminQuotesPage.jsx"));
const AdminQuoteDetailPage = lazy(() => import("@/features/offerte/pages/AdminQuoteDetailPage.jsx"));
const AdminCreateQuotePage = lazy(() => import("@/features/offerte/pages/AdminCreateQuotePage.jsx"));
const AdminInvoicesPage = lazy(() => import("@/features/invoice/pages/AdminInvoicesPage.jsx"));

const protect = (element) => (
    <ProtectedRoute>
        {element}
    </ProtectedRoute>
);

const privateRoutes = [
    {
        path: PRIVATE_PATHS.dashboard,
        element: protect(<Dashboard />),
    },
    {
        path: PRIVATE_PATHS.profile,
        element: protect(<ProfilePage />),
    },

    // Users
    {
        path: "/account/beveiliging/2fa",
        element: protect(<TwoFactorSettingsPage />),
    },
    {
        path: "/account/passkey-aanmaken",
        element: protect(<PasskeySetupPage />),
    },
    {
        path: "/admin/users",
        element: protect(<UsersManagementPage />),
    },
    {
        path: "/admin/users/:id",
        element: protect(<UserDetailPage />),
    },

    // Locations
    {
        path: "/admin/locations",
        element: protect(<AdminLocationsPage />),
    },
    {
        path: "/admin/locations/new",
        element: protect(<CreateLocationPage />),
    },
    {
        path: "/admin/locations/:id",
        element: protect(<LocationDetailPage />),
    },
    {
        path: "/admin/locations/:id/edit",
        element: protect(<EditLocationPage />),
    },

    // Companies
    {
        path: "/admin/companies",
        element: protect(<AdminCompaniesPage />),
    },
    {
        path: "/admin/companies/new",
        element: protect(<CreateCompanyPage />),
    },
    {
        path: "/admin/companies/:id",
        element: protect(<CompanyDetailPage />),
    },
    {
        path: "/admin/companies/:id/edit",
        element: protect(<EditCompanyPage />),
    },

    // Evaluations
    {
        path: "/admin/evaluations",
        element: protect(<AdminEvaluationResultsPage />),
    },
    {
        path: "/admin/evaluations/generate",
        element: protect(<AdminEvaluationGeneratePage />),
    },
    {
        path: "/admin/evaluations/:trainingId/qr",
        element: protect(<AdminEvaluationQrPage />),
    },
    {
        path: "/admin/evaluations/:trainingId",
        element: protect(<AdminEvaluationDetailPage />),
    },

    // Trainingen
    {
        path: "/admin/trainingen",
        element: protect(<AdminTrainingenPage />),
    },
    {
        path: "/admin/trainingen/new",
        element: protect(<CreateTrainingPage />),
    },
    {
        path: "/admin/trainingen/:id",
        element: protect(<TrainingDetailPage />),
    },
    {
        path: "/admin/trainingen/:id/edit",
        element: protect(<EditTrainingPage />),
    },

    // Contactberichten
    {
        path: "/admin/contact-berichten",
        element: protect(<AdminContactMessagesPage />),
    },
    {
        path: "/admin/contact-berichten/archief",
        element: protect(<ArchivedContactMessagesPage />),
    },
    {
        path: "/admin/contact-berichten/:id",
        element: protect(<ContactMessageDetailPage />),
    },

    // Offertes
    {
        path: "/admin/offertes",
        element: protect(<AdminQuotesPage />),
    },
    {
        path: "/admin/offertes/new",
        element: protect(<AdminCreateQuotePage />),
    },
    {
        path: "/admin/offertes/:id",
        element: protect(<AdminQuoteDetailPage />),
    },

    // Facturen
    {
        path: "/admin/invoices",
        element: protect(<AdminInvoicesPage />),
    },

    // Reviews
    {
        path: "/admin/reviews",
        element: protect(<AdminReviewsPage />),
    },
];

export default privateRoutes;
