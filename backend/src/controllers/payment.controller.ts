import { Request, Response } from 'express';
import crypto from 'crypto';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Payment } from '../models/payment.model';
import { Booking } from '../models/booking.model';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

// Dynamically import Razorpay only if credentials are present
let Razorpay: any = null;
if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Razorpay = require('razorpay');
    if (Razorpay.default) Razorpay = Razorpay.default; // handle esm interop
  } catch {
    // razorpay not installed, will use mock
  }
}

/** Create a Razorpay order (or mock order if credentials not set) */
export const createOrder = async (req: AuthRequest, res: Response) => {
  const { bookingId, amount } = req.body;

  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!bookingId || !amount) return res.status(400).json({ message: 'bookingId and amount are required' });

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (Razorpay && RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
      // Real Razorpay order
      const instance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
      const order = await instance.orders.create({
        amount: Math.round(amount * 100), // in paise
        currency: 'INR',
        receipt: `receipt_${bookingId}`,
        notes: { bookingId, userId: req.user.id },
      });
      return res.status(200).json({ order, key: RAZORPAY_KEY_ID });
    } else {
      // Mock order when Razorpay not configured
      const mockOrder = {
        id: `order_mock_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: `receipt_${bookingId}`,
      };
      return res.status(200).json({ order: mockOrder, key: 'mock', isMock: true });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create payment order', error: error.message });
  }
};

/** Verify payment signature and mark booking as paid */
export const verifyPayment = async (req: AuthRequest, res: Response) => {
  const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature, isMock, amount, paymentMethod } = req.body;

  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    let paymentStatus: 'completed' | 'failed' = 'completed';

    if (!isMock && RAZORPAY_KEY_SECRET) {
      // Verify real Razorpay signature
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        paymentStatus = 'failed';
        const failedPayment = await Payment.create({
          bookingId,
          userId: req.user.id,
          amount: amount || 0,
          paymentMethod: paymentMethod || 'razorpay',
          transactionId: razorpay_payment_id || `FAIL_${Date.now()}`,
          paymentStatus: 'failed',
        });
        return res.status(400).json({ message: 'Payment verification failed', payment: failedPayment });
      }
    }

    const transactionId = isMock
      ? `MOCK_TXN_${Date.now()}`
      : razorpay_payment_id;

    const payment = await Payment.create({
      bookingId,
      userId: req.user.id,
      amount: amount || 0,
      paymentMethod: paymentMethod || 'razorpay',
      transactionId,
      paymentStatus: 'completed',
    });

    // Update booking status to confirmed after payment
    await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed', paymentId: payment._id });

    res.status(200).json({ message: 'Payment verified and booking confirmed', payment });
  } catch (error: any) {
    res.status(500).json({ message: 'Payment verification error', error: error.message });
  }
};

/** Get payment details for a booking */
export const getPaymentByBooking = async (req: AuthRequest, res: Response) => {
  const { bookingId } = req.params;
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!bookingId) return res.status(400).json({ message: 'bookingId is required' });
    const payment = await Payment.findOne({ bookingId: bookingId as string });
    res.status(200).json({ payment });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/** Legacy mock payment (kept for backward compat) */
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
