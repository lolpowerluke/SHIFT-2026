import express from "express";
import cors from "cors";
import env from "./utils/env.js"

import "./config/db.js";

const app = express();

app.use(cors({
  origin: env.frontend.url,
}))
app.use(express.json());

export default app;
