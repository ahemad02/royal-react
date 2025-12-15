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
} from "../controllers/catalogueController.js";
import { uploadCatalogueFiles } from "../middleware/upload.js";

const router = express.Router();

// IMPORTANT ORDER
router.get("/", getCatalogues);
router.get("/:id", getCatalogueById);

router.get("/catalogue-sizes", getCatalogueSizes);
router.post("/catalogue-sizes", createCatalogueSize);

router.get("/catalogue-surfaces", getCatalogueSurfaces);
router.post("/catalogue-surfaces", createCatalogueSurface);

router.post("/", uploadCatalogueFiles, createCatalogue);
router.put("/:id", uploadCatalogueFiles, updateCatalogue);
router.delete("/:id", deleteCatalogue);

export default router;
