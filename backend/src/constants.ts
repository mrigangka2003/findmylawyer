import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const DB_NAME = 'findmylawyer';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ;