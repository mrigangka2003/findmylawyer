import { Request, Response } from 'express';

export const processPayment = async (req: Request, res: Response) => {
  const { bookingId, amount, paymentMethod } = req.body;

  if (!bookingId || !amount || !paymentMethod) {
    return res.status(400).json({ message: 'Missing payment details' });
  }

  // Mock payment processing
  const paymentResponse = {
    transactionId: `TXN_${Math.floor(Math.random() * 1000000)}`,
    status: 'success',
    amount,
    bookingId,
    timestamp: new Date(),
  };

  res.status(200).json({ message: 'Payment processed successfully', payment: paymentResponse });
};
