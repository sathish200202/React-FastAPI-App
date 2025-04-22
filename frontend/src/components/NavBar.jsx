import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          <Link to="/">Shoppy</Link>
        </div>

        {/* Nav Links */}
        <div className="space-x-6 text-sm font-medium text-gray-700 p-2">
          <Link to="/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link to="/products" className="hover:text-blue-600 transition">
            Products
          </Link>
          <Link to="/orders" className="hover:text-blue-600 transition">
            Orders
          </Link>
          <Link to="/profile" className="hover:text-blue-600 transition">
            Profile
          </Link>
          <Link
            to="/logout"
            className="text-red-500 hover:text-red-600 transition"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
