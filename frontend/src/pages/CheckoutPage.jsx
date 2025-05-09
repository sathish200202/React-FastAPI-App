import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userCartStore } from "../stores/usecartStore";
import { useOrderStore } from "../stores/useOrderStore";
import CheckoutForm from "../components/CheckoutForm";

const CheckoutPage = () => {
  const { state } = useLocation();
  const singleProduct = state?.product; // If passed from product page
  const { cart, getCart } = userCartStore();
  const { orderSummary, getOrderSummary } = useOrderStore();

  useEffect(() => {
    if (singleProduct) {
      // Single product checkout

      getOrderSummary(singleProduct.id, 1);
    } else {
      // Load cart items (multi-product)
      getCart();
    }
  }, []);

  const isSingleProduct = Boolean(singleProduct);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            Order Summary
          </h2>

          <div className="flex items-center mb-4">
            <img
              src={`http://localhost:8000/${orderSummary?.product.image_url}`}
              alt={orderSummary?.product?.product_name}
              className="w-24 h-24 object-cover rounded border"
            />
            <div className="ml-4">
              <p className="font-semibold text-lg">
                {orderSummary?.product?.product_name}
              </p>
              <p className="text-gray-600 text-sm">
                ₹{orderSummary?.product?.price} x{" "}
                {orderSummary?.product?.quantity}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{orderSummary?.summary?.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{orderSummary?.summary?.shipping_cost}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>{orderSummary?.summary?.discount_percentage}%</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{orderSummary?.summary?.final_price}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <CheckoutForm
            finalPrice={orderSummary?.summary?.final_price}
            total_pirce={orderSummary?.summary?.subtotal}
            product={orderSummary?.product}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
