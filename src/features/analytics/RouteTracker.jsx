import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageview } from "./analytics.js";

export default function RouteTracker() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname + location.search;
        pageview(path);
    }, [location]);

    return null;
}
