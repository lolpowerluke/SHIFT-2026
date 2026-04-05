import "dotenv/config";

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const env = {
  server: {
    port: requireEnv("PORT"),
    environment: requireEnv("NODE_ENV")
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
  }
};

export default env;
