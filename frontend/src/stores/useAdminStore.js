import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  get_all_users: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get("/admin/get-users");
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
      toast.error("Failed to fetch users");
    }
  },
}));
