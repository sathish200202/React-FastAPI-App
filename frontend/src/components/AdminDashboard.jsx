import React from "react";
import {
  Users,
  ShoppingCart,
  PackageCheck,
  BarChart2,
  Settings,
  PlusCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = ({ totalUsers, totalProducts, totalOrders, users }) => {
  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card
          icon={<Users className="w-8 h-8 text-blue-600" />}
          title="Total Users"
          value={totalUsers}
        />
        <Card
          icon={<PackageCheck className="w-8 h-8 text-green-600" />}
          title="Total Products"
          value={totalProducts}
        />
        <Card
          icon={<ShoppingCart className="w-8 h-8 text-yellow-500" />}
          title="Orders"
          value={totalOrders}
        />
        <Card
          icon={<BarChart2 className="w-8 h-8 text-purple-600" />}
          title="Monthly Sales"
          value="$24,500"
        />
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <InfoBox
          title="Recent Users"
          items={[
            ...users
              .slice(0, 3)
              .map((user) => `${user.username} - ${user.email}`),
          ]}
        />
        <InfoBox
          title="Latest Orders"
          items={[
            "#1234 - $250 - Completed",
            "#1235 - $180 - Pending",
            "#1236 - $90 - Cancelled",
          ]}
        />
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Admin Tools
          </h2>
          <div className="space-y-3 gap-y-2">
            <Link to="/admin/settings" className="block">
              <ToolButton
                color="blue"
                icon={<Settings className="w-4 h-4 mr-2" />}
                label="Manage Settings"
              />
            </Link>
            <Link to="/admin/users-management" className="block">
              <ToolButton
                color="green"
                icon={<Users className="w-4 h-4 mr-2" />}
                label="Manage Users"
              />
            </Link>
            <Link to="/admin/product-management" className="block">
              <ToolButton
                color="yellow"
                icon={<PackageCheck className="w-4 h-4 mr-2" />}
                label="Manage Products"
              />
            </Link>
            <Link to="/admin/order-management" className="block">
              <ToolButton
                color="purple"
                icon={<ShoppingCart className="w-4 h-4 mr-2" />}
                label="Manage Orders"
              />
            </Link>
            <Link to="/admin/sales-details" className="block">
              <ToolButton
                color="red"
                icon={<BarChart2 className="w-4 h-4 mr-2" />}
                label="View Sales Details"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Product Management Section */}
      {/* <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Product Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ActionCard
            icon={<PlusCircle className="w-6 h-6 text-green-600" />}
            title="Add Product"
          />
          <ActionCard
            icon={<Edit className="w-6 h-6 text-blue-500" />}
            title="Update Product"
          />
          <ActionCard
            icon={<Trash2 className="w-6 h-6 text-red-500" />}
            title="Delete Product"
          />
        </div>
      </div> */}
    </div>
  );
};

const Card = ({ icon, title, value }) => (
  <div className="bg-white shadow rounded-xl p-6 flex items-center space-x-4 border border-gray-200">
    {icon}
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
    </div>
  </div>
);

const InfoBox = ({ title, items }) => (
  <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
    <ul className="space-y-3 text-gray-600 text-sm">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

const colorMap = {
  blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  green: "bg-green-50 text-green-600 hover:bg-green-100",
  yellow: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
  purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
  red: "bg-red-50 text-red-600 hover:bg-red-100",
};

const ToolButton = ({ icon, label, color }) => (
  <button
    className={`w-full text-left px-4 py-2 rounded flex items-center ${colorMap[color]}`}
  >
    {icon}
    {label}
  </button>
);

// const ActionCard = ({ icon, title }) => (
//   <div className="border border-gray-200 p-5 rounded-xl flex items-center space-x-4 bg-gray-50 hover:bg-gray-100 transition">
//     {icon}
//     <span className="text-gray-700 font-medium">{title}</span>
//   </div>
// );

export default AdminDashboard;
