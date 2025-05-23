import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";
import Loading from "../components/Loading";
import ProductNav from "../components/ProductNav";
import { userCartStore } from "../stores/usecartStore";

const ProductsPage = () => {
  const { category } = useParams();
  const {
    products,
    products_by_category,
    get_all_products,
    get_product_by_category,
    loading,
  } = useProductStore();
  const { user } = useUserStore();
  const { cart, updateCart, addToCart, getCart } = userCartStore();

  const navigate = useNavigate();
  useEffect(() => {
    // if (user) {
    //   getCart();
    // }
    if (!category || category === "All") {
      get_all_products();
    } else {
      get_product_by_category(category);
    }
  }, [category, user]);

  const handleAddToCart = async (product_id, quantity) => {
    const existingProduct = cart.find((item) => item.product_id === product_id);
    try {
      if (existingProduct) {
        updateCart(existingProduct.id, existingProduct.quantity + 1);
      } else {
        await addToCart(product_id, quantity);
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const displayProducts =
    category && category !== "All" ? products_by_category : products;

  const handleBuyNow = (product) => {
    navigate("/order/checkout", { state: { product } });
  };

  return (
    <div>
      {loading ? (
        <Loading name="Products" />
      ) : (
        <>
          <ProductNav />
          <div className="p-3">
            {displayProducts && displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {displayProducts.map((product) => (
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

                    <div className="flex justify-between">
                      <button
                        onClick={() => handleAddToCart(product.id, 1)}
                        className="bg-white text-blue-700 border border-blue-700 py-2 px-4 rounded-lg hover:text-white hover:bg-blue-700 transition w-[48%] flex items-center justify-center gap-2"
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition w-[48%] flex items-center justify-center gap-2"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-4">
                No products available in{" "}
                <span className="font-semibold">{category}</span> category.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
