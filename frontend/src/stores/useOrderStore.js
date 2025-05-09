import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useOrderStore = create((set) => ({
  orderSummary: null,
  currentOrder: null,
  loading: false,
  error: null,

  // Get order summary
  getOrderSummary: async (productId, quantity, discountCode = null) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/orders/order-summary", {
        product_id: productId,
        quantity: quantity,
        discount_code: discountCode,
      });

      set({
        orderSummary: res.data,
        error: null,
      });
      return res.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.message ||
        "Failed to get order summary";
      set({ error: errorMsg });
      toast.error(errorMsg);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/orders/create-single-order", {
        product_id: orderData.productId,
        quantity: orderData.quantity,
        shipping_address: orderData.shippingAddress,
        payment_method: orderData.paymentMethod,
        discount_code: orderData.discountCode || null,
      });

      set({
        currentOrder: res.data,
        error: null,
      });
      toast.success("Order created successfully!");
      return res.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.message ||
        "Order creation failed";
      set({ error: errorMsg });
      toast.error(errorMsg);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Clear current order
  clearCurrentOrder: () => set({ currentOrder: null }),
}));
