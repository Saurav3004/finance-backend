import userRoute from "../modules/user/user.route.js"
import authRoute from "../modules/auth/auth.routes.js"
import financeRoute from "../modules/finance/finance.routes.js"
import { Router } from "express";
const router = Router()

router.use("/auth",authRoute);
router.use("/users",userRoute);
router.use("/finance",financeRoute);

export default router