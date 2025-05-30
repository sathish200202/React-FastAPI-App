import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signup: async ({ username, email, password }) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/users/signup", {
        username,
        email,
        password,
      });
      const { user, access_token } = res.data;
      set({ user, loading: false });
      localStorage.setItem("access_token", access_token);
      toast.success("Account created successfully!");
    } catch (err) {
      console.log(`Error in signup ${err.message}`);
      set({ loading: false });
    }
  },

  login: async ({ username, password }) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/users/login", {
        username,
        password,
      });
      console.log("Full response:", res); // Debug

      const { user, access_token } = res.data;
      console.log("User data:", user); // Debug
      set({ user, loading: false });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user_id", user.user_id);
      toast.success("Login successfully!");
    } catch (err) {
      toast.error(err.message || "Server error");
      console.log(`Error in login ${err.messaage}`);
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.warn("No token found, skipping auth check");
      set({ checkingAuth: false });
      return;
    }
    try {
      const res = await axiosInstance.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user: res.data, checkingAuth: false });
      //console.log("response: ", res);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.warn("Token expired or invalid, logging out");
        localStorage.removeItem("access_token");
        set({ user: null, checkingAuth: false });
      } else {
        toast.error(err.message || "Server error");
      }

      set({ checkingAuth: false });
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/users/logout");
      console.log("response: ", res.data);
      set({ user: null, loading: false });
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
    } catch (err) {
      console.log(`Error in logout ${err.message}`);
      set({ loading: false });
    }
  },
}));
