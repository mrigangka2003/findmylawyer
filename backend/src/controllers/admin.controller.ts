import { Response } from 'express';
import mongoose from 'mongoose';

import { AuthRequest } from '../middlewares/auth.middleware';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { LawyerProfile } from '../models/lawyer.model';
import { Booking } from '../models/booking.model';



type Params = {
  id: string;
};


export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find({role:"user"}).select('-password');
    res.status(200).json({ users });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getAllLawyers=async (req:AuthRequest,res:Response)=>{
  try {
    const lawyers = await User.find({role:"lawyer"}).select('-password');
    res.status(200).json({ lawyers });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

//getLawyerid
export const getLawyerbyid = async (
  req: AuthRequest & { params: Params },
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lawyer ID",
      });
    }

    const lawyer = await User.findById(id)
      .select("-password")
      .lean();

    if (!lawyer) {
      return res.status(404).json({
        success: false,
        message: "Lawyer not found",
      });
    }
    const lawyerProfile = await LawyerProfile.findOne({ userId: id });
    if (!lawyerProfile) {
      return res.status(404).json({
        success: false,
        message: "Lawyer profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {...lawyer, ...lawyerProfile},
    });
  } catch (error: any) {
    console.error("Get Lawyer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//add lawyer
export const addLawyer = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, description, specialization, experienceYears } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      role: "lawyer"
    });

    await LawyerProfile.create({
      userId: user._id,
      specialization: specialization,
      description: description,
      experienceYears: experienceYears,
      rating: 0
    });

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error: any) {
    res.status(500).json({message:'Internal server error',error:error.message});
  }
}

export const allBookings = async (req:AuthRequest,res:Response)=>{
  try{
    const bookings = await Booking.find().populate('userId lawyerId', 'name email');
    return res.status(200).json({bookings});
  }catch(error:any){
    console.log(error,"error");
    return res.status(500).json({message:'Internal server error',error:error.message});
  }
}

//getting details of a particular booking
export const getBookingDetails = async(req:AuthRequest,res:Response)=>{
  try{
    const {id} = req.params;
    const booking = await Booking.findById(id).populate('userId lawyerId', 'name email');
    if(!booking){
      return res.status(404).json({message:'Booking not found'});
    }
    return res.status(200).json({booking});
  }catch(error:any){
    return res.status(500).json({message:'Internal server error',error:error.message});
  }
}


export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};