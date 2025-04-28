import React, { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Stylish Shirt",
      price: 799,
      quantity: 2,
      image_url: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 2499,
      quantity: 1,
      image_url: "https://via.placeholder.com/150",
    },
  ]);

  // Increase quantity
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate Total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                {/* Left side */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600 text-sm">₹{item.price}</p>

                    {/* Quantity Controls */}
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

                {/* Right side */}
                <div className="flex items-center gap-6">
                  <p className="font-bold text-lg">
                    ₹{item.price * item.quantity}
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

          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>₹{totalPrice}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Shipping</p>
              <p>₹50</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>₹{totalPrice + 50}</p>
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
