import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getLawyerProfile = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({ message: 'Lawyer profile fetched', lawyer: req.user });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message || error });
  }
};

export const updateLawyerProfile = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({ message: 'Lawyer profile updated' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message || error });
  }
};
