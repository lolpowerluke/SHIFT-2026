import { Router } from "express";
import { getProject, getAllProjects, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProject);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
