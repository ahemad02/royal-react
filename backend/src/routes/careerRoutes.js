import express from "express";
import { sendCareerMail } from "../controllers/careerController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/", upload.single("cv"), sendCareerMail);

export default router;
