import { Router } from "express";
import multer from "multer";
import { getProject, getProjectCount, getAllProjects, createProject, updateProject, deleteProject, getAllMediaByType, getRandomProjects, getAllProjectsAdmin } from "../controllers/project.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const projectUpload = upload.fields([
  { name: "files" },
  { name: "magazine", maxCount: 1 },
]);

router.get("/", getAllProjects);
router.get("/admin", getAllProjectsAdmin);
router.get("/random/:count", getRandomProjects);
router.get("/count", getProjectCount);
router.get("/media/:type", getAllMediaByType);
router.get("/:id", getProject);
router.post("/", authenticate, projectUpload, createProject);
router.put("/:id", authenticate, projectUpload, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;
