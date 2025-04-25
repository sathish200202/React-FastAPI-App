import React, { useEffect } from "react";
import ProductCreateForm from "../components/ProductCreateForm";

const ProductCreatePage = () => {
  useEffect(() => {
    console.log("Loaded ProductCreatePage");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-0 px-4">
      <ProductCreateForm />
    </div>
  );
};

export default ProductCreatePage;
