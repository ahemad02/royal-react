import express from "express";
import { createCategory,getCategories,updateCategory,deleteCategory } from "../controllers/categoryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectAdmin, createCategory);
router.get("/", getCategories);
router.put("/:id", protectAdmin, updateCategory);
router.delete("/:id", protectAdmin, deleteCategory);

export default router;