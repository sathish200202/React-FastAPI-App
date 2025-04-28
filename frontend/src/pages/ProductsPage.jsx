import React, { useEffect } from "react";
import { ShoppingCart, BadgeIndianRupee } from "lucide-react";

import ProductNav from "../components/ProductNav";
import { useProductStore } from "../stores/useProductStore";
import Loading from "../components/Loading"; // Assuming you have a Loading component

const ProductsPage = () => {
  const { products, get_all_products, loading, error } = useProductStore();

  useEffect(() => {
    get_all_products();
  }, [get_all_products]);

  return (
    <div>
      {loading ? (
        <Loading name="Products" />
      ) : (
        <>
          <ProductNav />
          <div className="p-3">
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-md flex flex-col justify-between"
                  >
                    <div className="w-full h-40 overflow-hidden rounded-lg mb-4 bg-white flex items-center justify-center">
                      <img
                        src={`http://localhost:8000/${product.image_url}`}
                        alt={product.product_name}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      {product.product_name}
                    </h2>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="text-xl font-bold mb-4">₹{product.price}</p>

                    {/* Button group */}
                    <div className="flex justify-between">
                      <button className="bg-white text-blue-700 border border-blue-700 py-2 px-4 rounded-lg hover:text-white hover:bg-blue-700 transition w-[48%] flex items-center justify-center gap-2">
                        <ShoppingCart size={18} /> Add to Cart
                      </button>

                      <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition w-[48%] flex items-center justify-center gap-2">
                        <BadgeIndianRupee size={18} /> Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-4">No products available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
