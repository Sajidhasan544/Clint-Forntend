import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Navigate } from "react-router";

const ProtectedRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="w-screen h-screen flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRouter;
