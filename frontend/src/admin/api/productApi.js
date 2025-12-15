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


export const getRelatedProducts = (categoryId, excludeId, limit = 4) => {
  return axios.get(
    `/products/related?category=${categoryId}&exclude=${excludeId}&limit=${limit}`
  );
};
