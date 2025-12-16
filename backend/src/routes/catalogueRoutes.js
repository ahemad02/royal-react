import express from "express";
import {
  createCatalogue,
  getCatalogues,
  getCatalogueById,
  updateCatalogue,
  deleteCatalogue,
  getCatalogueSizes,
  createCatalogueSize,
  getCatalogueSurfaces,
  createCatalogueSurface,
  updateCatalogueSize,
  deleteCatalogueSize,
  updateCatalogueSurface,
  deleteCatalogueSurface,
} from "../controllers/catalogueController.js";
import { uploadCatalogueFiles } from "../middleware/upload.js";

const router = express.Router();

// META ROUTES FIRST
router.get("/catalogue-sizes", getCatalogueSizes);
router.post("/catalogue-sizes", createCatalogueSize);
router.put("/catalogue-sizes/:id", updateCatalogueSize);
router.delete("/catalogue-sizes/:id", deleteCatalogueSize);

router.get("/catalogue-surfaces", getCatalogueSurfaces);
router.post("/catalogue-surfaces", createCatalogueSurface);
router.put("/catalogue-surfaces/:id", updateCatalogueSurface);
router.delete("/catalogue-surfaces/:id", deleteCatalogueSurface);

// MAIN CATALOGUE ROUTES
router.get("/", getCatalogues);
router.post("/", uploadCatalogueFiles, createCatalogue);
router.get("/:id", getCatalogueById);
router.put("/:id", uploadCatalogueFiles, updateCatalogue);
router.delete("/:id", deleteCatalogue);


export default router;
