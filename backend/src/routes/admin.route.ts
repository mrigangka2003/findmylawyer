import { Router } from "express";

import { addLawyer } from "../controllers";
import upload from "../middleware/multer";

const adminRouter = Router();

adminRouter.post('/add-lawyer',upload.single('image'),addLawyer);


export default adminRouter;
