import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit'
import contactRoutes from "./routes/contactRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";

const app = express();

// middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

// rate limiter
app.use(
  "/api/contact",
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: { error: "Too many requests. Try again later." },
  })
);

// routes
app.use("/api/contact", contactRoutes);
app.use("/api/career", careerRoutes);

export default app;
