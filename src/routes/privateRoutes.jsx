import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import Profile from "@/pages/profile/Profile.jsx";
import React from "react";

const privateRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/profile", element: <Profile /> },
];

export default privateRoutes;