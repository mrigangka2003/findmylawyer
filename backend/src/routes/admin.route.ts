import { Router } from "express";

import { addLawyer,allLawyers,loginAdmin } from "../controllers";
import upload from "../middleware/multer";
import authAdmin from "../middleware/AuthAdmin";

const adminRouter = Router();

adminRouter.post('/add-lawyer',authAdmin,upload.single('image'),addLawyer);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/all-lawyers',authAdmin,allLawyers);


export default adminRouter;
