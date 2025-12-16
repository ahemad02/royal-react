import axios from "./axios";

export const getSizes = () => axios.get("/sizes");
export const createSize = (data) => axios.post("/sizes", data);
export const updateSize = (id, data) => axios.put(`/sizes/${id}`, data);
export const deleteSize = (id) => axios.delete(`/sizes/${id}`);
