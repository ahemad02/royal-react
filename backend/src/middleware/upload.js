import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export const uploadCatalogueFiles = upload.fields([
  { name: "featureImage", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 },
]);

export default upload;
