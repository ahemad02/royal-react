import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  getDashboardStats,
  getLatestProducts,
  productsByCategory,
  productsBySize,
  productsBySurface,
} from "../controllers/adminDashboardController.js";

const router = express.Router();

router.get("/stats", protectAdmin, getDashboardStats);
router.get("/latest-products", protectAdmin, getLatestProducts);
router.get("/products-by-category", protectAdmin, productsByCategory);
router.get("/products-by-size", protectAdmin, productsBySize);
router.get("/products-by-surface", protectAdmin, productsBySurface);

export default router;
