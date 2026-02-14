import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.jsx";
import { HeadProvider } from "react-head";
import { QuizProvider } from "@/features/quiz/context/QuizContext.jsx";
import { AuthProvider } from "@/features/auth/context/AuthContext.jsx";

import RouteTracker from "./features/analytics/RouteTracker.jsx";
import ScrollToTop from "@/app/routes/ScrollToTop";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop />
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
