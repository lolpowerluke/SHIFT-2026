import express from "express";
import cors from "cors";
import env from "./utils/env.js";
import db from "./config/db.js";

import "./config/db.js";

import apiRoutes from "./routes/api.routes.js"
import authRoutes from "./routes/auth.routes.js";
import mailRoutes from "./routes/mail.routes.js";

const app = express();

const allowedOrigins = env.frontend.url ? env.frontend.url.split(',').map(origin => origin.trim()) : [];

app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);
app.use("/mail", mailRoutes)

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

export default app;
