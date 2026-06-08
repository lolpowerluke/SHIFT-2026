import { v2 as cloudinary } from "cloudinary";
import env from "./env.js";

// One configured cloudinary instance per account
const instances = env.cloudinary.map((account) => {
  const instance = cloudinary.clone ? cloudinary.clone() : Object.create(cloudinary);
  instance.config({
    cloud_name: account.name,
    api_key: account.key,
    api_secret: account.secret,
  });
  return instance;
});

let rrIndex = 0;

/**
 * Returns the next cloudinary instance via round-robin.
 */
function getInstance() {
  const instance = instances[rrIndex % instances.length];
  rrIndex = (rrIndex + 1) % instances.length;
  return instance;
}

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer (from multer memoryStorage)
 * @param {object} [options] - Optional Cloudinary upload options
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadFile = (buffer, options = {}) => {
  const instance = getInstance();
  return new Promise((resolve, reject) => {
    const stream = instance.uploader.upload_stream(
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
 * Tries all accounts — the file exists on exactly one of them.
 * @param {string} publicId
 */
export const deleteFile = async (publicId) => {
  const results = await Promise.allSettled(
    instances.map((instance) => instance.uploader.destroy(publicId))
  );
  // Return the first successful result, or the last result if all fail
  const ok = results.find((r) => r.status === "fulfilled" && r.value?.result === "ok");
  return ok ? ok.value : results.at(-1).value ?? results.at(-1).reason;
};
