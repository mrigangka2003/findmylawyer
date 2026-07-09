import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { LawyerProfile } from '../models/lawyer.model';
import User from '../models/user.model';

export const getAllLawyers = async (req: Request, res: Response) => {
  try {
    const lawyerProfiles = await LawyerProfile.find().populate('userId', 'name email');

    const lawyers = lawyerProfiles.map(profile => {
      const user = profile.userId as any;
      return {
        ...profile.toObject(),
        name: user?.name || 'Unknown',
        email: user?.email || '',
        userId: user?._id,
      };
    });

    res.status(200).json({ lawyers });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getLawyerById = async (req: Request, res: Response) => {
  const { lawyerId } = req.params;
  try {
    if (!lawyerId) return res.status(400).json({ message: 'lawyerId required' });
    const profile = await LawyerProfile.findOne({ userId: lawyerId as string }).populate('userId', 'name email');
    if (!profile) {
      // Try by profile _id
      const profileById = await LawyerProfile.findById(lawyerId).populate('userId', 'name email');
      if (!profileById) return res.status(404).json({ message: 'Lawyer not found' });
      const user = profileById.userId as any;
      return res.status(200).json({
        lawyer: { ...profileById.toObject(), name: user?.name, email: user?.email }
      });
    }
    const user = profile.userId as any;
    return res.status(200).json({
      lawyer: { ...profile.toObject(), name: user?.name, email: user?.email }
    });
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
    const user = profile.userId as any;
    res.status(200).json({
      message: 'Lawyer profile fetched',
      profile: { ...profile.toObject(), name: user?.name, email: user?.email }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateLawyerProfile = async (req: AuthRequest, res: Response) => {
  const { specialization, speciality, description, experienceYears, experience, degree, fees, image, address } = req.body;
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updateData: Record<string, any> = {};
    if (specialization !== undefined) updateData.specialization = specialization;
    if (speciality !== undefined) updateData.speciality = speciality;
    if (description !== undefined) updateData.description = description;
    if (experienceYears !== undefined) updateData.experienceYears = experienceYears;
    if (experience !== undefined) updateData.experience = experience;
    if (degree !== undefined) updateData.degree = degree;
    if (fees !== undefined) updateData.fees = fees;
    if (image !== undefined) updateData.image = image;
    if (address !== undefined) updateData.address = address;

    const profile = await LawyerProfile.findOneAndUpdate(
      { userId: req.user.id },
      updateData,
      { new: true, upsert: true, runValidators: true }
    ).populate('userId', 'name email');

    const user = profile?.userId as any;
    res.status(200).json({
      message: 'Lawyer profile updated',
      profile: { ...profile?.toObject(), name: user?.name, email: user?.email }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
