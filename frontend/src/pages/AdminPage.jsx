import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import { useAdminStore } from "../stores/useAdminStore";
import { useProductStore } from "../stores/useProductStore";

const AdminPage = () => {
  const { users } = useAdminStore();
  const { products } = useProductStore();

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = 0; // Placeholder for total orders, replace with actual logic

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h1>
      <AdminDashboard
        totalUsers={totalUsers}
        totalProducts={totalProducts}
        totalOrders={totalOrders}
        users={users}
      />
    </div>
  );
};

export default AdminPage;
