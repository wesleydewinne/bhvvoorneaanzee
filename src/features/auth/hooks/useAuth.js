import { useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext.jsx";

export default function useAuth() {
    return useContext(AuthContext);
}