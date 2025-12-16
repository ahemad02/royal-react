import axios from "./axios";

// SIZES
export const getCatalogueSizes = () =>
  axios.get("/catalogue/catalogue-sizes");

export const createCatalogueSize = (data) =>
  axios.post("/catalogue/catalogue-sizes", data);

// SURFACES
export const getCatalogueSurfaces = () =>
  axios.get("/catalogue/catalogue-surfaces");

export const createCatalogueSurface = (data) =>
  axios.post("/catalogue/catalogue-surfaces", data);


/* SIZES */
export const updateCatalogueSize = (id, data) =>
  axios.put(`/catalogue/catalogue-sizes/${id}`, data);

export const deleteCatalogueSize = (id) =>
  axios.delete(`/catalogue/catalogue-sizes/${id}`);

/* SURFACES */
export const updateCatalogueSurface = (id, data) =>
  axios.put(`/catalogue/catalogue-surfaces/${id}`, data);

export const deleteCatalogueSurface = (id) =>
  axios.delete(`/catalogue/catalogue-surfaces/${id}`);

