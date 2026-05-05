import { Router } from "express";
import { exampleFunction } from "../controllers/user.controller.js";
import { getCountDown } from "../controllers/countdown.controller.js";

const router = Router();

router.get("/", exampleFunction);
router.get("/countDown", getCountDown);

export default router;
