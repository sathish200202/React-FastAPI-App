import React from "react";
import AdminDashboard from "../components/AdminDashboard";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h1>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
