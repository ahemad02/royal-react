import axios from "./axios";

export const getDashboardStats = () =>
  axios.get("/admin/dashboard/stats");

export const getLatestProducts = () =>
  axios.get("/admin/dashboard/latest-products");

export const getProductsByCategory = () =>
  axios.get("/admin/dashboard/products-by-category");

export const getProductsBySize = () =>
  axios.get("/admin/dashboard/products-by-size");

export const getProductsBySurface = () =>
  axios.get("/admin/dashboard/products-by-surface");
