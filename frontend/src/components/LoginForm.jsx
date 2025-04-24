import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../stores/useUserStore";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    navigate("/");
  };
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Login
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="username"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4 text-center">
        Don't have an account?{" "}
        <Link
          to={"/signup"}
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Signup here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
