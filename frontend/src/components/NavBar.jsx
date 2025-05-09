import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogInIcon,
  LogOutIcon,
  User,
  ShoppingCart,
  LayoutDashboard,
  Package,
  PackageSearch,
  Menu,
  X,
} from "lucide-react";

import shoppyLogo from "../assets/shoppylogo.png";
import { useUserStore } from "../stores/useUserStore";

const Navbar = ({ user }) => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and brand */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={shoppyLogo}
            alt="Shoppy Logo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-xl font-bold text-blue-600 tracking-wide">
            Shoppy
          </span>
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 items-center">
          <NavLinks user={user} handleLogout={handleLogout} />
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 text-sm font-medium text-gray-700">
          <NavLinks user={user} handleLogout={handleLogout} isMobile />
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ user, handleLogout, isMobile }) => {
  const linkClass =
    "flex items-center space-x-2 hover:text-blue-600 transition";

  return (
    <>
      {user?.user?.role === "admin" ? (
        <Link to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
      ) : (
        <Link to="/cart" className={linkClass}>
          <ShoppingCart size={18} />
          <span>Cart</span>
        </Link>
      )}

      <Link to="/products" className={linkClass}>
        <PackageSearch size={18} />
        <span>Products</span>
      </Link>

      <Link to="/orders" className={linkClass}>
        <Package size={18} />
        <span>Orders</span>
      </Link>
      {user && (
        <Link to="/profile" className={linkClass}>
          <User size={18} />
          <span>{user?.user?.username || "Profile"}</span>
        </Link>
      )}

      {user ? (
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition"
        >
          <LogOutIcon size={18} />
          <span>Logout</span>
        </button>
      ) : (
        <Link
          to="/login"
          className="flex items-center space-x-2 text-green-500 hover:text-green-600 transition"
        >
          <LogInIcon size={18} />
          <span>Login</span>
        </Link>
      )}
    </>
  );
};

export default Navbar;
