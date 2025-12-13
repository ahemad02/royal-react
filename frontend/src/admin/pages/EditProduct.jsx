import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  const submitHandler = async (formData) => {
    await updateProduct(id, formData);
    navigate("/admin/products");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <ProductForm onSubmit={submitHandler} initialData={product} />
    </div>
  );
};

export default EditProduct;
