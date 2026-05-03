import { Request, Response } from 'express';
import { Availability } from '../models/availability.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getLawyerAvailability = async (req: Request, res: Response) => {
  const { lawyerId } = req.params;
  try {
    const availability = await Availability.find({ lawyerId: lawyerId as string });
    res.status(200).json({ availability });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateAvailability = async (req: AuthRequest, res: Response) => {
  const { availabilityData } = req.body; // Array of availability objects
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Clear old availability and insert new
    await Availability.deleteMany({ lawyerId: req.user.id });
    
    const newAvailability = availabilityData.map((item: any) => ({
      ...item,
      lawyerId: req.user?.id
    }));

    const created = await Availability.insertMany(newAvailability);
    
    res.status(200).json({ message: 'Availability updated', availability: created });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
