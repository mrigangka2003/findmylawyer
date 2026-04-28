import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../constants';

// Mock user database
const users: any[] = [
  { id: 1, email: 'admin@example.com', password: '$2a$10$YourHashedPasswordHere', role: 'admin' }, // password: password123 (hashed)
  { id: 2, email: 'lawyer@example.com', password: '$2a$10$YourHashedPasswordHere', role: 'lawyer' },
  { id: 3, email: 'user@example.com', password: '$2a$10$YourHashedPasswordHere', role: 'user' },
];

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // In a real app, you'd find the user in the database and verify the hashed password
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Simplified for mock: just comparing strings or a dummy hash
  // In reality: const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = password === 'password123'; 

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token, role: user.role });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, email, password: hashedPassword, role };
  
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};
