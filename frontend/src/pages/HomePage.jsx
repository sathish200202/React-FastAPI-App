import React, { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import Loading from "../components/Loading";
const HomePage = () => {
  // const [products, setProducts] = useState([]);
  const { products, get_all_products, loading } = useProductStore();
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
                <div>
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
                      <button className="mt-3 bg-white text-blue-600 py-2 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                        Add to Cart
                      </button>
                    </div>
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
