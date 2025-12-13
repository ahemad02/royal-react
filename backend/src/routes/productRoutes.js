import express from "express";
import upload from "../middleware/upload.js"; 
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
  "/",
  protectAdmin,
  upload.fields([
    { name: "featureImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createProduct
);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put(
  "/:id",
  protectAdmin,
  upload.fields([
    { name: "featureImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProduct
);

router.delete("/:id", protectAdmin, deleteProduct);



export default router;
