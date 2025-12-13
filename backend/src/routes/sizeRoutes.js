import express from "express";
import { createSize,getSizes,updateSize,deleteSize   } from "../controllers/sizeController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectAdmin, createSize);
router.get("/", getSizes);
router.put("/:id", protectAdmin, updateSize);
router.delete("/:id", protectAdmin, deleteSize);

export default router;