import express, { Request, Response } from "express";
import cors from "cors";

import { PORT } from "./constants";
import router from "./routes";
import connectDb from "./config/db";
import connectCloudinary from "./config/cloudinary";

const app = express();

//connect cloudinary
connectCloudinary();

app.use(express.json());
app.use(cors());

//api endpoints 
app.use('/api/v1',router);

app.get("/", (req: Request, res: Response) => {
  res.send("everything working");
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server is running at port : http://localhost:8000`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed");
  });
