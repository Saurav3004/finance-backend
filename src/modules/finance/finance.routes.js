import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { category, createFinanceRecord, deleteRecord, getRecords, recent, summary, trends, updateRecord } from "./finance.controller.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";
const router = Router();

router.use(authMiddleware);

router.get("/",getRecords);

router.post("/",roleMiddleware("admin"),createFinanceRecord);
router.patch("/:id",roleMiddleware("admin"),updateRecord);
router.delete("/:id",roleMiddleware("admin"),deleteRecord);


router.get("/summary", roleMiddleware("analyst", "admin"), summary);
router.get("/category", roleMiddleware("analyst", "admin"), category);
router.get("/trends", roleMiddleware("analyst", "admin"), trends);
router.get("/recent", roleMiddleware("analyst", "admin"), recent);

export default router;