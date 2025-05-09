import React, { useEffect } from "react";
import ProductCreateForm from "../components/ProductCreateForm";
import { useProductStore } from "../stores/useProductStore";

const ProductCreatePage = () => {
  const { create_product } = useProductStore();
 

  return (
    <div className="min-h-screen bg-gray-100 py-0 px-4">
      <ProductCreateForm create_product={create_product}/>
    </div>
  );
};

export default ProductCreatePage;
