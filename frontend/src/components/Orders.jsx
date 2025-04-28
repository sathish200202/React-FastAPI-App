import React from "react";
import { PackageCheck, Truck, Ban } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "ORD12345",
      product_name: "Wireless Earbuds",
      price: 2499,
      quantity: 1,
      status: "Delivered",
      image_url: "https://via.placeholder.com/100",
    },
    {
      id: "ORD12346",
      product_name: "Stylish Shirt",
      price: 799,
      quantity: 2,
      status: "Shipped",
      image_url: "https://via.placeholder.com/100",
    },
    {
      id: "ORD12347",
      product_name: "Gaming Laptop",
      price: 74999,
      quantity: 1,
      status: "Pending",
      image_url: "https://via.placeholder.com/100",
    },
    {
      id: "ORD12348",
      product_name: "Smart Watch",
      price: 4999,
      quantity: 1,
      status: "Cancelled",
      image_url: "https://via.placeholder.com/100",
    },
  ];

  // Color and Icon based on status
  const getStatusInfo = (status) => {
    switch (status) {
      case "Delivered":
        return { color: "text-green-600", icon: PackageCheck };
      case "Shipped":
        return { color: "text-blue-600", icon: Truck };
      case "Pending":
        return { color: "text-yellow-500", icon: Truck };
      case "Cancelled":
        return { color: "text-red-600", icon: Ban };
      default:
        return { color: "text-gray-500", icon: Truck };
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const { color, icon: StatusIcon } = getStatusInfo(order.status);

            return (
              <div
                key={order.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={order.image_url}
                    alt={order.product_name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold">{order.product_name}</h2>
                    <p className="text-gray-600 text-sm">
                      Order ID: {order.id}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Quantity: {order.quantity}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xl font-bold">₹{order.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon size={20} className={color} />
                    <span className={`font-semibold ${color}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
