import axios from "./axios";

/* CRUD */
export const getProducts = (params) =>
  axios.get("/products", { params });

export const getProductById = (id) =>
  axios.get(`/products/${id}`);

export const createProduct = (data) =>
  axios.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (id, data) =>
  axios.put(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = (id) =>
  axios.delete(`/products/${id}`);
