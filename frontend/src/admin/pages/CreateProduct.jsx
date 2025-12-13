import React from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();

  const submitHandler = async (formData) => {
    await createProduct(formData);
    navigate("/admin/products");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-black!">Add Product</h2>
      <ProductForm onSubmit={submitHandler} />
    </div>
  );
};

export default AddProduct;
