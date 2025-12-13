import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};
