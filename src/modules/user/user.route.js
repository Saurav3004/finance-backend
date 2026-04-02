import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";
import { getUsers, updateRole, updateStatus } from "./user.controller.js";
const router = Router();

router.use(authMiddleware,roleMiddleware("admin"));

router.get("/",getUsers);
router.patch("/:id/role",updateRole);
router.patch("/:id/status",updateStatus);

export default router;