import { Plus, Edit, Trash2 } from "lucide-react";

const AdminUserManagement = ({ users, loading }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
          <Plus className="w-4 h-4 mr-2" />
          Create User
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 shadow-md rounded">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Id</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Role</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{user.id}</td>
                <td className="py-3 px-4 border-b">{user.username}</td>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">
                  {" "}
                  <span
                    className={`${
                      user.role === "admin" ? "text-blue-500" : "text-black"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">
                  {" "}
                  <span
                    className={`${
                      user.is_active ? "text-green-500" : "text-red-500"
                    } font-semibold`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4 border-b flex justify-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;
