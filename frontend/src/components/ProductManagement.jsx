import React from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";

const ProductManagement = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-10">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Product Management
      </h1>

      {/* Add Product */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add Product
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Price"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Category"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Image URL"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <div className="col-span-full">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Update/Delete Product */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Manage Existing Products
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Example Product</td>
                <td className="p-3">$99.99</td>
                <td className="p-3">Gadgets</td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
              {/* You can map product data here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
