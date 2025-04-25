
const AdminSalesDetails = () => {
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sales Details</h1>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-sm text-gray-600">Total Sales</h2>
          <p className="text-xl font-semibold">$15,200</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-sm text-gray-600">Total Orders</h2>
          <p className="text-xl font-semibold">134</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-sm text-gray-600">Top Product</h2>
          <p className="text-xl font-semibold">Wireless Headphones</p>
        </div>
      </div>

      {/* Table (or chart later) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 shadow-md rounded">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Orders</th>
              <th className="py-3 px-4 border-b">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">2025-04-{20 + i}</td>
                <td className="py-3 px-4 border-b">{20 + i}</td>
                <td className="py-3 px-4 border-b">${(1000 * i).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSalesDetails;
