import React, { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import Loading from "../components/Loading";
import { userCartStore } from "../stores/usecartStore";
const HomePage = () => {
  // const [products, setProducts] = useState([]);
  const { products, get_all_products, loading } = useProductStore();
  const { cart, updateCart, addToCart } = userCartStore();

  useEffect(() => {
    get_all_products();
    // const get_all_products = async () => {
    //   try {
    //     const res = await axiosInstance.get("/products");
    //     setProducts(res.data);
    //   } catch (error) {
    //     console.error("Failed to fetch products", error);
    //   }
    // };

    // get_all_products();
  }, [get_all_products]);

  const handleAddToCart = (product_id, quantity) => async () => {
    const existingProduct = cart.find((item) => item.product_id === product_id);
    console.log("Existing product:", existingProduct);
    try {
      if (existingProduct) {
        // If product exists, update the quantity
        updateCart(existingProduct.id, existingProduct.quantity + 1);
      } else {
        // Otherwise, add the product to the cart
        await addToCart(product_id, quantity);
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading name={"Home Page"} />
      ) : (
        <div className="container mx-auto mt-8 px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Products</h1>

          {products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-2 flex flex-col"
                >
                  <img
                    src={`http://localhost:8000/${product.image_url}`}
                    alt={product.product_name}
                    className="w-full h-44 object-cover rounded-xl"
                  />
                  <div className="mt-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold">
                      {product.product_name}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1 flex-grow">
                      {product.category}
                    </p>
                    <p className="text-lg font-bold mt-2 text-blue-600">
                      ₹ {product.price}
                    </p>
                    <button
                      onClick={handleAddToCart(product.id, 1)}
                      className="mt-3 bg-white text-blue-600 py-2 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20 text-lg">
              No products available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
