import express from "express";
import { createSurface,getSurfaces,updateSurface,deleteSurface } from "../controllers/surfaceController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectAdmin, createSurface);
router.get("/", getSurfaces);
router.put("/:id", protectAdmin, updateSurface);
router.delete("/:id", protectAdmin, deleteSurface);

export default router;