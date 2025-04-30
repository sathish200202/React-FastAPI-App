import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const RequiredAuth = ({ user, children, name }) => {
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      toast.error(`Please login to view your ${name}.`);
    }
  }, [user, name]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Render the page you passed
};

export default RequiredAuth;
