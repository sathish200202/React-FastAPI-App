import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminProductManagement from "../components/AdminproductManagement";
import { useProductStore } from "../stores/useProductStore";

const AdminProductManagementPage = ({ user }) => {
  const { products, get_all_products, loading } = useProductStore();

  useEffect(() => {
    get_all_products();
  }, [get_all_products]);
  return (
    <div>
      <AdminProductManagement
        get_all_products={get_all_products}
        products={products}
        loading={loading}
      />
    </div>
  );
};

export default AdminProductManagementPage;
