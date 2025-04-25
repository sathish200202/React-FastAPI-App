import React, { useEffect } from "react";
import AdminUserManagement from "../components/AdminUserManagement";
import { useAdminStore } from "../stores/useAdminStore";

const AdminUserManagementPage = () => {
  const {users, get_all_users, loading} = useAdminStore()

  useEffect(() => {
    get_all_users()
  }, [get_all_users])
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminUserManagement users={users} loading={loading}/>
    </div>
  );
};

export default AdminUserManagementPage;
