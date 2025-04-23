import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useUserStore } from "./stores/useUserStore";

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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
