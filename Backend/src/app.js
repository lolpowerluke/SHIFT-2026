import express from "express";
import cors from "cors";
import env from "./utils/env.js"

import "./config/db.js";

import apiRoutes from "./routes/api.routes.js"

const app = express();

app.use(cors({
  origin: env.frontend.url,
}))
app.use(express.json());

app.use("/api", apiRoutes);

export default app;
