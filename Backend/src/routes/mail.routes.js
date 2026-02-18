import { Router } from "express";
import { mailCancel, mailConfirm, mailSignUp } from "../controllers/mail.controller.js";

const router = Router();

router.post("/signup", mailSignUp);
router.post("/cancel", mailCancel);
router.post("/confirm", mailConfirm);

export default router;
