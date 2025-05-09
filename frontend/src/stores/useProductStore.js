import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
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

  //Admin functions
  create_product: async (product) => {
    set({ loading: true });
    console.log("Product data:", product); // Log the product data
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("brand", product.brand);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description || "");
    formData.append("image", product.image_url); // Ensure this is a File object
    try {
      const res = await axiosInstance.post("/admin/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Assume get() returns current products from Zustand
      const { products } = get();
      set({ loading: false, products: [...products, res.data] });
      toast.success("Product created successfully");
    } catch (err) {
      console.error("Error creating product:", err); // Log the error
      set({ loading: false, error: err.message });
      toast.error("Failed to create product");
    }
  },

  delete_product: async (product_id) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.delete(
        `/admin/delete-product/${product_id}`
      );
      const { products } = get();
      set({
        loading: false,
        products: products.filter((product) => product._id !== product_id),
      });
      toast.success("Product deleted successfully");
    } catch (err) {
      set({ loading: false, error: err.message });
      toast.error("Failed to delete product");
    }
  },
}));
