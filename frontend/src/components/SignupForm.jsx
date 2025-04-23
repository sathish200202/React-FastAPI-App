import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    signup(formData);
    navigate("/login");
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
