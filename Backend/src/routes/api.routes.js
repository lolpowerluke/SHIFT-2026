import { Router } from "express";
import { getCountDown } from "../controllers/countdown.controller.js";
import { getUser, updateUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/countDown", getCountDown);
router.get("/user", authenticate, getUser);
router.put("/user", authenticate, updateUser);

export default router;
