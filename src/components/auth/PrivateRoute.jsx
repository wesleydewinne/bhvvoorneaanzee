import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;