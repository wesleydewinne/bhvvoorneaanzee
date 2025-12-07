import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { HeadProvider } from "react-head";
import { QuizProvider } from "./context/QuizContext.jsx";
import { AuthProvider } from "@/context/AuthContext";

import RouteTracker from "./components/analytics/RouteTracker.jsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <RouteTracker />
            <HeadProvider>
                <AuthProvider>
                    <QuizProvider>
                        <App />
                    </QuizProvider>
                </AuthProvider>
            </HeadProvider>
        </BrowserRouter>
    </React.StrictMode>
);
