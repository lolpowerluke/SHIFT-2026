import { Router } from "express";
import { getAllVotes, getProjects, getVotenFromToken, vote, token } from "../controllers/voting.controller.js"

const router = Router();

router.get("/", getAllVotes);
router.get("/projects", getProjects);
router.get("/me", getVotenFromToken);
router.get("/token", token);
router.post("/", vote);

export default router;
