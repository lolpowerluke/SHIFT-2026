import { v2 as cloudinary } from "cloudinary";
import env from "./env.js";

let rrIndex = 0;

function getAccount() {
  const account = env.cloudinary[rrIndex % env.cloudinary.length];
  rrIndex = (rrIndex + 1) % env.cloudinary.length;
  return account;
}

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer (from multer memoryStorage)
 * @param {object} [options] - Optional Cloudinary upload options
 * @returns {Promise<{ cloudName: string, path: string }>}
 *   path = everything after "upload/" in the URL (e.g. "v1780607706/ssmqmzxy4e7ldmiydmgx.png")
 */
export const uploadFile = (buffer, options = {}) => {
  const account = getAccount();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        ...options,
        cloud_name: account.name,
        api_key: account.key,
        api_secret: account.secret,
      },
      (error, result) => {
        if (error) return reject(error);
        const uploadIdx = result.secure_url.indexOf("/upload/");
        const path = result.secure_url.slice(uploadIdx + "/upload/".length);
        resolve({ cloudName: account.name, path });
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
    env.cloudinary.map((account) =>
      cloudinary.uploader.destroy(publicId, {
        cloud_name: account.name,
        api_key: account.key,
        api_secret: account.secret,
      })
    )
  );
  const ok = results.find((r) => r.status === "fulfilled" && r.value?.result === "ok");
  return ok ? ok.value : results.at(-1).value ?? results.at(-1).reason;
};
