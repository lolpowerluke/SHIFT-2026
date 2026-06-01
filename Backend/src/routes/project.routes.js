import { Router } from "express";
import { getProject, getAllProjects, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProject);
router.post("/", authenticate, createProject);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;
