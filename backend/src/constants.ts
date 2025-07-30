import { config as configDotenv } from "dotenv";

configDotenv();

const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI as string

const DB_NAME :string = "findmylawyer";

const ClOUDINARY_NAME = process.env.CLOUDINARY_NAME as string;
const ClOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
const ClOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY as string;


export {
    PORT,
    DB_NAME,
    MONGODB_URI,
    ClOUDINARY_NAME,
    ClOUDINARY_API_KEY,
    ClOUDINARY_SECRET_KEY
}