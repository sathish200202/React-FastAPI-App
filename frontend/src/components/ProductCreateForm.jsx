import React, { useState } from "react";

const ProductCreateForm = ({ create_product }) => {
  const [product, setProduct] = useState({
    product_name: "",
    brand: "",
    price: 0,
    discount: 0,
    category: "",
    quantity: 0,
    description: "",
    image_url: null,
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      console.log("Product data:", product);
      // Assuming create_product sends a POST request with product data as JSON
      create_product(product);

      // Reset the form if the product is created successfully
      setProduct({
        product_name: "",
        brand: "",
        price: 0,
        discount: 0,
        category: "",
        quantity: 0,
        description: "",
        image_url: null,
      });
    } catch (error) {
      console.error("Error while creating product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Product
        </h2>

        <form className="space-y-6" onSubmit={handleAddProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={product.product_name}
                onChange={(e) =>
                  setProduct({ ...product, product_name: e.target.value })
                }
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-gray-700 font-medium">Brand</label>
              <input
                type="text"
                value={product.brand}
                onChange={(e) =>
                  setProduct({ ...product, brand: e.target.value })
                }
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: parseFloat(e.target.value) })
                }
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-gray-700 font-medium">
                Discount
              </label>
              <input
                type="number"
                value={product.discount}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    discount: parseFloat(e.target.value),
                  })
                }
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 font-medium">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: parseInt(e.target.value) })
                }
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              rows="4"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProduct({ ...product, image_url: e.target.files[0] })
              }
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-100 file:text-blue-700
              hover:file:bg-blue-200"
              required
            />
          </div>

          {/* Submit */}
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
