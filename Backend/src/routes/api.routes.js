import { Router } from "express";
import multer from "multer";
import { getCountDown } from "../controllers/countdown.controller.js";
import { getUser, updateUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/countDown", getCountDown);
router.get("/user", authenticate, getUser);
router.put("/user", authenticate, upload.single("image"), updateUser);

export default router;
