// middleware/upload.js
import multer from "multer";

const storage = multer.memoryStorage(); // buffer instead of saving file

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
