import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { LawyerProfile } from '../models/lawyer.model';
import User from '../models/user.model';

export const getAllLawyers = async (req: Request, res: Response) => {
  try {
    const lawyers = await LawyerProfile.find().populate('userId', 'name email');
    res.status(200).json({ lawyers });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getLawyerProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const profile = await LawyerProfile.findOne({ userId: req.user.id }).populate('userId', 'name email');
    if (!profile) {
      return res.status(404).json({ message: 'Lawyer profile not found' });
    }
    res.status(200).json({ message: 'Lawyer profile fetched', profile });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateLawyerProfile = async (req: AuthRequest, res: Response) => {
  const { specialization, description, experienceYears } = req.body;
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const profile = await LawyerProfile.findOneAndUpdate(
      { userId: req.user.id },
      { specialization, description, experienceYears },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.status(200).json({ message: 'Lawyer profile updated', profile });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
