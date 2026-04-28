import { Request, Response } from 'express';

interface Booking {
  id: number;
  lawyerId: number;
  userId: number;
  date: string;
  timeSlot: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: Date;
}

// Mock booking data
let bookings: Booking[] = [];

export const createBooking = async (req: Request, res: Response) => {
  const { lawyerId, userId, date, timeSlot } = req.body;

  if (!lawyerId || !userId || !date || !timeSlot) {
    return res.status(400).json({ message: 'Missing required booking fields' });
  }

  const newBooking: Booking = {
    id: bookings.length + 1,
    lawyerId: parseInt(lawyerId),
    userId: parseInt(userId),
    date,
    timeSlot,
    status: 'pending',
    createdAt: new Date(),
  };

  bookings.push(newBooking);
  res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
};

export const getUserBookings = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userBookings = bookings.filter((b) => b.userId === parseInt(userId));
  res.status(200).json({ bookings: userBookings });
};

export const getLawyerBookings = async (req: Request, res: Response) => {
  const { lawyerId } = req.params;
  const lawyerBookings = bookings.filter((b) => b.lawyerId === parseInt(lawyerId));
  res.status(200).json({ bookings: lawyerBookings });
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  const bookingIndex = bookings.findIndex((b) => b.id === parseInt(bookingId));

  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  if (!['accepted', 'rejected', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  bookings[bookingIndex].status = status as any;
  res.status(200).json({ message: `Booking status updated to ${status}`, booking: bookings[bookingIndex] });
};

export const getAllBookings = async (req: Request, res: Response) => {
  res.status(200).json({ bookings });
};
