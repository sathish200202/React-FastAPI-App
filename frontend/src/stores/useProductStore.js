import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  prodoucts: [],
  categories: [],
  loading: false,
  error: null,

  get_all_category: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get("/all-category");
      set({ categories: res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
      toast.error("Failed to fetch categories");
    }
  },

  get_all_products: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
      toast.error("Failed to fetch products");
    }
  },
}));
