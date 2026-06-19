import express from "express";
import cors from "cors";
import env from "./utils/env.js";
import db from "./config/db.js";
import { keepAlive } from "./utils/keepAlive.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

import "./config/db.js";

import apiRoutes from "./routes/api.routes.js"
import authRoutes from "./routes/auth.routes.js";
// import mailRoutes from "./routes/mail.routes.js";
import projectRoutes from "./routes/project.routes.js";
import votingRoutes from "./routes/voting.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = env.frontend.url ? env.frontend.url.split(',').map(origin => origin.trim()) : [];

app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, "..", "openapi.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => res.redirect("/docs"));

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);
// app.use("/mail", mailRoutes);
app.use("/project", projectRoutes);
app.use("/voting", votingRoutes);

app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', message: 'Server and database are running' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: env.server.environment === 'development' ? err.message : undefined
  });
});

setInterval(keepAlive, 60000);

export default app;
