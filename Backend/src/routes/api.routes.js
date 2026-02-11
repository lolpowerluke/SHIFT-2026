import { Router } from "express";
import { exampleFunction } from "../controllers/user.controller.js";

const router = Router();

router.get("/", exampleFunction);

export default router;
