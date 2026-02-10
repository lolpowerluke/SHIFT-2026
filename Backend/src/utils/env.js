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
    baseUrl: requireEnv("BASE_URL")
  },
  frontend: {
    url: requireEnv("FRONTEND_URL")
  },
  // session: {
  //   secret: requireEnv("SESSION_SECRET")
  // },
  database: {
    host: requireEnv("DB_HOST"),
    user: requireEnv("DB_USER"),
    password: requireEnv("DB_PASS"),
    name: requireEnv("DB_NAME")
  }
};

export default env;
