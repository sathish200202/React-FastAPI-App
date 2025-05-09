import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const userCartStore = create((set) => ({
  cart: [],
  loading: false,

  addToCart: async (product_id, quantity) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/cart/add-to-cart", {
        product_id,
        quantity,
        User_id: localStorage.getItem("user_id"),
      });

      const newCartItem = res.data.cart; // ✅ Only use the cart data

      set((state) => ({
        cart: [...state.cart, newCartItem], // ✅ Push only cart item
        loading: false,
      }));

      toast.success(res.data.message || "Added to cart");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to add to cart");
    }
  },

  getCart: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get("/cart", {
        params: { user_id: localStorage.getItem("user_id") },
      });
      console.log("Cart data:", res.data); // Log the cart data
      set({ cart: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch cart data");
    }
  },

  updateCart: async (cart_id, quantity) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.put(`/cart/update-quantity/${cart_id}`, {
        quantity,
      });
      const updatedCart = res.data;
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === updatedCart.id ? updatedCart : item
        ),
      }));
      toast.success("Cart updated successfully");
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to update cart");
    }
  },

  removeFromCart: async (cart_id) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.delete(
        `/cart/remove-cart-item/${cart_id}`
      );
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== cart_id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to remove from cart");
    }
  },
}));
