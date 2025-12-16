import axios from "./axios";

export const getSurfaces = () => axios.get("/surfaces");
export const createSurface = (data) => axios.post("/surfaces", data);
export const updateSurface = (id, data) =>
  axios.put(`/surfaces/${id}`, data);
export const deleteSurface = (id) =>
  axios.delete(`/surfaces/${id}`);
