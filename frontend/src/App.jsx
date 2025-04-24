import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useUserStore } from "./stores/useUserStore";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile/edit"
          element={user ? <ProfileEditPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/admin/dashboard"
          element={
            user && user?.user?.role === "admin" ? (
              <AdminPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
