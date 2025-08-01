import { Router } from "express";
import adminRouter from "./admin.route";

const router = Router();

router.use('/admin',adminRouter);

export default router ;