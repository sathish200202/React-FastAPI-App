// components/AddToCart.jsx
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

const AddToCart = ({
  cart,
  loading,
  handleIncrease,
  handleDecrease,
  handleRemove,
  shippingPrice,
  totalPrice,
}) => {
  if (loading) {
    return <p>Loading...</p>; // Or your Loading component
  }

  const getDiscountPercentage = (amount) => {
    if (amount >= 50000) return 25;
    if (amount >= 10000) return 20;
    if (amount >= 8000) return 15;
    if (amount >= 5000) return 10;
    if (amount >= 2500) return 5;
    return 0;
  };

  const discountPercentage = getDiscountPercentage(totalPrice);
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const finalTotal = totalPrice + shippingPrice - discountAmount;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:8000/${item?.product?.image_url}`}
                    alt={item?.product?.product_name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold">
                      {item?.product?.product_name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      ₹{item?.product?.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-black p-1 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-black p-1 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-bold text-lg">
                    ₹{item.product?.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>₹{totalPrice.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mb-2">
              <p>Shipping</p>
              <p>₹{shippingPrice.toFixed(2)}</p>
            </div>
            {discountPercentage > 0 && (
              <div className="flex justify-between mb-2 text-green-500">
                <p>Discount ({discountPercentage}%)</p>
                <p>- ₹{discountAmount.toFixed(2)}</p>
              </div>
            )}
            <hr className="my-2" />

            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>₹{finalTotal.toFixed(2)}</p>
            </div>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
