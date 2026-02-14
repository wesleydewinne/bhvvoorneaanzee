// src/hooks/useAuth.js
import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";

export default function useAuth() {
    return useAuthContext();
}
