import { Request, Response } from 'express';

import { Payment } from '../models/payment.model';

export const processPayment = async (req: Request, res: Response) => {
  const { bookingId, userId, amount, paymentMethod } = req.body;

  try {
    if (!bookingId || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    const payment = await Payment.create({
      bookingId,
      userId,
      amount,
      paymentMethod,
      transactionId: `TXN_${Math.floor(Math.random() * 1000000)}`,
      paymentStatus: 'completed',
    });

    res.status(200).json({ message: 'Payment processed successfully', payment });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
