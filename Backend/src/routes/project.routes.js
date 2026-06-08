import { Router } from "express";
import multer from "multer";
import { getProject, getAllProjects, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const projectUpload = upload.fields([
  { name: "files" },
  { name: "magazine", maxCount: 1 },
]);

router.get("/", getAllProjects);
router.get("/:id", getProject);
router.post("/", authenticate, projectUpload, createProject);
router.put("/:id", authenticate, projectUpload, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;
