import { Router } from 'express';
import { createOrder, verifyPayment, getPaymentByBooking, processPayment } from '../controllers/payment.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/process', processPayment); // legacy mock
router.post('/create-order', verifyToken, createOrder);
router.post('/verify', verifyToken, verifyPayment);
router.get('/booking/:bookingId', verifyToken, getPaymentByBooking);

export default router;
