import axios from "./axios";

export const getSizes = () => axios.get("/sizes");
export const getSurfaces = () => axios.get("/surfaces");
export const getCategories = () => axios.get("/categories");
