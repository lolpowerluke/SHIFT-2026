import { Router } from "express";
import { getAllVotes, vote, token } from "../controllers/voting.controller.js"
import { getVotenFromToken } from "../controllers/voting.controller.js";

const router = Router();

router.get("/", getAllVotes);
router.get("/me", getVotenFromToken);
router.get("/token", token);
router.post("/", vote);

export default router;
