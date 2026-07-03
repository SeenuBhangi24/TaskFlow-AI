import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children }) {

    // Get Token from Context
    const { token } = useAuth();

    // If Token doesn't exist, redirect to Login
    if (!token) {

        return <Navigate to="/" replace />;

    }

    // Otherwise show requested page
    return children;

}

export default ProtectedRoute;