import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
    children,
    allowedRole,
}) {

    const {
        user,
        loading,
    } = useAuth();

    // ESPERAR AUTH
    if (loading) {

        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">

                Cargando...

            </div>
        );

    }

    // NO LOGIN
    if (!user) {

        return <Navigate to="/login" replace />;

    }

    const userRole =
        user.role?.toLowerCase();

    const requiredRole =
        allowedRole?.toLowerCase();

    // ROLE INCORRECTO
    if (
        requiredRole &&
        userRole !== requiredRole
    ) {

        if (userRole === "business") {

            return (
                <Navigate
                    to="/business-dashboard"
                    replace
                />
            );

        }

        if (userRole === "client") {

            return (
                <Navigate
                    to="/services"
                    replace
                />
            );

        }

        return <Navigate to="/" replace />;

    }

    return children;
}

export default ProtectedRoute;