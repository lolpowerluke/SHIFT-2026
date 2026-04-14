import { Router } from "express";
import { getProject, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";

const router = Router();

router.get("/", getProject);
router.post("/create", createProject);
router.post("/update", updateProject);
router.post("/delete", deleteProject);

export default router;
