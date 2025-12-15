// middleware/upload.js
import multer from "multer";

const storage = multer.memoryStorage(); // buffer instead of saving file

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 5MB
});

export const uploadCatalogueFiles = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
}).fields([
  { name: "featureImage", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 },
]);

export default upload;
