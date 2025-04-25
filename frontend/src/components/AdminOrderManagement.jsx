import { Eye, Trash2 } from "lucide-react";

const AdminOrderManagement = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Order Management
      </h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 shadow-md rounded">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Order ID</th>
              <th className="py-3 px-4 border-b">Customer</th>
              <th className="py-3 px-4 border-b">Total</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2].map((id) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">ORD{id}23</td>
                <td className="py-3 px-4 border-b">John Doe</td>
                <td className="py-3 px-4 border-b">$120.00</td>
                <td className="py-3 px-4 border-b">Pending</td>
                <td className="py-3 px-4 border-b flex justify-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
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

export default AdminOrderManagement;
