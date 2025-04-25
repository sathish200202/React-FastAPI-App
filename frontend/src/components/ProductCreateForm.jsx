import React from "react";

const ProductCreateForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Product
        </h2>

        <form className="space-y-6">
          {/* Product Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="productName"
                className="block text-gray-700 font-medium"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="productName"
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="brand"
                className="block text-gray-700 font-medium"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium"
              >
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="discount"
                className="block text-gray-700 font-medium"
              >
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="category"
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-gray-700 font-medium"
              >
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="image"
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-100 file:text-blue-700
                hover:file:bg-blue-200"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreateForm;
