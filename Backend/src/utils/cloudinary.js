import { v2 as cloudinary } from "cloudinary";
import env from "./env.js";

cloudinary.config({
  cloud_name: env.cloudinary.name,
  api_key: env.cloudinary.key,
  api_secret: env.cloudinary.secret,
});

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer (from multer memoryStorage)
 * @param {object} [options] - Optional Cloudinary upload options
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadFile = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", ...options },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

/**
 * Delete a file from Cloudinary by public ID.
 * @param {string} publicId
 */
export const deleteFile = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};
