import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

import ProfilePage from "../pages/ProfilePage";
const ProtectProfile = ({ user }) => {
  useEffect(() => {
    if (!user) {
      toast.error("Please login to view your profile.");
    }
  }, [user]);

  if (!user) {
    // Redirect to login page or home page
    return <Navigate to={"/login"} replace />;
  }

  if (user && user?.user?.role !== "admin") {
    toast.error("You do not have permission to view this page.");
    // Redirect to home page or another page
    return <Navigate to={"/"} replace />;
  }
  return <ProfilePage />;
};

export default ProtectProfile;
