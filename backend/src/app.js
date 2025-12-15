import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit'
import contactRoutes from "./routes/contactRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sizesRoutes from "./routes/sizeRoutes.js";
import surfaceRoutes from "./routes/surfaceRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import adminRoutes from "./routes/adminAuthRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import catalogueRoutes from "./routes/catalogueRoutes.js";

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
app.use("/api/products",productRoutes);
app.use("/api/sizes",sizesRoutes);
app.use("/api/surfaces",surfaceRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/catalogue",catalogueRoutes);
app.use("/api/admin/dashboard",adminDashboardRoutes);


export default app;
