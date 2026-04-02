import { Router } from "express";
import { signin, signup, signupAsAdmin } from "./auth.controller.js";

const router = Router();

router.post("/admin",signupAsAdmin)
router.post("/signup",signup);
router.post("/signin",signin);

export default router;