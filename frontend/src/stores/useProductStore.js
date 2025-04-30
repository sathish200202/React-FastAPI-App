import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  products_by_category: [],
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
    set({ loading: false });

    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
      toast.error("Failed to fetch products");
    }
  },

  get_product_by_category: async (category) => {
    set({ loading: true, error: null }); // clear previous errors
    
    try {
      const res = await axiosInstance.get("/products/get-by-category", {
        params: { category },
      });
      set({ products_by_category: res.data, loading: false });
    } catch (err) {
      set({ loading: false });
      if (err.response?.status === 404) {
        set({
          products_by_category: [],
          error: "No products found in this category",
        });
        toast.dismiss(); // prevent stacking
        toast.error(`No products found in the ${category} category`);
      } else {
        set({ error: err.message });
        toast.dismiss();
        toast.error("Failed to fetch products by category");
      }
    }
  },

  get_product_by_id: async (product_id) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get(`/products/${product_id}`);
      set({ products: res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
      toast.error("Failed to fetch product by ID");
    }
  },
}));
