import "dotenv/config";

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
}

const env = {
  server: {
    port: requireEnv("PORT"),
    environment: requireEnv("NODE_ENV"),
    url: requireEnv("BASE_URL")
  },
  frontend: {
    url: requireEnv("FRONTEND_URL")
  },
  database: {
    host: requireEnv("DB_HOST"),
    user: requireEnv("DB_USER"),
    password: requireEnv("DB_PASS"),
    name: requireEnv("DB_NAME")
  },
  mail: {
    mail: requireEnv("COMBELL_MAIL"),
    pass: requireEnv("COMBELL_PASS")
  },
  jwt: {
    secret: requireEnv("JWT_SECRET"),
    expiresIn: requireEnv("JWT_EXPIRES_IN")
  },
  cloudinary: {
    name: requireEnv("CLOUDINARY_CLOUD_NAME"),
    key: requireEnv("CLOUDINARY_API_KEY"),
    secret: requireEnv("CLOUDINARY_API_SECRET"),
  }
};

export default env;
