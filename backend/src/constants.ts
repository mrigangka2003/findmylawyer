import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
