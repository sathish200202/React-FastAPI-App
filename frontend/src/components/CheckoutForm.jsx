import React, { useState } from "react";
import toast from "react-hot-toast";
import { useOrderStore } from "../stores/useOrderStore";

const CheckoutForm = ({ finalPrice, subtotal, product }) => {
  const { createOrder, loading } = useOrderStore();
  // const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  // const [discount_percentage, setDiscout_Percentage] = useState(0)
  // const [discount_amount, setDiscout_Amount] = useState(0.0)
  // const []
  // const [cardNumber, setCardNumber] = useState("");
  // const [expiryDate, setExpiryDate] = useState("");
  // const [cvv, setCvv] = useState("");
  // const [loading, setLoading] = useState(false);

  // const [formData, setFormData] = useState({
  //   quantity: 1,
  //   total_price: 0.0,
  //   discount_percentage: 0,
  //   discount_amount: 0.0,
  //   final_price: 0.0,
  //   shipping_address: "",
  //   shipping_price: 0.0,
  //   payment_method: ""
  // });

  console.log("product: ", product?.id);

  const [formData, setFormData] = useState({
    product_id: product?.id,
    quantity: 1,
    total_price: subtotal,
    discount_percentage: 0,
    discount_amount: 0.0,
    final_price: finalPrice,
    shipping_address: "",
    shipping_price: 0.0,
    payment_method: paymentMethod,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("func called");
    // setFormData({
    //   quantity: 1,
    //   total_price: total_price,
    //   discount_percentage: discount_percentage,
    //   discount_amount: 0.0,
    //   final_price: 0.0,
    //   shipping_address: "",
    //   shipping_price: 0.0,
    //   payment_method: "",
    // });
    createOrder(formData);
    // setTimeout(() => {
    //   toast.success("Order placed successfully!");
    // }, 2000);
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-xl w-full  ml-auto border border-gray-100">
      {/* Heading with emphasized design */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
        Checkout Summary
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipping Address */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Shipping Address
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            value={formData.shipping_address}
            onChange={(e) =>
              setFormData({ ...formData, shipping_address: e.target.value })
            }
            required
            placeholder="Enter your full address"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Payment Method
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        {/* Credit Card Fields (conditionally rendered) */}
        {formData.payment_method === "credit_card" && (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Order Summary */}
        <div className="flex justify-between items-center font-semibold text-lg pt-4 border-t border-gray-200">
          <span className="text-gray-800">Total Amount</span>
          <span className="text-blue-600 font-bold">₹{finalPrice}</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold transition duration-300 hover:bg-blue-700 mt-6 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                {/* Loading spinner SVG */}
              </svg>
              Processing...
            </span>
          ) : (
            "Place Order"
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
