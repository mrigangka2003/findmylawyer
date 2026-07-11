import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

import { Booking } from '../models/booking.model';

export const createBooking = async (req: Request, res: Response) => {
  const { lawyerId, userId, date, timeSlot } = req.body;

  try {
    if (!lawyerId || !userId || !date || !timeSlot) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    const newBooking = await Booking.create({
      lawyerId,
      userId,
      date,
      timeSlot,
      status: 'pending',
    });

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    
    const userBookings = await Booking.find({ userId: req.user.id }).populate('lawyerId', 'name email');
    res.status(200).json({ bookings: userBookings });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getLawyerBookings = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const lawyerBookings = await Booking.find({ lawyerId: req.user.id }).populate('userId', 'name email');
    res.status(200).json({ bookings: lawyerBookings });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    if (!['accepted', 'confirmed', 'rejected', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId as string,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: `Booking status updated to ${status}`, booking });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate('userId lawyerId', 'name email');
    res.status(200).json({ bookings });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
