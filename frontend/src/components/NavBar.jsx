import React from "react";
import { Link, useNavigate } from "react-router-dom";
import shoppyLogo from "../assets/shoppylogo.png";
import { useUserStore } from "../stores/useUserStore";
const Navbar = ({ user }) => {
  const { logout } = useUserStore();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const is_admin = false;
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={shoppyLogo}
            alt="Shoppy Logo"
            className="w-14 h-14 object-cover rounded-full"
          />
          <span className="text-2xl font-bold text-blue-600 tracking-wide">
            Shoppy
          </span>
        </Link>

        {/* Nav Links */}
        <div className="space-x-6 text-sm font-medium text-gray-700 p-2">
          {is_admin ? (
            <Link to="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
          ) : (
            <Link to="/cart" className="hover:text-blue-600 transition">
              My Cart
            </Link>
          )}
          <Link to="/products" className="hover:text-blue-600 transition">
            Products
          </Link>
          <Link to="/orders" className="hover:text-blue-600 transition">
            Orders
          </Link>
          <Link to="/profile" className="hover:text-blue-600 transition">
            {user?.user?.username || "Profile"}
          </Link>
          {user ? (
            <Link
              to="/"
              className="text-red-500 hover:text-red-600 transition"
              onClick={() => handleLogout()}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-red-500 hover:text-red-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
