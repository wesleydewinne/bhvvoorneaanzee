import React from "react";
import ProtectedRoute from "@/components/route/ProtectedRoute";

import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import Profile from "@/pages/profile/Profile.jsx";

const privateRoutes = [
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    }
];

export default privateRoutes;
