import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useProductStore } from "../stores/useProductStore";

const AdminProductManagement = ({ get_all_products, products, loading }) => {
  const { delete_product } = useProductStore();
  const handleDelete = async (productId) => {
    delete_product(productId);
    get_all_products();
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Product Management
        </h1>
        <Link
          to="/admin/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          + Create Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">Quantity</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="border-t hover:bg-gray-50">
                <td colSpan="7" className="p-4 text-center">
                  <Loading /> {/* Show the loading component when loading */}
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={`http://localhost:8000/${product.image_url}`}
                      alt={product.product_name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {product.product_name}
                  </td>
                  <td className="p-4 text-gray-600">{product.brand}</td>
                  <td className="p-4 text-gray-600">${product.price}</td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 text-gray-600">{product.quantity}</td>
                  <td className="p-4 flex justify-center space-x-3">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductManagement;
