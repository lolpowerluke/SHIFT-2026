import { Router } from "express";
import { exampleFunction } from "../controllers/example.controller.js";

const router = Router();

router.get("/", exampleFunction);

export default router;
