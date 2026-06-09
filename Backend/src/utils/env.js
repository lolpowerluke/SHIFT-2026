import "dotenv/config";

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
}

function requireEnvList(key) {
  const value = requireEnv(key);
  return value.split(",").map((v) => v.trim());
}

const cloudinaryNames = requireEnvList("CLOUDINARY_CLOUD_NAME");
const cloudinaryKeys = requireEnvList("CLOUDINARY_API_KEY");
const cloudinarySecrets = requireEnvList("CLOUDINARY_API_SECRET");

if (!(cloudinaryNames.length === cloudinaryKeys.length && cloudinaryKeys.length === cloudinarySecrets.length)) {
  console.error("CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET must have the same number of comma-separated values");
  process.exit(1);
}

const env = {
  server: {
    port: requireEnv("PORT"),
    environment: requireEnv("NODE_ENV"),
    url: requireEnv("BASE_URL"),
  },
  frontend: {
    url: requireEnv("FRONTEND_URL"),
  },
  database: {
    host: requireEnv("DB_HOST"),
    user: requireEnv("DB_USER"),
    password: requireEnv("DB_PASS"),
    name: requireEnv("DB_NAME"),
  },
  mail: {
    mail: requireEnv("COMBELL_MAIL"),
    pass: requireEnv("COMBELL_PASS"),
  },
  jwt: {
    secret: requireEnv("JWT_SECRET"),
    expiresIn: requireEnv("JWT_EXPIRES_IN"),
  },
  cloudinary: cloudinaryNames.map((name, i) => ({
    name,
    key: cloudinaryKeys[i],
    secret: cloudinarySecrets[i],
  })),
};

export default env;
