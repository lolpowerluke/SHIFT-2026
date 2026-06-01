import { Router } from "express";
import { getCountDown } from "../controllers/countdown.controller.js";

const router = Router();

router.get("/countDown", getCountDown);

export default router;
